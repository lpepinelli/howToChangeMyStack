let index={
    init: function(){
        document.getElementById("btnSalvar").onclick = index.isValid;
        document.getElementById("btnSalvarModal").onclick = index.create;
        document.getElementById("btnVoltar").onclick = index.back;
        document.getElementById("btnOkModal").onclick = index.back;
        insertValidation();
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

    create: async function () {
        try{
            if (isValid()) {
                var dados = {
                    name: document.getElementById("name").value
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

    back: function () {
        window.location.href = "/Genre";
    }
};
index.init();