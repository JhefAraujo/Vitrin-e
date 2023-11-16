function seta(id) {
    alvo = document.getElementById(id);
    remover = document.getElementsByClassName("active")[0];
    remover.classList.remove("active");
    alvo.classList.add("active");
}

async function getOrders() {
    teste = await fetch(
        "https://script.google.com/macros/s/AKfycbxb0DjMmPztQzs4S-3vFvrxUclqnCjK_FLR7V2LDWuq5wEYWFmaF42ZAYChTyWZ0fUiYw/exec"
    );
    testedois = teste.json();
    return testedois;
}

async function renderOrders() {
    var brute = await getOrders();

    for (let i = 0; i < brute.length; i++) {
        if (brute[i]["15"] == "em aberto") {
            criatr = document.createElement("tr");

            criaPedido = document.createElement("td");
            criaPedido.setAttribute("class", "check");

            criaCliente = document.createElement("td");
            criaData = document.createElement("td");
            criaValor = document.createElement("td");
            criaVendedor = document.createElement("td");
            criaCatalogo = document.createElement("td");
            criaDetalhe = document.createElement("td");

            criaPedido.innerHTML = `<input type='checkbox'></th> ${i + 1}`;
            criaCliente.innerHTML = brute[i]["0"];
            criaData.innerHTML = brute[i]["16"].slice(0, 10);
            criaValor.innerHTML = brute[i]["13"];
            criaVendedor.innerHTML = brute[i]["17"];
            criaCatalogo.innerHTML = brute[i]["9"];
            criaDetalhe.innerHTML = '<div class="orange">detalhes</div>';

            criatr.appendChild(criaPedido);
            criatr.appendChild(criaCliente);
            criatr.appendChild(criaData);
            criatr.appendChild(criaValor);
            criatr.appendChild(criaVendedor);
            criatr.appendChild(criaCatalogo);
            criatr.appendChild(criaDetalhe);
            document.getElementsByTagName("tbody")[0].appendChild(criatr);
        }
    }
    document.getElementById('exibindo').innerHTML = `exibindo: ${document.getElementsByTagName('tr').length - 1}`
    return JSON.stringify(brute);
}

var testi = renderOrders();

async function toggle(id) {
    document.getElementsByTagName("tbody")[0].innerHTML = "";
    bruto = await testi;
    tratado = JSON.parse(bruto);

    for (let i = 0; i < tratado.length; i++) {
        if (tratado[i]["15"] == `${id}`) {
            criatr = document.createElement("tr");

            criaPedido = document.createElement("td");
            criaPedido.setAttribute("class", "check");

            criaCliente = document.createElement("td");
            criaData = document.createElement("td");
            criaValor = document.createElement("td");
            criaVendedor = document.createElement("td");
            criaCatalogo = document.createElement("td");
            criaDetalhe = document.createElement("td");

            criaPedido.innerHTML = `<input type='checkbox'></th> ${i + 1}`;
            criaCliente.innerHTML = tratado[i]["0"];
            criaData.innerHTML = tratado[i]["16"].slice(0, 10);
            criaValor.innerHTML = tratado[i]["13"];
            criaVendedor.innerHTML = tratado[i]["17"];
            criaCatalogo.innerHTML = tratado[i]["9"];
            criaDetalhe.innerHTML = '<div class="orange">detalhes</div>';

            criatr.appendChild(criaPedido);
            criatr.appendChild(criaCliente);
            criatr.appendChild(criaData);
            criatr.appendChild(criaValor);
            criatr.appendChild(criaVendedor);
            criatr.appendChild(criaCatalogo);
            criatr.appendChild(criaDetalhe);
            document.getElementsByTagName("tbody")[0].appendChild(criatr);
        }
        else {
            console.log('deu nao')
        }
    }
    document.getElementById('exibindo').innerHTML = `exibindo: ${document.getElementsByTagName('tr').length - 1}`
}

