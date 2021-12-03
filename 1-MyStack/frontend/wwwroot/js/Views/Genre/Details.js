let index = {
    obj:[],
    init: function(){
        index.loadGenre();
        document.getElementById("btnEditar").onclick = index.switchButton;
        document.getElementById("btnVoltar").onclick = index.back;
        document.getElementById("btnExcluirModal").onclick = index.delete;
        insertValidation();
    },

    loadGenre: async function(){
        try{
            let url = window.location.pathname.split('/');
            url = $API+"/Genre/"+url[url.length-1];
            const {response, json, error} = await fetchAsync(url, "READ");
            if(response.ok){
                index.obj = json;
                index.fillGenre(json);
            }
            else
                console.log(error);
        }
        catch (e) {
            console.log(e.stack);
        }
    },

    fillGenre: function(Genre){
        document.getElementById("id").value = Genre.id;
        document.getElementById("name").value = Genre.name;
    },

    switchButton: function () {
        var tr = "";
        if (document.getElementById("name").disabled) {
            tr += "<button type=\"button\" class=\"btn btn-success mr-1\" onclick=\"index.create()\">" +
                "<i class=\"icon-floppy-o\"></i> Salvar" +
                "</button>" +
                "<button type=\"button\" class=\"btn btn-secundary\" onclick=\"index.iniState()\">" +
                "<i class=\"icon-arrow-left4\"></i> Voltar" +
                "</button>";
            index.enableInput(true);
        }
        else {
            tr += "<button type=\"button\" class=\"btn btn-info mr-1\" id=\"btnEditar\" onclick=\"index.switchButton()\">" +
                "<i class=\"icon-pencil2\"></i> Editar" +
                "</button>" +
                "<button type=\"button\" class=\"btn btn-secundary\" onclick=\"index.back()\">" +
                "<i class=\"icon-arrow-left4\"></i> Voltar" +
                "</button>";
            index.enableInput(false);
        }
        document.getElementById("divBtns").innerHTML = tr;
        document.getElementById("divMsg").innerHTML = "";
        document.getElementById("divMsg").className = "";
    },

    iniState: function () {
        index.switchButton();
        document.getElementById("name").value = index.obj.name;
        document.getElementById("name").dispatchEvent(new Event('input'));
    },

    enableInput: function (bool) {
        document.getElementById("name").disabled = !bool;
    },

    create: async function () {
        try{
            if (isValid()) {
                var dados = {
                    id: document.getElementById("id").value,
                    name: document.getElementById("name").value
                }
                let url = $API+"/Genre/"+dados.id;
                const {response, error} = await fetchAsync(url, "UPDATE", dados);
                if(response.ok)
                    index.switchButton();
                else
                    console.log(error);
            }
        }
        catch (e) {
            console.log(e.stack);
        }
    },

    delete: async function () {
        try{
            let url = $API+"/Genre/"+document.getElementById("id").value;
            const {response, json, error} = await fetchAsync(url, "DELETE");
            if(response.ok){
                preparaModalConfirmDelete(json.result, json.msg);
                document.getElementById("btnOkModal").onclick = function () {
                    index.back();
                }
            }
            else
                console.log(error);
        }
        catch (e) {
            console.log(e.stack);
        }
    },

    back: function () {
        window.location.href = "/Genre";
    }
};
index.init();