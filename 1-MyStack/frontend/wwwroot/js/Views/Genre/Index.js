let index = {
    list: [],

    init: function(){
        index.loadGenres();
        document.getElementById("btnAdd").onclick = index.redirectCreate;

        document.getElementById("btnSearch").onclick = index.buscar;
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

        index.fillGenres(list);
    },

    loadGenres: async function(){
        try{
            showLoading("divLoading");
            let url = $API+"/Genre"
            const {response, json, error} = await fetchAsync(url, "READ");
            if(response.ok){
                index.list = json;
                index.fillGenres(json);
            }
            else
                console.log(error);
        }
        catch (e) {
            console.log(e.stack);
        }
    },

    fillGenres: function(Genres){
        let tr="<table class=\"table table-hover table-bordered\">"+
        "<thead class=\"table-dark\">"+
            "<tr>"+
                "<th scope=\"col\" style=\"text-align:center\">Codigo</th>"+
                "<th scope=\"col\">Nome</th>"+
                "<th scope=\"col\" style=\"text-align:center\">Detalhes</th>"+
            "</tr>"+
        "</thead>"+
        "<tbody>";

        for(let i=0; i<Genres.length; i++){
            tr += "<tr>"+
                    "<td style='text-align:center; width: 50px'>"+Genres[i].id+"</td>"+
                    "<td>"+Genres[i].name+"</td>"+
                    "<td style='text-align:center; width: 50px'><a class='btn btn-light border btn-sm' href='/Genre/Detalhes/"+Genres[i].id+"'><i class='ionicons ion-eye'></i></a></td>"+
                "</tr>";
        }
        tr+="</tbody>"+
        "</table>";

        hideLoading("divLoading");
        document.getElementById("table").innerHTML = tr;
    },

    redirectCreate: function(){
        window.location.href = "/Genre/Create";
    }
}
index.init();