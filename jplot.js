var jplot = {};
jplot.barplot = function (canvasId, dataset){
    var c = document.getElementById(canvasId);
    var context = c.getContext("2d");
    context.fillStyle = "#FF0000";
    context.fillRect(0, 0, 150, 75);
}
