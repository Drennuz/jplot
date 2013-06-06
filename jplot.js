;(function(){
    var root = this || window;

    var jplot = {};
    var FONT_TYPE = 'Arial'; 
    var FONT_SHRINK = 0.6;
    var USAGE = "dataset format: [[data labels], [dataset1], [dataset2], ...]. Data labels and dataset*s must be of same length"
    var OFFSET = 0.1;

    //checking if all elements in one array are of the same length
    var checkEqualSize = function (array){
        var eleLength, i;
        eleLength = array.map(function(x){return x.length;}); 
        for (i = 0; i < eleLength.length - 1; i++){
            if (eleLength[i] != eleLength[i+1])
                return false;
        }
        return true;
    }

    //return largest element in a nested array
    var maxElement = function (array, f){
        var unfold = array.reduce(function(x,y){return x.concat(y);}, []);
        return unfold.reduce(function (x,y) { return (f(x)>f(y))?x:y;});
    }

    //return suitable font size for the specified area
    var resizeText = function (canvasContext, text, areaWidth){
        var baseSize = 300;
        var textWidth, factor;

        canvasContext.font = baseSize + "px " + FONT_TYPE; //base
        textWidth = canvasContext.measureText(text).width;
        factor = areaWidth / textWidth;
        baseSize = Math.round(FONT_SHRINK * baseSize * factor); // only take 60%
        return baseSize;
    }

    //plot main title
    var plotMain = function (canvas, text){
        var context = canvas.getContext('2d');
        fontSize = resizeText(context, text, (1-2*OFFSET)*canvas.width);
        context.textAlign = "center";
        context.font = fontSize + "px " + FONT_TYPE;
        textWidth = context.measureText(text).width;
        context.fillText(text, 0.5*canvas.width, 0.8 * OFFSET * canvas.height); 
    }

    //***** plotting starts here *****
    //barplots

    jplot.barplot = function (canvasId, dataset, /*optional*/ optionalArgs){
        var canvas = document.getElementById(canvasId);
        var context = canvas.getContext('2d');
        var options = optionalArgs || {};
        
        if(options.beside == undefined)
            var beside = true;
        else
            var beside = options.beside;
        var main =  options.main|| undefined;
        var xlab = options.xlab || undefined;
        var ylab = options.ylab || undefined;

        //checking dataset: length >= 2; all elements have equal length
        if (dataset.length <= 1 || (!checkEqualSize(dataset))) throw new Error(USAGE);
        //draw
        var maxHeight, singleBarWidth, singleBarHeight, baseX, baseY, startX, startY;
        var colorCode, colorStyle;
        var i,j;

        var barGroupCount = dataset[0].length;
        var realData = dataset.slice(1);
        var dataSetCount = realData.length;
        var longestLabel = maxElement(dataset[0], function (x){return x.length;}); 
        var fontSize = FONT_SHRINK * resizeText(context, longestLabel, (1-2*OFFSET)*canvas.width/barGroupCount);
        
        if (beside){ //juxtaposed
            maxHeight = maxElement(realData, function (x){return x;});
            singleBarWidth = Math.round((1-2*OFFSET)*canvas.width/barGroupCount*(1-OFFSET)/dataSetCount);
            for (i = 0; i < barGroupCount; i++){
                baseX = Math.round(2 * OFFSET * canvas.width + i * (1 - 2*OFFSET) * canvas.width / barGroupCount);
                baseY = Math.round(OFFSET * canvas.height);
                
                for (j = 0; j < dataSetCount; j++){
                    colorCode = Math.round(0 + j * 255 / dataSetCount);
                    colorStyle = "rgb(" + ([colorCode,colorCode,colorCode]).join(',') + ")";
                    context.fillStyle = colorStyle;
                    singleBarHeight = Math.round((1-2*OFFSET)*canvas.height*realData[j][i]/maxHeight);
                    startY = baseY + Math.round((1-2*OFFSET)*canvas.height - singleBarHeight);
                    startX = baseX + j * singleBarWidth;
                    context.fillRect(startX, startY, singleBarWidth, singleBarHeight);
                }
                //adding x-axis labels
                context.textAlign = "left";
                context.fillStyle = "rgb(0,0,0)";
                context.font = 0.8 * fontSize + "px " + FONT_TYPE;
                context.fillText(dataset[0][i], baseX, Math.round((1 - 0.5*OFFSET)*canvas.height));
            }
        }
        else{ //stacked
            var sumHeights = [];
            singleBarWidth = Math.round((1-2*OFFSET)*canvas.width/barGroupCount*(1-OFFSET));
            for (i = 0; i < barGroupCount; i++){
                var temp = 0;
                for (j = 0; j < dataSetCount; j++){
                    temp += realData[j][i];
                }
                sumHeights.push(temp);
            }
            maxHeight = maxElement(sumHeights, function(x){return x;});
            for (i = 0; i < barGroupCount; i++){
                baseX = Math.round(2 * OFFSET * canvas.width + i * (1 - 2*OFFSET) * canvas.width/barGroupCount);
                baseY = Math.round((1-OFFSET) * canvas.height);
                for (j = 0; j < dataSetCount; j++){
                    colorCode = Math.round(0 + j * 255 / dataSetCount);
                    colorStyle = "rgb(" + ([colorCode, colorCode, colorCode]).join(',') + ")";
                    context.fillStyle = colorStyle;
                    singleBarHeight = Math.round((1-2*OFFSET)*canvas.height*realData[j][i]/maxHeight);
                    baseY -= singleBarHeight;
                    context.fillRect(baseX, baseY, singleBarWidth, singleBarHeight);
                }
                //adding x-axis labels
                context.textAlign = "left";
                context.fillStyle = "rgb(0,0,0)";
                context.font = 0.8 * fontSize + "px " + FONT_TYPE;
                context.fillText(dataset[0][i], baseX, Math.round((1 - 0.5*OFFSET)*canvas.height));
            }
        }

        //adding y-axis measurements
        startX = Math.round((2-OFFSET) * OFFSET * canvas.width);
        context.moveTo(startX, Math.round(OFFSET * canvas.height));
        context.lineTo(startX, Math.round((1-OFFSET) * canvas.height));
        context.stroke();

        var intervals = Math.round(maxHeight / 5);
        context.fillStyle = "rgb(0,0,0)";
        fontSize = Math.round(0.8 * resizeText(context, maxHeight, (1-OFFSET)*OFFSET*canvas.width));
        context.textAlign = "right";
        context.font = fontSize + "px " + FONT_TYPE;
        for (i = 0; i < maxHeight; i = i + intervals){
            startY = (1-OFFSET)*canvas.height - (i/maxHeight) * (1-2*OFFSET) * canvas.height;
            context.fillText(i, 2 * (1 - OFFSET) * OFFSET*canvas.width, startY); 
        }
        //adding maxHeight
        context.fillText(maxHeight, 2 * (1 - OFFSET) * OFFSET * canvas.width, OFFSET * canvas.height);

        //adding other axis titles
        context.fillStyle = "rgb(0,0,0)";
        if(ylab){
            context.save();
            context.translate(OFFSET * canvas.width, (1 - OFFSET) * canvas.height);
            context.rotate(-Math.PI/2.0);
            context.font = fontSize + "px " + FONT_TYPE;
            context.textAlign = "center";
            context.fillText(ylab, (0.5 - OFFSET) * canvas.height, 0);
            context.restore();
        }
        if(xlab){
            context.font = fontSize + "px " + FONT_TYPE;
            context.textAlign = "center";
            context.fillText(xlab, 0.5 * (1+OFFSET) * canvas.width, canvas.height);
        }

        if(main){
            plotMain(canvas, main);
        }
    }
    var handleDOMContentLoaded = function (e){
        var canvases = document.getElementsByClassName('jplot');
        Array.prototype.forEach.call(canvases, function(canvas){
            var options = {};
            var dataset = canvas.getAttribute('data-source');
            var graphType = canvas.getAttribute('data-jplot-type');
            if(graphType == "barplot"){
                if(canvas.getAttribute('data-beside')){
                    options.beside = (canvas.getAttribute('data-beside') === 'true');
                }
                else
                    options.beside = undefined;
                
                options.main = canvas.getAttribute('data-main') || undefined;
                options.xlab = canvas.getAttribute('data-xlab') || undefined;
                options.ylab = canvas.getAttribute('data-ylab') || undefined;
                
               var handleData = function(event) { 
                 try {
                   dataset = JSON.parse(this.responseText); 
                 } catch(error) { throw new Error(error) }
                 jplot.barplot(canvas.id, dataset, options);
               };
            }

            if (!/^http/.test(dataset)) {
                handleData();
            } else {
                var xhr = new XMLHttpRequest();
                xhr.onload =  handleData;
                xhr.addEventListener('error', function(){});
                xhr.open('GET', dataset , true);
                xhr.send();
            }
        });
    }

    document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);

    root.jplot = jplot;
}).call(this);
