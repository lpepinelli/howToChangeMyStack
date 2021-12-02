let index={
    init: function(){
        document.getElementById("btnSalvar").onclick = index.valida;
        document.getElementById("btnSalvarModal").onclick = index.salvar;
        document.getElementById("btnVoltar").onclick = index.voltar;
        document.getElementById("btnOkModal").onclick = index.voltar;
        insereValidacao();
    },

    valida: function () {

        var elements = document.getElementsByClassName("required");

        for (var i = 0; i < elements.length; i++) {
            if (elements[i].value == "" || elements[i].value == 0) {
                elements[i].dispatchEvent(new Event('input'));
            }
        }

        var invalidos = document.getElementsByClassName("invalido");

        if (invalidos.length == 0) {
            document.getElementById("btnSalvar").dataset.bsTarget = "#warning";
        }
        else
            document.getElementById("btnSalvar").dataset.bsTarget = "";
    },

    salvar: async function () {
        try{
            if (valida()) {
                var dados = {
                    nome: document.getElementById("nome").value
                }
                let url = $API+"/Genre";
                const {response, error} = await fetchAsync(url, "CREATE", dados);
                if(!response.ok)
                    console.log(error);
            }
        }
        catch (e) {
            console.log(e.stack);
        }
    },

    voltar: function () {
        window.location.href = "/Genre";
    }
};
index.init();