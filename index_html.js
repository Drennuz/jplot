<html>
    <head>
        <script type="text/javascript" src="jplot.js"></script>
        <script type="text/javascript">
            var gear = [
                ["Jan", "Feb", "Mar", "Apr"],
                [15,12,5,8],
                [30,21,24,16],
            ];
            function plot(){
//                jplot.barplot("demo", gear, {main:"Monthly Commits", beside:true, ylab:"#Commits", xlab:"Month"});
            }
        </script>
    </head>

    <body onload="plot()">
        <canvas id="demo" class="jplot-barplot" data-foo="bar"  width="500" height="500" style="border-style:dotted" data-main-label="Monthly Commits" data-x-axis-label = "Month" data-y-axis-label="#Commits" data-graph-data="/file.json">        </canvas> 
    </body>
</html>
