# Lucas' Experiments Lab

Site pessoal com projetos de hardware e software.

## 🚀 Sistema de Templates

Este site utiliza um sistema de templates moderno para facilitar a criação de posts em Markdown, eliminando a necessidade de duplicar HTML.

### Arquitetura

- **Conteúdo**: Markdown com YAML front-matter
- **Templates**: Nunjucks com herança e macros
- **Build**: Node.js (markdown-it + nunjucks)
- **Deploy**: GitHub Actions (automático)
- **Hospedagem**: GitHub Pages (gratuito)

## 📝 Como Criar um Novo Post

### 1. Criar Arquivos Markdown

Crie dois arquivos (um para cada idioma):

```bash
_source/content/posts/en/nome-do-post.md
_source/content/posts/pt/nome-do-post.md
```

### 2. Adicionar Front-Matter

**Inglês (`en/nome-do-post.md`):**
```yaml
---
title: "Post Title"
slug: "nome_do_post"
date: "2025-12-21"
date_display: "December 21, 2025"
date_display_short: "12/21/2025"
lang: "en"
type: "post"
description: "Brief description for SEO"
og_image: "projetos/pasta/imagem.jpg"
featured_image: "projetos/pasta/imagem.jpg"
alternate_url: "br/nome_do_post.html"
---
```

**Português (`pt/nome-do-post.md`):**
```yaml
---
title: "Título do Post"
slug: "nome_do_post"
date: "2025-12-21"
date_display: "21 de dezembro de 2025"
date_display_short: "21/12/2025"
lang: "pt"
type: "post"
description: "Descrição breve para SEO"
og_image: "projetos/pasta/imagem.jpg"
featured_image: "projetos/pasta/imagem.jpg"
alternate_url: "../nome_do_post.html"
index_size: 12  # Opcional: 4, 6, 8 ou 12 (tamanho da imagem no index)
---
```

**Campo `index_size` (opcional):**
- Controla o tamanho da imagem de capa na página inicial
- Valores: `4` (pequeno), `6` (médio/padrão), `8` (grande), `12` (destaque)
- Se omitido, usa padrão `6` (dois posts por linha)
- **Importante:** Planeje para somar exatamente 12 por linha (ex: 6+6, 8+4, 12)
- O build avisa se houver quebras inesperadas no layout

### 3. Escrever Conteúdo com Macros

Use Markdown + macros customizadas. Veja a documentação completa em [_source/README.md](_source/README.md).

**Exemplo básico:**

```markdown
{% p %}
Parágrafo de texto justificado com [link](url) no meio do texto.
{% endp %}

{% hr %}

## Seção

{% image "projetos/pasta/img.jpg", "Alt text", 50, "Legenda com {% link \"https://site.com\", \"fonte\" %}" %}
```

## ⌨️ Autocomplete no VS Code

Snippets disponíveis (digite e pressione Tab):

- `p` → Parágrafo justificado
- `hr` → Separador horizontal
- `link` → Link (para legendas)
- `image` → Imagem única
- `image2cols` → Duas imagens
- `image3cols` → Três imagens
- `gist` → GitHub Gist
- `youtube` → Vídeo YouTube

## 🔨 Build e Deploy

### Build Local (Opcional - Apenas para Visualização)

Use apenas para **visualizar** localmente antes de publicar:

```bash
cd builder
npm install
npm run build
```

Os arquivos HTML são gerados em:
- `/nome_do_post.html` (versão inglês)
- `/br/nome_do_post.html` (versão português)
- `/index.html` e `/br/index.html` (páginas iniciais)

**Importante:** Os HTMLs gerados localmente são ignorados pelo git (`.gitignore`). Você **não precisa** commitá-los!

### Deploy Automático

**Workflow recomendado:**

```bash
# 1. Crie/edite apenas os arquivos .md
# 2. Adicione ao git
git add _source/content/posts/

# 3. Comite e envie
git commit -m "Add new post: Nome do Post"
git push
```

O **GitHub Actions** automaticamente:
1. Executa o build (Markdown → HTML)
2. **Comita os HTMLs gerados no repositório**
3. Faz deploy no GitHub Pages

Aguarde ~2 minutos e o post estará online em https://lucaspwo.com!

