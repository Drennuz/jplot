var jplot = {};
var FONT_TYPE = 'Arial'; 
var FONT_SHRINK = 0.6;
var USAGE = "dataset format: [[data labels], [dataset1], [dataset2], ...]. Data labels and dataset*s must be of same length"

//checking if all elements in one array are of the same length
var checkEqualSize = function (array){
    var eleLength = array.map(function(x){return x.length;}); 
    for (var i = 0; i < eleLength.length - 1; i++){
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
    canvasContext.font = baseSize + "px " + FONT_TYPE; //base
    var textWidth = canvasContext.measureText(text).width;
    var factor = areaWidth / textWidth;
    baseSize = Math.round(FONT_SHRINK * baseSize * factor); // only take 60%
    return baseSize;
}

//***** plotting starts here *****
//barplots

jplot.barplot = function (canvasId, dataset, /*optional*/ optionalArgs){
    var canvas = document.getElementById(canvasId);
    var context = canvas.getContext('2d');
    var options = optionalArgs || {};
    
    // consider use using options object and not storing in separate `var`s
    var beside = options.beside || true;
    var main =  options.main|| undefined;
    var xlab = options.xlab || undefined;
    var ylab = options.ylab || undefined;

    //checking dataset: length >= 2; all elements have equal length
    if (dataset.length <= 1 || (!checkEqualSize(dataset))) throw new Error(USAGE);
    //draw
    var offset = 0.1; //take 80% of total area for bars
    var barGroupCount = dataset[0].length;
    var realData = dataset.slice(1);
    var dataSetCount = realData.length;
    var maxHeight = maxElement(realData, function (x){return x;});
    var singleBarWidth = Math.round((1-2*offset)*canvas.width/barGroupCount*(1-offset)/dataSetCount);
    var longestLabel = maxElement(dataset[0], function (x){return x.length;}); 
    var fontSize = FONT_SHRINK * resizeText(context, longestLabel, (1-2*offset)*canvas.width/barGroupCount);
    
    if (beside){ //juxtaposed
        for (var i = 0; i < barGroupCount; i++){
            var baseX = Math.round(2 * offset * canvas.width + i * (1 - 2*offset) * canvas.width / barGroupCount);
            var baseY = Math.round(offset * canvas.height);
            
            for (var j = 0; j < dataSetCount; j++){
                var colorCode = Math.round(0 + j * 255 / dataSetCount);
                var colorStyle = "rgb(" + ([colorCode,colorCode,colorCode]).join(',') + ")";
                context.fillStyle = colorStyle;
                var singleBarHeight = Math.round((1-2*offset)*canvas.height*realData[j][i]/maxHeight);
                var startY = baseY + Math.round((1-2*offset)*canvas.height - singleBarHeight);
                var startX = baseX + j * singleBarWidth;
                context.fillRect(startX, startY, singleBarWidth, singleBarHeight);
            }
            //adding x-axis labels
            context.textAlign = "left";
            context.fillStyle = "rgb(0,0,0)";
            context.font = 0.8 * fontSize + "px " + FONT_TYPE;
            context.fillText(dataset[0][i], baseX, Math.round((1 - 0.5*offset)*canvas.height));
        }
    }
    else{ //stacked

    }

    //adding y-axis measurements
    startX = Math.round((2-offset) * offset * canvas.width);
    context.moveTo(startX, Math.round(offset * canvas.height));
    context.lineTo(startX, Math.round((1-offset) * canvas.height));
    context.stroke();

    var intervals = Math.round(maxHeight / 5);
    context.fillStyle = "rgb(0,0,0)";
    fontSize = Math.round(0.8 * resizeText(context, maxHeight, (1-offset)*offset*canvas.width));
    context.textAlign = "right";
    context.font = fontSize + "px " + FONT_TYPE;
    for (i = 0; i < maxHeight; i = i + intervals){
        startY = (1-offset)*canvas.height - (i/maxHeight) * (1-2*offset) * canvas.height;
        context.fillText(i, 2 * (1 - offset) * offset*canvas.width, startY); 
    }
    //adding maxHeight
    context.fillText(maxHeight, 2 * (1 - offset) * offset * canvas.width, offset * canvas.height);


    //adding other axis titles
    context.fillStyle = "rgb(0,0,0)";
    if(ylab){
        context.save();
        context.translate(offset * canvas.width, (1 - offset) * canvas.height);
        context.rotate(-Math.PI/2.0);
        context.font = fontSize + "px " + FONT_TYPE;
        context.textAlign = "center";
        context.fillText(ylab, (0.5 - offset) * canvas.height, 0);
        context.restore();
    }
    if(xlab){
        context.font = fontSize + "px " + FONT_TYPE;
        context.textAlign = "center";
        context.fillText(xlab, 0.5 * (1+offset) * canvas.width, canvas.height);
    }

    if(main){
        fontSize = resizeText(context, main, (1-2*offset)*canvas.width);
        context.textAlign = "center";
        context.font = fontSize + "px " + FONT_TYPE;
        textWidth = context.measureText(main).width;
        context.fillText(main, 0.5*canvas.width, 0.8 * offset * canvas.height); 
    }

}

