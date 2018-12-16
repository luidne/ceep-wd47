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
