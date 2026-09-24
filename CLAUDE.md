# CLAUDE.md — lucaspwo.github.io (branch: fallback)

Site pessoal estático (portfólio/blog) hospedado no GitHub Pages, domínio `lucaspwo.com`.

## Comandos essenciais

```bash
npm install         # instala deps do Gulp (sem lockfile commitado nesta branch)
npx gulp             # build completo: sass + scripts + watch (browser-sync)
npx gulp sass        # só recompila scss/style.scss -> css/
npx gulp scripts     # só reconcatena js/vendor/* -> js/scripts.js
python3 -m http.server 8000   # preview local sem build (HTML não precisa de build)
```

Não há testes nem lint configurados nesta branch.

## Gotchas (top 5)

1. **`master` (default do GitHub) não é o que está em produção.** GitHub Pages serve a partir de `fallback` (confirmado ao vivo via `gh api repos/lucaspwo/lucaspwo.github.io/pages` → `source.branch: "fallback"`). `master` roda um pipeline completamente diferente (Markdown + Nunjucks em `_source/`/`builder/`). Não misture os dois ao editar.
2. **Push vai para dois remotes.** `origin` tem duas push-URLs configuradas: GitHub e um mirror GitLab (`gitlab.lab.lucaspwo.com`). `git push` sem argumentos manda para os dois (confirmado com `git remote -v`).
3. **Nav duplicado em cada HTML.** Não há partial/include — mudar o menu exige editar todo arquivo `.html` manualmente. `pdi.html` é um exemplo de página órfã (existe, mas o link para ela está comentado).
4. **`builder/` no disco ≠ `builder/` no git desta branch.** Nesta branch, `builder/` é só `node_modules/` untracked (resíduo de outra branch) — **não editar, não versionar**. Em `master`, `builder/` é o gerador real do site.
5. **Deploy é direto, sem CI — mas o Jekyll do Pages ainda roda e PODE falhar.** `.nojekyll` está na raiz desde 24/09/2026 justamente porque, sem ele, um erro de sintaxe Liquid em qualquer `.md`/`.html` do repo derruba o deploy inteiro sem avisar (foi o que travou o site no snapshot de 12/07 por 2 meses, via um `{% image %}` ilustrativo em `MANUTENCAO.md`). Depois de um push, conferir com `gh run list --repo lucaspwo/lucaspwo.github.io --branch fallback --limit 3`.

## Ponteiros

- Arquitetura e receitas → [MANUTENCAO.md](MANUTENCAO.md)
- Mapa de símbolos e comandos → [AGENTS.md](AGENTS.md)
- Relação entre as branches (`master`, `automation`, `worktree-react-spa`, `ia-llm`, `post-llms-locais`, `fallback`) → [MANUTENCAO.md#branches-do-repositório](MANUTENCAO.md#branches-do-repositório)

## Manutenção destes docs

Se sua mudança invalidar algo citado aqui ou nos docs irmãos — um comando, um
símbolo, uma referência `arquivo:linha`, a estrutura de pastas — corrija a
referência **no mesmo commit**. Não reescreva proativamente o que ainda está
correto. Para um refresh completo, use a skill `/atualizando-docs-manutencao`
(ela verifica cada ref com `git grep`).

## Commit/push

O remote `origin` tem duas push-URLs (GitHub + mirror GitLab pessoal) — `git push` vai para os dois automaticamente (espelhamento multi-remote configurado). Nunca usar `--no-verify`. Como o deploy do GitHub Pages é direto a partir de `fallback` sem CI, revisar o diff com cuidado antes de dar push nesta branch. **E depois do push, conferir que o build do Pages passou** (`gh run list --repo lucaspwo/lucaspwo.github.io --branch fallback --limit 3`) — ver gotcha 5 acima; "sem CI" não é o mesmo que "sem como falhar".
