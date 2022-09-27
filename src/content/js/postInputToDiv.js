let btnTranslate = document.getElementById("arrow-button")
let inputHidden = document.getElementById("inputHidden")

btnTranslate.addEventListener('click', function() {
    inputHidden.value = textIn.innerHTML
});

// faz um placeholder no input
textIn.style.color = "gray"

textIn.addEventListener('focus', function() {
    if(textIn.innerHTML === "Digite o texto a ser traduzido..."){
        textIn.style.color = "black"
        textIn.innerHTML = ""
    }
});

textIn.addEventListener('blur', function() {
    if(textIn.innerHTML === ""){
        textIn.innerHTML = "Digite o texto a ser traduzido..."
        textIn.style.color = "gray"
    }
});

inputHidden.style.display = "none";