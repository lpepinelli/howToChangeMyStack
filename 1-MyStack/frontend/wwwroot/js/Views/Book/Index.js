let index = {
    list: [],

    init: function(){
        index.loadBooks();
        document.getElementById("btnAdd").onclick = index.redirectCreate;

        document.getElementById("btnSearch").onclick = index.search;
        document.getElementById("search_value").addEventListener("keyup", function (event) {
            // Number 13 is the "Enter" key on the keyboard
            if (event.keyCode === 13) {
                event.preventDefault();
                document.getElementById("btnSearch").click();
            }
        });
    },

    search: function () {
        var value = document.getElementById("search_value").value;

        var list = index.list.filter(el => el.name.toLowerCase().indexOf(value.toLowerCase()) > -1);

        index.fillBooks(list);
    },

    loadBooks: async function(){
        try{
            showLoading("divLoading");
            let url = $API+"/Book"
            const {response, json, error} = await fetchAsync(url, "READ");
            if(response.ok){
                index.list = json;
                index.fillBooks(json);
            }
            else
                console.log(error);
        }
        catch (e) {
            console.log(e.stack);
        }
    },

    fillBooks: function(Books){
        let tr="<table class=\"table table-hover table-bordered\">"+
        "<thead class=\"thead-inverse\">"+
            "<tr>"+
                "<th scope=\"col\" style=\"text-align:center\">Código</th>"+
                "<th scope=\"col\">Título</th>"+
                "<th scope=\"col\">Gênero</th>"+
                "<th scope=\"col\">Autor</th>"+
                "<th scope=\"col\" style=\"text-align:center\">Detalhes</th>"+
            "</tr>"+
        "</thead>"+
        "<tbody>";

        for(let i=0; i<Books.length; i++){
            tr += "<tr>"+
                    "<td style='text-align:center; width: 50px'>"+Books[i].id+"</td>"+
                    "<td>"+Books[i].title+"</td>"+
                    "<td>"+Books[i].genre.name+"</td>"+
                    "<td>"+Books[i].author+"</td>"+
                    "<td style='text-align:center; width: 50px'><a class='btn btn-secondary btn-sm' href='/Book/Details/"+Books[i].id+"'><i class='icon-eye'></i></a></td>"+
                "</tr>";
        }
        tr+="</tbody>"+
        "</table>";

        hideLoading("divLoading");
        document.getElementById("table").innerHTML = tr;
    },

    redirectCreate: function(){
        window.location.href = "/Book/Create";
    }
}
index.init();