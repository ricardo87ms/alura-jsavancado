class NegociacaoController {

    constructor() {

        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        // this._listaNegociacoes = new ListaNegociacoes( model =>
        //     this._negociacaoView.update(model));
        this._negociacaoView = new NegociacaoView($('#negociacaoView'));

        let self = this;

        this._listaNegociacoes = new Proxy(new ListaNegociacoes(), {

            get(target, prop, receiver) {

                if (['adiciona', 'esvazia'].includes(prop) && typeof (target[prop]) == typeof (Function)) {

                    return function () {

                        console.log(`método '${prop}' interceptado`);

                        Reflect.apply(target[prop], target, arguments);

                        self._negociacaoView.update(target);

                    }
                }

                return Reflect.get(target, prop, receiver);
            }
        });

        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagemView.update(this._mensagem);
    }

    adiciona(event) {

        event.preventDefault();

        this._listaNegociacoes.adiciona(this._criaNegociacao());

        this._mensagem.texto = 'Negociacao adicionada com sucesso';
        this._mensagemView.update(this._mensagem);

        this._limpaFormulario();
    }

    apaga(event) {

        event.preventDefault();

        this._listaNegociacoes.esvazia();

        this._mensagem.texto = 'Negociacões apagadas com sucesso';
        this._mensagemView.update(this._mensagem);
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