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