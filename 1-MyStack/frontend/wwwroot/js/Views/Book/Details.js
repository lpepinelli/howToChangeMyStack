document.addEventListener("DOMContentLoaded", function () {
    var isbnMask = IMask(document.getElementById('isbn'), {
        mask: '0-0000-0000-0'
    });
    document.getElementById("isbn").addEventListener("input", function () {
        document.getElementById("hiddenIsbn").value = isbnMask.unmaskedValue;
    });
    index.isbnMask = isbnMask;
});

let index = {
    obj:[],
    isbnMask:{},
    edit: false,
    init: function(){
        index.loadBook();
        document.getElementById("btnEditar").onclick = index.edit;
        document.getElementById("btnVoltar").onclick = index.back;
        document.getElementById("btnExcluirModal").onclick = index.delete;
        insertValidation();
    },

    edit: function(){
        index.switchButton();
        index.edit = true;
    },

    loadBook: async function(){
        try{
            let url = window.location.pathname.split('/');
            url = $API+"/Book/"+url[url.length-1];
            const {response, json, error} = await fetchAsync(url, "READ");
            if(response.ok){
                index.obj = json;
                index.getGenres();
                index.fillBook(json);
            }
            else
                console.log(error);
        }
        catch (e) {
            console.log(e.stack);
        }
    },

    getGenres: async function () {
        try{
            var selected = index.obj.genre.id;
            var grs = document.getElementById("cbGenres");
            grs.classList.add("fakeDisabled");
            grs.innerHTML = "<option>Carregando...</option>";

            let url = $API+"/Genre";
            const {response, json, error} = await fetchAsync(url, "READ");
            if(response.ok){
                var aux = "<option value=\"0\">Selecione</option>";
                json.forEach(function (e, index) {
                    var opt;
                    if (e.id == selected)
                        opt = "<option value=\"{0}\" selected>{1}</option>";
                    else
                        opt = "<option value=\"{0}\">{1}</option>";

                    opt = opt.replace("{0}", e.id);
                    opt = opt.replace("{1}", e.name);
                    aux += opt;
                });
                grs.innerHTML = aux;
                grs.classList.remove("fakeDisabled");
                document.getElementById("cbGenres").dispatchEvent(new Event('input'));
            }
            else{
                grs.remove("fakeDisabled");
                grs.classList.innerHTML = "";
                console.log(error);
            }
        }
        catch (e) {
            console.log(e.stack);
        }
    },

    cleanScreen: function(){
        document.getElementById("id").value = "";
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("publication").value = "";
        document.getElementById("isbn").value = "";
        index.isbnMask.masked.reset();
    },

    fillBook: function(Book){
        index.cleanScreen();
        document.getElementById("id").value = Book.id;
        document.getElementById("title").value = Book.name;
        document.getElementById("author").value = Book.author;
        document.getElementById("publication").value = dateToDateInput(Book.publication);
        document.getElementById("isbn").value = Book.isbn;
        //document.getElementById("inpFile").value =

        document.getElementById("isbn").dispatchEvent(new Event("input"));
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
        index.edit = false;
        index.switchButton();
        index.preencheInsumo(index.obj);
        resetValidation();
        document.getElementById("cbGenres").dispatchEvent(new Event('input'));
    },

    enableInput: function (bool) {
        let inpts = document.getElementsByTagName("input");
        for(let i=0; i<inpts.length; i++)
            inpts[i].disabled = !bool;

        document.getElementById("cbGenres").disabled = !bool;
    },

    create: async function () {
        try{
            if (isValid()) {
                var dados = {
                    id: document.getElementById("id").value,
                    name: document.getElementById("name").value
                }
                let url = $API+"/Book/"+dados.id;
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
            let url = $API+"/Book/"+document.getElementById("id").value;
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
        window.location.href = "/Book";
    }
};
index.init();