const fs = require('fs-extra');
const path = require('path');
const nunjucks = require('nunjucks');
const matter = require('gray-matter');
const MarkdownIt = require('markdown-it');
const { glob } = require('glob');
const beautify = require('js-beautify').html;

// ====================
// CONFIGURAÇÃO
// ====================
const ROOT_DIR = path.join(__dirname, '..');
const SOURCE_DIR = path.join(ROOT_DIR, '_source');
const TEMPLATES_DIR = path.join(SOURCE_DIR, 'templates');
const CONTENT_DIR = path.join(SOURCE_DIR, 'content');
const DATA_DIR = path.join(SOURCE_DIR, 'data');
const OUTPUT_DIR = ROOT_DIR;

console.log('📂 Directories:');
console.log('  ROOT:', ROOT_DIR);
console.log('  SOURCE:', SOURCE_DIR);
console.log('  TEMPLATES:', TEMPLATES_DIR);
console.log('  CONTENT:', CONTENT_DIR);
console.log('  OUTPUT:', OUTPUT_DIR);
console.log('');

// ====================
// CONFIGURAR NUNJUCKS
// ====================
const env = nunjucks.configure(TEMPLATES_DIR, {
  autoescape: false,  // Permitir HTML no conteúdo
  trimBlocks: true,
  lstripBlocks: true,
  noCache: true
});

// ====================
// CONFIGURAR MARKDOWN
// ====================
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});

