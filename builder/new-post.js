const fs = require('fs-extra');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function createNewPost() {
  console.log('\n📝 Create New Post\n');

  // Perguntar informações
  const titleEN = await question('Post title (EN): ');
  const titlePT = await question('Post title (PT): ');
  const slug = await question('Slug (filename): ');
  const descEN = await question('Description (EN): ');
  const descPT = await question('Description (PT): ');
  const indexTitleEN = await question('Index card title (EN) [empty = use full title]: ');
  const indexTitlePT = await question('Index card title (PT) [empty = use full title]: ');
  const indexSize = await question('Index card size - col-md-X (4, 6, 8, 12) [default: 6]: ');

  // Gerar data atual
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const dateISO = `${year}-${month}-${day}`;

  // Formatar data para exibição (Month DD, YYYY)
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const monthNamesPT = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  const dateDisplayEN = `${monthNames[now.getMonth()]} ${day}, ${year}`;
  const dateDisplayPT = `${day} de ${monthNamesPT[now.getMonth()]} de ${year}`;

  // Validar e processar index_size
  const validSizes = ['4', '6', '8', '12'];
  let indexSizeValue = 6; // default
  if (indexSize && indexSize.trim()) {
    if (!validSizes.includes(indexSize.trim())) {
      console.log(`⚠️  Invalid size "${indexSize}". Using default (6).`);
    } else {
      indexSizeValue = parseInt(indexSize.trim());
    }
  }
  const indexSizeField = indexSizeValue !== 6 ? `index_size: ${indexSizeValue}\n` : '';

  // Processar index_title
  const indexTitleENField = indexTitleEN && indexTitleEN.trim()
    ? `index_title: "${indexTitleEN.trim()}"\n`
    : '';
  const indexTitlePTField = indexTitlePT && indexTitlePT.trim()
    ? `index_title: "${indexTitlePT.trim()}"\n`
    : '';

  // Front-matter para EN
  const frontMatterEN = `---
title: "${titleEN}"
slug: "${slug}"
date: "${dateISO}"
date_display: "${dateDisplayEN}"
lang: "en"
type: "post"
description: "${descEN}"
og_image: "projetos/${slug}/image.jpg"
featured_image: "projetos/${slug}/image.jpg"
alternate_url: "br/${slug}.html"
${indexTitleENField}${indexSizeField}---

`;

  // Front-matter para PT
  const frontMatterPT = `---
title: "${titlePT}"
slug: "${slug}"
date: "${dateISO}"
date_display: "${dateDisplayPT}"
lang: "pt"
type: "post"
description: "${descPT}"
og_image: "projetos/${slug}/image.jpg"
featured_image: "projetos/${slug}/image.jpg"
alternate_url: "../${slug}.html"
${indexTitlePTField}${indexSizeField}---

`;

  // Criar diretórios se não existirem
  const contentDirEN = path.join(__dirname, '..', '_source', 'content', 'posts', 'en');
  const contentDirPT = path.join(__dirname, '..', '_source', 'content', 'posts', 'pt');
  fs.ensureDirSync(contentDirEN);
  fs.ensureDirSync(contentDirPT);

  // Criar arquivos
  const filePathEN = path.join(contentDirEN, `${slug}.md`);
  const filePathPT = path.join(contentDirPT, `${slug}.md`);

  fs.writeFileSync(filePathEN, frontMatterEN);
  fs.writeFileSync(filePathPT, frontMatterPT);

  console.log('\n✅ Posts created successfully!');
  console.log(`   EN: ${filePathEN}`);
  console.log(`   PT: ${filePathPT}`);
  console.log('\n💡 Tips:');
  console.log('   - Add content below the front-matter');
  console.log('   - index_title: Use shorter version for index cards (optional)');
  console.log('   - index_size: Valid values are 4, 6, 8, 12 (must sum to 12 per row)');
  console.log('   - Run `npm run build` when ready\n');

  rl.close();
}

createNewPost().catch(error => {
  console.error('❌ Error creating post:', error);
  rl.close();
  process.exit(1);
});
