# lucaspwo.github.io — Lucas' Experiments Lab

Personal portfolio/blog at [lucaspwo.com](https://lucaspwo.com), listing Lucas Oliveira's hardware and software side projects (RC vehicles, drones, embedded boards, homelab, local LLMs, etc.), in English (site root) and Portuguese (`br/`).

> **Branch note:** this file describes the **`fallback`** branch. The repo has several diverged branches (see [MANUTENCAO.md](MANUTENCAO.md#branches-do-repositório) for the full picture); GitHub's default branch is `master`, which runs a different, more automated build pipeline. As of this writing, **GitHub Pages actually serves production from `fallback`** (verified via `gh api repos/lucaspwo/lucaspwo.github.io/pages` → `source.branch: "fallback"`), so this hand-edited static site — not master's pipeline — is what's live at lucaspwo.com.

## Stack / Requisitos

- Plain static HTML/CSS/JS — no site generator, no Jekyll, no Hugo (verified: no `_config.yml`, no Gemfile, no `.nojekyll` in this branch).
- Base theme: "Explorer" by uiCookies.com (Bootstrap 3 + jQuery), see [README.txt](README.txt) for full third-party credits.
- Build tooling (optional, only needed to regenerate `css/` and `js/`): [Gulp](https://gulpjs.com/) 3-style tasks in [gulpfile.js](gulpfile.js), Sass (`gulp-sass`), `browser-sync` for local reload.
- Node.js (any version compatible with `gulp@latest`/`gulp-sass@latest` as pinned in [package.json](package.json)) — no lockfile is committed, so exact resolved versions aren't pinned.
- No test framework, no linter config on this branch.

## Instalação

```bash
git clone git@github.com:lucaspwo/lucaspwo.github.io.git
cd lucaspwo.github.io
git checkout fallback   # this is the branch actually served by GitHub Pages
npm install              # only needed if you intend to rebuild css/js via gulp
```

## Como rodar

You do **not** need a build step to preview the site — it's plain HTML/CSS/JS, open any `*.html` file directly or serve the repo root with any static file server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000/index.html
```

To edit styles/scripts and rebuild (`scss/` → `css/`, `js/vendor/*` → `js/scripts.js`):

```bash
npx gulp          # runs the 'default' task: sass + scripts + browser-sync watch
```

There is no `npm run <script>` shortcut — [package.json](package.json:1) only lists `devDependencies`, the gulp tasks are invoked by name (`npx gulp sass`, `npx gulp scripts`, ...). See [gulpfile.js](gulpfile.js) for all task definitions.

## Estrutura de pastas

```
.
├── index.html, about.html, contact.html   # EN pages (site root)
├── <projeto>.html                          # EN project/post pages (e.g. gpu_passthrough.html)
├── proj_template.html                      # copy-paste starting point for a new post
├── br/                                     # PT-BR mirror of every root page (br/index.html, br/<projeto>.html, ...)
├── projetos/<slug>/                        # images used by each project's post (one folder per project)
├── css/, scss/                             # compiled CSS + Sass sources (scss/style.scss is the entry point)
├── js/                                     # vendor scripts + custom.js + main.js, concatenated by gulp
├── assets/                                 # favicons
├── img/                                    # leftover demo images from the original theme (used by proj_template.html/about.html)
├── fonts/                                  # icon font (Icomoon)
├── gulpfile.js, package.json               # Gulp build pipeline (Sass + JS concat/minify)
├── CNAME                                   # custom domain (lucaspwo.com) for GitHub Pages
├── builder/                                # untracked leftover (node_modules only) — NOT part of this branch's git history, see MANUTENCAO.md
├── README.txt                              # original theme credits (uiCookies "Explorer")
└── .specstory/                             # local AI pair-programming session logs (not part of the site)
```

## Documentação relacionada

- [MANUTENCAO.md](MANUTENCAO.md) — guia de manutenção (humano)
- [AGENTS.md](AGENTS.md) — instruções para agentes/LLM
- [CLAUDE.md](CLAUDE.md) — notas para Claude Code
