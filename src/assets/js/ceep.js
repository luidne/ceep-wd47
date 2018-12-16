; (function () {
    const btnAjuda = document.querySelector('#btnAjuda');
    let listaAjudas = [];
    /*let listaAjudas = [
        {
            conteudo: "Bem-vindo ao Ceep",
            cor: "#EBEF40",
            tipo: "ajuda"
        },
        {
            conteudo: "Use a caixa de texto para criar um novo cartão",
            cor: "#F05450",
            tipo: "ajuda"
        },
        {
            conteudo: "Clique no botão \"Sync\" para salvar seus cartões",
            cor: "#76EF40",
            tipo: "ajuda"
        },
        {
            conteudo: "A prática cotidiana prova que o aumento do diálogo entre os diferentes setores produtivos obstaculiza a apreciação da importância do sistema de participação geral.",
            cor: "#d070ee",
            tipo: "ajuda"
        }
    ];*/

    btnAjuda.addEventListener('click', function () {
        /*const request = new XMLHttpRequest();
        request.open('GET', 'https://ceep.herokuapp.com/cartoes/instrucoes');
        request.responseType = 'json';
        request.send();
        request.addEventListener('load', function () {
            console.log(request.response);
            
            //listaAjudas = JSON.parse(request.response).instrucoes
            listaAjudas = this.response.instrucoes;

            //console.log(listaAjudas);

            exibeAjudas(listaAjudas);
        });*/

        fetch('https://ceep.herokuapp.com/cartoes/instrucoes')
            .then(response => response.json())
            .then(body => exibeAjudas(body.instrucoes));

    });

})();

function exibeAjudas(listaAjudas) {
    const temAjuda = document.querySelector('.tipo-ajuda');
    if (!temAjuda) {
        for (const item of listaAjudas) {
            item.tipo = 'ajuda';
            criaCartaoInsereMural(item);
        }
    }
    else {
        const cardsAjuda = document.querySelectorAll('.tipo-ajuda');
        for (const item of cardsAjuda) {
            item.remove();
        }
    }
}

const btn = document.querySelector('#btnMudaLayout');
const mural = document.querySelector('.mural');

function mudaLayout(){        
    mural.classList.toggle('mural--linha');        
}

btn.addEventListener('click', mudaLayout);

function mudaTexto(){
    if(mural.classList.contains('mural--linha')) {
        btn.textContent = 'Blocos'
    } else {
        btn.textContent = 'Linhas'
    }
}

