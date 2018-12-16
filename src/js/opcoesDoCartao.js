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