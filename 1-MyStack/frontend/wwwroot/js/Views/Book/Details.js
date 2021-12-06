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

        const inpFile = document.getElementById("inpFile");
        const previewContainer = document.getElementById("imagePreview");
        const previewImage = previewContainer.querySelector(".image-preview__image");
        const previewDefaultText = previewContainer.querySelector(".image-preview__default-text");

        inpFile.addEventListener("change", function(){
            const file = this.files[0];

            if(file){
                const reader = new FileReader();

                previewDefaultText.style.display = "none";
                previewImage.style.display = "block";

                reader.addEventListener("load", function(){
                    previewImage.setAttribute("src", this.result);
                    //index.gravaImagemBlob(this.result);
                    //if(this.result == null)
                      //  index.resetImage();
                });

                reader.readAsDataURL(file);
            }
            else{
                inpFile.value = "";
                previewDefaultText.style.display = null;
                previewImage.style.display = null;
                previewImage.setAttribute("src", "");
                document.getElementById("remover").innerHTML = "";
            }
            document.getElementById("remover").innerHTML = "<button id=\"btnRemoveImg\" type=\"button\" onclick='index.resetImage()' class=\"btn btn-danger btn-block\">Remover</button>";
        });
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

    getCover: async function (fileName) {

        const response = await fetch($API+"/Book/GetImage", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(fileName)
        });
        if(response.ok){
            const file = await response.blob();
            const previewContainer = document.getElementById("imagePreview");
            const previewImage = previewContainer.querySelector(".image-preview__image");
            const previewDefaultText = previewContainer.querySelector(".image-preview__default-text");

            const reader = new FileReader();
            previewDefaultText.style.display = "none";
            previewImage.style.display = "block";
            reader.addEventListener("load", function(){
                previewImage.setAttribute("src", this.result);
            });
            reader.readAsDataURL(file);
            document.getElementById("remover").innerHTML = "<button id=\"btnRemoveImg\" disabled type=\"button\" onclick='index.resetImage()' class=\"btn btn-danger btn-block\">Remover</button>";
        }
    },

    resetImage: function(){
        const inpFile = document.getElementById("inpFile");
        const previewContainer = document.getElementById("imagePreview");
        const previewImage = previewContainer.querySelector(".image-preview__image");
        const previewDefaultText = previewContainer.querySelector(".image-preview__default-text")

        inpFile.value = "";
        previewDefaultText.style.display = null;
        previewImage.style.display = null;
        previewImage.setAttribute("src", "");
        document.getElementById("remover").innerHTML = "";
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
        //index.isbnMask.masked.reset();
    },

    fillBook: async function(Book){
        index.cleanScreen();
        document.getElementById("id").value = Book.id;
        document.getElementById("title").value = Book.title;
        document.getElementById("author").value = Book.author;
        document.getElementById("publication").value = dateToDateInput(new Date(Book.publication));
        document.getElementById("isbn").value = Book.isbn;
        const res = await index.getCover(Book.id+"-"+Book.cover);

        document.getElementById("isbn").dispatchEvent(new Event("input"));
    },

    switchButton: function () {
        var tr = "";
        if (document.getElementById("title").disabled) {
            tr += "<button type=\"button\" class=\"btn btn-success mr-1\" onclick=\"index.update()\">" +
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

    iniState: async function () {
        index.edit = false;
        const res = await index.fillBook(index.obj);
        index.switchButton();
        resetValidation();
        document.getElementById("cbGenres").dispatchEvent(new Event('input'));
    },

    enableInput: function (bool) {
        let inpts = document.getElementsByTagName("input");
        for(let i=0; i<inpts.length; i++)
            inpts[i].disabled = !bool;

        document.getElementById("cbGenres").disabled = !bool;
        document.getElementById("btnRemoveImg").disabled = !bool;
    },

    updateImage: async function (bk_id, previousImage){
        let formData = new FormData();
        let inpts = document.getElementById("inpFile");
        let auxName="";

        auxName = bk_id+"-"+inpts.files[0].name;
        formData.append("files", inpts.files[0], auxName);

        const options= {
            method: "PUT",
            body: formData,
            processData: false,
            contentType: false,
        }

        const {response, json, error} = await fetchAsync($API+"/Book/Image?previousFile="+bk_id+"-"+previousImage, "CREATE", null, options);
        if(response.ok)
            console.log(json);
        else
            console.log(error);
    },

    update: async function () {
        try{
            if (isValid()) {
                let previousImage = index.obj.cover;
                var dados = {
                    id: document.getElementById("id").value,
                    title: document.getElementById("title").value,
                    author: document.getElementById("author").value,
                    cover: document.getElementById("inpFile").files[0] ? document.getElementById("inpFile").files[0].name : previousImage,
                    genre: {
                        id: document.getElementById("cbGenres").value
                    },
                    isbn: document.getElementById("hiddenIsbn").value,
                    publication: document.getElementById("publication").value
                }
                let url = $API+"/Book/"+dados.id;
                const {response, error} = await fetchAsync(url, "UPDATE", dados);
                if(response.ok){
                    if(previousImage!=dados.cover)
                        index.updateImage(dados.id, previousImage);
                    index.switchButton();
                }
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