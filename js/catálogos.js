function seta(id) {
    alvo = document.getElementById(id);
    remover = document.getElementsByClassName("active")[0];
    remover.classList.remove("active");
    alvo.classList.add("active");
}

function formatarMoeda(input) {
    // Obtém o valor atual do input
    let valor = input.value.replace(/\D/g, "");

    // Formata o valor como moeda (Real)
    valor = (Number(valor) / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    // Atualiza o valor no input
    input.value = valor;
}

function revelarCatalogo(element) {
    document.getElementsByTagName("main")[0].style.display = "none";
    document.getElementById("catalogo").style.display = "block";
    document.getElementsByTagName("a")[0].href = "catálogos.html";
    nome = element.children[2].children[0].innerHTML;
    document.getElementById("nomeCatalogo").value = nome;
    return nome;
}

async function fetchdata() {
    console.log(nome);
    response = await fetch(
        "https://script.google.com/macros/s/AKfycbzUAPR0RI1BkPc5n17zGMnzWam-JKpT9ICzc-0gs6_V5Q22UmLfviLLar9Me-Y2SUCSew/exec"
    );
    bruto = await response.json();
    for (let i = 0; i < bruto.length; i++) {
        if (bruto[i]["8"] == nome) {
            firstimg = bruto[i][0].split(' ')
            criaCard = document.createElement("div");
            criaCard.setAttribute("class", "productCard");
            criaImage = document.createElement("div");
            criaImage.setAttribute("class", "productImg");
            criaImage.innerHTML = `<img onClick="showImage(this)" id="imagem${i}" src="${firstimg[0]}" alt="${bruto[i][1]}">`;
            container = document.getElementById("productContainer");
            container.appendChild(criaCard);
            criaCard.appendChild(criaImage);

            criaInfo = document.createElement("div");
            criaInfo.setAttribute("class", "productInfo");
            criaInfo.innerHTML = `<p>${bruto[i][1]}</p><div class="removerProduto">Remover do catálogo</div>`;
            criaCard.appendChild(criaInfo);
        }
    }
}

function showImage(element) {
    document.getElementsByClassName("filter")[0].style.display = "flex";
    document.getElementById(
        "popupImage"
    ).innerHTML = `<img src="${element.src}"></img>`;
    document.body.style.overflow = "hidden";
}

function offImage() {
    document.body.style.overflow = "auto";
    document.getElementsByClassName("filter")[0].style.display = "none";
}

async function renderCatalogos() {
    url =
        "https://script.google.com/macros/s/AKfycbzXmk5eTICk4PvTe0g8YXwRC_OfIgTDF4iF0q4I8EzkrwEcsUd1fZJxKYPRkujx6j8M/exec";
    response = await fetch(url);
    brute = await response.json();
    for (let i = 0; i < brute.length; i++) {
        const element = brute[i];
        criaCard = document.createElement("div");
        criaCard.setAttribute("class", "card");
        criaCard.setAttribute('onclick', 'revelarCatalogo(this), fetchdata()')
        criaCard.innerHTML = `<div class="line">
        <div class="views"><img src="view.png" class="view" alt="views">1557</div>
        <div class="settings">
            <img class="edit" src="edit.png" alt="edit">
            <img src="close.png" alt="close" class="close">
        </div>
    </div>
    <img class="arquivo" src="new-document.png" alt="file">
    <div class="info">
        <p>${element[0]}</p>
    </div>
    <div class="btns">
        <div class="link">copiar link</div>
        <div class="whatsapp"><img src="whatsapp.png" alt="whatsapp"></div>
        <div class="telegram"><img src="telegram.png" alt="telegram"></div>
    </div>`;
    }
    document.getElementsByClassName('container')[0].appendChild(criaCard)
}

renderCatalogos();
