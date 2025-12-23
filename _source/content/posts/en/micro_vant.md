---
title: "Rewind series part 1: Micro-UAV (2012-2015)"
slug: "micro_vant"
date: "2024-02-12"
date_display: "February 12, 2024"
date_display_short: "02/12/2024"
lang: "en"
type: "post"
description: "My first scientific initiation scholarship at UFRN: a summary of what I accomplished throughout the project."
og_image: "projetos/micro_vant/micro_vant.jpg"
featured_image: "projetos/micro_vant/micro_vant.jpg"
alternate_url: "br/micro_vant.html"
---

{% p %}
This is the first in a series of posts (dubbed Rewind) that cover my academic period at UFRN between 2010 and 2021. In these posts, I will talk about the projects I was involved in during scientific initiation and technical support scholarships, and at least one major experience I had, away from benches with equipment and programming.
{% endp %}

{% hr %}

## In the beginning...

{% p %}
I began my involvement with the LAR (Laboratório de Automação e Robótica, Automation and Robotics Laboratory) lab even before it was named as such (it was simply called the Automation Laboratory, or LabAuto as I referred to it) in 2011 as a volunteer in a scientific initiation group, where I started learning embedded programming concepts and developing writing techniques for publications. However, it was only in 2012 that I became a scientific initiation scholarship holder in the Micro-UAV project (code PVJ8776-2012), where I was responsible for programming the autopilot used (ArduPilot) and later responsible for redesigning the control board.
{% endp %}

{% image2cols "./projetos/micro_vant/pic_arduino.jpg", "I started by learning to program PICs, but soon discovered Arduinos", "I started by learning to program PICs, but soon discovered Arduinos.", "./projetos/micro_vant/cientec.jpg", "The laboratory team at Cientec 2012", "The laboratory team at Cientec 2012." %}

## Simulations

{% p %}
Initially, since we only had one ArduPilot Mega (APM) board, it was necessary to perform simulations with both Software in The Loop (SITL) and Hardware in The Loop (HITL) to understand its operation before field tests, which could be catastrophic for the project's continuity. SITL tests had proven to be very difficult to perform with the knowledge we had and given the little documentation available in the online community, so we directed our attention to the HITL method, where we succeeded.
{% endp %}

{% p %}
Eventually, we were able to simulate an APM on an Arduino Mega (both had the same microcontroller), which made all tests much easier to perform.
{% endp %}

{% youtube "i7VRD4Ze7EI" %}

{% image "./projetos/micro_vant/simulacao-sem-loop_comp.gif", "Simulation of autonomous flight by waypoints", 50, "Simulation of autonomous flight by waypoints, without looping upon completion (instead, it performs loiter at the \"home\" waypoint)." %}

## Field tests

{% p %}
In September 2014, we successfully conducted the first autonomous flight with a flying wing, as can be seen in the video below. We were able to correctly program the APM autopilot and, after laboratory simulations, we could finally test it in the field.
{% endp %}

{% youtube "ERJ4EnVSIlo" %}

{% image2cols "./projetos/micro_vant/rota_planejada.jpg", "The programmed route", "The programmed route (above) and the executed route (below).", "./projetos/micro_vant/rota_realizada.jpg", "The executed route", "The programmed route (above) and the executed route (below)." %}

{% image "./projetos/micro_vant/asa_voadora.jpg", "The flying wing used", 50, "The flying wing used. Source: {% link \"https://www.youtube.com/watch?v=yBu7E4S45iM\", \"\\\"Tudo Que se Move!\\\" Channel\" %}" %}

## Micro-UAV and conclusion

{% p %}
However, to meet size requirements, we still needed to reduce the size of the UAV. We then made prototypes of the micro-UAV, but the APM board was too heavy for stable flight, and something had to be done to enable autonomous flight.
{% endp %}

{% youtube "D82D-LxqW0Q" %}

{% image "./projetos/micro_vant/micro_vant.jpg", "The micro-UAV crafted by the team", 50, "The micro-UAV crafted by the team. Source: {% link \"https://www.nature.com/articles/s41598-022-17014-4\", \"article published with the project results\" %}" %}

{% p %}
Between late 2014 and 2015, we realized the need to reduce weight to increase flight duration. We then had the idea of trying to remove unused components from the APM board and, if possible, redesigning it to distribute its weight more evenly on the drone's body, as we knew that the APM board project is open source and creating another version of it, exclusive to the project, would be possible. Equipment was requested to produce the boards (which led to the creation of another laboratory, the ProtoLab), but the supplies did not arrive in time for the project deadline, and the boards, which had been partially manufactured, no longer served their purpose, and were not completed.
{% endp %}

{% image "./projetos/micro_vant/apm_micro-vant.jpg", "Layout with the boards in a 1:1 ratio relative to the APM", 50, "Layout with the boards in a 1:1 ratio relative to the APM." %}

{% image "projetos/micro_vant/apm_micro-vant-placa1.jpg", "Some boards (front and back) when they were manufactured, in September 2015", "Some boards (front and back) when they were manufactured, in September 2015." %}
