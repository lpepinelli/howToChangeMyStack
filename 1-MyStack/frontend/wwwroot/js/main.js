const $API = "https://localhost:5002/api";

function showLoading(id) {
    document.getElementById(id).style.display = "flex";
}


function hideLoading(id) {
    document.getElementById(id).style.display = "none";
}

function dateToDateInput(date){
    let mesAtual = (date.getMonth() + 1).toString().padStart(2, '0');
    let diaAtual = (date.getDate()).toString().padStart(2, '0');
    return date.getFullYear() + "-" + mesAtual + "-" + diaAtual;
}

function insertValidation(){
    var elements = document.getElementsByClassName("required");
    var msgs = document.getElementsByClassName("text-danger");

    for (var i = 0; i < elements.length; i++) {
        elements[i].oninput = function () {

            if (this.value == "" || this.value == 0 || (this.tagName == "TD" && this.textContent == "") || this.value == "R$") {
                this.classList.add("invalido");
                for (var j = 0; j < msgs.length; j++) {
                    if (msgs[j].previousElementSibling == this) {
                        msgs[j].style.display = "block";
                    }
                }
            }
            else {
                this.classList.remove("invalido");
                for (var j = 0; j < msgs.length; j++) {
                    if (msgs[j].previousElementSibling == this) {
                        msgs[j].style.display = "none";
                    }
                }
            }
        }
    }
}

function resetValidation(){
    const elements = document.querySelectorAll(".invalido");
    const msgs = document.querySelectorAll("div.text-danger");
    for(let i=0; i<elements.length; i++)
        elements[i].classList.remove("invalido");
    for(let j = 0; j < msgs.length; j++)
        msgs[j].style.display = "none";
}

function isValid(){
    var elements = document.getElementsByClassName("required");

    for (var i = 0; i < elements.length; i++) {
        if (elements[i].value == "" || elements[i].value == 0) {
            elements[i].dispatchEvent(new Event('input'));
        }
    }

    var invalidos = document.getElementsByClassName("invalido");
    if (invalidos.length == 0)
        return true;
    else {
        invalidos[0].focus();
        return false;
    }
}

function cloneArrayObject(obj){
    let aux=[];
    for (let i=0; i<obj.length; i++)
        aux.push({...obj[i]});
    return aux;
}

async function fetchAsync(url, method, data=null, options=null) { //Padronizar a config com as opções GET UPDATE DELETE POST
    let messages = {
        200: "200 - Ok",
        201: "201 - Created",
        204: "204 - No Content",
        400: "400 - Bad Request",
        401: "401 - Unauthorized",
        403: "403 - Forbidden",
        404: "404 - Not Found",
        405: "405 - Method Not Allowed",
        415: "415 - Unsupported Media Type",
        418: "418 - I'm a teapot",
        500: "500 - Internal Server Error",
        501: "501 - Not Implemented",
        503: "503 - Service Unavailable"
    }
    if(options==null){
        switch(method){
            case "CREATE":
                options = {method: "POST", headers: {"Accept": "application/json","Content-Type": "application/json; charset=utf-8"}, body: JSON.stringify(data)};
                break;
            case "READ":
                if(data == null)
                    options = {method: "GET", headers: {"Content-Type": "application/json; charset=utf-8"}};
                else
                    options = {method: "POST", headers: {"Accept": "application/json","Content-Type": "application/json; charset=utf-8"}, body: JSON.stringify(data)};
                break;
            case "UPDATE":
                options = {method: "PUT", headers: {"Accept": "application/json","Content-Type": "application/json; charset=utf-8"}, body: JSON.stringify(data)};
                break;
            case "DELETE":
                options = {method: "DELETE", headers: {"Accept": "application/json", "Content-Type": "application/json; charset=utf-8"}};
        }
    }
    let response, json, message, error;
    try{
        error = null;
        response = await fetch(url, options);
        message = messages[response.status];
        json = await response.json();
        if(!response.ok){
            error = {
                message: "StatusCode: "+message+" | Error: "+json.title,
                errors: json.errors
            };
            /*json.errors.forEach(element => {
                error+="\n"+element;
            });*/
        }
    }
    catch(erro){
        json = null;
        message = messages[response.status];
        error = "StatusCode: "+message+
        "\n"+erro;
    }
    finally{
        return {response, json, error, message};
    }
}

function preparaModalConfirmDelete(result, msg){
    if(result){
        document.getElementById("boxIcon").classList.remove("box-icon-danger");
        document.getElementById("boxIcon").classList.add("box-icon-confirm");
        document.getElementById("icon").classList.remove("icon-android-close");
        document.getElementById("icon").classList.add("icon-android-done");
        document.getElementById("title").innerText = "Deu certo!";
        document.getElementById("msgConfirm").innerText = msg;
        document.getElementById("btnOkModal").classList.remove("btn-danger");
        document.getElementById("btnOkModal").classList.add("btn-confirm");
    }
    else{
        document.getElementById("boxIcon").classList.remove("box-icon-confirm");
        document.getElementById("boxIcon").classList.add("box-icon-danger");
        document.getElementById("icon").classList.remove("icon-android-done");
        document.getElementById("icon").classList.add("icon-android-close");
        document.getElementById("title").innerText = "Erro!";
        document.getElementById("msgConfirm").innerText = msg;
        document.getElementById("btnOkModal").classList.remove("btn-confirm");
        document.getElementById("btnOkModal").classList.add("btn-danger");
    }
}