**Você nunca precisa commitar arquivos `.html` manualmente!**

## 📂 Estrutura do Projeto

```
lucaspwo.github.io/
├── _source/                      # Código-fonte (templates + content)
│   ├── content/
│   │   ├── posts/
│   │   │   ├── en/              # Posts em inglês (.md)
│   │   │   └── pt/              # Posts em português (.md)
│   │   └── pages/               # Páginas estáticas
│   ├── templates/
│   │   ├── base.njk             # Template base
│   │   ├── layouts/             # Layouts (post, page, home)
│   │   ├── partials/            # Header, footer, meta
│   │   └── macros/              # Macros reutilizáveis
│   ├── data/
│   │   ├── site-en.json         # Dados globais EN
│   │   └── site-pt.json         # Dados globais PT
│   └── README.md                # Documentação detalhada
├── builder/
│   ├── build.js                 # Script de build
│   └── package.json             # Dependências
├── .github/workflows/
│   └── build.yml                # GitHub Actions
├── .vscode/
│   ├── markdown.code-snippets   # Autocomplete
│   └── settings.json            # Syntax highlighting
├── *.html                       # HTMLs gerados (rastreados no git)
├── br/*.html                    # HTMLs PT gerados
├── projetos/                    # Imagens e assets
├── css/, js/, assets/           # Recursos estáticos
└── README.md                    # Este arquivo
```

## 🎯 Macros Disponíveis

| Macro | Uso |
|-------|-----|
| `{% p %}...{% endp %}` | Parágrafo justificado |
| `{% hr %}` | Separador horizontal |
| `{% link "url", "text" %}` | Link (para usar em legendas) |
| `{% image "src", "alt", width, "caption" %}` | Imagem única centralizada |
| `{% image2cols ... %}` | Duas imagens lado a lado |
| `{% image3cols ... %}` | Três imagens lado a lado |
| `{% gist "id" %}` | Embed de Gist GitHub |
| `{% youtube "id" %}` | Embed de vídeo YouTube |

**Documentação completa:** [_source/README.md](_source/README.md)

## ⚙️ Comandos Úteis

```bash
cd builder

# Build manual (gera HTML de todos os arquivos .md)
npm run build

# Criar novo post (cria os arquivos EN e PT com front-matter)
npm run new-post

# Otimizar imagens (reduz tamanho mantendo qualidade)
npm run optimize-images

# Servidor de desenvolvimento (auto-rebuild + live reload)
npm run dev

# Limpar HTMLs gerados
npm run clean
```

### 🎬 Workflow Recomendado

**Para criar um novo post:**

```bash
cd builder

# 1. Criar templates dos arquivos com front-matter
npm run new-post
# Informe: título (EN e PT), slug, descrições

# 2. Editar os arquivos .md criados em:
#    _source/content/posts/en/seu-slug.md
#    _source/content/posts/pt/seu-slug.md

# 3. (Opcional) Otimizar imagens antes de usar
npm run optimize-images

# 4. Testar localmente com live reload
npm run dev
# Acesse http://localhost:3001

# 5. Quando estiver pronto, commit e push
# O GitHub Actions fará o build e deploy automaticamente
```

## 🛠️ Tecnologias

- [Nunjucks](https://mozilla.github.io/nunjucks/) - Template engine
- [markdown-it](https://github.com/markdown-it/markdown-it) - Markdown parser
- [gray-matter](https://github.com/jonschlinkert/gray-matter) - YAML front-matter parser
- [GitHub Actions](https://github.com/features/actions) - CI/CD
- [GitHub Pages](https://pages.github.com/) - Hospedagem

## 📖 Exemplos

Veja posts de exemplo em:
- [_source/content/posts/en/placa-usb.md](_source/content/posts/en/placa-usb.md)
- [_source/content/posts/pt/placa-usb.md](_source/content/posts/pt/placa-usb.md)

## 🔗 Links

- **Site**: https://lucaspwo.com
- **GitHub**: https://github.com/lucaspwo
- **LinkedIn**: https://www.linkedin.com/in/lucaspwo
- **YouTube**: https://www.youtube.com/@lucaspwo

---

**Sistema de templates desenvolvido em:** 21 de dezembro de 2025
