document.addEventListener("DOMContentLoaded", function () {
    var isbnMask = IMask(document.getElementById('isbn'), {
        mask: '0-0000-0000-0'
    });
    document.getElementById("isbn").addEventListener("input", function () {
        document.getElementById("hiddenIsbn").value = isbnMask.unmaskedValue;
    });
});

let index={
    init: function(){
        document.getElementById("btnSalvar").onclick = index.isValid;
        document.getElementById("btnSalvarModal").onclick = index.create;
        document.getElementById("btnVoltar").onclick = index.back;
        document.getElementById("btnOkModal").onclick = index.back;
        index.getGenres();
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
            document.getElementById("remover").innerHTML = "<button type=\"button\" onclick='index.resetImage()' class=\"btn btn-danger btn-block\">Remover</button>";
        });

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

    isValid: function () {

        var elements = document.getElementsByClassName("required");

        for (var i = 0; i < elements.length; i++) {
            if (elements[i].value == "" || elements[i].value == 0) {
                elements[i].dispatchEvent(new Event('input'));
            }
        }

        var invalid = document.getElementsByClassName("invalido");

        if (invalid.length == 0) {
            document.getElementById("btnSalvar").dataset.target = "#warning";
        }
        else
            document.getElementById("btnSalvar").dataset.target = "";
    },

    getGenres: async function () {
        try{
            var genres = document.getElementById("cbGenres");
            genres.classList.add("fakeDisabled");
            genres.innerHTML = "<option>Carregando...</option>";
            genres.disabled = false;

            let url = $API+"/Genre";
            const {response, json, error} = await fetchAsync(url, "READ");
            if(response.ok){
                var aux = "<option value=\"0\">Selecione</option>";
                json.forEach(function (e, index) {
                    var opt = "<option value=\"{0}\">{1}</option>";
                    opt = opt.replace("{0}", e.id);
                    opt = opt.replace("{1}", e.name);

                    aux += opt;
                });
                genres.innerHTML = aux;
                genres.classList.remove("fakeDisabled");
            }
            else{
                genres.remove("fakeDisabled");
                genres.classList.innerHTML = "";
                console.log(error);
            }
        }
        catch (e) {
            console.log(e.stack);
        }
    },

    create: async function () {
        try{
            if (isValid()) {
                var dados = {
                    title: document.getElementById("title").value,
                    author: document.getElementById("author").value,
                    image: document.getElementById("inpFile").value,
                    genre: {
                        id: document.getElementById("cbGenres").value
                    },
                    isbn: document.getElementById("hiddenIsbn").value,
                    publication: document.getElementById("publication").value
                }
                let url = $API+"/Book";
                const {response, error} = await fetchAsync(url, "CREATE", dados);
                if(!response.ok)
                    console.log(error);
            }
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