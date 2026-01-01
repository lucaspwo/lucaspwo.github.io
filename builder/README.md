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
6. Index card title (EN) [empty = use full title]: `New Post` ou deixe em branco
7. Index card title (PT) [empty = use full title]: `Novo Post` ou deixe em branco
8. Index card size - col-md-X (4, 6, 8, 12) [default: 6]: `12` ou deixe em branco

**Resultado:**
- `_source/content/posts/en/my-new-post.md`
- `_source/content/posts/pt/my-new-post.md`

Ambos com front-matter completo, faltando apenas adicionar o conteúdo!

---

### 6. `npm run migrate` - Migrar Posts da Branch Fallback

Script que extrai valores de `index_title` e `index_size` dos HTMLs da branch `fallback` e atualiza automaticamente os arquivos `.md`.

**O que faz:**

- Lê os HTMLs de `index.html` e `br/index.html` da branch `fallback` usando `git show`
- Extrai valores de `index_size` (das classes `col-md-X`) e `index_title` (dos `<h2 class="title-main">`)
- Atualiza front-matter dos arquivos `.md` correspondentes
- Cria backup automático antes das alterações
- Gera relatório JSON com todas as mudanças

**Uso:**
```bash
# Modo dry-run (preview sem modificar arquivos)
node builder/migrate-from-fallback.js --dry-run

# Executar migração real
node builder/migrate-from-fallback.js

# Forçar atualização mesmo se campos já existirem
node builder/migrate-from-fallback.js --force
```

**Saída:**

- Backup criado em: `_source/content/posts.backup/`
- Relatório salvo em: `builder/migration-report.json`
- Console mostra progresso detalhado de cada post

**Quando usar:**

- Após clonar o projeto pela primeira vez
- Ao adicionar novos posts manualmente na branch fallback
- Para sincronizar layouts customizados do fallback para master

---

## 📋 Campos do Front-Matter

### Campos Obrigatórios

Todos os posts e páginas devem ter:

```yaml
---
title: "Título do Post"           # Título completo
slug: "slug-do-post"              # Nome do arquivo HTML (sem .html)
lang: "en"                        # "en" ou "pt"
type: "post"                      # "post" ou "page"
description: "Descrição breve"    # Para meta tags e SEO
date: "2024-12-23"                # Apenas para posts (YYYY-MM-DD)
date_display: "December 23, 2024" # Formato de exibição da data
og_image: "projetos/slug/img.jpg" # Imagem para Open Graph (redes sociais)
featured_image: "projetos/slug/img.jpg" # Imagem de capa
alternate_url: "br/slug.html"     # URL da versão em outro idioma
---
```

### Campos Opcionais

#### `index_title` - Título Encurtado para o Index

Permite exibir um título mais curto nos cards da página inicial, mantendo o título completo na página do post.

**Quando usar:**

- Títulos longos que não cabem bem nos cards
- Séries de posts que precisam de referência rápida
- Posts com subtítulos extensos

**Exemplos:**

```yaml
# Post com título longo
title: "Rewind series part 1: Micro-UAV (2012-2015)"
index_title: "Rewind 1: Micro-UAV"
```

```yaml
# Post com subtítulo extenso
title: "USB Board for Raspberry Pi Zero: A Complete Guide"
index_title: "USB Board for Pi Zero"
```

```yaml
# Post sem index_title (usa o título completo)
title: "My Simple Post"
# (sem index_title - usará "My Simple Post" no index também)
```

**Comportamento:**

- ✅ Se presente: Usa `index_title` nos cards do index
- ✅ Se ausente: Usa `title` nos cards do index
- ✅ Ambas as versões mantêm o `title` completo na página do post

---

#### `index_size` - Tamanho do Card no Index

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
├── build.js                    # Script principal de build
├── new-post.js                 # Criação interativa de posts
├── migrate-from-fallback.js    # Migração de valores da branch fallback
├── optimize-images.js          # Otimização de imagens
├── server.js                   # Servidor de desenvolvimento
├── package.json                # Dependências e scripts npm
├── package-lock.json           # Lock de versões
├── migration-report.json       # Relatório de migração (gerado)
└── README.md                   # Este arquivo

