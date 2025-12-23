---
title: "Série Rewind parte 1: Micro VANT (2012-2015)"
slug: "micro_vant"
date: "2024-02-12"
date_display: "12 de fevereiro de 2024"
date_display_short: "12/02/2024"
lang: "pt"
type: "post"
description: "Minha primeira bolsa de iniciação científica na UFRN: um resumo do que realizei ao longo do projeto."
og_image: "projetos/micro_vant/micro_vant.jpg"
featured_image: "projetos/micro_vant/micro_vant.jpg"
alternate_url: "../micro_vant.html"
---

{% p %}
Este é o primeiro de uma série de posts (batizado de Rewind) que compreendem o meu período acadêmico na UFRN entre 2010 e 2021. Neles, vou contar sobre os projetos que estive envolvido durante as bolsas de iniciação científica e de apoio técnico e de pelo menos uma grande experiência que tive, longe de bancadas com equipamentos e programação.
{% endp %}

{% hr %}

## No início...

{% p %}
Comecei a me envolver com o laboratório LAR (Laboratório de Automação e Robótica) antes mesmo deste ser seu nome (era simplesmente chamado de Laboratório de Automação, ou LabAuto como eu chamava) em 2011 como voluntário em um grupo de iniciação científica, onde comecei a aprender conceitos de programação embarcada e desenvolver técnicas de escrita para publicações. Porém, apenas em 2012 que me torno bolsista de IC (iniciação científica) no projeto do Micro VANT (código PVJ8776-2012), onde fui responsável pela programação do piloto automático utilizado (ArduPilot) e, posteriormente, responsável pelo redesenho da placa controladora.
{% endp %}

{% image2cols "../projetos/micro_vant/pic_arduino.jpg", "Iniciei aprendendo a programar em PICs, mas logo descobri os Arduinos", "Iniciei aprendendo a programar em PICs, mas logo descobri os Arduinos.", "../projetos/micro_vant/cientec.jpg", "A equipe do laboratório na Cientec de 2012", "A equipe do laboratório na Cientec de 2012." %}

## Simulações

{% p %}
Inicialmente, como possuíamos apenas uma placa ArduPilot Mega (APM), foi necessário realizar simulações tanto com Software in The Loop (SITL) e Hardware in The Loop (HITL) para compreender seu funcionamento antes dos testes em campo, que poderiam ser catastróficos para a continuidade do projeto. Os testes em SITL haviam se provado muito difíceis de serem realizados com o conhecimento que possuíamos e dada a pouca documentação existente na comunidade online, então direcionamos a atenção ao método HITL, onde obtivemos êxito.
{% endp %}

{% p %}
Eventualmente conseguimos simular um APM em um Arduino Mega (ambos possuíam o mesmo microcontrolador), o que tornou todos os testes muito mais fáceis de serem realizados.
{% endp %}

{% youtube "i7VRD4Ze7EI" %}

{% image "../projetos/micro_vant/simulacao-sem-loop_comp.gif", "Simulação de voo autônomo por waypoints", 50, "Simulação de voo autônomo por waypoints, sem loop após finalização (ao invés, realiza loiter no waypoint \"home\")." %}

## Testes em campo

{% p %}
Em setembro de 2014 conseguimos com sucesso fazer o primeiro voo autônomo com uma asa voadora, conforme pode ser visto no vídeo abaixo. Conseguimos programar corretamente o piloto automático do APM e, após as simulações em laboratório, pudemos enfim testar em campo.
{% endp %}

{% youtube "ERJ4EnVSIlo" %}

{% image2cols "../projetos/micro_vant/rota_planejada.jpg", "A rota programada", "A rota programada (acima) e a realizada (abaixo).", "../projetos/micro_vant/rota_realizada.jpg", "A rota realizada", "A rota programada (acima) e a realizada (abaixo)." %}

{% image "../projetos/micro_vant/asa_voadora.jpg", "A asa voadora utilizada", 50, "A asa voadora utilizada. Fonte: {% link \"https://www.youtube.com/watch?v=yBu7E4S45iM\", \"Canal \\\"Tudo Que se Move!\\\"\" %}" %}

## Micro VANT e conclusão

{% p %}
Porém, para atingir os requerimentos de tamanho, ainda teríamos de reduzir o tamanho do VANT. Fizemos então os protótipos do micro VANT, mas a placa APM era pesada demais para voo estável e algo teria de ser feito para possibilitar o voo autônomo.
{% endp %}

{% youtube "D82D-LxqW0Q" %}

{% image "../projetos/micro_vant/micro_vant.jpg", "O micro VANT confeccionado pela equipe", 50, "O micro VANT confeccionado pela equipe. Fonte: {% link \"https://www.nature.com/articles/s41598-022-17014-4\", \"artigo publicado com os resultados do projeto\" %}" %}

{% p %}
Entre o final de 2014 e 2015 percebemos a necessidade de reduzir o peso para aumentar a duração do voo. Tivemos então a ideia de tentar remover componentes não utilizados na placa APM e, se possível, redesenhá-la para distribuir seu peso mais uniformemente no corpo do drone, pois sabíamos que o projeto da placa APM é open source e criar outra versão dela, exclusiva para o projeto, seria possível. Foram solicitados equipamentos para a confecção das placas (o que acarretou a criação de outro laboratório, o ProtoLab) porém os insumos não chegaram a tempo do fim do prazo do projeto e as placas, que haviam sido parcialmente confeccionadas, já não tinham mais propósito e não foram concluídas.
{% endp %}

{% image "../projetos/micro_vant/apm_micro-vant.jpg", "Layout com as placas em proporção 1:1, relativas à APM", 50, "Layout com as placas em proporção 1:1, relativas à APM." %}

{% image "../projetos/micro_vant/apm_micro-vant-placa1.jpg", "Algumas placas (frente e verso) quando foram confeccionadas, em setembro de 2015", "Algumas placas (frente e verso) quando foram confeccionadas, em setembro de 2015." %}
