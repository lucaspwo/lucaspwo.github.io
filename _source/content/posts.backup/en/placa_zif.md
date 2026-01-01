---
title: "Burner Shield for ATMEGA328P/8L and ATTINY85"
slug: "placa_zif"
date: "2020-02-24"
date_display: "February 24, 2020"
date_display_short: "02/24/2020"
lang: "en"
type: "post"
description: "The motivation and solution I found to burn AVR microcontrollers more easily."
og_image: "projetos/placa_zif/IMG_0138.png"
featured_image: "projetos/placa_zif/IMG_0138.png"
alternate_url: "br/placa_zif.html"
---

## The problem

{% p %}
Recently I made a PCB to control a step motor with a liquid crystal display and some buttons, and for that I decided to utilize an ATMEGA328P because of the large usage of memory by the libraries and because of the quantity of pins I'd need to use. Since the PCB was conceived for a very specific use, it wouldn't need the programming pins exposed (be it ICSP or the FTDI pattern), but the tests I made in the bench would only allow me to test the steps it was programmed to follow and the tests of torque and actuation speed could only be made in the PCB, with all the pieces installed.
{% endp %}

{% p %}
The ideal motor speed configuration took too long to be found, having been necessary to remove the microcontroller off the PCB to an Arduino and back again too many times, at the cost of damaging a pin or even the 28 pin socket. So since that day I imagined the shield board of this post, for me to be able to program any microcontroller I usually use (an ATMEGA328P, or ATMEGA8L or an ATTINY85), without the need to make the connections in a protoboard and without the risk of damaging something in the process.
{% endp %}

{% image "projetos/placa_zif/soquete.png", "28 pin DIP socket", 40, "28 pin DIP socket. Source: {% link \"https://www.makerhero.com/produto/soquete-28-pinos-estampado-dip-28/\", \"MakerHero\" %}" %}

## Making the PCB in EAGLE

{% p %}
To make the PCB in EAGLE I used the Arduino Uno R3 schematic made by [Adafruit](https://www.adafruit.com/) ([here's](https://github.com/adafruit/Adafruit-Eagle-Library) the link for the library), I planned the necessary connections to make the programming via ICSP, on both the ATMEGAs and ATTINY. I also exposed the crystal connections, in order to burn the code already at the frequency I'd want to utilize. I added an LED to the digital pin 13 to visualize the programming process.
{% endp %}

{% p %}
The ZIF (zero insertion force) socket compatible with what I had come from the [SparkFun-Connectors library](https://github.com/sparkfun/SparkFun-Eagle-Libraries), made by [SparkFun](https://www.sparkfun.com/).
{% endp %}

{% image3cols "projetos/placa_zif/esq_zif.png", "ZIF socket schematic", "ZIF socket schematic", "projetos/placa_zif/esq_ard.png", "Arduino board schematic with a socket for the crystal", "Arduino board schematic with a socket for the crystal", "projetos/placa_zif/brd_semTerra.png", "Board layout", "Board layout. The GNDs are disconnected because there is a ground plane" %}

## PCB ready

{% p %}
I submitted the EAGLE-generated files to the [ProtoLab](http://protolab.imd.ufrn.br/) website, a fast prototyping laboratory where I once had a scholarship. I gave them the dual layer fiber board and I soldered everything to it afterward.
{% endp %}

{% image2cols "projetos/placa_zif/placa_328.png", "The finished PCB, with an ATMEGA328P and a 16MHz crystal", "The finished PCB, with an ATMEGA328P and a 16MHz crystal", "projetos/placa_zif/placa_tiny85.png", "The board with an ATTINY85", "The board with an ATTINY85" %}

## Download

{% p %}
To download the EAGLE files, [here is a link to my GitHub repository](https://github.com/lucaspwo/gravador_isp).
{% endp %}
