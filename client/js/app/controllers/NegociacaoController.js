class NegociacaoController {

    constructor(){
        let $ = document.querySelector.bind(document);
    
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        
    }

    adiciona(event){
        event.preventDefault();

        let date = new Date(this._inputData.value.split('-'));
        let negociacao = new Negociacao(
            date,
            this._inputQuantidade.value,
            this._inputValor.value
        );

        console.log(negociacao);
    }
}