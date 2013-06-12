jplot
=====
jplot is a javascript library doing R-style plotting.

How to use:
-----
Download source code (https://github.com/Drennuz/jplot/blob/master/jplot.js) and include it in your HTML before the ending `</body>` tag :

    <script type="text/javascript" src="jplot.js"></script>

General syntax:
```javascript
jplot.func_name(canvasId, dataset, optionalArgs)
//general optionalArgs: main; xlab; ylab
```

Sample javascript calls can be found in `index.html` file.

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
`lines` can also be used to do scatter plots.

Special optionalArgs:
* type: 'p' | 'b' == points | points joined by lines

<img id="lines-type-b" src="images/lines_type_b.png?raw=true" height="300" width="300"></img>
<img id="lines-type-p" src="images/lines_type_p.png?raw=true" height="300" width="300"></img>

sample code: 
```javascript
//dataset inspired by the Orange dataset in R
var dataset = [
    {label:"Tree1",x:[118,484,664,1004,1231,1372,1582], y:[30,51,75,108,115,139,140]},
    {label:"Tree2", x:[118,484,664,1004,1231,1372,1582], y:[30,58,87,115,120,142,145]},
    {label:"Tree3", x:[118,484,664,1004,1231,1372,1582], y:[30,49,81,125,142,174,177]},
    {label:"Tree4", x:[118,484,664,1004,1231,1372,1582], y:[33,69,111,156,172,203,203]}
];

jplot.lines("demo", dataset, {main:"Tree Growth", ylab:"Circumference(mm)", xlab:"Age(days)", type:"b", minX: 0, minY: 0}); //minX and minY scale the starting point accordingly.
```

### hist(canvasId, dataset, optionalArgs)
Draw histograms

Special optionalArgs:
* breaks: number of cells for the histogram, default = 5

<img id="hist" src="images/hist.png?raw=true" height="300" width="300"></img>

Sample code:
```javascript
//dataset inspired by mtcars$mpg in R
var hist_dataset = [21.0, 21.0, 22.8, 21.4, 18.7, 18.1, 14.3, 24.4, 22.8, 19.2, 17.8, 16.4, 17.3, 15.2, 10.4, 10.4, 14.7, 32.4, 30.4, 33.9, 21.5, 15.5, 15.2, 13.3, 19.2, 27.3, 26.0, 30.4, 15.8, 19.7, 15.0, 21.4]

jplot.hist("demo", hist_dataset, {main:"Histogram of mtcars$mpg", xlab: "mtcars$mpg", breaks: 6)
```

Best Practices:
-----
* canvas width/height >= 400
* #data series <= 7 (otherwise you'll get color duplicates)
* better set `style="border-style:none"` on the `canvas` element.

Todo:
------
* adding color schemes (now using shades of gray for barplot)
* supporting legends (now only for lines)
* support negative data points
* adding support for loading data from file / JSON
