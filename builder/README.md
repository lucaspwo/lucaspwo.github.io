# Builder - Scripts de Automação

Este diretório contém scripts Node.js para automatizar tarefas comuns do blog.

## 📦 Instalação

```bash
npm install
```

## 🛠️ Scripts Disponíveis

### 1. `npm run build` - Build do Site

Converte todos os arquivos Markdown para HTML usando os templates Nunjucks.

**O que faz:**
- Processa arquivos `.md` de `_source/content/posts/` e `_source/content/pages/`
- Converte Markdown para HTML
- Aplica templates Nunjucks
- Gera páginas index bilíngues
- Valida front-matter obrigatório

**Uso:**
```bash
npm run build
```

**Saída:**
- `/*.html` - Posts e páginas em inglês
- `/br/*.html` - Posts e páginas em português
- `/index.html` e `/br/index.html` - Páginas iniciais

---

### 2. `npm run new-post` - Criar Novo Post

Script interativo para criar novos posts bilíngues com front-matter pré-configurado.

**O que faz:**
- Solicita informações do post (título, slug, descrição)
- Gera automaticamente a data atual
- Cria dois arquivos `.md` (EN e PT) com front-matter completo
- Configura URLs alternativas corretas

**Uso:**
```bash
npm run new-post
```

**Prompts:**
1. Post title (EN): `My New Post`
2. Post title (PT): `Meu Novo Post`
3. Slug (filename): `my-new-post`
4. Description (EN): `A brief description`
5. Description (PT): `Uma breve descrição`
6. Index image size - col-md-X (4, 6, 8, 12) [default: auto]: `12` ou deixe em branco

**Resultado:**
- `_source/content/posts/en/my-new-post.md`
- `_source/content/posts/pt/my-new-post.md`

Ambos com front-matter completo, faltando apenas adicionar o conteúdo!

**Campo `index_size` (opcional):**

Este campo controla o tamanho da imagem de capa do post na página inicial (`index.html`).

**Valores aceitos:**
- `4` - Coluna pequena (col-md-4) - 1/3 da largura
- `6` - Coluna média (col-md-6) - 1/2 da largura (padrão)
- `8` - Coluna grande (col-md-8) - 2/3 da largura
- `12` - Coluna completa (col-md-12) - largura total (destaque)
- *(vazio)* - Usa padrão: `6` (dois posts por linha)

**Como funciona o layout:**
- Bootstrap usa sistema de 12 colunas
- Posts são dispostos da esquerda para direita, quebrando linha automaticamente
- **Padrão sem `index_size`:** Todos os posts ficam `col-md-6` (2 por linha)

**Exemplos de layouts:**

✅ **Bom - Layout alinhado (soma = 12):**
```
Linha 1: [Post 1: 12] ← Destaque completo
Linha 2: [Post 2: 6][Post 3: 6] ← Dois lado a lado
Linha 3: [Post 4: 8][Post 5: 4] ← Grande + pequeno
Linha 4: [Post 6: 6][Post 7: 6] ← Dois lado a lado
```

⚠️ **Ruim - Layout quebrado (soma ≠ 12):**
```
Linha 1: [Post 1: 6][Post 2: 8] ← Soma = 14, quebra!
         └─────────────────┘└─► Post 2 vaza para linha 2
```

**Recomendações:**
- **Posts importantes:** `index_size: 12` (destaque total)
- **Posts normais:** Deixe vazio (padrão `6`)
- **Layout customizado:** Planeje para somar exatamente 12 por linha
- **Validação:** O build avisa se houver quebras inesperadas

---

### 3. `npm run optimize-images` - Otimizar Imagens

Reduz o tamanho de todas as imagens mantendo a qualidade visual.

**O que faz:**
- Escaneia o diretório `projetos/`
- Encontra todas as imagens (JPG, PNG, WebP)
- Cria backup original em `projetos/*/original/`
- Otimiza usando Sharp (qualidade 80)
- Mostra economia de espaço

**Uso:**
```bash
npm run optimize-images
```

**Configurações:**
- **Qualidade:** 80 (ajustável em `optimize-images.js`)
- **Formatos:** JPG, JPEG, PNG, WebP
- **Backup:** Automático na primeira execução
- **Segurança:** Pula imagens já otimizadas

**Exemplo de saída:**
```
🖼️  Image Optimization Tool

📂 Scanning: /Users/you/project/projetos

📊 Found 44 images to process

✓ Optimized: projetos/post/image.jpg
  500.0 KB → 150.0 KB (70.0% saved)

📊 Optimization Summary:
   Total images: 44
   Optimized: 30
   Skipped: 14 (already optimized)
   Total saved: 2.5 MB (45.2%)
```

