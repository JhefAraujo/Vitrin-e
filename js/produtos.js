function display(id) {
    document.getElementById("list").style.display = "block";
    document.getElementsByTagName("main")[0].style.display = "none";
}

function seta(id) {
    document.getElementsByClassName("active")[0].classList.remove("active");
    document.getElementById(id).classList.add("active");
}

async function renderProducts() {
    data = await fetch(
        "https://script.google.com/macros/s/AKfycbxh1_xs4i0jwmvmdnXsOid7tVfJl5TqjTTekPUIj6i3VlS223ZeKa9SXnlRcLS6rKL-Jw/exec"
    );
    return data.json();
}

async function render(category) {
    document.getElementsByClassName('containertwo')[0].innerHTML = '';
    document.getElementById("loader").style.display = "block";
    brute = await renderProducts();
    if (document.getElementById("identificadas").className == "opt active") {
        for (let i = 0; i < brute.length; i++) {
            if (brute[i]["4"] == category && brute[i]["7"] == "sim") {
                criaDiv = document.createElement("div");
                criaDiv.setAttribute("class", "cardtwo");
                criaPara = document.createElement("p");
                criaImage = document.createElement("div");
                criaImage.setAttribute("class", "image");
                document
                    .getElementsByClassName("containertwo")[0]
                    .appendChild(criaDiv);
                criaDiv.appendChild(criaImage);
                criaDiv.appendChild(criaPara);
                criaPara.innerHTML = brute[i]["1"];
                criaImage.innerHTML = `<img src="${brute[i]["0"]}" alt="${brute[i]["1"]}">`;
            }
        }
    }
    else {
        document.getElementsByClassName('containertwo')[0].innerHTML = '';
        for (let i = 0; i < brute.length; i++) {
            if (brute[i]["4"] == category && brute[i]["7"] == "não") {
                criaDiv = document.createElement("div");
                criaDiv.setAttribute("class", "cardtwo");
                criaPara = document.createElement("p");
                criaImage = document.createElement("div");
                criaImage.setAttribute("class", "image");
                document
                    .getElementsByClassName("containertwo")[0]
                    .appendChild(criaDiv);
                criaDiv.appendChild(criaImage);
                criaDiv.appendChild(criaPara);
                criaPara.innerHTML = brute[i]["1"];
                criaImage.innerHTML = `<img src="${brute[i]["0"]}" alt="${brute[i]["1"]}">`;
            }
        }
    }
    document.getElementById("loader").style.display = "none";
}
