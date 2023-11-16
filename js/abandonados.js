function seta(id) {
    alvo = document.getElementById(id);
    remover = document.getElementsByClassName('active')[0];
    remover.classList.remove('active');
    alvo.classList.add('active');
}