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

formatarMoeda(document.getElementById('valorMin'));

function revelarCatalogo(element) {
    document.getElementsByTagName('main')[0].style.display = 'none';
    document.getElementById('catalogo').style.display = 'block';
    document.getElementsByTagName('a')[0].href = "catálogos.html";
    nome = element.children[2].children[0].innerHTML;
    document.getElementById('nomeCatalogo').value = nome;
    return nome
}

async function fetchdata() {
    console.log(nome);
    response = await fetch('https://script.google.com/macros/s/AKfycbzUAPR0RI1BkPc5n17zGMnzWam-JKpT9ICzc-0gs6_V5Q22UmLfviLLar9Me-Y2SUCSew/exec');
    bruto = await response.json();
    for (let i = 0; i < bruto.length; i++) {
        if (bruto[i]['8'] == nome) {
            criaCard = document.createElement('div');
            criaCard.setAttribute('class', 'productCard');
            criaImage = document.createElement('div');
            criaImage.setAttribute('class', 'productImg');
            criaImage.innerHTML = `<img onClick="showImage(this)" id="imagem${i}" src="${bruto[i][0]}" alt="${bruto[i][1]}">`;
            container = document.getElementById('productContainer');
            container.appendChild(criaCard);
            criaCard.appendChild(criaImage);

            criaInfo = document.createElement('div');
            criaInfo.setAttribute('class', 'productInfo');
            criaInfo.innerHTML = `<p>${bruto[i][1]}</p><div class="removerProduto">Remover do catálogo</div>`;
            criaCard.appendChild(criaInfo);
        }
    }
}

function showImage(element) {
    document.getElementsByClassName('filter')[0].style.display = 'flex';
    document.getElementById('popupImage').innerHTML = `<img src="${element.src}"></img>`;
    document.body.style.overflow = 'hidden';
}

function offImage() {
    document.body.style.overflow = 'auto';
    document.getElementsByClassName('filter')[0].style.display = 'none';
}