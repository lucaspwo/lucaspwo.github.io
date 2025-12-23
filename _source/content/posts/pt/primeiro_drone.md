---
title: "Série Rewind parte 2: Primeiro Drone"
slug: "primeiro_drone"
date: "2024-02-20"
date_display: "20 de fevereiro de 2024"
date_display_short: "20/02/2024"
lang: "pt"
type: "post"
description: "Sobre o primeiro drone que tive: as motivações e as peças utilizadas."
og_image: "projetos/primeiro_drone/drone_montado.jpg"
featured_image: "projetos/primeiro_drone/drone_montado.jpg"
alternate_url: "../primeiro_drone.html"
---

{% p %}
Este post é uma sequência direta da série iniciada no post anterior, [clique aqui para acessar](micro_vant.html) caso ainda não tenha lido.
{% endp %}

{% hr %}

## Motivação

{% p %}
Durante o período da minha primeira bolsa de iniciação científica eu aprendi bastante sobre configuração de drones e, também nesse período, recebi uma proposta de um professor da universidade para participar de um potencial projeto de aerofotogrametria com drones. Como eu já queria um motivo para montar o meu drone, eu vi nisto uma oportunidade de não somente montar e ter, mas também dar um uso prático e participar de outro projeto, contribuindo com uma experiência que eu já estava desenvolvendo e possuía conhecimento.
{% endp %}

{% p %}
Em 2014 a marca DJI já existia e tinha acabado de lançar o primeiro drone Phantom, mas era algo muito recente no mercado mundial e não existiam representantes oficiais em terras brasileiras, portanto, cada drone existente no Brasil era proveniente de importação própria, seja pré-montado ou desmontado (ambos com peças de prateleira). A única outra marca a vender modelos montados com peças próprias, no estilo "ready to fly" como a DJI fazia era a 3DR.
{% endp %}

{% image2cols "projetos/primeiro_drone/dji_phantom.webp", "O primeiro drone da série de maior sucesso da DJI", "O primeiro drone da série de maior sucesso da DJI. Fonte: {% link \"https://9to5toys.com/2015/01/08/dji-phantom-quadcopter-deal/\", \"9To5Toys\" %}", "projetos/primeiro_drone/3dririsplus.webp", "O primeiro drone da 3D Robotics, o Iris+", "O primeiro drone da 3D Robotics, o Iris+. Fonte: {% link \"https://www.droneuniversities.com/drones/drone-reviews/the-3d-robotics-iris/\", \"Drone Universities\" %}" %}

## Peças

{% p %}
No meu caso, adquiri as peças pelo AliExpress (peças mecânicas e eletrônicas) e montei em casa, conforme chegavam. Como os modelos mais comuns na internet eram de drones quadricópteros, decidi montar um também (algo diferente dos demais iria acarretar mais tempo de pesquisa para configurar), e sendo um drone para tirar fotos aéreas, teria de ser capaz de decolar com uma máquina fotográfica.
{% endp %}

{% p %}
As peças escolhidas foram: frame tipo MWC Alien com braços F450, rádio controle Turnigy 9X, controladora APM 2.5, bateria Turnigy 3C 2.200 mAh 11,1 V, motores sem escovas tipo outrunner de 800 KV e dimensões 2212, ESCs SimonK de 30 A, hélices 1150x2 (hélices de duas pás, 11" de diâmetro e 5" de ângulo de ataque), módulo de energia para a APM e trens de pouso longos para possibilitar o encaixe da câmera por baixo do drone.
{% endp %}

{% image3cols "projetos/primeiro_drone/drone_corpo.webp", "Corpo do drone: um MWC Alien", "Corpo do drone: um MWC Alien. Fonte: {% link \"https://www.aliexpress.com/\", \"AliExpress\" %}", "projetos/primeiro_drone/controle.jpg", "Rádio Turnigy 9X", "Rádio Turnigy 9X. Fonte: {% link \"https://www.fabmodelismo.com.br/produto/aeromodelismo/simuladores/7150-radio-turnigy-9x-v2-9chreceptor-top-aero-heli-drone\", \"FAB Modelismo\" %}", "projetos/primeiro_drone/motor.webp", "Motor outrunner de 800 KV", "Motor outrunner de 800 KV. Fonte: {% link \"https://www.aliexpress.com/\", \"AliExpress\" %}" %}

{% image3cols "projetos/primeiro_drone/apm.webp", "APM 2.6 e GPS", "APM 2.6 e GPS. Fonte: {% link \"https://www.aliexpress.com/\", \"AliExpress\" %}", "projetos/primeiro_drone/bateria.webp", "Bateria de três células da Turnigy", "Bateria de três células da Turnigy. Fonte: {% link \"https://www.mercadolivre.com.br/\", \"Mercado Livre\" %}", "projetos/primeiro_drone/esc.webp", "ESC de 30 A com firmware SimonK", "ESC de 30 A com firmware SimonK. Fonte: {% link \"https://www.aliexpress.com/\", \"AliExpress\" %}" %}

{% image3cols "projetos/primeiro_drone/helices.webp", "Hélice de ABS 1150x2", "Hélice de ABS 1150x2. Fonte: {% link \"https://www.aliexpress.com/\", \"AliExpress\" %}", "projetos/primeiro_drone/power_module.webp", "Módulo de energia para APM", "Módulo de energia para APM. Fonte: {% link \"https://www.aliexpress.com/\", \"AliExpress\" %}", "projetos/primeiro_drone/trem_de_pouso.webp", "Trens de pouso fixos", "Trens de pouso fixos. Fonte: {% link \"https://www.aliexpress.com/\", \"AliExpress\" %}" %}

{% p %}
A motivação pela escolha de motores pouco giradores (número KV baixo) era exatamente o que se obtém em troca: mais torque. O que, pela teoria, iria bem com as hélices longas e de grande ângulo de ataque.
{% endp %}

## Porém...

{% p %}
Cheguei a fazer testes de controle remoto com a máquina fotográfica dos meus pais, uma Canon SX40 HS com firmware modificado ([firmware CHDK](https://chdk.fandom.com/wiki/CHDK)), porém como o projeto na universidade não foi aprovado, interrompi os gastos com o drone. No final, fiquei com um drone muito potente para um uso sem payload pesado e sem grandes motivações para utilizá-lo.
{% endp %}

{% image "projetos/primeiro_drone/drone_montado.jpg", "O drone finalizado", 50, "O drone finalizado." %}

{% youtube "6EWRQZaAxbg" %}
