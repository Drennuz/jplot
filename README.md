jplot
=====
jplot is a javascript library doing R-style plotting.

How to use:
-----
Download source code (https://github.com/Drennuz/jplot/blob/master/jplot.js) and include it in your HTML before the ending `</body>` tag :

    <script type="text/javascript" src="jplot.js"></script>


Supporting plots:
-----
### barplot(canvasId, dataset, optionalArgs):
Special optionalArgs:
* beside: true | false == juxtaposed | stacked

<img id="barplot-beside-true" src="images/barplot_beside_true.png?raw=true" height="300" width="300"></img>
<img id="barplot-beside-false" src="images/barplot_beside_false.png?raw=true" height="300" width="300"></img>

sample code:
```javascript
    var dataset = [ //all arrays below must be of same length
        ["Jan", "Feb", "Mar", "Apr"], //data labels
        [15,12,5,8], //data series 1
        [30,21,24,16] //data series 2
    ];
    jplot.barplot("demo", dataset, {main:"Monthly commits", beside:true, ylab:"#Commits", xlab:"Month"}); 
```

### lines(canvasId, dataset, optionalArgs)
Special optionalArgs:
* type: 'p' | 'b' == points | points joined by lines

<img id="lines-type-b" src="images/lines_type_b.png?raw=true" height="300" width="300"></img>
<img id="lines-type-p" src="images/lines_type_p.png?raw=true" height="300" width="300"></img>

sample code:
```javascript
    var dataset = [
        {label:"tree1",x:[118, 484, 664, 1004, 1231], y:[30,51,75,108,115]},
        {label:"tree2", x:[118,484,664,1004,1231], y:[30,58,87,115,120]}
    ];
    jplot.lines("demo", dataset, {main:"Tree Growth", ylab:"Circumference(mm)", xlab:"Age(days)", type:"b", minX: 0, minY: 0}); //minX and minY scale the starting point accordingly.
```

Best Practices:
-----
* canvas width/height >= 400
* #data series <= 7 (otherwise you'll get color duplicates)

Todo:
------
* adding color schemes (now using shades of gray)
* supporting legends
* support negative data points
* adding support for loading data from file / JSON
