function changeText(text) {
    var display = document.getElementById('helptext');
    display.innerHTML = "";
    display.innerHTML = text;
}
function changeback() {
    var display = document.getElementById('helptext');
    //display.innerHTML = textList[Math.floor(Math.random() * textList.length)];
    display.innerHTML = "Mouseover a tile for a description";
}