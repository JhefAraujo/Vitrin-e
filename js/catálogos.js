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
    for (let i = 0; i < brute.length; i++) {
        elemento = brute[i];
        if (elemento[0] == nome) {
            document.getElementById("dataValidade").value = elemento[1].slice(
                0,
                10
            );
        }
        if (elemento[0] == nome && elemento[3] == "espec") {
            document.getElementById("base").checked = true;
        }
    }
    return nome;
}

async function fetchdata() {
    response = await fetch(
        "https://script.google.com/macros/s/AKfycbzUAPR0RI1BkPc5n17zGMnzWam-JKpT9ICzc-0gs6_V5Q22UmLfviLLar9Me-Y2SUCSew/exec"
    );
    bruto = await response.json();
    for (let i = 0; i < bruto.length; i++) {
        if (bruto[i]["8"] == nome) {
            firstimg = bruto[i][0].split(" ");
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
            criaInfo.innerHTML = `<p>${bruto[i][1]}</p><div class="removerProduto" onClick="removeProduct(this.parentElement.parentElement)">Remover do catálogo</div>`;
            criaCard.appendChild(criaInfo);
        }
    }
}

function removeProduct(element) {
    element.remove();
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
        criaCard.setAttribute("onclick", "revelarCatalogo(this), fetchdata()");
        criaCard.innerHTML = `<div class="line">
        <div class="views"><img src="view.png" class="view" alt="views">${element[4]}</div>
        <div class="settings">
            <img class="edit" src="edit.png" alt="edit">
            <img onclick="popupExcluir(this)" src="close.png" alt="close" class="close">
        </div>
    </div>
    <img class="arquivo" src="new-document.png" alt="file">
    <div class="info">
        <p>${element[0]}</p>
    </div>
    <div class="btns">
        <div class="link" onclick="copyLink(this)">copiar link</div>
        <div class="whatsapp"><img src="whatsapp.png" alt="whatsapp"></div>
        <div class="telegram"><img src="telegram.png" alt="telegram"></div>
    </div>`;
        document.getElementsByClassName("container")[0].appendChild(criaCard);
    }
    for (let i = 0; i < document.getElementsByClassName("link").length; i++) {
        const element = document.getElementsByClassName("link")[i];
        element.addEventListener("click", function (event) {
            console.log("Clique no Filho");
            element.parentElement.parentElement.removeEventListener(
                "click",
                revelarCatalogo
            );

            // Evita que o evento de clique no filho propague para o pai
            event.stopPropagation();
        });
    }
}
//criar funcionalidade
renderCatalogos();

function copyLink(element) {
    const formdata = new FormData();
    formdata.append(
        "parametroDoSistema",
        element.parentElement.parentElement.children[2].children[0].innerHTML
    );

    const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
    };

    fetch("http://localhost:3000/generate-link/", requestOptions)
        .then((response) => response.text())
        .then((data) => {
            // Criar um elemento textarea para armazenar os dados
            const textarea = document.createElement("textarea");
            textarea.value = JSON.parse(data).link;

            // Adicionar o textarea à página
            document.body.appendChild(textarea);

            // Selecionar e copiar o texto
            textarea.select();
            document.execCommand("copy");

            // Remover o textarea da página (opcional)
            document.body.removeChild(textarea);

            // Exibir uma mensagem (opcional)
            alert("Dados copiados para a área de transferência!");
        });
}

function criaCatalogo() {
    document.getElementById("createCatalog").style.display = "block";
    document.getElementsByTagName("main")[0].style.display = "none";
}

function enviarNovoCatalogo() {
    var formdata = new FormData();
    formdata.append("nome", document.getElementById("nomeEnviar").value);
    formdata.append("datavalidade", document.getElementById("enviarData").value.split('T')[0].split('-').reverse().join('/'));
    formdata.append("video", document.getElementById('video').value.split("\\")[2]);

    var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
        mode: "no-cors",
    };

    fetch(
        "https://script.google.com/macros/s/AKfycbx7Vvzuwx6ohZJUr84bRtzqSJyEEDiNS8ZxU6vn6vTh7aseLNNUe3Ii9uKMILIezdSc/exec",
        requestOptions
    )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));

    setTimeout(() => {
        window.location.reload();
    }, 2000);
}

var exclusao;

function popupExcluir(catalogo) {
    document.getElementById("popupExcluir").style.display = "flex";
    exclusao = catalogo;
}

function excluir() {
    catalogoExcluido =
        exclusao.parentElement.parentElement.parentElement.children[2].children[0].innerHTML;
    for (let i = 0; i < brute.length; i++) {
        const element = brute[i];
        if (element.includes(catalogoExcluido)) {
            formdata = new FormData();

            formdata.append("action", "excluir");
            formdata.append("row", i + 2);

            var requestOptions = {
                method: "POST",
                body: formdata,
                redirect: "follow",
                mode: "no-cors"
            };

            fetch(
                "https://script.google.com/macros/s/AKfycbwM9bo7RYZXtHt_97-tV1sLSvN3k8SCc0dC678qKGcoMz1L0ECheQZm_y4YMuCWRnYI/exec",
                requestOptions
            )
                .then((response) => response.text())
                .then((result) => console.log(result))
                .catch((error) => console.log("error", error));
        }
    }
}
