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