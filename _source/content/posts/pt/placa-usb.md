---
title: "Placa USB para Raspberry Pi Zero"
slug: "placa_usb"
date: "2025-12-16"
date_display: "16 de dezembro de 2025"
date_display_short: "16/12/2025"
lang: "pt"
type: "post"
description: "Aqui detalho a placa adaptadora USB que desenvolvi para uso com o Raspberry Pi Zero."
og_image: "projetos/placa_usb/placa.jpg"
featured_image: "projetos/placa_usb/placa.jpg"
alternate_url: "../placa_usb.html"
---

{% p %}
Este post retrata um projeto de protótipo feito sob encomenda para uma empresa, logo, havia uma relação comercial entre as partes envolvidas. Algumas informações sensíveis foram omitidas por razões de confidencialidade.
{% endp %}

{% hr %}

## Problemática do projeto

{% p %}
Me apresentaram ao projeto desse cliente com a proposta de resolver um problema que parecia ser simples: retirar as fotos de uma máquina fotográfica e levá-las para a aplicação móvel feita por eles. Na situação original, o usuário enviava uma mensagem via WhatsApp quando ia iniciar uma sessão de captura de fotos, para registrar o horário, e após o seu expediente, uma pessoa conferia o horário da captura das fotos com a mensagem enviada, para bater a localização registrada pela aplicação com as fotos da máquina.
{% endp %}

{% p %}
Após algumas discussões sobre requisitos e as reais necessidades do protótipo (resumindo para não me estender demais neste post), decidimos utilizar um Raspberry Pi Zero 2 W executando um programa para remover as fotos da câmera via USB, e enviá-las para o celular do usuário utilizando Wi-Fi. Além disso, o Raspberry teria de ser energizado utilizando um powerbank e um pino do GPIO ficaria responsável por ligar e desligar a conexão com a câmera.
{% endp %}

{% image "projetos/placa_usb/raspzero2w.png", "Raspberry Pi Zero 2 W", 50, "Raspberry Pi Zero 2 W. Fonte: {% link \"https://www.raspberrypi.com/products/raspberry-pi-zero-2-w/\", \"RaspberryPi.com\" %}" %}

## Desenvolvimento inicial

{% p %}
Após resolver a parte de código responsável pela detecção, cópia e interação com a aplicação móvel via Wi-Fi junto com a equipe responsável, desenvolvi um cabo com circuitos para chavear o acesso da câmera utilizando peças que tinha em casa: relé, transistor, resistores, cabo USB tipo A macho e um conector USB tipo A fêmea. Logo no início do desenvolvimento, me avisaram que a empresa utilizava câmeras do tipo "super zoom" e, por sorte, consegui com meus pais uma Canon SX40 HS, a mesma que eu havia utilizado anteriormente no meu [drone para fotogrametria aérea](primeiro_drone.html).
{% endp %}

{% image2cols "projetos/placa_usb/sx40hs1.jpg", "Canon SX40 HS", "Canon SX40 HS. Fonte: {% link \"https://www.photoxels.com/canon-sx40-hs-review-trustedreviews/\", \"Photoxels\" %}", "projetos/placa_usb/sx40hs2.jpg", "Canon SX40 HS mostrando alcance máximo da lente", "Canon SX40 HS, mostrando o alcance máximo da lente. Fonte: {% link \"https://www.ephotozine.com/article/canon-powershot-sx40-hs-digital-camera-review-18216\", \"ePHOTOzine\" %}" %}

## Problemas identificados

{% p %}
Logo de cara, identifiquei o primeiro problema: o cabo de dados de qualquer câmera termina em um USB tipo A, e o Raspberry Pi Zero (tanto o modelo original quanto o 2 W) possui apenas uma porta micro USB tipo B para dados. Nos meus testes caseiros, utilizei um adaptador OTG (On The Go) para conectar a câmera, mas precisaria de uma solução mais confiável para o protótipo e produto final.
{% endp %}

{% image2cols "projetos/placa_usb/usbotgcable.jpg", "Cabo USB OTG genérico", "Exemplo de um cabo USB OTG genérico. Não muito confiável. Fonte: {% link \"https://www.amazon.in/FEDUS-Connector-Adapter-Android-Smartphone/dp/B00O1WIZXC\", \"Amazon\" %}", "projetos/placa_usb/usbotgshim.jpg", "Adaptador USB OTG tipo shim", "Exemplo de um adaptador USB OTG tipo shim, mais confiável. O que utilizei. Fonte: {% link \"https://raspberrypi.dk/en/product/micro-usb-otg-to-usb-adapter-shim/\", \"RaspberryPi.dk\" %}" %}

## O Protótipo

{% p %}
Em poucas horas, após perder tempo (infelizmente) com soluções de fabricação de PCB aqui no Brasil, recorri à [JLCPCB](https://jlcpcb.com/) para fabricar a placa. Dessa forma, projetei exatamente o que queria, e o benefício de usar essa plataforma seria ter toda a solução em um só lugar: a plataforma CAD (computer-aided design) online para projetar a placa, a seleção de componentes disponíveis para serem utilizados, a fabricação da placa de circuito impresso e a montagem dos componentes nela.
{% endp %}

{% image3cols "projetos/placa_usb/placa1.jpg", "Vista superior da placa", "Vista superior da placa", "projetos/placa_usb/placa2.jpg", "Vista inferior da placa", "Vista inferior da placa", "projetos/placa_usb/placa3.jpg", "Placa USB conectada ao Raspberry Pi", "Placa USB conectada ao Raspberry Pi" %}
