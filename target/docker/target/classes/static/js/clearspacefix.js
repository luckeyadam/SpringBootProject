//this will create a clearfix div for every x tiles

function rearrange(divArray) {

    var topInserted = true;
    var x = 0;
    console.log(divArray.length);
    console.log(divArray.toString());
    var topdiv = createTopDiv();

    var newDiv = document.createElement("DIV");
    newDiv.className = "hex-group";
    var aryLength = divArray.length;

    console.log("ARRAY LENGTH IS: " + aryLength);
    for (var blah in divArray) {
        console.log(typeof blah);
        console.log(blah);
        console.log();
    }

    Array.from(document.getElementsByClassName("hex")).forEach(function (item) {
        console.log(item);
        x++;
        if (topInserted) {
            console.log("inserting into top div");
            topdiv.appendChild(item);
        } else {
            console.log("appending without top div")
            newDiv.appendChild(item);
        }
        console.log("x is: " + x + " and topinserted is: " + topInserted);
        if (x % 3 === 0 && topInserted) {
            console.log("div by 3 and true");
            topInserted = false;
            x = 0;
            topdiv.appendChild(createClearfix());
            newDiv.appendChild(topdiv); // append top div to container
            topdiv = createTopDiv(); //create a new topdiv
        }

        if (x % 4 === 0 && x != 0 && !topInserted) {
            console.log("div by 4 and false");
            x = 0;
            topInserted = true;
            newDiv.appendChild(createClearfix());
        }
    });
    console.log(newDiv);
    document.getElementById("hexcontainer").innerHTML = newDiv.innerHTML;

}

function createTopDiv() {
    var newItem = document.createElement("DIV");
    newItem.className = "top";
    return newItem;
}

function createClearfix() {
    var newItem = document.createElement("DIV");
    newItem.className = "clearfix";
    return newItem;
}