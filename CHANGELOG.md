# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/).

---

## [1.1.0] - 2024-12-22

### ✨ Adicionado

#### 1. Macro `{% link %}` para Links em Legendas

Novo macro que permite adicionar links clicáveis dentro de legendas de imagens.

**Sintaxe:**
```markdown
{% link "URL", "texto do link" %}
```

**Exemplo de uso:**
```markdown
{% image "foto.jpg", "Descrição", 50, "Fonte: {% link \"https://example.com\", \"site oficial\" %}" %}
```

**Onde funciona:**
- Dentro de legendas do `{% image %}`
- Dentro de legendas do `{% image2cols %}`
- Dentro de legendas do `{% image3cols %}`
- Standalone (fora de imagens)

**Características técnicas:**
- Suporta aspas escapadas (`\"`) dentro do texto do link
- Processa corretamente caracteres especiais
- Mantém formatação do texto

---

#### 2. Layouts Automáticos: YouTube + Imagem Lado a Lado

Sistema inteligente que detecta automaticamente quando um vídeo do YouTube é seguido por uma imagem e os renderiza lado a lado.

**Padrão detectado automaticamente:**

**Opção 1: Layout 50/50 (col-md-6 + col-md-6)**
```markdown
{% youtube "video_id" %}

{% image "path/image.jpg", "Alt", 50, "Legenda" %}
```
→ Vídeo e imagem lado a lado em proporções iguais

**Opção 2: Layout 66/33 (col-md-8 + col-md-4)**
```markdown
{% youtube "video_id" %}

{% image2cols "img1.jpg", "Alt1", "Cap1", "img2.jpg", "Alt2", "Cap2" %}
```
→ Vídeo maior à esquerda, duas imagens empilhadas à direita

**Como funciona internamente:**

1. **Detecção (Fase 1):**
   - Regex identifica padrão `{% youtube %}\n\n{% image %}`
   - Converte para macro intermediário: `{% youtube_with_image %}`

2. **Renderização (Fase 2):**
   - Processa macro intermediário
   - Gera HTML com grid Bootstrap
   - Processa legendas (incluindo `{% link %}`)

**Vantagens:**
- ✅ Markdown permanece limpo e semântico
- ✅ Layout responsivo (mobile empilha verticalmente)
- ✅ Vídeo e imagem sempre alinhados
- ✅ Legendas com links funcionam perfeitamente

**Para desabilitar o comportamento automático:**

Adicione qualquer conteúdo entre o vídeo e a imagem:

```markdown
{% youtube "video_id" %}

Algum texto explicativo.

{% image "path/image.jpg", "Alt", 50, "Legenda" %}
```

---

### 🐛 Corrigido

#### 1. Links Quebrados em Legendas de Imagens

**Problema:**
Macros `{% link %}` dentro de legendas não eram processados, aparecendo como texto literal no HTML final.

**Exemplo do bug:**
```html
<!-- ANTES (incorreto) -->
<p>Fonte: {% link "https://example.com", "site" %}</p>

<!-- DEPOIS (correto) -->
<p>Fonte: <a href="https://example.com">site</a></p>
```

**Impacto:** 44 links corrigidos em 8 páginas (PT e EN)

**Páginas afetadas:**
- `micro_vant.html` (PT/EN) - 2 links cada
- `placa_usb.html` (PT/EN) - 5 links cada
- `placa_zif.html` (PT/EN) - 1 link cada
- `primeiro_drone.html` (PT/EN) - 14 links cada

**Solução técnica:**
- Criada função auxiliar `processLinks()` em `build.js`
- Processa links com aspas escapadas antes de renderizar HTML
- Aplica processamento em todos os macros de imagem

---

#### 2. Layout de Vídeos YouTube

**Problema:**
Vídeos do YouTube e imagens relacionadas apareciam um embaixo do outro, desperdiçando espaço horizontal.

**Exemplo - ANTES:**
```
┌──────────────────────────────┐
│   [Vídeo YouTube]            │ ← col-md-8 (espaço vazio à direita)
└──────────────────────────────┘
┌──────────────────────────────┐
│   [Imagem]                   │ ← col-md-12 (nova linha)
└──────────────────────────────┘
```

**Exemplo - DEPOIS:**
```
┌────────────────┬─────────────┐
│ [Vídeo YouTube]│  [Imagem]   │ ← col-md-6 + col-md-6
└────────────────┴─────────────┘
```

**Impacto:**
- 3 seções corrigidas em `micro_vant.html` (PT/EN)
- Layout agora idêntico ao HTML manual anterior
- Melhor aproveitamento do espaço
- Experiência visual aprimorada

---

#### 3. Aspas Escapadas em Textos de Links

**Problema:**
Aspas duplas dentro do texto de links não eram processadas corretamente.

**Exemplo:**
```markdown
Canal \"Tudo Que se Move!\"
```

**Antes:**
```html
Canal \\"Tudo Que se Move!\\"
```

**Depois:**
```html
Canal "Tudo Que se Move!"
```

**Solução:**
- Regex atualizado para capturar aspas escapadas: `((?:[^"\\]|\\.)*?)`
- Processamento em duas etapas: links primeiro, depois escapes restantes

---

### 🔧 Modificações Técnicas

**Arquivos alterados:**

1. **`builder/build.js`**
   - Linhas 49-63: Nova função `processLinks(text)`
   - Linhas 65-82: Detecção automática de padrões YouTube+Image
   - Linhas 123-132: Processador `youtube_with_image` (layout 50/50)
   - Linhas 134-143: Processador `youtube_with_image2cols` (layout 66/33)
   - Linhas 87-91: Chamada `processLinks()` em `{% image %}`
   - Linhas 97-101: Chamada `processLinks()` em `{% image2cols %}`
   - Linhas 107-111: Chamada `processLinks()` em `{% image3cols %}`

2. **`builder/README.md`**
   - Seção "Macros Customizados Avançados" adicionada
   - Documentação do macro `{% link %}`
   - Documentação de layouts automáticos YouTube+Image
   - Seção Changelog adicionada

3. **`CHANGELOG.md`**
   - Arquivo criado (este documento)

---

### 📊 Estatísticas

**Mudanças no código:**
- Arquivos modificados: 3
- Linhas adicionadas: ~150
- Funções novas: 3 (processLinks, youtube_with_image, youtube_with_image2cols)

**Impacto no site:**
- Páginas corrigidas: 8
- Links corrigidos: 44
- Layouts aprimorados: 6 seções de vídeos

---

## [1.0.0] - 2024-12-15

### ✨ Adicionado

- Sistema de build automatizado com Markdown + Nunjucks
- Macros customizados: `{% image %}`, `{% image2cols %}`, `{% image3cols %}`
- Macro `{% youtube %}` para vídeos
- Macro `{% gist %}` para GitHub Gists
- Macros `{% p %}` e `{% hr %}` para formatação
- Scripts npm: `build`, `new-post`, `optimize-images`, `dev`
- Servidor de desenvolvimento com live reload
- Validação automática de front-matter
- Suporte bilíngue (PT/EN)
- Geração automática de índices
- Sistema de otimização de imagens
- GitHub Actions para deploy automático

### 🔧 Estrutura Inicial

- `_source/content/posts/` - Posts em Markdown
- `_source/templates/` - Templates Nunjucks
- `_source/data/` - Configurações do site
- `builder/` - Scripts de automação

---

**Formato de versionamento:** [MAJOR.MINOR.PATCH]
- **MAJOR:** Mudanças incompatíveis com versões anteriores
- **MINOR:** Novas funcionalidades compatíveis
- **PATCH:** Correções de bugs compatíveis