btn.addEventListener('click', mudaTexto);
;(function(){
    const btnSync = document.querySelector('#btnSync');
    btnSync.addEventListener('click', function(){
        this.classList.add('botaoSync--esperando');
        this.classList.remove('botaoSync--sincronizado');

        const listaElemCartoes = document.querySelectorAll('.cartao:not(.tipo-ajuda)')
        const listaObjCartao = [];

        for(const cartao of listaElemCartoes) {
            listaObjCartao.push({
                conteudo: cartao.querySelector('.cartao-conteudo').textContent,
                cor: cartao.querySelector('.opcoesDoCartao-radioTipo:checked').value
            });
        }

        if(listaObjCartao.length) {
            const dados = {
                usuario: "luidne",
                cartoes: listaObjCartao
            }

            const salvar = function(url, dados){
                return fetch(url, {
                            method: 'POST',
                            cache: 'no-cache',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(dados)
                        }).then(response => response.json());
            }

            salvar('https://ceep.herokuapp.com/cartoes/salvar', dados)
                .then(resposta => {
                    mensagem({
                        conteudo: `${resposta.quantidade} cartão(ões) salvos com sucesso para o usuário ${resposta.usuario} 🎉`
                    });
    
                    btnSync.classList.remove('botaoSync--esperando');
                    btnSync.classList.add('botaoSync--sincronizado');
                });

            /*const request = new XMLHttpRequest();
            request.open('POST', 'https://ceep.herokuapp.com/cartoes/salvar');
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify(dados));

            request.addEventListener('load', function(){
                console.log(this.response);

                const resposta = JSON.parse(request.response);

                mensagem({
                    conteudo: `${resposta.quantidade} cartão(ões) salvos com sucesso para o usuário ${resposta.usuario} 🎉`
                });

                btnSync.classList.remove('botaoSync--esperando');
                btnSync.classList.add('botaoSync--sincronizado');
            });

            request.addEventListener('error', function(){
                mensagem({
                    conteudo: `Deu ruim, tente mais tarde 💔`
                });

                btnSync.classList.remove('botaoSync--esperando');
                btnSync.classList.add('botaoSync--deuRuim');    

                throw('Erro! Tem alguma coisa errada na sua requisição ❌')
            });

            request.addEventListener('timeout', function(){
                mensagem({
                    conteudo: `Vish! Demotou demais. Tente mais tarde ⏱`
                });

                btnSync.classList.remove('botaoSync--esperando');
                btnSync.classList.add('botaoSync--deuRuim');    
                
                throw(`Vish! Demotou demais. Tente mais tarde ⏱`);
            });*/

        } else {
            this.classList.remove('botaoSync--esperando');
            this.classList.add('botaoSync--sincronizado');
        }
    });
})();
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
;(function(){
    const form = document.querySelector('.formNovoCartao');

    form.addEventListener('submit', function(event){
        event.preventDefault();
        
        const textarea = document.querySelector('[name=formNovoCartao-conteudo]');
        
        if(textarea.value.trim()){
            criaCartaoInsereMural({
                conteudo: textarea.value.trim(),
                cor: '#EBEF40'
            })
            
            this.reset()
            textarea.focus()
        } else {
            if(!form.querySelector('.formNovoCartao-msg')) {
                const mensagem = document.createElement('p')
                
                mensagem.classList.add('formNovoCartao-msg')
                mensagem.textContent = 'O texto não pode ser vazio.'
                mensagem.addEventListener('animationend', function(){
                    this.remove();
                })
                
                textarea.insertAdjacentElement('afterend', mensagem)
            }
        }
    })
})();

;(function(){
    const dados = {
        usuario: 'luidne'
    };

    $.ajax({
        url: 'https://ceep.herokuapp.com/cartoes/carregar',
        method: 'GET',
        data: dados,
        dataType: 'jsonp',
        success: function(resposta){
            console.log(resposta);
            for (const cartao of resposta.cartoes) {                
                criaCartaoInsereMural(cartao);
            }
        }
    });

    /*const request = new XMLHttpRequest;
    request.open('GET', 'https://ceep.herokuapp.com/cartoes/carregar/');
    request.setRequestHeader('Content-Type', 'application/json');
    request.responseType = 'json';


    request.send(JSON.stringify(dados));
    request.addEventListener('load', function(){

    });*/
})();
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
;(function(){
    const cartoes = document.querySelectorAll('.cartao');

    for (const item of cartoes) {
        item.addEventListener('focusin', function(){
            this.classList.add('cartao--focado');
        });

        item.addEventListener('focusout', function(){
            this.classList.remove('cartao--focado');
        });

        item.addEventListener('change', function(event){
            if(event.target.classList.contains('opcoesDoCartao-radioTipo')) {
                this.style.backgroundColor = event.target.value;
            }
        });

        item.addEventListener('keyup', function(event){
            const mudaCor = event.target.classList.contains('opcoesDoCartao-tipo');

            if(mudaCor && event.code == 'Enter' || event.code == 'Space' || event.code == 'NumpadEnter') {
                console.log(event.target);
                //this.style.backgroundColor = event.target.style.color;
                event.target.click();
            }
        });

        item.addEventListener('click', function(event){
            if(event.target.classList.contains('opcoesDoCartao-remove')) {      
                //console.log(event.target);
                this.classList.add('cartao--some');
                this.addEventListener('transitionend', function(){
                    this.remove();
                })
            }
        })
    }
})();
;(function(){
    const btnList = document.querySelectorAll('.opcoesDoCartao-remove');

    for (let index = 0; index < btnList.length; index++) {
        const btn = btnList[index];
        
        //console.log(btn);
        btn.addEventListener('click', function(){
            const cartao = this.parentElement.parentElement;
            
            cartao.classList.add('cartao--some');
            cartao.addEventListener('transitionend', function(){
                this.remove();
            })
        })
    }
    
    //console.log(btn);
})();