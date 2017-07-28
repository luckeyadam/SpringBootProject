function fixLegend(cells) {
    var x = 0;
    for (i = 0; i < cells.length; i++) {
        console.log(cells[i]);
        cells[i].setAttribute("transform", "translate(0," + x + ")");
        x = x + 40;
    }
}