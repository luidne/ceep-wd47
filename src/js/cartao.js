; (function () {

    let numeroCartao = 1

    const criaCartaoInsereMural = function (cartao) {
        const mural = document.querySelector('.mural');        
        const cartaoElement = document.createElement('article');
        cartaoElement.id = 'cartao_' + numeroCartao;
        cartaoElement.classList.add('cartao', `tipo-${cartao.tipo ? cartao.tipo : 'padrao'}`);
        cartaoElement.tabIndex = 0;
        
        cartaoElement.innerHTML =
            `<div class="opcoesDoCartao">
                <button class="opcoesDoCartao-remove opcoesDoCartao-opcao" tabindex="0">
                <svg><use xlink:href="#iconeRemover"></use></svg>
                </button>
        
                <input type="radio" name="corDoCartao${numeroCartao}" value="#EBEF40" id="corPadrão-cartao${numeroCartao}" class="opcoesDoCartao-radioTipo">
                <label for="corPadrão-cartao${numeroCartao}" class="opcoesDoCartao-tipo opcoesDoCartao-opcao" style="color: #EBEF40;" tabindex="0">
                Padrão
                </label>
                
                <input type="radio" name="corDoCartao${numeroCartao}" value="#F05450" id="corImportante-cartao${numeroCartao}" class="opcoesDoCartao-radioTipo">
                <label for="corImportante-cartao${numeroCartao}" class="opcoesDoCartao-tipo opcoesDoCartao-opcao" style="color: #F05450;" tabindex="0">
                Importante
                </label>
                
                <input type="radio" name="corDoCartao${numeroCartao}" value="#92C4EC" id="corTarefa-cartao${numeroCartao}" class="opcoesDoCartao-radioTipo">
                <label for="corTarefa-cartao${numeroCartao}" class="opcoesDoCartao-tipo opcoesDoCartao-opcao" style="color: #92C4EC;" tabindex="0">
                Tarefa
                </label>
                
                <input type="radio" name="corDoCartao${numeroCartao}" value="#76EF40" id="corInspiração-cartao${numeroCartao}" class="opcoesDoCartao-radioTipo">
                <label for="corInspiração-cartao${numeroCartao}" class="opcoesDoCartao-tipo opcoesDoCartao-opcao" style="color: #76EF40;" tabindex="0">
                Inspiração
                </label>
            </div>
            <p class="cartao-conteudo" contenteditable tabindex="0">${cartao.conteudo}</p>`;
        
        cartaoElement.addEventListener('focusin', function () {
            this.classList.add('cartao--focado');
        });
        cartaoElement.addEventListener('focusout', function () {
            this.classList.remove('cartao--focado');
        });
        cartaoElement.addEventListener('change', function (event) {
            if (event.target.classList.contains('opcoesDoCartao-radioTipo')) {
                this.style.backgroundColor = event.target.value;
            }
        });
        cartaoElement.addEventListener('keyup', function (event) {
            const mudaCor = event.target.classList.contains('opcoesDoCartao-tipo');
            if (mudaCor && event.code == 'Enter' || event.code == 'Space' || event.code == 'NumpadEnter') {
                console.log(event.target);
                //this.style.backgroundColor = event.target.style.color;
                event.target.click();
            }
        });
        cartaoElement.addEventListener('click', function (event) {
            if (event.target.classList.contains('opcoesDoCartao-remove')) {
                //console.log(event.target);
                this.classList.add('cartao--some');
                this.addEventListener('transitionend', function () {
                    this.remove();
                });
            }
        });
        mural.insertAdjacentElement('afterbegin', cartaoElement);

        const temCartao = cartaoElement.querySelector(`[value="${cartao.cor}"]`);

        if(temCartao){
            cartaoElement.querySelector(`[value="${cartao.cor}"]`).click();
        } else {
            cartaoElement.style.backgroundColor = cartao.cor;
        }

        numeroCartao++;
        return numeroCartao;
    }

    //window.criaCartaoInsereMural = criaCartaoInsereMural

    // protege uma função global de ser sobrescrita
    Object.defineProperties(window, {
        criaCartaoInsereMural: {
            value: criaCartaoInsereMural,
            writable: false
        }
    })
})();