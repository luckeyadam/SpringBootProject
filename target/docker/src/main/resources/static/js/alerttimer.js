    console.log("starting alert timer")
    setTimeout(getCount, 60000)

function getCount(){
    var xmlhttp = new XMLHttpRequest();
    var url = "";

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            results(myArr);
        }
        else{
            console.log(this.status);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    function results(arr) {
        var out = "";
        var i;
        for(i = 0; i < arr.length; i++) {
            out += '<a href="' + arr[i].url + '">' +
                arr[i].display + '</a><br>';
        }
        console.log(out);
    }
}