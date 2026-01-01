const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');
const matter = require('gray-matter');

const execAsync = promisify(exec);

// Configuration
const CONTENT_DIR = path.join(__dirname, '..', '_source', 'content', 'posts');
const BACKUP_DIR = path.join(__dirname, '..', '_source', 'content', 'posts.backup');

/**
 * Extract index_title and index_size from fallback branch HTML
 * @param {string} lang - Language code ('en' or 'pt')
 * @returns {Promise<Array>} Array of {slug, indexTitle, indexSize}
 */
async function extractFromFallbackBranch(lang) {
  const filePath = lang === 'en' ? 'index.html' : 'br/index.html';

  try {
    const { stdout } = await execAsync(`git show fallback:${filePath}`);

    const posts = [];

    // Regex to match card structure:
    // <div class="col-md-X ...> ... <a href="slug.html" ...> ... <h2 class="title-main">Title</h2>
    const cardRegex = /<div class="col-md-(\d+)[^>]*probootstrap-animate[^>]*>[\s\S]*?<a href="([^"]+)"[^>]*>[\s\S]*?<h2 class="title-main">([^<]+)<\/h2>/g;

    let match;
    while ((match = cardRegex.exec(stdout)) !== null) {
      const [, indexSize, href, indexTitle] = match;
      const slug = href.replace('.html', '').replace('../', '');
      posts.push({
        slug,
        indexTitle: indexTitle.trim(),
        indexSize: parseInt(indexSize)
      });
    }

    return posts;
  } catch (error) {
    console.error(`❌ Error extracting from fallback branch (${lang}):`, error.message);
    return [];
  }
}

/**
 * Update markdown file front-matter with new fields
 * @param {string} filePath - Path to .md file
 * @param {Object} updates - Fields to update
 * @param {Object} options - Options {dryRun, force}
 * @returns {Promise<Object>} Result object
 */
async function updateMarkdownFrontMatter(filePath, updates, options = {}) {
  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    // Skip if fields already exist (unless force mode)
    if (!options.force && updates.index_title && data.index_title) {
      return { skipped: true, reason: 'index_title already exists' };
    }
    if (!options.force && updates.index_size && data.index_size) {
      return { skipped: true, reason: 'index_size already exists' };
    }

    // Merge updates
    const updatedData = { ...data, ...updates };

    // Write back
    const updatedContent = matter.stringify(content, updatedData);

    if (!options.dryRun) {
      await fs.writeFile(filePath, updatedContent);
    }

    return { updated: true, changes: updates };
  } catch (error) {
    return { error: true, message: error.message };
  }
}

/**
 * Main migration function
 * @param {Object} options - Options {dryRun, force}
 */
async function migrate(options = { dryRun: false, force: false }) {
  console.log('🔄 Migration: Extracting values from fallback branch\n');

  if (options.dryRun) {
    console.log('🔍 DRY RUN MODE - No files will be modified\n');
  }

  // Create backup
  if (!options.dryRun) {
    if (await fs.pathExists(BACKUP_DIR)) {
      console.log(`⚠️  Backup already exists at: ${BACKUP_DIR}`);
      console.log('   Skipping backup creation.\n');
    } else {
      await fs.copy(CONTENT_DIR, BACKUP_DIR);
      console.log(`✓ Backup created at: ${BACKUP_DIR}\n`);
    }
  }

  const report = { en: [], pt: [] };
  let totalUpdated = 0;
  let totalSkipped = 0;
  let totalErrors = 0;

  // Process each language
  for (const lang of ['en', 'pt']) {
    console.log(`📝 Processing ${lang.toUpperCase()} posts...`);

    const fallbackData = await extractFromFallbackBranch(lang);

    if (fallbackData.length === 0) {
      console.log(`   ⚠️  No posts found in fallback branch for ${lang}\n`);
      continue;
    }

    console.log(`   Found ${fallbackData.length} posts in fallback branch\n`);

    // Get all .md files in the language directory
    const langDir = path.join(CONTENT_DIR, lang);
    const mdFiles = await fs.readdir(langDir);
    const mdFilesFiltered = mdFiles.filter(f => f.endsWith('.md'));

    for (const { slug, indexTitle, indexSize } of fallbackData) {
      // Find the file by reading front-matter from all .md files
      let filePath = null;
      for (const mdFile of mdFilesFiltered) {
        const testPath = path.join(langDir, mdFile);
        const content = await fs.readFile(testPath, 'utf8');
        const { data } = matter(content);
        if (data.slug === slug) {
          filePath = testPath;
          break;
        }
      }

      if (!filePath) {
        console.log(`   ⚠️  File not found for slug: ${slug} (skipping)`);
        report[lang].push({ slug, skipped: true, reason: 'file not found' });
        totalSkipped++;
        continue;
      }

      const result = await updateMarkdownFrontMatter(
        filePath,
        { index_title: indexTitle, index_size: indexSize },
        options
      );

      report[lang].push({ slug, ...result });

      if (result.updated) {
        console.log(`   ✓ ${slug}: index_title="${indexTitle}", index_size=${indexSize}`);
        totalUpdated++;
      } else if (result.skipped) {
        console.log(`   ○ ${slug}: ${result.reason}`);
        totalSkipped++;
      } else if (result.error) {
        console.log(`   ❌ ${slug}: ${result.message}`);
        totalErrors++;
      }
    }

    console.log('');
  }

  // Save report
  const reportPath = path.join(__dirname, 'migration-report.json');
  await fs.writeJSON(reportPath, report, { spaces: 2 });
  console.log(`📄 Migration report saved: ${reportPath}\n`);

  // Summary
  console.log('✅ Migration complete!');
  console.log(`   Mode: ${options.dryRun ? 'DRY RUN' : 'REAL'}`);
  console.log(`   Updated: ${totalUpdated} files`);
  console.log(`   Skipped: ${totalSkipped} files`);
  console.log(`   Errors: ${totalErrors} files`);

  if (options.dryRun) {
    console.log('\n💡 Run without --dry-run to apply changes');
  } else if (totalUpdated > 0) {
    console.log('\n💡 Next steps:');
    console.log('   1. Review the changes in the markdown files');
    console.log('   2. Run: npm run build');
    console.log('   3. Compare output with fallback branch');
  }
}

// CLI
if (require.main === module) {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const force = args.includes('--force');

  migrate({ dryRun, force }).catch(error => {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  });
}

module.exports = { migrate, extractFromFallbackBranch, updateMarkdownFrontMatter };
