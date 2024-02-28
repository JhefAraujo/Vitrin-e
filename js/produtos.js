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
    for (
        let i = 0;
        i < document.getElementsByClassName("categoria").length;
        i++
    ) {
        const element = document.getElementsByClassName("categoria")[i];
        for (let i = 0; i < obj.length; i++) {
            const element = obj[i];
            document.getElementsByClassName(
                "categoria"
            )[0].innerHTML += `<option value="${element[0]}">${element[0]}</option>`;
            document.getElementsByClassName(
                "categoria"
            )[1].innerHTML += `<option value="${element[0]}">${element[0]}</option>`;
        }
    }
    document.getElementById("loader").style.display = "none";
}

renderCatalogos();

function display(id) {
    document.getElementById("list").style.display = "block";
    document.getElementsByTagName("main")[0].style.display = "none";
    document.getElementById("voltar").setAttribute("onclick", "window.location.reload()");
    document.getElementById("voltar").href = "#";
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
    for (let i = 0; i < document.getElementById("editCategoria").children.length; i++) {
        const element = document.getElementById("editCategoria").children[i];
        if (element.value == category) {
            element.setAttribute("selected", "selected");
        }
    }
    document.getElementsByClassName("containertwo")[0].innerHTML = "";
    document.getElementById("loader").style.display = "block";
    document.getElementById("nomeCat").innerHTML = category;
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
                    brute[i]["0"].split(" - ")[0]
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
    original = document.getElementById("editReferencia").value;
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
    document.getElementById("editReferencia").value =
        teste.children[1].innerHTML;
    document.getElementById("editDesc").value = brute[id][2].slice(13);
    document.getElementsByTagName("a")[0].href = "produtos.html";

    arrayImg = brute[id][0].split(" - ");
    for (let i = 0; i < arrayImg.length - 1; i++) {
        const element = arrayImg[i];
        criaImgCard = document.createElement("div");
        criaImgCard.setAttribute("class", "imgCardTwo");
        criaImgCard.innerHTML = `<img src="${element}" alt="">
        <div class="cardBtn">Remover</div>`;
        document
            .getElementsByClassName("firstCardWrapper")[0]
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

var filer;
var fakepath = [];
var files = [];

function renderimg(input) {
    var fileInput = input;
    if (input.value.substring(0, 2) == "C:") {
        fakepath.push(input.value);
        files.push(input.files[0]);
    }

    // Verifique se um arquivo foi selecionado
    if (fileInput.files.length === 0) {
        window.alert("Nenhum arquivo selecionado");
        return;
    }

    var file = fileInput.files[0];

    var reader = new FileReader();

    reader.onload = function () {
        // Crie um novo elemento de imagem
        console.log("1");
        var imgElement = document.createElement("img");
        imgElement.src = reader.result;
        imgElement.alt = "Imagem";

        // Crie um novo elemento de div (contendo a imagem e o botão de remoção)
        var imgCardDiv = document.createElement("div");
        imgCardDiv.className = "imgCardTwo";
        imgCardDiv.appendChild(imgElement);

        // Adicione um botão de remoção
        var cardBtnDiv = document.createElement("div");
        cardBtnDiv.className = "cardBtn";
        cardBtnDiv.textContent = "Remover";
        cardBtnDiv.setAttribute("onclick", "removerPai(this)");
        imgCardDiv.appendChild(cardBtnDiv);

        // Adicione a div completa à sua caixa de mídia
        input.parentElement.children[2].appendChild(imgCardDiv);
        console.log("2");
    };

    // Converta o conteúdo do arquivo para base64
    reader.readAsDataURL(file);
    filer = input;
}

function removerPai(element) {
    element.parentElement.remove();
}

function addvariation(element) {
    variations = element.parentElement;
    criaInput = document.createElement("input");
    criaInput.setAttribute("class", "varInput");
    variations.appendChild(criaInput);
    variations.style.height = `${variations.offsetHeight + 50}px`;
}

var varias = "";

function enviarProduto() {
    document.getElementById("enviarSalve").innerHTML = '<span id="load" class="load"></span>'
    formData = new FormData();

    var variacoes = document.getElementsByClassName("varInput");

    for (let i = 1; i < variacoes.length; i++) {
        const element = variacoes[i];
        if (i == variacoes.length - 1) {
            varias += element.value;
            break;
        }
        varias += element.value + " - ";
    }

    formData.append("referencia", document.getElementById("referencia").value);
    formData.append("grupo", document.getElementById("categoria").value);
    formData.append("descricao", document.getElementById("createDesc").value);
    formData.append("ativo", "sim");
    formData.append("action", "criar");
    formData.append("variacao", varias);
    formData.append("precos", document.getElementById("price").value);
    let imagens = "";
    for (let i = 0; i < fakepath.length; i++) {
        const element = fakepath[i];
        imagens +=
            "https://raw.githubusercontent.com/JhefAraujo/Clone-conecta/main/imagensProdutos/" +
            element.split("\\")[2] +
            " - ";
    }
    formData.append("imagem", imagens);

    var requestOptions = {
        method: "POST",
        body: formData,
        redirect: "follow",
        mode: "no-cors",
    };

    fetch(
        "https://script.google.com/macros/s/AKfycbwoEFRLiMEaWy13kM5X-HsMT5Ym2oJyIhVkejr_lmSEjRpLgnMZd5mP4Gm9NNaRN1aIoA/exec",
        requestOptions
    )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));

    enviarImagem();
}

