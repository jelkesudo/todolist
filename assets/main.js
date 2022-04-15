window.onload = function(){
    console.log("ok");
    let niz = JSON.parse(localStorage.getItem("tasks"));
    let id = JSON.parse(localStorage.getItem("id"));
    loadTasks(niz);
    $("#ubaciButton").click(function(){
        niz = JSON.parse(localStorage.getItem("tasks"));
        let unetText = $("#ubaci").val();
        if(unetText == "full reset"){
            localStorage.removeItem("tasks");
            localStorage.removeItem("id");
            $("#lista").html("");
            $("#ubaci").html("");
            return 0;
        }
        if(unetText == ""){
            $("#error").html("Polje ne moze biti prazno");
            return 0;
        }
        $("#error").html("");
        if(niz == null){
            niz = [];
            if(id == null){
                id = 0;
            }
            niz.push({
                id: id++,
                text: unetText,
                cross: false
            });
            localStorage.setItem("tasks", JSON.stringify(niz));
            localStorage.setItem("id", JSON.stringify(id));
            loadTasks(niz);
            return 0;
        }
        niz.push({
            id: id++,
            text: unetText,
            cross: false
        });
        localStorage.setItem("tasks", JSON.stringify(niz));
        localStorage.setItem("id", JSON.stringify(id));
        $("#ubaci").val("");
        loadTasks(niz);
    });
}

function loadTasks(niz){
    let html = "";
    if(niz == null){
        $("#lista").html(html);
        return 0;
    }
    for(let n of niz){
        html += `<div class="col-12 d-flex justify-content-around text-center pt-2 my-3 border">
        <div class="w-75 text-left">
            ${ifCross(n.cross, n.text)}
        </div>
        <div class="w-25">
            <button class="btn-success precrtaj" data-id="${n.id}">
                &check;
            </button>
            <button class="btn-danger obrisi" data-id="${n.id}">
                &cross;
            </button>
        </div>
        </div>`;
    }
    $("#lista").html(html);
    $(".precrtaj").click(precrtajGa);
    $(".obrisi").click(obrisiGa);
}

function ifCross(cross, text){
    let html = `<p>${text}</p>`;
    if(cross){
        html = `<p><s>${text}</s></p>`;
    }
    return html;
}

function precrtajGa(){
    let precrta = $(this).data("id");
    let niz = JSON.parse(localStorage.getItem("tasks"));
    let odabir = niz.find(el => el.id == precrta);
    if(!odabir.cross){
        odabir.cross = true;
    }
    else{
        odabir.cross = false;
    }
    localStorage.setItem("tasks", JSON.stringify(niz));
    loadTasks(niz);
}

function obrisiGa(){
    let obris = $(this).data("id");
    let niz = JSON.parse(localStorage.getItem("tasks"));
    niz = niz.filter(e => e.id != obris);
    localStorage.setItem("tasks", JSON.stringify(niz));
    loadTasks(niz);
}