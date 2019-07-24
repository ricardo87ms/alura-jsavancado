class NegociacaoController {

    constructor() {

        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        // this._listaNegociacoes = new ListaNegociacoes( model =>
        //     this._negociacaoView.update(model));

        this._negociacaoView = new NegociacaoView($('#negociacaoView'));

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            this._negociacaoView,
            ['adiciona', 'esvazia']);

        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagem = new Bind(
            new Mensagem(),
            this._mensagemView,
            ['texto']);
    }

    adiciona(event) {

        event.preventDefault();

        this._listaNegociacoes.adiciona(this._criaNegociacao());

        this._mensagem.texto = 'Negociacao adicionada com sucesso';

        this._limpaFormulario();
    }

    apaga(event) {

        event.preventDefault();

        this._listaNegociacoes.esvazia();

        this._mensagem.texto = 'Negociacões apagadas com sucesso';
    }

    _limpaFormulario() {

        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }

    _criaNegociacao() {

        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }
}