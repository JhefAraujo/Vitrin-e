async function renderCatalogos() {
    url =
        "https://script.google.com/macros/s/AKfycbxA31_rhJv9HQV2kxFTPqO4FizbKDvP0YkxRLJ2VhCUbe4ndYM-11SfpybGW1x2X8zxCQ/exec";
    res = await fetch(url);
    obj = await res.json();
    for (let i = 0; i < obj.length; i++) {
        const element = obj[i];
        criaDiv = document.createElement("div");
        criaDiv.setAttribute("class", "card");
        criaDiv.innerHTML = `<img class="pasta" src="folder.png" alt="file">
        <p>${element[0]}</p>`;
        document.getElementsByClassName("container")[0].appendChild(criaDiv);
        criaDiv.setAttribute("onclick", `display(), render("${element[0]}")`);
    }
}

renderCatalogos();

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
    document.getElementsByClassName("containertwo")[0].innerHTML = "";
    document.getElementById("loader").style.display = "block";
    brute = await renderProducts();
    if (document.getElementById("identificadas").className == "opt active") {
        for (let i = 0; i < brute.length; i++) {
            if (brute[i]["4"] == category && brute[i]["7"] == "sim") {
                criaDiv = document.createElement("div");
                criaDiv.setAttribute("class", `cardtwo ${"card" + i}`);
                criaDiv.setAttribute("onclick", "settings(this)");
                criaPara = document.createElement("p");
                criaImage = document.createElement("div");
                criaImage.setAttribute("class", "image");
                document
                    .getElementsByClassName("containertwo")[0]
                    .appendChild(criaDiv);
                criaDiv.appendChild(criaImage);
                criaDiv.appendChild(criaPara);
                criaPara.innerHTML = brute[i]["1"];
                criaImage.innerHTML = `<img src="${
                    brute[i]["0"].split(" ")[0]
                }" alt="${brute[i]["1"]}">`;
            }
        }
    } else {
        document.getElementsByClassName("containertwo")[0].innerHTML = "";
        for (let i = 0; i < brute.length; i++) {
            if (brute[i]["4"] == category && brute[i]["7"] == "não") {
                criaDiv = document.createElement("div");
                criaDiv.setAttribute("class", `cardtwo ${"card" + i}`);
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

async function postForm() {
    inputValue = document.getElementById("category").value;
    var formdata = new FormData();
    formdata.append("item", inputValue);

    var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
    };

    fetch(
        "https://script.google.com/macros/s/AKfycbz46_iFeoHHu4dOTT4-1tawmQwoQPkmmotH8VrWYwj9c1uEPxOpHdktrL0OSWnvTQ-t8g/exec",
        requestOptions
    )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));

    setTimeout(() => {
        document.getElementById("formPost").style.display = "none";
        window.location.reload();
    }, 2000);
}

function settings(teste) {
    id = teste.classList[1].slice(4);
    document.getElementById("productSettings").style.display = "flex";
    document.getElementById("list").style.display = "none";
    document.getElementById("ref").value = teste.children[1].innerHTML;
    document.getElementById("desc").value = brute[id][2].slice(13);
    document.getElementById("cod").value = brute[id][2].slice(0, 10);
    document.getElementsByTagName("a")[0].href = "produtos.html";

    arrayImg = brute[id][0].split(" ");
    for (let i = 0; i < arrayImg.length; i++) {
        const element = arrayImg[i];
        criaImgCard = document.createElement("div");
        criaImgCard.innerHTML = `<div class="imgCard"><img src="${element}" alt="">
        <div class="cardBtn">Remover</div></div>`;
        document
            .getElementsByClassName("imgCardContainer")[0]
            .appendChild(criaImgCard);
    }

    document.getElementsByClassName("imgCard")[1].style.border =
        "1px solid #FF6E28";

    for (let i = 0; i < obj.length; i++) {
        const element = obj[i][0];
        criaOpt = document.createElement("option");
        criaOpt.innerHTML = element;
        criaOpt.value = element;
        document.getElementById("cat").appendChild(criaOpt);
        if (document.getElementsByTagName("option")[i].value == brute[id][4]) {
            document
                .getElementsByTagName("option")
                [i].setAttribute("selected", "true");
        }
    }
}

function createProduct() {
    document.getElementById("list").style.display = "none";
    document.getElementById("createProduct").style.display = "block";
}
