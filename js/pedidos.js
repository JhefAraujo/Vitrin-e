function seta(id) {
    alvo = document.getElementById(id);
    remover = document.getElementsByClassName("active")[0];
    remover.classList.remove("active");
    alvo.classList.add("active");
}

async function getOrders() {
    teste = await fetch(
        "https://script.google.com/macros/s/AKfycbzkXdM1Vc9breZpACoiMDF1qxXeSTm4p8OK-y54B6PXD-x6KbdBF1-i6DCUWWY7yCO9mA/exec"
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

            criaPedido.innerHTML = `<div class="checkbtn"><input type='checkbox'></th> <p>${i + 1}</p></div>`;
            criaCliente.innerHTML = brute[i]["0"];
            criaData.innerHTML = brute[i]["16"]
                .slice(0, 10)
                .split("-")
                .reverse()
                .join("/");
            criaValor.innerHTML = brute[i]["13"];
            criaVendedor.innerHTML = brute[i]["17"];
            criaCatalogo.innerHTML = brute[i]["9"];
            criaDetalhe.innerHTML = `<div class="orange" onClick="reveal(${i})">detalhes</div>`;

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
    document.getElementById("aberto").innerHTML += ` - ${
        document.getElementsByTagName("tr").length - 18
    }`;
    document.getElementsByClassName("rest")[0].style.display = "none";
    return JSON.stringify(brute);
}

var testi = renderOrders();

async function toggle(id) {
    for (let i = 0; i < document.getElementsByClassName("botao").length; i++) {
        str = document.getElementsByClassName("botao")[i].innerHTML;
        process = document
            .getElementsByClassName("botao")
            [i].innerHTML.replace(/[^a-zA-Z\u00C0-\u00FF\s]/g, "");
        document.getElementsByClassName("botao")[i].innerHTML = process;
    }

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

            criaPedido.innerHTML = `<div class="checkbtn">
                <input class="inp" type='checkbox'><p>${
                    i + 1
                }</p>
            </div>`;
            criaCliente.innerHTML = tratado[i]["0"];
            criaData.innerHTML = tratado[i]["16"]
                .slice(0, 10)
                .split("-")
                .reverse()
                .join("/");
            criaValor.innerHTML = tratado[i]["13"];
            criaVendedor.innerHTML = tratado[i]["17"];
            criaCatalogo.innerHTML = tratado[i]["9"];
            criaDetalhe.innerHTML = `<div class="orange" onClick="reveal(${i})">detalhes</div>`;

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
    if (id == "em aberto") {
        document.getElementById("aberto").innerHTML = `Em aberto - ${
            document.getElementsByTagName("tr").length - 18
        }`;
    }
    if (id == "em analise") {
        document.getElementById("analise").innerHTML = `Em análise - ${
            document.getElementsByTagName("tr").length - 18
        }`;
    }
    if (id == "em produção") {
        document.getElementById("producao").innerHTML = `Em produção - ${
            document.getElementsByTagName("tr").length - 18
        }`;
    }
    document.getElementById(id).innerHTML += ` - ${
        document.getElementsByTagName("tr").length - 18
    }`;
}

function disappear() {
    document.getElementsByTagName("main")[0].style.display = "block";
    document.getElementById("details").style.display = "none";
    document.getElementsByTagName("a")[0].href = "";
}

async function reveal(id) {
    document.getElementsByTagName("a")[0].href = "#";
    document.getElementsByTagName("a")[0].onclick = disappear();
    document.getElementsByTagName("main")[0].style.display = "none";
    document.getElementById("details").style.display = "block";
    bruto = await testi;
    tratado = JSON.parse(bruto);
    arr = tratado[id];

    document.getElementById("numPedido").innerHTML += " - " + (id + 1);
    document.getElementById("clientName").innerHTML = "pedido de " + arr[0];
    document.getElementById("nomeTable").innerHTML = arr[0];
    document.getElementById("cpfTable").innerHTML = arr[1];
    document.getElementById("emailTable").innerHTML = arr[2];
    document.getElementById("telefoneTable").innerHTML = arr[3];
    document.getElementById("cepTable").innerHTML = arr[4];
    document.getElementById("estadoTable").innerHTML = arr[5];
    document.getElementById("cidadeTable").innerHTML = arr[6];
    document.getElementById("enderecoTable").innerHTML = arr[7];
    document.getElementById("bairroTable").innerHTML = arr[8];
    document.getElementById("dataTable").innerHTML = arr[16]
        .slice(0, 10)
        .split("-")
        .reverse()
        .join("/");
    document.getElementById("vendedorTable").innerHTML = arr[17];
    document.getElementById("descTable").innerHTML = arr[9];
}

function alteradado(id) {
    var formdata = new FormData();

    grupo = document.querySelectorAll('input[type="checkbox"]:checked');
    for (let i = 0; i < grupo.length; i++) {
        const element = grupo[i];
        formdata.append("coluna", parseInt(element.parentElement.children[1].innerHTML) + 1);
        formdata.append("valor", id);
    }

    var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
    };

    fetch(
        "https://script.google.com/macros/s/AKfycbxfjnBNYOvW7HLX6KbDdJ1P3njxEHxmiAeLhACHmDaaZ9dLvhkBy_-smSiFfhJxz0z0tg/exec",
        requestOptions
    );
    setTimeout(() => {
        window.location.reload();
    }, 2000);
}
