function showhide(displayObject) {
    var div = document.getElementById("chartDiv");
    var children = div.childNodes;
    var items = document.getElementsByName(displayObject);

    for(i = 0; i<children.length; i++){
        children[i].style.display = 'none';
    }

    for(i = 0; i<items.length; i++) {
        if(items[i].style.display == 'none'){
            items[i].style.display = 'block';
        }else{
            items[i].style.display = 'none';
        }
    }
}