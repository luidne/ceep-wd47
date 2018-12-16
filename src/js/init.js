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