// ====================
// PROCESSAR MACROS CUSTOMIZADAS
// ====================
function parseMarkdownWithMacros(content) {
  // Função auxiliar para processar {% link %} em qualquer string (com escapes)
  function processLinks(text) {
    if (!text) return '';
    // Primeiro processar os links com escape (barra+aspas)
    let result = text.replace(
      /{%\s*link\s+\\"([^"]+)\\",\s*\\"((?:[^"\\]|\\.)*?)\\"\s*%}/g,
      (_match, url, linkText) => {
        const t = linkText.replace(/\\"/g, '"');
        return `<a href="${url}">${t}</a>`;
      }
    );
    // Depois processar links sem escape (já processados pelo YAML parser)
    // Usa (?:[^"\\]|\\.)* para permitir aspas escapadas dentro do texto
    result = result.replace(
      /{%\s*link\s+"((?:[^"\\]|\\.)+)",\s*"((?:[^"\\]|\\.)*)"\s*%}/g,
      (_match, url, linkText) => {
        // Remover barras de escape das aspas
        const cleanText = linkText.replace(/\\"/g, '"');
        return `<a href="${url}">${cleanText}</a>`;
      }
    );
    // Por último, remover qualquer \\" ou \" restante que não foi processado
    // Primeiro remove \\" (barra dupla + aspas)
    result = result.split('\\\\"').join('"');
    // Depois remove \" (barra simples + aspas)
    result = result.split('\\"').join('"');
    return result;
  }

  // ETAPA 1: Detectar padrões de YouTube seguido de Image e colocá-los lado a lado
  // Padrão: {% youtube "id" %}\n\n{% image "..." %} -> col-md-6 + col-md-6
  content = content.replace(
    /{%\s*youtube\s+"([^"]+)"(?:,\s*(\d+),\s*(\d+))?\s*%}\s*\n\s*\n\s*{%\s*image\s+"([^"]+)",\s*"([^"]*)"(?:,\s*(\d+))?(?:,\s*"((?:[^"\\]|\\.)*)")?\s*%}/g,
    (_match, videoId, _vw, _vh, imgSrc, imgAlt, imgWidth, imgCaption) => {
      const cap = processLinks(imgCaption || '');
      const w = imgWidth || 50;
      return `{% youtube_with_image "${videoId}", "${imgSrc}", "${imgAlt}", ${w}, "${imgCaption || ''}", "half" %}`;
    }
  );

  // Padrão: {% youtube "id", "caption" %}\n\n{% image2cols "..." %} -> col-md-8 + col-md-4 (2 imagens empilhadas)
  content = content.replace(
    /{%\s*youtube\s+"([^"]+)"(?:,\s*"((?:[^"\\]|\\.)*)")?\s*%}\s*\n\s*\n\s*{%\s*image2cols\s+"([^"]+)",\s*"([^"]*)",\s*"((?:[^"\\]|\\.)*)",\s*"([^"]+)",\s*"([^"]*)",\s*"((?:[^"\\]|\\.)*)"\s*%}/g,
    (_match, videoId, ytCaption, src1, alt1, cap1, src2, alt2, cap2) => {
      // Se há legenda no YouTube, usa a primeira imagem para mostrar a legenda do vídeo
      const videoCaption = ytCaption || '';
      return `{% youtube_with_image2cols "${videoId}", "${videoCaption}", "${src1}", "${alt1}", "${cap1}", "${src2}", "${alt2}", "${cap2}" %}`;
    }
  );

  // {% image "path", "alt", width, "caption" %}
  content = content.replace(
    /{%\s*image\s+"([^"]+)",\s*"([^"]*)"(?:,\s*(\d+))?(?:,\s*"((?:[^"\\]|\\.)*)")?\s*%}/g,
    (_match, src, alt, width, caption) => {
      const w = width || 50;
      const cap = processLinks(caption);
      return `<div class="col-md-12"><div class="col-md-12 text-center"><a href="${src}" class="image-popup" style="margin-bottom: 1px;"><img src="${src}" class="img-responsive" style="margin: 0 auto; width: ${w}%; height: auto;" alt="${alt}"></a>${cap ? `<p>${cap}</p>` : ''}</div></div>`;
    }
  );

  // {% image2cols "src1", "alt1", "caption1", "src2", "alt2", "caption2" %}
  content = content.replace(
    /{%\s*image2cols\s+"([^"]+)",\s*"([^"]*)",\s*"((?:[^"\\]|\\.)*)",\s*"([^"]+)",\s*"([^"]*)",\s*"((?:[^"\\]|\\.)*)"\s*%}/g,
    (_match, src1, alt1, cap1, src2, alt2, cap2) => {
      const c1 = processLinks(cap1);
      const c2 = processLinks(cap2);
      return `<div class="col-md-12"><div class="col-md-6 text-center"><a href="${src1}" class="image-popup" style="margin-bottom: 1px;"><img src="${src1}" class="img-responsive" alt="${alt1}"></a>${c1 ? `<p>${c1}</p>` : ''}</div><div class="col-md-6 text-center"><a href="${src2}" class="image-popup" style="margin-bottom: 1px;"><img src="${src2}" class="img-responsive" alt="${alt2}"></a>${c2 ? `<p>${c2}</p>` : ''}</div></div>`;
    }
  );

  // {% image3cols ... %}
  content = content.replace(
    /{%\s*image3cols\s+"([^"]+)",\s*"([^"]*)",\s*"((?:[^"\\]|\\.)*)",\s*"([^"]+)",\s*"([^"]*)",\s*"((?:[^"\\]|\\.)*)",\s*"([^"]+)",\s*"([^"]*)",\s*"((?:[^"\\]|\\.)*)"\s*%}/g,
    (_match, src1, alt1, cap1, src2, alt2, cap2, src3, alt3, cap3) => {
      const c1 = processLinks(cap1);
      const c2 = processLinks(cap2);
      const c3 = processLinks(cap3);
      return `<div class="col-md-12"><div class="col-md-4 text-center"><a href="${src1}" class="image-popup" style="margin-bottom: 1px;"><img src="${src1}" class="img-responsive" alt="${alt1}"></a>${c1 ? `<p>${c1}</p>` : ''}</div><div class="col-md-4 text-center"><a href="${src2}" class="image-popup" style="margin-bottom: 1px;"><img src="${src2}" class="img-responsive" alt="${alt2}"></a>${c2 ? `<p>${c2}</p>` : ''}</div><div class="col-md-4 text-center"><a href="${src3}" class="image-popup" style="margin-bottom: 1px;"><img src="${src3}" class="img-responsive" alt="${alt3}"></a>${c3 ? `<p>${c3}</p>` : ''}</div></div>`;
    }
  );

  // {% gist "id" %}
  content = content.replace(
    /{%\s*gist\s+"([^"]+)"\s*%}/g,
    (_match, id) => {
      return `<div class="col-md-12"><script src="https://gist.github.com/lucaspwo/${id}.js"></script></div>`;
    }
  );

  // {% youtube_with_image "videoId", "imgSrc", "imgAlt", width, "caption", "half" %}
  // Layout: col-md-6 (vídeo) + col-md-6 (imagem)
  content = content.replace(
    /{%\s*youtube_with_image\s+"([^"]+)",\s*"([^"]+)",\s*"([^"]*)",\s*(\d+),\s*"((?:[^"\\]|\\.)*)",\s*"([^"]*)"\s*%}/g,
    (_match, videoId, imgSrc, imgAlt, imgWidth, imgCaption, _layout) => {
      const w = imgWidth || 50;
      const cap = processLinks(imgCaption);
      return `<div class="col-md-12"><div class="col-md-6"><div style="max-width:730px;margin:0 auto;"><div style="position: relative;padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe width="730" height="410" src="https://www.youtube-nocookie.com/embed/${videoId}" style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; max-width: 730px; max-height: 410px;" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div></div></div><div class="col-md-6"><a href="${imgSrc}" class="image-popup" style="margin-bottom: 1px;"><img src="${imgSrc}" class="img-responsive"></a>${cap ? `<p class="text-justify">${cap}</p>` : ''}</div></div>`;
    }
  );

  // {% youtube_with_image2cols "videoId", "ytCaption", "src1", "alt1", "cap1", "src2", "alt2", "cap2" %}
  // Layout: col-md-8 (vídeo) + col-md-4 (2 imagens empilhadas)
  content = content.replace(
    /{%\s*youtube_with_image2cols\s+"([^"]+)",\s*"((?:[^"\\]|\\.)*)",\s*"([^"]+)",\s*"([^"]*)",\s*"((?:[^"\\]|\\.)*)",\s*"([^"]+)",\s*"([^"]*)",\s*"((?:[^"\\]|\\.)*)"\s*%}/g,
    (_match, videoId, ytCaption, src1, alt1, cap1, src2, alt2, cap2) => {
      const ytCap = processLinks(ytCaption || '');
      const c1 = processLinks(cap1);
      const ytCaptionHTML = ytCap ? `<p class="text-justify">${ytCap}</p>` : '';
      return `<div class="col-md-12"><div class="col-md-8"><div style="max-width:730px;margin:0 auto;"><div style="position: relative;padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe width="730" height="410" src="https://www.youtube-nocookie.com/embed/${videoId}" style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; max-width: 730px; max-height: 410px;" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div></div></div>${ytCaptionHTML}</div><div class="col-md-4"><a href="${src1}" class="image-popup" style="margin-bottom: 0;"><img src="${src1}" class="img-responsive"></a><a href="${src2}" class="image-popup" style="margin-bottom: 1px;"><img src="${src2}" class="img-responsive"></a>${c1 ? `<p class="text-justify">${c1}</p>` : ''}</div></div>`;
    }
  );

  // {% youtube "id", "caption" %} ou {% youtube "id" %}
  content = content.replace(
    /{%\s*youtube\s+"([^"]+)"(?:,\s*"((?:[^"\\]|\\.)*)")?\s*%}/g,
    (_match, id, caption) => {
      const cap = processLinks(caption || '');
      const captionHTML = cap ? `<p class="text-justify">${cap}</p>` : '';
      return `<div class="col-md-12"><div class="col-md-8"><div style="max-width:730px;margin:0 auto;"><div style="position: relative;padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe width="730" height="410" src="https://www.youtube-nocookie.com/embed/${id}" style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; max-width: 730px; max-height: 410px;" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div></div></div>${captionHTML}</div>`;
    }
  );

  // {% p %}...{% endp %} - Parágrafo justificado em col-md-12
  content = content.replace(
    /{%\s*p\s*%}([\s\S]*?){%\s*endp\s*%}/g,
    (match, text) => {
      return `<div class="col-md-12">\n  <p class="text-justify">${text.trim()}</p>\n</div>`;
    }
  );

  // {% hr %} - Separador horizontal em col-md-12
  content = content.replace(
    /{%\s*hr\s*%}/g,
    () => {
      return `<div class="col-md-12">\n  <hr>\n</div>`;
    }
  );

  // {% link "url", "text" %} - Links standalone (sem escape, fora de imagens)
  content = content.replace(
    /{%\s*link\s+"([^"]+)",\s*"([^"]*)"\s*%}/g,
    (match, url, text) => {
      return `<a href="${url}">${text}</a>`;
    }
  );

  return content;
}

