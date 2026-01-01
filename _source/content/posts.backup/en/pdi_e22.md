---
title: "Digital Image Processing - Exercise 2.2"
slug: "pdi_e22"
date: "2019-04-13"
date_display: "April 13, 2019"
date_display_short: "04/13/2019"
lang: "en"
type: "post"
description: "Results of exercise 2.2 of the Digital Image Processing discipline."
og_image: "projetos/pdi_e2.2/resultRegions.png"
featured_image: "projetos/pdi_e2.2/resultRegions.png"
alternate_url: "br/pdi_e22.html"
---

{% p %}
The first two exercises, for Digital Image Processing class, consisted of manipulating the matrix of an image in two different ways: the first one should invert the gray scale in a specific region, provided by the user, and the second one should switch the quadrants which compose the image.
{% endp %}

## Regions.cpp

{% p %}
In the first program (regions.cpp, [available in Portuguese here](https://github.com/lucaspwo/pdi/blob/master/exemplo2/regions.cpp)) it was necessary to receive from the user two points in the image, that is: four coordinates. Two for the first point and two for the second point, as it can be seen below.
{% endp %}

{% gist "3538300db2ec9c3933f888095d2ad781" %}

{% p %}
After the input, the X coordinate from the first point will be stored in the xp1 variable and the Y coordinate from the first point will be stored in the yp1 variable, with the same being applied for the second point. In order to avoid some problems during the program's repetition structure to paint the inputted area, when receiving smaller coordinates values for the second point than the first point, I wrote a conditional code to change the variables values.
{% endp %}

{% gist "ea7087fe1460996e02d46cd08bd40233" %}

{% p %}
With that, the nested loop should begin from the smaller coordinates to the bigger coordinates, both in X and Y and subtract from 255 the gray scale value existing in every pixel of the matrix. The complete code follows:
{% endp %}

{% gist "7e26a3fd7d50b08293d0f6e73e53b1bd" %}

{% image2cols "projetos/pdi_e2.2/bono.png", "Original image", "Original image", "projetos/pdi_e2.2/resultRegions.png", "Image after code processing", "Image after code processing" %}

## Trocaregioes.cpp

{% p %}
And for the [second program](https://github.com/lucaspwo/pdi/blob/master/exemplo2/trocaregioes.cpp), it was necessary to switch the image quadrants diagonally. The biggest difficulty here was realizing that existed two different ways to copy the matrix of an image, in OpenCV. One would make a "shallow" copy, when you assign another name (in this case, another variable name) to the same matrix, and the other is a "deep" copy, which creates a distinct matrix, to different variables, using the clone() command. After noticing this difference, the remaining of the code flowed quickly. I made a separate copy of the original image (deep copy) and wrote a pair of loops for each quadrant, in the original image. Here's the final code:
{% endp %}

{% gist "15ad51d9d12c2ed40b7d88ee0ef36bca" %}

{% image2cols "projetos/pdi_e2.2/bono.png", "The original image, same as before", "The original image, same as before", "projetos/pdi_e2.2/resultTrocaregioes.png", "The image after the processing of the second code", "The image after the processing of the second code" %}
