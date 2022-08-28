let TextArea = document.getElementById("area-out");
let button = document.getElementById("copy");
let textIn = document.getElementById("area-in");

button.addEventListener('click', function() {
    TextArea.select();
    navigator.clipboard.writeText(TextArea.value);
    button.style.transition = "all .1s linear";
    button.style.opacity = "0.5";
});

textIn.addEventListener('keydown', function(){
    button.style.opacity = "1";

});