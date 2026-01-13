---
title: "Rewind series part 2: First Drone"
slug: "primeiro_drone"
date: "2024-02-20"
date_display: "February 20, 2024"
date_display_short: "02/20/2024"
lang: "en"
type: "post"
description: "About the first drone I had: motivations and parts used."
og_image: "projetos/primeiro_drone/drone_montado.jpg"
featured_image: "projetos/primeiro_drone/drone_montado.jpg"
alternate_url: "br/primeiro_drone.html"
---

{% p %}
This post is a direct continuation of the series started in the previous post, [click here to access it](micro_vant.html) if you haven't read it yet.
{% endp %}

{% hr %}

## Motivation

{% p %}
During my first scientific initiation scholarship period, I learned a lot about drone configuration, and during this time, I received a proposal from a university professor to participate in a potential drone-based aerial photogrammetry project. Since I was already looking for a reason to build my own drone, I saw this as an opportunity not only to build and own one but also to give it a practical use and participate in another project, contributing with an experience I was already developing and had knowledge about.
{% endp %}

{% p %}
In 2014, the DJI brand already existed and had just launched the first Phantom drone, but it was very recent in the global market, and there were no official representatives in Brazil. Therefore, each drone existing in Brazil was from personal importation, either pre-assembled or disassembled (both with off the shelf parts). The only other brand selling pre-assembled models with their own parts, in a "ready to fly" style like DJI did, was 3DR.
{% endp %}

{% image2cols "projetos/primeiro_drone/dji_phantom.webp", "The first drone in DJI's highly successful series", "The first drone in DJI's highly successful series. Source: {% link \"https://9to5toys.com/2015/01/08/dji-phantom-quadcopter-deal/\", \"9To5Toys\" %}", "projetos/primeiro_drone/3dririsplus.webp", "The first drone from 3D Robotics, the Iris+", "The first drone from 3D Robotics, the Iris+. Source: {% link \"https://www.droneuniversities.com/drones/drone-reviews/the-3d-robotics-iris/\", \"Drone Universities\" %}" %}

## The Parts

{% p %}
In my case, I acquired the parts from AliExpress (mechanical and electronic parts) and assembled them at home as they arrived. Since the most common models on the internet were quadcopter drones, I decided to build one as well (something different would require more research time to configure), and being a drone for taking aerial photos, it had to be able to take off with a camera.
{% endp %}

{% p %}
The chosen parts were: MWC Alien-type frame with F450 arms, Turnigy 9X radio control, APM 2.5 controller, Turnigy 3C 2,200 mAh 11.1V battery, 800 KV brushless outrunner motors with 2212 dimensions, 30 A SimonK ESCs, 1150x2 propellers (two-blade propellers, 11" in diameter, and 5" in pitch), power module for the APM, and long landing gear to allow mounting the camera underneath the drone.
{% endp %}

{% image3cols "projetos/primeiro_drone/drone_corpo.webp", "Drone frame: an MWC Alien", "Drone frame: an MWC Alien. Source: {% link \"https://www.aliexpress.com/\", \"AliExpress\" %}", "projetos/primeiro_drone/controle.jpg", "Turnigy 9X radio", "Turnigy 9X radio. Source: {% link \"https://www.fabmodelismo.com.br/produto/aeromodelismo/simuladores/7150-radio-turnigy-9x-v2-9chreceptor-top-aero-heli-drone\", \"FAB Modelismo\" %}", "projetos/primeiro_drone/motor.webp", "800 KV outrunner motors", "800 KV outrunner motors. Source: {% link \"https://www.aliexpress.com/\", \"AliExpress\" %}" %}

{% image3cols "projetos/primeiro_drone/apm.webp", "APM 2.6 and GPS", "APM 2.6 and GPS. Source: {% link \"https://www.aliexpress.com/\", \"AliExpress\" %}", "projetos/primeiro_drone/bateria.webp", "Three cell Turnigy battery", "Three cell Turnigy battery. Source: {% link \"https://www.mercadolivre.com.br/\", \"Mercado Livre\" %}", "projetos/primeiro_drone/esc.webp", "30 A ESC with SimonK firmware", "30 A ESC with SimonK firmware. Source: {% link \"https://www.aliexpress.com/\", \"AliExpress\" %}" %}

{% image3cols "projetos/primeiro_drone/helices.webp", "1150x2 ABS propellers", "1150x2 ABS propellers. Source: {% link \"https://www.aliexpress.com/\", \"AliExpress\" %}", "projetos/primeiro_drone/power_module.webp", "Power module for APM controllers", "Power module for APM controllers. Source: {% link \"https://www.aliexpress.com/\", \"AliExpress\" %}", "projetos/primeiro_drone/trem_de_pouso.webp", "Fixed landing gear", "Fixed landing gear. Source: {% link \"https://www.aliexpress.com/\", \"AliExpress\" %}" %}

{% p %}
The motivation for choosing low-RPM motors (low KV number) was exactly what you get in return: more torque. Which, theoretically, would work well with long and high-pitch propellers.
{% endp %}

## However...

{% p %}
I even conducted remote control tests with my parents' camera, a Canon SX40 HS with modified firmware ([CHDK firmware](https://chdk.fandom.com/wiki/CHDK)), but since the university project was not approved, I stopped spending on the drone. In the end, I was left with a very powerful drone for a use without heavy payload and without significant motivations to use it.
{% endp %}

{% image "projetos/primeiro_drone/drone_montado.jpg", "The finished drone", 50, "The finished drone." %}

{% youtube "6EWRQZaAxbg" %}
