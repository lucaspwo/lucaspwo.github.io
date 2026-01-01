---
title: "Processamento Digital de Imagens - Exercício 2.2"
slug: "pdi_e22"
date: "2019-04-13"
date_display: "13 de abril de 2019"
date_display_short: "13/04/2019"
lang: "pt"
type: "post"
description: "Resultados do exercício 2.2 da disciplina de Processamento Digital de Imagens."
og_image: "projetos/pdi_e2.2/resultRegions.png"
featured_image: "projetos/pdi_e2.2/resultRegions.png"
alternate_url: "../pdi_e22.html"
---

{% p %}
Os dois primeiros exercícios, para a disciplina de Processamento Digital de Imagens, consistiam em manipular a matriz de uma imagem de duas formas diferentes: o primeiro inverte os tons de cinza em uma região provida pelo usuário e o segundo troca os quadrantes que compõem a imagem.
{% endp %}

## Regions.cpp

{% p %}
Para o primeiro programa (regions.cpp, [disponível aqui](https://github.com/lucaspwo/pdi/blob/master/exemplo2/regions.cpp)), era necessário coletar do usuário dois pontos da imagem, ou seja: quatro coordenadas. Duas para o ponto 1 e duas para o ponto 2, como se pode ver no trecho abaixo.
{% endp %}

{% gist "3538300db2ec9c3933f888095d2ad781" %}

{% p %}
A partir da leitura, a coordenada X do ponto 1 está armazenada na variável xp1 e a coordenada Y do ponto 1 está armazenada na variável yp1, com o mesmo se repetindo para o ponto 2. A fim de evitar que o programa apresentasse algum problema durante o laço de repetição para pintar a área submetida, com o recebimento de coordenadas do ponto 2 menores que as do ponto 1, escrevi um trecho condicional para trocar os valores das variáveis.
{% endp %}

{% gist "ea7087fe1460996e02d46cd08bd40233" %}

{% p %}
Com isso, os laços for aninhados podem partir do menor para o maior valor, tanto em X quanto em Y e subtrair de 255 o valor do tom de cinza existente em cada pixel da matriz. Segue o código completo:
{% endp %}

{% gist "7e26a3fd7d50b08293d0f6e73e53b1bd" %}

{% image2cols "../projetos/pdi_e2.2/bono.png", "Imagem original", "Imagem original", "../projetos/pdi_e2.2/resultRegions.png", "Imagem após o processamento do código", "Imagem após o processamento do código" %}

## Trocaregioes.cpp

{% p %}
E para o [segundo programa](https://github.com/lucaspwo/pdi/blob/master/exemplo2/trocaregioes.cpp), era necessário que os quadrantes da imagem fossem substituídos diagonalmente. A maior dificuldade aqui foi perceber que existem duas formas diferentes de copiar a matriz de uma imagem, no OpenCV. Uma delas é uma cópia "rasa", quando você atribui outro nome (nesse caso, variável) para a mesma matriz, e outra é a cópia "profunda", que cria matrizes distintas, para variáveis diferentes, através do comando clone(). Após conhecer essa diferença, o restante do código saiu depressa. Fiz uma cópia separada da imagem original (deep copy) e fiz um par de laços para cada quadrante, modificando a variável de saída de acordo com a posição original dos quadrantes, na imagem original. Aqui está código final:
{% endp %}

{% gist "15ad51d9d12c2ed40b7d88ee0ef36bca" %}

{% image2cols "../projetos/pdi_e2.2/bono.png", "A imagem original, a mesma de antes", "A imagem original, a mesma de antes", "../projetos/pdi_e2.2/resultTrocaregioes.png", "A imagem após o processamento do segundo código", "A imagem após o processamento do segundo código" %}