// ====================
// FORMAT HTML OUTPUT
// ====================
function formatHTML(html) {
  return beautify(html, {
    indent_size: 2,
    indent_char: ' ',
    max_preserve_newlines: 2,
    preserve_newlines: true,
    indent_inner_html: true,
    wrap_line_length: 0,
    end_with_newline: true,
    extra_liners: ['head', 'body', '/html']
  });
}

// ====================
// VALIDAÇÃO DE FRONT-MATTER
// ====================
function validateFrontMatter(data, filePath) {
  const required = ['title', 'slug', 'lang', 'type', 'description'];
  const missing = required.filter(field => !data[field]);

  if (missing.length > 0) {
    throw new Error(`Missing required fields in ${filePath}: ${missing.join(', ')}`);
  }

  // Validações adicionais para posts
  if (data.type === 'post' && !data.date) {
    throw new Error(`Missing required field 'date' for post in ${filePath}`);
  }

  // Validar index_size se presente
  if (data.index_size) {
    const validSizes = [4, 6, 8, 12];
    if (!validSizes.includes(parseInt(data.index_size))) {
      throw new Error(
        `Invalid index_size in ${filePath}: ${data.index_size}. ` +
        `Must be one of: ${validSizes.join(', ')}`
      );
    }
  }
}

// ====================
// PROCESSAR ARQUIVO MARKDOWN
// ====================
function processMarkdown(filePath, lang) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  // Validar front-matter
  validateFrontMatter(data, filePath);

  // PRIMEIRO: Processar macros customizadas NO MARKDOWN (antes de converter para HTML)
  let processedContent = parseMarkdownWithMacros(content);

  // DEPOIS: Parse Markdown para HTML
  let htmlContent = md.render(processedContent);

  // Determinar paths baseado no idioma
  const basePath = lang === 'pt' ? '../' : ''; // Para assets (CSS/JS)
  const navPath = ''; // Navegação sempre relativa à pasta atual
  const outputPath = lang === 'pt' ? 'br/' : '';

  // Carregar dados do site
  const siteData = JSON.parse(
    fs.readFileSync(path.join(DATA_DIR, `site-${lang}.json`), 'utf8')
  );

  // Preparar contexto do template
  const context = {
    ...data,
    ...siteData,
    content: htmlContent,
    basePath,
    navPath,
    lang,
    slug: data.slug,
    pageTitle: data.title,
    dateDisplay: data.date_display || data.date,
    alternateLangUrl: data.alternate_url || (lang === 'en' ? 'br/index.html' : '../index.html')
  };

  // Renderizar template
  const layout = data.layout || (data.type === 'post' ? 'layouts/post.njk' : 'layouts/page.njk');
  let html = env.render(layout, context);
  html = formatHTML(html);

  // Salvar arquivo
  const outputFile = path.join(OUTPUT_DIR, outputPath, `${data.slug}.html`);
  fs.ensureDirSync(path.dirname(outputFile));
  fs.writeFileSync(outputFile, html);

  console.log(`✓ Built: ${outputFile}`);

  return { ...data, content: htmlContent, lang, outputPath: outputFile };
}

