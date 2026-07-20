# Manutenção — lucaspwo.github.io

> Este documento descreve o estado da branch **`fallback`** (branch em checkout no momento em que este documento foi escrito, 2026-07-19). O repositório tem várias branches divergentes com conteúdo e até arquitetura diferentes — veja [Branches do repositório](#branches-do-repositório) antes de assumir que algo aqui vale para `master` ou outra branch.

## Arquitetura

Nesta branch, o site é **HTML estático puro**, sem gerador de site (não há Jekyll, Hugo, nem qualquer `_config.yml`/Gemfile). Cada página do site é um arquivo `.html` completo e independente na raiz do repo, com a versão em português espelhada em `br/`. Não há includes/partials — o cabeçalho, rodapé e menu de navegação são copiados manualmente em cada página (ver bloco de nav em `index.html:50-54` repetido, com pequenas variações, em todas as outras páginas).

O único "build" real desta branch é de **assets estáticos** (CSS/JS), feito por Gulp: `scss/style.scss` é compilado para `css/style.css`/`css/style.min.css`, e os arquivos em `js/vendor/*.js` são concatenados em `js/scripts.js`/`js/scripts.min.js` (tarefas `sass` e `scripts` em [gulpfile.js](gulpfile.js:22)). Os arquivos `.html` em si **não** passam por nenhum build — são editados à mão.

Isso contrasta fortemente com a branch `master` (default do GitHub), que usa Markdown + Nunjucks (`_source/` + `builder/build.js`) com build automatizado via GitHub Actions. Ver seção de branches abaixo — **é importante entender que as duas arquiteturas coexistem no repo em branches diferentes**, e a que está de fato em produção hoje é esta (`fallback`).

## Mapa de módulos/pastas

| Caminho | Responsabilidade |
|---|---|
| `index.html`, `about.html`, `contact.html` | Páginas institucionais em inglês (raiz do site) |
| `<projeto>.html` (raiz) | Página de post/projeto em inglês (ex.: `gpu_passthrough.html`, `micro_vant.html`, `sigaweb.html`) |
| `br/*.html` | Espelho em português de cada página da raiz (mesmo nome de arquivo) |
| `proj_template.html` | Template para copiar ao criar uma página nova (pt-br, com nav comentada) |
| `projetos/<slug>/` | Imagens usadas pelo post `<slug>.html` (ex.: `projetos/carro_rc/*.jpeg`) |
| `scss/style.scss`, `scss/_custom-settings.scss` | Fonte Sass (tema "Explorer" + overrides) |
| `css/` | CSS compilado (`style.css`/`.min.css`), CSS de terceiros (`css/vendor/`) e `css/custom.css` (overrides manuais, não gerado) |
| `js/main.js`, `js/custom.js` | JS próprio do site (não minificado, editado à mão) |
| `js/vendor/` | Bibliotecas de terceiros (jQuery, Bootstrap, owl.carousel, etc.) concatenadas pelo Gulp |
| `assets/` | Favicons |
| `img/` | Imagens de demonstração do tema original (usadas só por `proj_template.html` e `about.html`) |
| `fonts/` | Fonte de ícones Icomoon |
| `gulpfile.js`, `package.json` | Pipeline de build de CSS/JS (Gulp) |
| `CNAME` | Domínio customizado do GitHub Pages (`lucaspwo.com`) |
| `builder/` | **Não rastreado nesta branch** (só contém `node_modules/` no working tree; `git ls-tree fallback -- builder` não retorna nada) — resíduo de outra branch, não tocar (instrução explícita da tarefa) |
| `docs/superpowers/`, `.superpowers/`, `.claude/`, `.specstory/` | Artefatos locais de ferramentas de IA (Claude Code/SpecStory), não fazem parte do site; `docs/superpowers/` está no `.gitignore` (`.gitignore:3`) |

## Onde ficam as funções-chave

Não há "funções" de aplicação (é HTML+CSS+JS estático de terceiros majoritariamente). As peças de build relevantes são as tasks do Gulp:

- `gulpfile.js:22` — task `scripts`: concatena os JS de `js/vendor/*` (lista completa em `gulpfile.js:24-34`) em `js/scripts.js`, gera versão `.min.js`.
- `gulpfile.js:43` — task `minify-main`: minifica `js/main.js` → `js/main.min.js`.
- `gulpfile.js:54` — task `sass`: compila `scss/style.scss` → `css/style.css` + `css/style.min.css` (autoprefixer, sourcemaps).
- `gulpfile.js:81` — task `merge-styles`: concatena CSS de terceiros (`css/vendor/*`, `fonts/icomoon/style.css`) em `css/styles-merged.css` — é este arquivo que `index.html:11` carrega primeiro.
- `gulpfile.js:110` — task `bs-reload`: recarrega o browser-sync.
- `gulpfile.js:115` — task `browser-sync`: sobe servidor de preview local (`proxy: 'localhost/probootstrap/explorer'` — presume um Apache/nginx local rodando o tema; não funciona out-of-the-box sem esse proxy).
- `gulpfile.js:129` — task `default`: roda `sass` + `scripts` + `browser-sync` e fica assistindo mudanças em `scss/**/*.scss`, `js/main.js` e `*.html`.

## Fluxos de dados

Não há fluxo de dados em runtime (site 100% estático, sem backend, sem API). O único "fluxo" é o de build local:

```
scss/style.scss  --[gulp sass]-->  css/style.css, css/style.min.css
js/vendor/*.js    --[gulp scripts]--> js/scripts.js, js/scripts.min.js
*.html (editado à mão) --[nenhum processamento]--> servido como está pelo GitHub Pages
```

## Receitas de mudança comuns

**Adicionar um novo post/projeto:**
1. Copie `proj_template.html` para `<slug>.html` na raiz (versão EN) e para `br/<slug>.html` (versão PT — adapte o conteúdo, o template já está em pt-br).
2. Crie `projetos/<slug>/` e coloque as imagens do post lá.
3. Edite o conteúdo (`<h2>`, parágrafos, `{% image %}`-style manual `<img>` tags — aqui é HTML puro, não há macros).
4. Adicione um card para o post em `index.html` (bloco de listagem da home, ver padrão em commits recentes como `587bf34`) e o equivalente em `br/index.html`.
5. Se o post deve aparecer no menu principal, adicione `<li><a href="slug.html">Nome</a></li>` no bloco de nav (`index.html:50-54` e equivalente em cada página — **o nav é duplicado em cada arquivo HTML**, não há partial).

**Corrigir/alterar estilo global:**
1. Edite `scss/style.scss` ou `scss/_custom-settings.scss` (variáveis do tema).
2. Rode `npx gulp sass` (ou `npx gulp` para o watch completo) para regenerar `css/style.css`/`.min.css`.
3. Para ajustes pontuais que não devem ir para o Sass do tema, edite `css/custom.css` diretamente (não é gerado, é mantido à mão).

**Adicionar/alterar um script de terceiro:**
1. Coloque o arquivo em `js/vendor/`.
2. Adicione o caminho na lista de `gulpfile.js:24-34` (task `scripts`).
3. Rode `npx gulp scripts`.

## Build / Test / Lint / Deploy

- **Build (CSS/JS):** `npx gulp` (ou tasks individuais — ver seção anterior). Requer `npm install` antes (não há lockfile commitado nesta branch, então as versões resolvidas de `gulp@latest` etc. não são fixas — risco de build não-reprodutível).
- **Build do HTML:** não existe — os `.html` são editados e commitados diretamente.
- **Test:** não há testes nesta branch.
- **Lint:** não há configuração de lint (`.eslintrc`, `.stylelintrc`, etc.) nesta branch.
- **Deploy:** automático via GitHub Pages. **Confirmado ao vivo via `gh api repos/lucaspwo/lucaspwo.github.io/pages`** (consulta feita em 2026-07-19): `source.branch = "fallback"`, `source.path = "/"`, `build_type = "legacy"`, domínio customizado `lucaspwo.com` (HTTPS forçado, certificado válido até 2026-09-29). Ou seja: **qualquer commit dado push para `fallback` vai direto para produção**, sem CI, sem revisão automática, sem build intermediário — o HTML commitado é literalmente o HTML servido.
  - `build_type: "legacy"` significa que o GitHub Pages processa o conteúdo com Jekyll por padrão. Não há `.nojekyll` nesta branch nem pastas/arquivos prefixados com `_` ou `.`, então isso não causa problema hoje — mas se algum dia esta branch ganhar uma pasta `_source/` (como em `master`) ou similar, o Jekyll vai ignorá-la silenciosamente no deploy a menos que `.nojekyll` seja adicionado.
  - Push vai para **dois remotes**: GitHub (`git@github.com:lucaspwo/lucaspwo.github.io.git`) e um mirror GitLab (`ssh://git@gitlab.lab.lucaspwo.com:2222/lucaspwo/lucaspwo.github.io.git`) — ambos configurados como push-URL do único remote `origin` (confirmado com `git remote -v`). `git push` sem argumentos envia para os dois.

## Gotchas e decisões de design

- **A branch default do GitHub (`master`) NÃO é o que está em produção.** `master` roda um pipeline completamente diferente (Markdown + Nunjucks + GitHub Actions, ver `worktree-react-spa`/`master` via `git show master:builder/package.json`), mas o GitHub Pages está configurado para servir a partir de `fallback`. Isso é fácil de descobrir errado só olhando o repo no GitHub (que mostra `master` por padrão) — sempre confira `gh api repos/lucaspwo/lucaspwo.github.io/pages` antes de assumir qual branch é produção.
- **`builder/` no working tree não é a mesma coisa em todas as branches.** Em `fallback` é só um resíduo untracked (`node_modules/`, sem `package.json` no git). Em `master`/`worktree-react-spa`, `builder/` é o gerador de site real (`build.js`, `new-post.js`, etc.), rastreado no git. Não confunda os dois ao navegar pelo working tree — o `builder/` que você vê no disco em `fallback` **não está sob controle de versão nesta branch**.
- **O nav é duplicado em todo arquivo HTML** (sem partial/include). Adicionar/remover um item de menu exige editar todas as páginas manualmente — alto risco de inconsistência (ex.: `pdi.html` existe e é referenciado por `proj_template.html`, mas o link para ele está comentado — página órfã, não acessível pelo menu).
- **`img/` não é resíduo total do tema:** apesar de vir do tema "Explorer" original, `about.html` ainda referencia arquivos de `img/` (não é só usado por `proj_template.html`). Não apagar sem checar.
- **Sem lockfile (`package-lock.json`) commitado** para o `package.json` da raiz — `npm install` pode resolver versões diferentes das que o autor usou originalmente (todas as deps estão como `"latest"` em `package.json:2-15`).

## Dependências e integrações

- **GitHub Pages** — hospedagem e deploy (branch `fallback`, ver seção Deploy acima).
- **Domínio customizado** — `lucaspwo.com` via `CNAME` (raiz do repo, arquivo de 1 linha).
- **GitLab privado** (`gitlab.lab.lucaspwo.com`) — mirror de push, provavelmente parte do homelab pessoal (Scatha) do usuário; não investigado a fundo aqui (fora do escopo desta tarefa).
- **Tema base "Explorer" (uiCookies.com)** — Bootstrap 3, jQuery, Owl Carousel, FlexSlider, Stellar Parallax, Magnific Popup, animate.css, Icomoon — todos vendorizados em `css/vendor/`/`js/vendor/`, créditos completos em [README.txt](README.txt).
- Não há integrações de API, backend, banco de dados, ou serviços externos além dos citados.

## Branches do repositório

Investigado com `git branch -a`, `git worktree list`, `git log --oneline` e `git merge-base` de cada par de branches (2026-07-19). Resumo verificado:

| Branch | Relação | O que é |
|---|---|---|
| `master` | default do `origin` no GitHub | Pipeline **diferente** desta (`fallback`): Markdown + Nunjucks (`_source/`, `builder/build.js`, ver `git show master:builder/package.json`) com build automatizado via `.github/workflows/build.yml` (dispara em push a `master`/`main` tocando `_source/**` ou `builder/**`, roda `npm ci && npm run build` dentro de `builder/`, comita o HTML gerado de volta e "deploya"). Diverge de `fallback` em `eef52b0` (commit comum mais recente). |
| `automation` | `master` + 1 commit (`932a00e "teste de automação"`) | Branch de teste/experimento em cima de `master`, não mesclada em nenhum outro lugar até onde foi possível confirmar. |
| `worktree-react-spa` | `master` + commits adicionais | Contém tudo de `master` mais uma reescrita experimental do front-end em React + TypeScript + Vite (pasta `app/`, ver `app/package.json`, `app/vite.config.ts`). Tem um **git worktree ativo** em `.claude/worktrees/react-spa` (`git worktree list`), ou seja, está fisicamente fora da working tree principal. |
| `ia-llm` | ancestral de `fallback` (e de `post-llms-locais`) | Linha de HTML manual antiga: adicionou o post "Usando IA como Ferramenta de Desenvolvimento" e a página Sigaweb. Totalmente contida em `fallback` (`git merge-base fallback ia-llm` == tip de `ia-llm`) — ou seja, já está mesclada, branch provavelmente obsoleta/histórica. |
| `post-llms-locais` | branch a partir do tip de `ia-llm`; ancestral de `fallback` | Adicionou o post "Aventuras com LLM Local". Também totalmente contida em `fallback` — obsoleta/histórica pelo mesmo motivo. |
| `fallback` (atual) | diverge de `master` em `eef52b0`; contém `ia-llm` e `post-llms-locais` | **Branch em produção hoje** (ver Deploy acima). Continuação da linha de HTML manual, com posts mais recentes (GPU passthrough, patente VANT, etc.) que nunca foram portados para o pipeline Markdown/Nunjucks de `master`. |

**Incerteza declarada:** não há como confirmar com certeza absoluta a *intenção* por trás do nome `fallback` nem por que ele — e não `master` — foi escolhido como source do GitHub Pages. A evidência disponível (histórico de commits + sessões salvas em `.specstory/history/2026-03-16_23-36-59Z-me-ajude-com-o.md`, que mostra um conflito de merge entre a versão gerada pelo pipeline Nunjucks e a versão manual de `fallback` em torno do post Sigaweb) é **consistente** com a hipótese de que `fallback` foi mantida como a branch HTML manual "segura" enquanto o pipeline automatizado (`master`) era desenvolvido/testado em paralelo, e que em algum momento o Pages foi apontado para `fallback` (possivelmente por decisão manual, possivelmente porque o pipeline de `master` nunca chegou a ser promovido a produção). Isso é uma **inferência**, não um fato confirmado — o próprio dono do repo deveria confirmar a intenção real.

## Cobertura desta investigação

- As branches `master`, `automation`, `worktree-react-spa`, `ia-llm`, `post-llms-locais` foram inspecionadas via `git log`/`git show`/`git merge-base` e via os arquivos do worktree ativo (`.claude/worktrees/react-spa`), **sem fazer checkout** (respeitando a instrução de não trocar de branch). O conteúdo de `master`/`worktree-react-spa` documentado aqui é o que se vê no worktree ativo (que está à frente de `master`) e via `git show master:<path>` pontual — não foi feita uma auditoria completa do pipeline `builder/build.js` linha a linha (fora do escopo: esta tarefa documenta `fallback`).
- As 3 branches de dependabot (`origin/dependabot/npm_and_yarn/builder/multi-*`) foram identificadas (bumps de `browser-sync`, `axios`, `send`/`serve-static` dentro de `builder/`, todas em cima do tip de `master`) mas não inspecionadas em detalhe — são PRs abertos relativos ao pipeline de `master`, irrelevantes para o build desta branch (`fallback` nem rastreia `builder/`).
- Não foi feita auditoria de acessibilidade, performance ou SEO das páginas HTML.
- O conteúdo de cada uma das ~15 páginas EN/PT não foi lido integralmente; foi usada uma amostra (`index.html`, `proj_template.html`, `about.html`) para confirmar o padrão estrutural repetido.
