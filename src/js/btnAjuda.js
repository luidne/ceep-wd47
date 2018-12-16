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
            .then(body => exibeAjudas(body.instrucoes))
            .catch(erro => { throw(erro) });

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