// ====================
// VALIDAR LAYOUT DO INDEX
// ====================
function validateIndexLayout(posts, lang) {
  let currentRowSize = 0;
  let warnings = [];

  posts.forEach((post, index) => {
    const size = post.index_size || 6; // Padrão = 6
    currentRowSize += parseInt(size);

    // Se ultrapassou 12, vai quebrar para próxima linha
    if (currentRowSize > 12) {
      warnings.push(
        `⚠️  [${lang.toUpperCase()}] Post "${post.title}" (index_size: ${size}) ` +
        `quebrou linha (soma anterior: ${currentRowSize - size}). ` +
        `Considere ajustar para completar exatamente 12 colunas por linha.`
      );
      currentRowSize = parseInt(size); // Reinicia contagem na nova linha
    }

    // Se completou exatamente 12, reinicia
    if (currentRowSize === 12) {
      currentRowSize = 0;
    }
  });

  if (warnings.length > 0) {
    console.log('\n⚠️  Avisos de Layout:');
    warnings.forEach(w => console.log(w));
    console.log('');
  }
}

// ====================
// GERAR PÁGINA INDEX
// ====================
function generateIndex(posts, lang) {
  const siteData = JSON.parse(
    fs.readFileSync(path.join(DATA_DIR, `site-${lang}.json`), 'utf8')
  );

  const basePath = lang === 'pt' ? '../' : ''; // Para assets (CSS/JS)
  const navPath = ''; // Navegação sempre relativa à pasta atual
  const outputPath = lang === 'pt' ? 'br/' : '';

  // Filtrar e ordenar posts do idioma
  const langPosts = posts
    .filter(p => p.lang === lang && p.type === 'post')
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map(p => ({
      ...p,
      dateShort: p.date_display_short || p.date,
      displayTitle: p.index_title || p.title
    }));

  // Validar layout antes de gerar
  validateIndexLayout(langPosts, lang);

  // Conteúdo padrão do index
  const indexContent = lang === 'en'
    ? `<h2>I'm Lucas Oliveira</h2>
<p>and here you'll find projects I made or that I'm still making, be it software or hardware, and occasionally some interesting facts about me. 😉</p>`
    : `<h2>Eu sou Lucas Oliveira</h2>
<p>e aqui você encontrará projetos que fiz ou que ainda estou fazendo, sejam eles de software ou hardware, e ocasionalmente alguns fatos interessantes sobre mim. 😉</p>`;

  const context = {
    ...siteData,
    posts: langPosts,
    content: indexContent,
    basePath,
    navPath,
    lang,
    slug: 'index',
    pageTitle: siteData.siteTitle,
    alternateLangUrl: lang === 'en' ? 'br/index.html' : '../index.html',
    ogType: 'website'
  };

  let html = env.render('layouts/home.njk', context);
  html = formatHTML(html);
  const outputFile = path.join(OUTPUT_DIR, outputPath, 'index.html');
  fs.writeFileSync(outputFile, html);

  console.log(`✓ Built: ${outputFile}`);
}

