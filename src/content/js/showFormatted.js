document.getElementById("area-out").innerHTML = TextArea.innerHTML.replace(/\"/g, '').trim().replace(/(\r\n|\n|\r)/gm, "").replaceAll('	', '')
