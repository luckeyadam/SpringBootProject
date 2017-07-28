function copyText(textToCopy) {
    console.log(textToCopy);
    try {
        console.log(cpvalue);
        var box = document.getElementById('cpvalue');
        box.value = textToCopy;
        box.focus();
        box.select();
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text value was ' + msg);
        cpvalue.value = "";
        document.getSelection().removeAllRanges();
    } catch (err) {
        console.log('Oops, unable to copy');
    }
}