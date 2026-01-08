---
title: "Placa Gravadora para ATMEGA328P/8L e ATTINY85"
slug: "placa_zif"
date: "2020-02-24"
date_display: "24 de fevereiro de 2020"
date_display_short: "24/02/2020"
lang: "pt"
type: "post"
description: "A motivação e a solução que encontrei para gravar microcontroladores AVR com mais facilidade."
og_image: "projetos/placa_zif/IMG_0138.png"
featured_image: "projetos/placa_zif/IMG_0138.png"
alternate_url: "../placa_zif.html"
---

## Problema

{% p %}
Recentemente eu fiz uma placa para controlar um motor de passo com um display e alguns botões, e para isso decidi utilizar um ATMEGA328P devido a grande utilização de memória pelas bibliotecas e pela quantidade de portas que precisaria utilizar. Como a placa era para um uso bem específico, não precisaria ter pinos de programação expostos (fossem ICSP ou padrão FTDI), mas os testes que realizei em bancada só me permitiram testar os acionamentos e os testes de torque e velocidade do acionamento do motor só poderiam ser realizados na placa, já com todas as peças montadas.
{% endp %}

{% p %}
A configuração ideal de velocidade do motor demorou demais para ser encontrada, tendo sido necessário retirar o microcontrolador da placa para um Arduino e de volta diversas vezes, ao custo de danificar algum pino ou mesmo o soquete estampado de 28 pinos. Então desde esse dia que eu imaginei a criação da placa shield deste post, para que eu pudesse programar qualquer microcontrolador que eu geralmente uso (podendo ser um ATMEGA328P, ou um ATMEGA8L ou um ATTINY85), sem a necessidade de fazer a ligação dos fios em uma protoboard e sem correr o risco de danificar algo no processo.
{% endp %}

{% image "../projetos/placa_zif/soquete.png", "Soquete estampado DIP de 28 pinos", 40, "Soquete estampado DIP de 28 pinos. Fonte: {% link \"https://www.makerhero.com/produto/soquete-28-pinos-estampado-dip-28/\", \"MakerHero\" %}" %}

## Criando a placa no EAGLE

{% p %}
Para fazer a placa no EAGLE eu utilizei o esquemático do Arduino Uno R3 criado pela [Adafruit](https://www.adafruit.com/) (link para a biblioteca [aqui](https://github.com/adafruit/Adafruit-Eagle-Library)), planejei as conexões necessárias para fazer a programação via ICSP tanto dos ATMEGAs quanto do ATTINY. Expus também as conexões com um cristal, para gravar já na frequência que desejaria utilizar. Adicionei um LED ao pino digital 13 para uma visualização do processo de gravação.
{% endp %}

{% p %}
Já o soquete ZIF (zero insertion force) compatível com o que eu tinha veio da [biblioteca SparkFun-Connectors](https://github.com/sparkfun/SparkFun-Eagle-Libraries), feito pela [SparkFun](https://www.sparkfun.com/).
{% endp %}

{% image3cols "../projetos/placa_zif/esq_zif.png", "Esquemático do soquete ZIF", "Esquemático do soquete ZIF", "../projetos/placa_zif/esq_ard.png", "Esquemático da placa Arduino, com soquete para o cristal", "Esquemático da placa Arduino, com soquete para o cristal", "../projetos/placa_zif/brd_semTerra.png", "Layout da placa", "Layout da placa. GNDs desconectados porque há malha de terra" %}

## Placa pronta

{% p %}
Submeti os arquivos gerados pelo EAGLE para fazer no [ProtoLab](http://protolab.imd.ufrn.br/), o laboratório de prototipagem rápida onde fui bolsista. Entreguei a placa de fibra de face dupla e soldei.
{% endp %}

{% image2cols "../projetos/placa_zif/placa_328.png", "A placa finalizada, com um ATMEGA328P e um cristal de 16MHz", "A placa finalizada, com um ATMEGA328P e um cristal de 16MHz", "../projetos/placa_zif/placa_tiny85.png", "A placa com um ATTINY85", "A placa com um ATTINY85" %}

## Download

{% p %}
Para baixar os arquivos EAGLE, [aqui está um link para o meu repositório do GitHub do projeto](https://github.com/lucaspwo/gravador_isp).
{% endp %}
