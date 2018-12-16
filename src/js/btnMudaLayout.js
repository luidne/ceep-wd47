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