_source/
├── content/
│   ├── posts/
│   │   ├── en/                 # Posts em inglês (.md)
│   │   ├── pt/                 # Posts em português (.md)
│   │   └── posts.backup/       # Backup automático (gerado)
│   └── pages/
│       ├── en/                 # Páginas em inglês (.md)
│       └── pt/                 # Páginas em português (.md)
├── templates/
│   ├── base.njk                # Template base
│   ├── layouts/
│   │   ├── home.njk            # Layout da página inicial
│   │   ├── post.njk            # Layout de posts
│   │   └── page.njk            # Layout de páginas
│   └── partials/
│       ├── header.njk          # Header do site
│       └── footer.njk          # Footer do site
└── data/
    ├── site-en.json            # Configurações do site (EN)
    └── site-pt.json            # Configurações do site (PT)

projetos/                       # Diretório de imagens dos posts
├── micro_vant/
│   ├── image1.jpg
│   ├── image2.jpg
│   └── original/               # Backups originais (gerado)
├── primeiro_drone/
│   └── ...
└── ...

*.html                          # HTML gerado (EN)
br/*.html                       # HTML gerado (PT)
```

---

## 🔧 Dependências

### Produção

- **gray-matter** (^4.0.3) - Parser de YAML front-matter
- **markdown-it** (^14.0.0) - Conversor Markdown → HTML
- **nunjucks** (^3.2.4) - Template engine
- **fs-extra** (^11.2.0) - Operações de arquivo melhoradas
- **glob** (^10.3.10) - Pattern matching de arquivos
- **sharp** (^0.33.2) - Processamento de imagens
- **express** (^4.18.2) - Servidor web
- **chokidar** (^3.5.3) - File watcher para live reload
- **browser-sync** (^2.29.3) - Live reload no navegador
- **js-beautify** (^1.14.11) - Formatação de HTML

### Desenvolvimento

- **nodemon** (^3.0.2) - Auto-restart do servidor

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

## 🎨 Macros Disponíveis

### 1. `{% p %}...{% endp %}` - Parágrafo Justificado

Cria um parágrafo com texto justificado.

**Uso:**
```markdown
{% p %}
Este é um parágrafo longo que será justificado no HTML final.
Textos mais longos ficam melhor visualmente com justificação.
{% endp %}
```

**HTML gerado:**
```html
<div class="col-md-12">
  <p class="text-justify">Este é um parágrafo longo...</p>
</div>
```

---

### 2. `{% hr %}` - Separador Horizontal

Adiciona uma linha horizontal de separação.

**Uso:**
```markdown
{% hr %}
```

**HTML gerado:**
```html
<div class="col-md-12"><hr></div>
```

---

### 3. `{% image %}` - Imagem Individual

Exibe uma imagem centralizada com largura customizável.

**Uso:**
```markdown
{% image "caminho/imagem.jpg", "Texto alternativo", largura, "Legenda opcional" %}
```

**Parâmetros:**

- `caminho/imagem.jpg` - Caminho relativo da imagem
- `"Texto alternativo"` - Alt text para acessibilidade
- `largura` - Porcentagem da largura (número sem %, ex: 50 para 50%)
- `"Legenda opcional"` - Texto exibido abaixo da imagem (pode conter `{% link %}`)

**Exemplo:**
```markdown
{% image "./projetos/drone/foto.jpg", "Meu drone", 75, "Drone construído em 2024" %}
```

---

### 4. `{% image2cols %}` - Duas Imagens Lado a Lado

Exibe duas imagens lado a lado em colunas de 50%/50%.

**Uso:**
```markdown
{% image2cols "img1.jpg", "Alt 1", "Legenda 1", "img2.jpg", "Alt 2", "Legenda 2" %}
```

**Exemplo:**
```markdown
{% image2cols
  "./projetos/projeto/antes.jpg", "Antes", "Situação inicial",
  "./projetos/projeto/depois.jpg", "Depois", "Resultado final"
%}
```

---

### 5. `{% image3cols %}` - Três Imagens Lado a Lado

Exibe três imagens lado a lado em colunas de 33%/33%/33%.

**Uso:**
```markdown
{% image3cols "img1.jpg", "Alt 1", "Legenda 1", "img2.jpg", "Alt 2", "Legenda 2", "img3.jpg", "Alt 3", "Legenda 3" %}
```

---

### 6. `{% youtube %}` - Vídeo do YouTube

Incorpora um vídeo do YouTube com player responsivo.

**Uso:**
```markdown
{% youtube "video_id" %}
```

ou com legenda:

```markdown
{% youtube "video_id", "Texto explicativo do vídeo" %}
```

**Parâmetros:**

- `"video_id"` - ID do vídeo (a parte após `watch?v=` na URL)
- `"Legenda"` (opcional) - Texto exibido abaixo do vídeo (suporta `{% link %}`)

**Exemplos:**
```markdown
# Sem legenda
{% youtube "dQw4w9WgXcQ" %}

# Com legenda
{% youtube "dQw4w9WgXcQ", "Demonstração do projeto funcionando" %}

# Com legenda e link
{% youtube "dQw4w9WgXcQ", "Vídeo do canal {% link \"https://youtube.com/@channel\", \"My Channel\" %}" %}
```

---

### 7. `{% gist %}` - GitHub Gist

Incorpora um GitHub Gist.

**Uso:**
```markdown
{% gist "gist_id" %}
```

---

### 8. `{% link %}` - Links em Legendas

Permite adicionar links dentro de legendas de imagens e vídeos.

**Uso:**
```markdown
{% image "path/image.jpg", "Alt text", 50, "Legenda com {% link \"https://example.com\", \"link externo\" %}" %}
```

**Funcionalidades:**

- Suporta aspas escapadas dentro do texto do link
- Funciona dentro de `{% image %}`, `{% image2cols %}`, `{% image3cols %}` e `{% youtube %}`
- Pode ser usado standalone fora de legendas

**Exemplos:**

```markdown
# Link simples em legenda de imagem
{% image "micro_vant.jpg", "Micro VANT", 50, "Fonte: {% link \"https://nature.com/article\", \"artigo científico\" %}" %}

# Link com aspas no texto (use \\\" para escapar)
{% image "foto.jpg", "Foto", 50, "Canal {% link \"https://youtube.com/c/channel\", \"\\\"Amazing Videos\\\" Channel\" %}" %}

# Link em legenda de vídeo
{% youtube "videoID", "Assista mais em {% link \"https://example.com\", \"nosso site\" %}" %}
```

**HTML gerado:**
```html
<p>Fonte: <a href="https://nature.com/article">artigo científico</a></p>
```

**Nota sobre aspas escapadas:**

Se você precisa usar aspas duplas dentro do texto do link, use `\\\"`:

```markdown
{% link "https://example.com", "O canal \\\"Top Videos\\\" é ótimo" %}
```

Será renderizado como: `O canal "Top Videos" é ótimo`

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

### v2.0.0 (Dezembro 2024) - Preservação de Layout Visual

**✨ Novas Funcionalidades Principais:**

1. **Campo `index_title` - Títulos Encurtados**
   - Permite usar títulos mais curtos nos cards da página inicial
   - Mantém título completo nas páginas dos posts
   - Fallback automático para `title` se não especificado
   - Exemplo: "Rewind 1: Micro-UAV" no index vs "Rewind series part 1: Micro-UAV (2012-2015)" na página

2. **Campo `index_size` - Layout Customizável**
   - Controla tamanho dos cards no index (4, 6, 8, ou 12 colunas)
   - Permite layouts assimétricos e destacados
   - Sistema de validação integrado
   - Compatível com sistema de grid Bootstrap

3. **Script de Migração Automática**
   - `migrate-from-fallback.js` extrai valores da branch fallback
   - Atualiza front-matter automaticamente
   - Cria backups antes das alterações
   - Gera relatório detalhado de mudanças
   - Suporta dry-run para preview

4. **Formatação HTML com js-beautify**
   - HTML gerado agora é indentado e legível
   - Facilita debug e comparação de arquivos
   - Configuração otimizada para estrutura do projeto

5. **Suporte a Legendas em Vídeos YouTube**
   - Macro `{% youtube %}` agora aceita segundo parâmetro de legenda
   - Legendas suportam `{% link %}` para adicionar links
   - Compatível com layouts automáticos

**🔧 Melhorias no Build System:**

1. **Função `processLinks()` aprimorada**
   - Processamento em duas etapas de aspas escapadas
   - Suporta `\\\"` (YAML) → `\"` → `"` (HTML)
   - Resolve problema complexo de multi-level escaping

2. **Suporte a `displayTitle` nos templates**
   - Template `home.njk` usa `displayTitle` ao invés de `title`
   - Permite diferenciação entre título do card e título da página

3. **Exclusão de diretório de backup**
   - Build ignora `_source/content/posts.backup/`
   - Evita processamento duplicado de posts

4. **Prompts aprimorados em `new-post.js`**
   - Novos prompts para `index_title` (EN/PT)
   - Novo prompt para `index_size` com validação
   - Valores padrão inteligentes

**🐛 Correções de Bugs:**

1. **Posts processados duas vezes** (24 ao invés de 14)
   - Glob pattern agora exclui diretório de backup
   - Resolvido em [build.js:linha ~60]

2. **Legendas de YouTube não aparecendo**
   - Regex ETAPA 1 atualizado para capturar caption opcional
   - Macro `youtube_with_image2cols` agora aceita caption
   - Resolvido em [build.js:linhas ~150-170]

3. **Aspas escapadas renderizando como `\"`**
   - Implementado processamento em dois níveis: `\\"` → `"`
   - Função `processLinks()` usa split/join ao invés de regex
   - Resolvido em [build.js:função processLinks]

4. **Caminhos de imagem sem `./` prefix**
   - Corrigido em [micro_vant.md:linha 75]
   - Validação adicionada ao build

5. **Migration script não encontrando arquivos**
   - Busca por slug no front-matter ao invés de filename
   - Resolve discrepâncias entre nomes (ex: placa_usb vs placa-usb.md)

**📝 Arquivos Criados/Modificados:**

**Novos:**

- `builder/migrate-from-fallback.js` - Script de migração automática
- `builder/migration-report.json` - Relatório de migração (gerado)
- `_source/content/posts.backup/` - Backup dos posts (gerado)

**Modificados:**

- `builder/build.js`:
  - Função `formatHTML()` com js-beautify
  - Função `processLinks()` com processamento de escape em 2 níveis
  - Macro `{% youtube %}` com suporte a caption
  - Macros intermediários `youtube_with_image` e `youtube_with_image2cols`
  - Suporte a `displayTitle` no `generateIndex()`
  - Exclusão do diretório backup no glob

- `builder/new-post.js`:
  - Prompts para `index_title` (EN/PT)
  - Prompt para `index_size` com validação
  - Inclusão condicional dos campos no front-matter

- `builder/package.json`:
  - Adicionada dependência `js-beautify: ^1.14.11`

- `_source/templates/layouts/home.njk`:
  - Linha 17: `{{ post.displayTitle }}` ao invés de `{{ post.title }}`

- `_source/content/posts/en/micro_vant.md`:
  - Adicionados campos `index_title` e `index_size`
  - Corrigido caminho de imagem (./projetos/...)
  - Adicionada legenda ao vídeo YouTube

- `_source/content/posts/pt/micro_vant.md`:
  - Mesmas correções da versão EN

- Todos os outros posts (EN/PT):
  - Adicionados campos `index_title` e `index_size` via migração

**📚 Documentação:**

- `builder/README.md` - Documentação completamente atualizada:
  - Seção de Campos do Front-Matter com `index_title` e `index_size`
  - Documentação completa do script de migração
  - Exemplos práticos de todos os macros
  - Guia de uso de aspas escapadas
  - Guia de layouts automáticos YouTube + Imagem
  - Changelog detalhado

**🔗 Compatibilidade:**

- ✅ 100% compatível com posts existentes (campos opcionais)
- ✅ Fallback automático para valores padrão
- ✅ Build anterior continua funcionando sem modificações
- ✅ GitHub Actions workflow não requer alterações

**📊 Estatísticas:**

- 10 posts migrados automaticamente
- 2 idiomas suportados (EN/PT)
- 5 novos campos no front-matter (opcionais)
- 1 novo script de migração
- 1 nova dependência (js-beautify)

---

### v1.1.0 (Dezembro 2024) - Macros e Links

**✨ Funcionalidades:**

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

---

## 📚 Mais Documentação

- [README principal](../README.md) - Visão geral do projeto
- [Documentação de templates](../_source/README.md) - Macros e sintaxe completa

---

**Desenvolvido por:** Lucas Oliveira
**Última atualização:** Dezembro 2024
