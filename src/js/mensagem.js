const mensagem = function(mensagem){
    const mural = document.querySelector('.mural');
    const mensagemElem = document.createElement('p');

    mensagemElem.classList.add('formNovoCartao-msg');
    mensagemElem.textContent = mensagem.conteudo;
    mensagemElem.addEventListener('animationend', function(){
        this.remove();
    });

    mural.insertAdjacentElement('afterbegin', mensagemElem);
};