---

### 4. `npm run dev` - Servidor de Desenvolvimento

Servidor local com live reload para desenvolvimento.

**O que faz:**
- Inicia servidor Express na porta 3000
- Inicia Browser-sync na porta 3001 (proxy)
- Observa mudanças em:
  - `_source/**/*.md`
  - `_source/templates/**/*.njk`
  - `_source/data/**/*.json`
- Rebuild automático ao detectar mudanças
- Reload automático do navegador

**Uso:**
```bash
npm run dev
```

**Acesso:**
- Servidor principal: <http://localhost:3000>
- Browser-sync (recomendado): <http://localhost:3001>

**Ctrl+C** para encerrar

---

### 5. `npm run clean` - Limpar HTMLs

Remove todos os arquivos HTML gerados.

**O que faz:**
```bash
rm -rf ../*.html ../br/*.html
```

**Uso:**
```bash
npm run clean
```

---

## 🎬 Workflows Recomendados

### Workflow 1: Criar Novo Post do Zero

```bash
cd builder

# 1. Criar templates dos arquivos
npm run new-post
# Responda aos prompts

# 2. Adicionar imagens ao diretório
mkdir ../projetos/meu-post
# Copie suas imagens para lá

# 3. Otimizar imagens
npm run optimize-images

# 4. Editar os arquivos criados
code ../_source/content/posts/en/meu-post.md
code ../_source/content/posts/pt/meu-post.md
# Adicione o conteúdo usando macros

# 5. Testar com live reload
npm run dev
# Acesse http://localhost:3001

# 6. Quando estiver pronto
git add ../_source/content/posts/
git commit -m "Add: Meu Novo Post"
git push
# GitHub Actions fará o build e deploy
```

### Workflow 2: Editar Post Existente

```bash
cd builder

# 1. Iniciar servidor de desenvolvimento
npm run dev

# 2. Editar arquivos .md
# Salve e veja mudanças instantaneamente no navegador

# 3. Quando terminar, Ctrl+C e push
git add ../_source/content/posts/
git commit -m "Update: Post XYZ"
git push
```

### Workflow 3: Otimizar Imagens de Posts Antigos

```bash
cd builder

# Otimizar todas as imagens do projeto
npm run optimize-images

# Verificar resultados
git status
# Você verá:
# - Imagens otimizadas (modificadas)
# - Diretórios "original/" criados (não rastreados pelo git)

# Commit apenas as imagens otimizadas
git add ../projetos/
git commit -m "Optimize images"
git push
```

---

## 📁 Estrutura de Arquivos

```
builder/
├── build.js              # Script principal de build
├── new-post.js          # Criação interativa de posts
├── optimize-images.js   # Otimização de imagens
├── server.js            # Servidor de desenvolvimento
├── package.json         # Dependências e scripts npm
├── package-lock.json    # Lock de versões
└── README.md           # Este arquivo
```

---

## 🔧 Dependências

### Produção

- **gray-matter** - Parser de YAML front-matter
- **markdown-it** - Conversor Markdown → HTML
- **nunjucks** - Template engine
- **fs-extra** - Operações de arquivo melhoradas
- **glob** - Pattern matching de arquivos
- **sharp** - Processamento de imagens
- **express** - Servidor web
- **chokidar** - File watcher
- **browser-sync** - Live reload

### Desenvolvimento

- **nodemon** - Auto-restart do servidor

---

## ⚙️ Configurações Avançadas

### Customizar Qualidade de Otimização

Edite `optimize-images.js`:

```javascript
const QUALITY = 80; // Altere para 60-100
```

### Adicionar Novos Formatos de Imagem

Edite `optimize-images.js`:

```javascript
const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
```

### Customizar Porta do Servidor

Edite `server.js`:

```javascript
const PORT = 3000; // Porta do Express
// Browser-sync será PORT + 1
```

---

## 🐛 Troubleshooting

### Erro: "Missing required fields in front-matter"

O build valida campos obrigatórios. Certifique-se de que seu `.md` tem:

```yaml
---
title: "Título"
slug: "slug"
lang: "en" ou "pt"
type: "post" ou "page"
description: "Descrição"
date: "YYYY-MM-DD"  # Apenas para posts
---
```

### Erro: "ENOENT: no such file or directory"

Certifique-se de estar no diretório correto:

```bash
cd builder
npm run <comando>
```