// ====================
// BUILD PRINCIPAL
// ====================
async function build() {
  console.log('🔨 Starting build...\n');

  try {
    // Processar todos os arquivos Markdown (excluindo backups)
    const mdFiles = await glob(`${CONTENT_DIR}/**/*.md`, {
      ignore: `${CONTENT_DIR}/posts.backup/**`
    });
    const allContent = [];

    console.log(`📄 Found ${mdFiles.length} markdown files\n`);

    for (const file of mdFiles) {
      const relativePath = path.relative(CONTENT_DIR, file);
      const lang = relativePath.includes('/en/') ? 'en' : 'pt';

      try {
        const processed = processMarkdown(file, lang);
        allContent.push(processed);
      } catch (error) {
        console.error(`❌ Error processing ${file}:`, error.message);
      }
    }

    console.log('');

    // Gerar índices
    console.log('🏠 Generating index pages...');
    generateIndex(allContent, 'en');
    generateIndex(allContent, 'pt');

    // Salvar índice de posts (opcional, para referência futura)
    const postsIndex = allContent.filter(c => c.type === 'post');
    fs.writeFileSync(
      path.join(DATA_DIR, 'posts-index.json'),
      JSON.stringify(postsIndex, null, 2)
    );

    console.log('\n✅ Build complete!');
    console.log(`📊 Generated ${allContent.length} pages`);
    console.log(`   Posts: ${postsIndex.length}`);
    console.log(`   Pages: ${allContent.length - postsIndex.length}`);
  } catch (error) {
    console.error('\n❌ Build failed:', error);
    console.error(error.stack);
    process.exit(1);
  }
}

// ====================
// EXECUTAR BUILD
// ====================
if (require.main === module) {
  build();
}

module.exports = { build, processMarkdown, generateIndex };
