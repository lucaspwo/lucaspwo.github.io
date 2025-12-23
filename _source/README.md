# 📝 Como Criar um Novo Post

Este guia explica como usar o sistema de templates para criar novos posts no site.

## 🚀 Início Rápido

### 1. Criar Arquivos Markdown

Crie dois arquivos (um para cada idioma):
```
_source/content/posts/en/nome-do-post.md
_source/content/posts/pt/nome-do-post.md
```

### 2. Adicionar Front-Matter

No topo de cada arquivo `.md`, adicione os metadados:

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
---
```

### 3. Escrever Conteúdo

Após o front-matter, escreva o conteúdo usando Markdown + macros customizadas.

## 📸 Macros Disponíveis

### ⌨️ Autocomplete no VS Code

O projeto inclui snippets para autocomplete das macros. Basta digitar o prefixo e pressionar `Tab`:

- `p` + Tab → `{% p %}...{% endp %}`
- `hr` + Tab → `{% hr %}`
- `link` + Tab → `{% link "url", "text" %}`
- `image` + Tab → `{% image ... %}`
- `image2cols` + Tab → `{% image2cols ... %}`
- `image3cols` + Tab → `{% image3cols ... %}`
- `gist` + Tab → `{% gist "ID" %}`
- `youtube` + Tab → `{% youtube "ID" %}`

### Parágrafo Justificado

A macro mais comum! Use para todos os parágrafos de texto:

```markdown
{% p %}
Seu texto aqui. Pode incluir [links](url) e formatação Markdown normal.
{% endp %}
```

Gera:
```html
<div class="col-md-12">
  <p class="text-justify">Seu texto aqui...</p>
</div>
```

### Separador Horizontal

```markdown
{% hr %}
```

Gera:
```html
<div class="col-md-12">
  <hr>
</div>
```

### Link (para usar em legendas)

```markdown
{% link "https://exemplo.com", "Texto do link" %}
```

Gera:
```html
<a href="https://exemplo.com">Texto do link</a>
```

**Uso comum:** Dentro de legendas de imagens para evitar HTML inline.

```markdown
{% image "path/img.jpg", "Alt", 50, "Fonte: {% link \"https://site.com\", \"Nome\" %}" %}
```

### Imagem Única Centralizada
```markdown
{% image "projetos/pasta/imagem.jpg", "Texto alternativo", 50, "Legenda opcional" %}
```

**Parâmetros:**
- `"projetos/pasta/imagem.jpg"` - Caminho da imagem
- `"Texto alternativo"` - Alt text para acessibilidade
- `50` - Largura em % (opcional, padrão: 50)
- `"Legenda opcional"` - Caption com HTML permitido

### Duas Imagens Lado a Lado
```markdown
{% image2cols
  "projetos/pasta/img1.jpg", "Alt 1", "Legenda 1",
  "projetos/pasta/img2.jpg", "Alt 2", "Legenda 2"
%}
```

### Três Imagens Lado a Lado
```markdown
{% image3cols
  "projetos/pasta/img1.jpg", "Alt 1", "Legenda 1",
  "projetos/pasta/img2.jpg", "Alt 2", "Legenda 2",
  "projetos/pasta/img3.jpg", "Alt 3", "Legenda 3"
%}
```

### Gist do GitHub
```markdown
{% gist "SEU_GIST_ID" %}
```

### Vídeo do YouTube
```markdown
{% youtube "VIDEO_ID" %}
```

## 💡 Dicas de Formatação

### HTML Dentro do Markdown

Você pode usar HTML quando necessário:

```markdown
<div class="col-md-12">
  <p class="text-justify">Parágrafo com justificação de texto.</p>
</div>
```

### Links nas Legendas

Use a macro `{% link %}` para evitar HTML inline:

```markdown
{% image "path/img.jpg", "Alt", 50, "Fonte: {% link \"URL\", \"Nome\" %}" %}
```

**Importante:** Use `\"` para escapar aspas dentro das legendas.

### Separador Horizontal

```markdown
---
```

## 🔨 Build Local (Opcional - Apenas para Visualização)

Use `npm run build` apenas para **visualizar** localmente antes de publicar:

```bash
cd builder
npm run build
```

Os arquivos HTML serão gerados em:
- `/placa_usb.html` (versão inglês)
- `/br/placa_usb.html` (versão português)
- `/index.html` e `/br/index.html` (páginas iniciais)

**Importante:** Os HTMLs gerados localmente são **ignorados pelo git** (`.gitignore`). Você **não precisa commitá-los**!

## 📤 Publicar

**Workflow simples:**

```bash
# 1. Crie/edite apenas os arquivos .md em _source/content/posts/
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

## 📂 Estrutura de Arquivos

```
_source/
├── content/
│   ├── posts/
│   │   ├── en/           # Posts em inglês
│   │   └── pt/           # Posts em português
│   └── pages/
│       ├── en/           # Páginas estáticas EN
│       └── pt/           # Páginas estáticas PT
├── templates/
│   ├── base.njk          # Template base
│   ├── partials/         # Header, footer, meta
│   ├── layouts/          # Post, page, home
│   └── macros/           # Imagens, vídeos, gists
└── data/
    ├── site-en.json      # Dados globais EN
    └── site-pt.json      # Dados globais PT
```

## ⚙️ Comandos Úteis

### Build
```bash
cd builder
npm run build
```

### Limpar HTMLs gerados
```bash
cd builder
npm run clean
```

### Desenvolvimento com auto-rebuild
```bash
cd builder
npm run dev
```

## ❓ Troubleshooting

### Macro não está sendo processada

Certifique-se de que:
1. A sintaxe está correta (veja exemplos acima)
2. Aspas dentro de legendas estão escapadas: `\"`
3. Não há espaços extras

### Build falha

1. Verifique o front-matter (YAML válido)
2. Rode `npm run build` localmente para ver erros
3. Verifique os logs no GitHub Actions

### Imagens não aparecem

- Caminhos devem ser relativos à raiz: `projetos/pasta/img.jpg`
- NÃO use `./` ou `../` nos paths de imagem

## 📚 Exemplos Completos

Veja os arquivos exemplo em:
- `_source/content/posts/en/placa-usb.md`
- `_source/content/posts/pt/placa-usb.md`

---

## 🎯 Próximos Passos

Depois de dominar a criação de posts, você pode:

1. **Migrar posts antigos** - Converter HTMLs existentes para Markdown
2. **Personalizar templates** - Editar arquivos em `_source/templates/`
3. **Adicionar novas macros** - Modificar `builder/build.js`
4. **Criar páginas estáticas** - Usar `_source/content/pages/`

---

**Documentação criada em:** 21 de dezembro de 2025
