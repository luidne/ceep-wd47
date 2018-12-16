'use strict';

;(function(){
    const busca = document.querySelector('#busca');

    busca.addEventListener('input', function(){
        const cartoes = document.querySelectorAll('.cartao'),
                termoDeBusca = this.value.toLowerCase();

        for (const cartao of cartoes) {
            const conteudo = cartao.querySelector('p').textContent.toLowerCase();

            /*if(conteudo.includes(termoDeBusca)) {
                cartao.style.display = 'block';
            } else {
                cartao.style.display = 'none';
            }*/

            cartao.style.display = conteudo.includes(termoDeBusca) ? 'block' : 'none';
        }
    });
})();