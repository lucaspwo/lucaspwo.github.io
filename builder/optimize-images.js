const fs = require('fs-extra');
const path = require('path');
const sharp = require('sharp');
const { glob } = require('glob');

const ROOT_DIR = path.join(__dirname, '..');
const PROJECTS_DIR = path.join(ROOT_DIR, 'projetos');

// Configurações de otimização
const QUALITY = 80;
const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'];

async function optimizeImage(imagePath) {
  try {
    const ext = path.extname(imagePath).toLowerCase().substring(1);
    const dir = path.dirname(imagePath);
    const filename = path.basename(imagePath);

    // Criar diretório 'original' se não existir
    const originalDir = path.join(dir, 'original');
    fs.ensureDirSync(originalDir);

    // Caminho do backup original
    const originalPath = path.join(originalDir, filename);

    // Se já existe backup original, não fazer nada
    if (fs.existsSync(originalPath)) {
      console.log(`⏭️  Skipping (already optimized): ${path.relative(ROOT_DIR, imagePath)}`);
      return { skipped: true };
    }

    // Copiar original para o diretório de backup
    await fs.copy(imagePath, originalPath);

    // Obter informações da imagem original
    const originalStats = fs.statSync(imagePath);
    const originalSize = originalStats.size;

    // Otimizar a imagem
    let sharpInstance = sharp(imagePath);

    if (ext === 'jpg' || ext === 'jpeg') {
      await sharpInstance
        .jpeg({ quality: QUALITY, progressive: true })
        .toFile(imagePath + '.tmp');
    } else if (ext === 'png') {
      await sharpInstance
        .png({ quality: QUALITY, compressionLevel: 9 })
        .toFile(imagePath + '.tmp');
    } else if (ext === 'webp') {
      await sharpInstance
        .webp({ quality: QUALITY })
        .toFile(imagePath + '.tmp');
    }

    // Substituir imagem original pela otimizada
    await fs.move(imagePath + '.tmp', imagePath, { overwrite: true });

    // Calcular economia
    const optimizedStats = fs.statSync(imagePath);
    const optimizedSize = optimizedStats.size;
    const savedBytes = originalSize - optimizedSize;
    const savedPercent = ((savedBytes / originalSize) * 100).toFixed(1);

    console.log(`✓ Optimized: ${path.relative(ROOT_DIR, imagePath)}`);
    console.log(`  ${(originalSize / 1024).toFixed(1)} KB → ${(optimizedSize / 1024).toFixed(1)} KB (${savedPercent}% saved)`);

    return {
      skipped: false,
      originalSize,
      optimizedSize,
      savedBytes,
      savedPercent: parseFloat(savedPercent)
    };
  } catch (error) {
    console.error(`❌ Error optimizing ${imagePath}:`, error.message);
    return { error: true };
  }
}

async function optimizeAllImages() {
  console.log('🖼️  Image Optimization Tool\n');
  console.log(`📂 Scanning: ${PROJECTS_DIR}\n`);

  // Encontrar todas as imagens
  const patterns = IMAGE_EXTENSIONS.map(ext => `${PROJECTS_DIR}/**/*.${ext}`);
  let allImages = [];

  for (const pattern of patterns) {
    const images = await glob(pattern, { nodir: true });
    allImages = allImages.concat(images);
  }

  // Filtrar imagens que já estão em 'original'
  const imagesToOptimize = allImages.filter(img => !img.includes('/original/'));

  console.log(`📊 Found ${imagesToOptimize.length} images to process\n`);

  if (imagesToOptimize.length === 0) {
    console.log('✅ No images to optimize!\n');
    return;
  }

  // Estatísticas
  let stats = {
    total: imagesToOptimize.length,
    optimized: 0,
    skipped: 0,
    errors: 0,
    totalOriginalSize: 0,
    totalOptimizedSize: 0
  };

  // Otimizar cada imagem
  for (const imagePath of imagesToOptimize) {
    const result = await optimizeImage(imagePath);

    if (result.error) {
      stats.errors++;
    } else if (result.skipped) {
      stats.skipped++;
    } else {
      stats.optimized++;
      stats.totalOriginalSize += result.originalSize;
      stats.totalOptimizedSize += result.optimizedSize;
    }
  }

  // Exibir resumo
  console.log('\n📊 Optimization Summary:');
  console.log(`   Total images: ${stats.total}`);
  console.log(`   Optimized: ${stats.optimized}`);
  console.log(`   Skipped: ${stats.skipped}`);
  console.log(`   Errors: ${stats.errors}`);

  if (stats.optimized > 0) {
    const totalSaved = stats.totalOriginalSize - stats.totalOptimizedSize;
    const totalSavedPercent = ((totalSaved / stats.totalOriginalSize) * 100).toFixed(1);

    console.log(`   Total size before: ${(stats.totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Total size after: ${(stats.totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Total saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB (${totalSavedPercent}%)`);
  }

  console.log('\n✅ Image optimization complete!\n');
}

// Executar se chamado diretamente
if (require.main === module) {
  optimizeAllImages().catch(error => {
    console.error('\n❌ Optimization failed:', error);
    process.exit(1);
  });
}

module.exports = { optimizeAllImages, optimizeImage };
