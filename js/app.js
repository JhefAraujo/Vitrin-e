const express = require("express");
const path = require("path");
const randomstring = require("randomstring");

const app = express();
const port = 3000;
const randomLink = randomstring.generate(10);

app.get("/", (req, res) => {
    // Retorna a página HTML diretamente
    res.send(`
    <!DOCTYPE html>
    <html lang="pt-br">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="theme-color" content="#000000">
        <title>Catálogo</title>
        <style>
            @font-face {
                font-family: 'SuaFonte';
                src: url('vogue.ttf');
                src: url('vogue.ttf') format('truetype');
                /* Adicione outros formatos (e.g., woff2, ttf) conforme necessário para compatibilidade com navegadores */
            }
    
            @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Display&display=swap');
            * {
                padding: 0;
                margin: 0;
                box-sizing: border-box;
                scroll-behavior: smooth;
                font-family: 'Roboto', serif;
            }
    
            html,
            body {
                width: 100vw;
                overflow-x: hidden;
            }
    
            p {
                font-weight: 100;
            }
    
            main {
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                height: 100vh;
                overflow-x: hidden;
                font-weight: 400;
            }
    
            main h1 {
                font-size: 300%;
                text-shadow: 2px 3px 5px rgba(0, 0, 0, 0.5);
                font-weight: lighter;
                font-family: 'Noto Serif Display', serif;
            }
    
            main p {
                position: absolute;
                bottom: 10vh;
                left: 50vw;
                transform: translateX(-50%);
            }
    
            .filter {
                width: 100vw;
                height: 100vh;
                position: absolute;
                z-index: -1;
                top: 0;
                left: 0;
                filter: brightness(0.5);
                background: radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgb(0, 0, 0) 99.4%);
            }
    
            .filter video {
                position: absolute;
                top: 0;
                left: 0;
                object-fit: cover;
                object-position: center;
                height: 100vh;
                width: 100vw;
                z-index: -2;
                background: radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgb(0, 0, 0) 99.4%);
            }
    
            .products {
                background: radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgb(0, 0, 0) 99.4%);
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                row-gap: 25px;
                padding: 5vh;
                min-height: 100vh;
                width: 100vw;
                flex-direction: column;
            }
    
            .card {
                border-radius: 1px;
                height: 107vw;
                width: 87vw;
                overflow: hidden;
                position: relative;
                outline: 1px solid rgba(255, 255, 255, 0.534);
            }
    
            .card img {
                z-index: -5;
                width: 100%;
                min-height: 100%;
                object-fit: cover;
            }
    
            .cardInfo {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(5px);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 20%;
            }
    
            .visible {
                animation: teste 1.5s;
            }
    
            .element {
                opacity: 0;
            }
    
            @keyframes teste {
                0% {
                    opacity: 0;
                    filter: brightness(0);
                }
    
                100% {
                    opacity: 1;
                    filter: brightness(1);
                }
            }
    
            a {
                color: white;
            }
    
            .price {
                position: absolute;
                bottom: 15px;
                left: 50%;
                transform: translateX(-50%);
                font-weight: 300;
            }
    
            .titulo {
                position: absolute;
                height: 1em;
                top: 20%;
                left: 50%;
                transform: translateX(-50%);
                text-align: center;
                width: 100%;
                font-weight: 300;
                overflow: hidden;
            }
    
            .leftArrow {
                position: absolute;
                top: 45%;
                left: 0;
                transform: translateY(-50%);
                width: 50px;
                height: 50px;
                background-color: rgba(0, 0, 0, 0.6);
                backdrop-filter: blur(5px);
                border-radius: 0 10px 10px 0;
                display: flex;
                align-items: center;
                justify-content: center;
            }
    
            .rightArrow {
                position: absolute;
                top: 45%;
                right: 0;
                transform: translateY(-50%);
                width: 50px;
                height: 50px;
                background-color: rgba(0, 0, 0, 0.6);
                backdrop-filter: blur(5px);
                border-radius: 10px 0px 0px 10px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
    
            .carousel {
                display: flex;
                transition-duration: 0.5s;
                transform: translateX(0);
                min-height: 100%;
            }
    
            .loader {
                background: radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgb(0, 0, 0) 99.4%);
                display: flex;
                align-items: center;
                justify-content: center;
                position: fixed;
                top: 0;
                left: 0;
                z-index: 11;
                height: 100vh;
                width: 100vw;
                transition-duration: 1s;
            }
    
            .loader img {
                width: 80vw;
            }
        </style>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;1,300&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+Display&display=swap" rel="stylesheet">
        <script src="https://kit.fontawesome.com/2a683e0d82.js" crossorigin="anonymous"></script>
    </head>
    
    <body>
        <div class="loader">
            <img class="logo" src="https://onedrive.live.com/embed?resid=3A64BD5E3A013176%219073&authkey=%21ABpnNNHyKtIcvfo&width=600&height=600" alt="Logo Mallorca">
        </div>
        <main>
            <h1>Verano</h1>
            <a href="#products">
                <p>Clique para explorar</p>
            </a>
            <div class="filter">
                <video src="https://github.com/JhefAraujo/Clone-conecta/raw/main/bgvideo.mp4" playsinline autoplay muted loop></video>
            </div>
        </main>
        <section class="products" id="products">
        </section>
        <script>
            async function fetchAndAppend() {
                url = 'https://script.google.com/macros/s/AKfycbzUAPR0RI1BkPc5n17zGMnzWam-JKpT9ICzc-0gs6_V5Q22UmLfviLLar9Me-Y2SUCSew/exec';
                response = await fetch(url);
                brute = await response.json();
                for (let i = 0; i < brute.length; i++) {
                    const element = brute[i];
                    imagem = element[0].split(' ');
                    if (element[8] == "Verano") {
                        criaCard = document.createElement('div');
                        criaCard.setAttribute('class', 'card element');
                        criaCard.innerHTML = \`<div class="carousel"><img src="\${imagem[0]}"alt=""></div>
                                                <div class="cardInfo">
                                                    <p class"titulo">\${element[2]}</p>
                                                </div>
                                                <p class="price">R$\${element[6]},00</p>\`
                        document.getElementById('products').appendChild(criaCard);
                        criaCard.children[1].children[0].remove();
                        if (imagem.length > 1) {
                            criaCard.innerHTML += '<div class="leftArrow" onclick="carouselleft(this)"><i class="fa-solid fa-arrow-left fa-lg"></i></div><div class="rightArrow" onclick="carouselright(this)"><i class="fa-solid fa-arrow-right fa-lg"></i></div>'
                            criaCard.children[0].innerHTML = \`<div class="carousel">
                    <img src="\${imagem[0]}"alt="">
                    <img src="\${imagem[1]}"alt="">
                </div>\`
                        }
                    }
    
                }
                document.getElementsByClassName('loader')[0].style.opacity = '0';
                setTimeout(() => {
                    document.getElementsByClassName('loader')[0].style.display = 'none';
                }, 1000);
            }
            fetchAndAppend();
            window.addEventListener("load", function () {
                setTimeout(function () {
                    // This hides the address bar:
                    window.scrollTo(0, 1);
                }, 0);
            });
            window.addEventListener('scroll', () => {
                produto = document.getElementsByClassName('card');
                for (let i = 0; i < produto.length; i++) {
                    const element = produto[i];
                    if (element.getBoundingClientRect().y < 600) {
                        element.setAttribute("class", "visible card");
                    }
                }
            });
            function carouselright(element) {
                element.parentElement.children[0].style.transform = 'translateX(-100%)';
            }
            function carouselleft(element) {
                element.parentElement.children[0].style.transform = 'translateX(0)';
            }
        </script>
    </body>
    
    </html>
    `);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
