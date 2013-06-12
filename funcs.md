This documents all functions in `jplot.js`, serving as quick reference during developement.

* plotAxis = function (canvas, start, end, boundary, type, decimals)
    `start`: {x,y}
    `end`: {x,y}
    `boundary`: `{xMax, xMin, yMax, yMin}`
    `type`: "x" | "y"
    `decimals`: # decimal points
    return font size

* maxElement = function (array, f)
    `f`: `f(x)`

* axisTitle = function (canvas, font, text, type)
    `type`: "x" | "y"

* resizeText = function (canvasContext, text, areaWidth)
    return font size

* plotMain = function (canvas, text)

* transformCoord = function (canvas, inputTuple, boundary)
    `inputTuple`: {x,y}
    `boundary`: {xMax, xMin, yMax, yMin}
    return {x:realX, y:realY}



