const express = require('express');
const chokidar = require('chokidar');
const browserSync = require('browser-sync').create();
const path = require('path');
const { build } = require('./build.js');

const ROOT_DIR = path.join(__dirname, '..');
const SOURCE_DIR = path.join(ROOT_DIR, '_source');

// Configurar Express para servir arquivos estáticos
const app = express();
app.use(express.static(ROOT_DIR));

// Iniciar servidor Express
const PORT = 3000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Express server running on http://localhost:${PORT}`);
});

// Configurar Browser-sync
browserSync.init({
  proxy: `localhost:${PORT}`,
  port: 3001,
  ui: false,
  open: false,
  notify: false,
  logLevel: 'silent'
});

console.log(`🔄 Browser-sync running on http://localhost:3001`);
console.log('');

// Função para fazer rebuild
async function rebuild() {
  console.log('🔨 Changes detected, rebuilding...');
  try {
    await build();
    console.log('✅ Rebuild complete! Reloading browser...\n');
    browserSync.reload();
  } catch (error) {
    console.error('❌ Rebuild failed:', error.message);
    console.log('');
  }
}

// Watch para mudanças em arquivos Markdown e templates
const watcher = chokidar.watch([
  `${SOURCE_DIR}/**/*.md`,
  `${SOURCE_DIR}/templates/**/*.njk`,
  `${SOURCE_DIR}/data/**/*.json`
], {
  ignored: /node_modules/,
  persistent: true,
  ignoreInitial: true
});

watcher
  .on('change', filepath => {
    console.log(`📝 File changed: ${path.relative(ROOT_DIR, filepath)}`);
    rebuild();
  })
  .on('add', filepath => {
    console.log(`➕ File added: ${path.relative(ROOT_DIR, filepath)}`);
    rebuild();
  })
  .on('unlink', filepath => {
    console.log(`🗑️  File deleted: ${path.relative(ROOT_DIR, filepath)}`);
    rebuild();
  });

console.log('👀 Watching for changes in:');
console.log('   - _source/**/*.md');
console.log('   - _source/templates/**/*.njk');
console.log('   - _source/data/**/*.json');
console.log('');
console.log('Press Ctrl+C to stop\n');

// Fazer build inicial
rebuild();

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n👋 Shutting down gracefully...');
  watcher.close();
  browserSync.exit();
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