### Imagens não otimizando

Verifique se:
1. As imagens estão em `projetos/*/`
2. São formatos suportados (JPG, PNG, WebP)
3. Não estão na pasta `original/`

### Live reload não funciona

1. Verifique se a porta 3001 está livre
2. Acesse `http://localhost:3001` (não 3000)
3. Limpe cache do navegador

---

## 🎨 Macros Customizados Avançados

### Macro `{% link %}` - Links em Legendas

Permite adicionar links dentro de legendas de imagens.

**Uso:**
```markdown
{% image "path/image.jpg", "Alt text", 50, "Legenda com {% link \"https://example.com\", \"link externo\" %}" %}
```

**Funcionalidades:**
- Suporta aspas escapadas dentro do texto do link
- Funciona dentro de `{% image %}`, `{% image2cols %}` e `{% image3cols %}`
- Pode ser usado standalone fora de legendas

**Exemplo real:**
```markdown
{% image "micro_vant.jpg", "Micro VANT", 50, "Fonte: {% link \"https://nature.com/article\", \"artigo científico\" %}" %}
```

**HTML gerado:**
```html
<p>Fonte: <a href="https://nature.com/article">artigo científico</a></p>
```

---

### Layouts Automáticos: YouTube + Imagem

O sistema detecta automaticamente quando um vídeo do YouTube é seguido por uma imagem e os coloca **lado a lado**.

#### Padrão 1: YouTube + Image (50/50)

**Markdown:**
```markdown
{% youtube "video_id" %}

{% image "path/image.jpg", "Alt", 50, "Legenda" %}
```

**Resultado:** Layout `col-md-6` + `col-md-6` (lado a lado)

#### Padrão 2: YouTube + Image2cols (66/33)

**Markdown:**
```markdown
{% youtube "video_id" %}

{% image2cols "img1.jpg", "Alt 1", "Caption 1", "img2.jpg", "Alt 2", "Caption 2" %}
```

**Resultado:** Layout `col-md-8` (vídeo) + `col-md-4` (2 imagens empilhadas)

#### Como Funciona

O sistema processa em duas etapas:

1. **Detecção automática** (ETAPA 1):
   - Regex detecta padrão `{% youtube %}\n\n{% image %}`
   - Converte para macro intermediário `{% youtube_with_image %}`
   - Preserva todos os parâmetros originais

2. **Renderização** (ETAPA 2):
   - Macro intermediário é processado
   - HTML gerado com layout lado a lado
   - Legendas processadas incluindo `{% link %}`

**Vantagens:**
- ✅ **Markdown limpo:** Mantenha vídeo e imagem separados no `.md`
- ✅ **Layout automático:** Sistema decide o melhor layout
- ✅ **Sem quebras:** Vídeo e imagem sempre juntos na mesma linha
- ✅ **Responsivo:** Funciona em mobile (empilha verticalmente)

#### Quando NÃO usar

Se você **não** quer que vídeo e imagem fiquem lado a lado, adicione conteúdo entre eles:

```markdown
{% youtube "video_id" %}

Algum texto ou parágrafo aqui.

{% image "path/image.jpg", "Alt", 50, "Legenda" %}
```

Ou use `{% hr %}` como separador:

```markdown
{% youtube "video_id" %}

{% hr %}

{% image "path/image.jpg", "Alt", 50, "Legenda" %}
```

---

## 🔄 Changelog - Atualizações Recentes

### v1.1.0 (Dezembro 2024)

**✨ Novas Funcionalidades:**

1. **Macro `{% link %}` em legendas**
   - Adiciona links dentro de captions de imagens
   - Suporta aspas escapadas
   - Funciona em todos os macros de imagem

2. **Layout automático: YouTube + Imagem**
   - Detecta vídeo seguido de imagem
   - Coloca automaticamente lado a lado
   - Dois layouts: 50/50 e 66/33

**🐛 Correções:**

1. Links quebrados em legendas (44 links corrigidos em 8 páginas)
2. Layout de vídeos YouTube (agora ficam lado a lado com imagens)
3. Aspas escapadas em textos de links

**📝 Arquivos modificados:**
- `builder/build.js` - Adicionados macros `youtube_with_image` e `youtube_with_image2cols`
- `builder/README.md` - Documentação atualizada

---

## 📚 Mais Documentação

- [README principal](../README.md) - Visão geral do projeto
- [Documentação de templates](../_source/README.md) - Macros e sintaxe completa

---

**Desenvolvido por:** Lucas Oliveira
**Última atualização:** Dezembro 2024