var varias = "";
var original;

function editarProduto() {
    formData = new FormData();

    var variacoes = document.getElementsByClassName("varInput");

    for (let i = 1; i < variacoes.length; i++) {
        const element = variacoes[i];
        if (i == variacoes.length - 1) {
            varias += element.value;
            break;
        }
        varias += element.value + " - ";
    }

    formData.append(
        "referencia",
        document.getElementById("editReferencia").value
    );
    formData.append("original", original);
    formData.append("grupo", document.getElementById("editCategoria").value);
    formData.append("referencia", document.getElementById("editReferencia").value);
    formData.append("descricao", document.getElementById("editDesc").value);
    formData.append("ativo", "sim");
    formData.append("action", "editarCatalogo");
    formData.append("variacao", varias);
    formData.append("precos", document.getElementById("price").value);
    let imagens = "";
    let toPush = "";
    for (let i = 1; i < document.getElementsByClassName("firstCardWrapper")[0].children.length; i++) {
        const elementi = document.getElementsByClassName("firstCardWrapper")[0].children[i];
        imagemFilho = elementi.children[0].src;
        toPush += imagemFilho.split("/")[7];
        fakepath.push("C:\\\\fakepath\\\\" + toPush);
    }
    for (let i = 0; i < fakepath.length; i++) {
        const element = fakepath[i];
        imagens +=
            "https://raw.githubusercontent.com/JhefAraujo/Clone-conecta/main/imagensProdutos/" +
            element.split("\\")[2] +
            " - ";
    }
    formData.append("imagem", imagens);

    var requestOptions = {
        method: "POST",
        body: formData,
        redirect: "follow",
        mode: "no-cors",
    };

    fetch(
        "https://script.google.com/macros/s/AKfycbwCxQPMK8k45e6XhG3RD0c_ZUA6ShJN1WpWzsQJc3Jfb_0k9nAfVMsVI4ZlD1zGrNmMMg/exec",
        requestOptions
    )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));

    //enviarImagem("criar");
}

var arquivos;

function enviarImagem(action) {
    const owner = "jhefAraujo";
    const repo = "Clone-conecta";
    const pastaNoRepositorio = "imagensProdutos/"; // Caminho na pasta raiz
    const commitMessage = "Adicionando novo arquivo";
    const token =
        "github_pat_11A2L4LBY0l2qBMN8vlT4k_QXdwz0xT9fd" +
        "iFdC6IcxputqPQevsy3RdAvPtCI17oG4UPKNYFXJwieh5TIB";

    // Verifica se um arquivo foi selecionado
    if (files.length === 0) {
        window.alert("Nenhum arquivo selecionado");
        return;
    }

    function enviarArquivo(index) {
        if (index < files.length) {
            const file = files[index];
            const caminhoDoArquivoNoRepositorio =
                pastaNoRepositorio + file.name;
            const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${caminhoDoArquivoNoRepositorio}`;

            const reader = new FileReader();
            reader.readAsDataURL(file);

            return new Promise((resolve, reject) => {
                reader.onload = function () {
                    const fileContent = reader.result.split(",")[1];

                    const requestData = {
                        message: commitMessage,
                        content: fileContent,
                    };

                    const requestOptions = {
                        method: "PUT",
                        headers: {
                            Authorization: `token ${token}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(requestData),
                    };

                    fetch(apiUrl, requestOptions)
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error(
                                    `Erro ao adicionar arquivo: ${response.statusText}`
                                );
                            }
                            return response.json();
                        })
                        .then((data) => {
                            console.log(
                                "Arquivo adicionado com sucesso:",
                                data
                            );
                            resolve();
                        })
                        .catch((error) => {
                            console.error(error.message);
                            reject(error);
                        });
                };

                reader.onerror = function (error) {
                    console.error("Erro ao ler o arquivo:", error);
                    reject(error);
                };
            }).then(() => enviarArquivo(index + 1)); // Chama a próxima iteração
        }

        return Promise.resolve(); // Resolva a promise quando todas as iterações estiverem concluídas
    }

    // Inicia o envio chamando a função para o primeiro arquivo
    enviarArquivo(0);
    setTimeout(() => {
        //window.location.reload();
    }, 5000);
}
