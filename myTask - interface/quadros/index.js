document.body.onload = () => {
    document.body.style.display = "block";
}

//constante que guardará todos os botões de "+" em um array
const add_task_button = document.querySelectorAll(".add-task"); 
const remove_task_button = document.querySelectorAll(".remove-card");

var focus = undefined;

for(var i = 0; i < remove_task_button.length; i++) {
    remove_task_button[i].addEventListener("click", (e) => {
        var collumns = ["collumn0", "collumn1", "collumn2"];
        for(var j = 0; j < collumns.length; j++) {
            if(focus.classList.contains(collumns[j]) && e.target.parentNode.classList.contains(collumns[j])) {
                focus.remove();
            }
        }
    })
}

//variavel que vai definir os id's dos cards
var qtdId = 1; 

for(var i = 0; i< add_task_button.length; i++) {
    add_task_button[i].addEventListener("click", function(e) {
        var realTarget_ = e.currentTarget.parentElement.parentElement.querySelector(".tasks-container");
        
        //criando a div principal do card
        var card_ = document.createElement("div");
        card_.className = "task " + realTarget_.id;
        card_.id = qtdId;
        qtdId++;
        card_.draggable = true;

        //adicionando um evento que será acionado quando o card começar a ser arrastado
        card_.addEventListener("dragstart", function(e) {
            //vou guardar o id do meu objeto em uma data com o nome de "id"
            e.dataTransfer.setData("id", e.target.id); //param: nome da data, data em si
        });
        card_.addEventListener("dragend", (e) => {
            if(focus_container != undefined) {
                
                document.getElementById(focus_container).classList.remove("focus");
                focus_container = undefined;
            }
        })
        
        card_.addEventListener("focusout", (e) => {
            focus = e.target.parentNode;
        })
        
        //criando a descrição do card
        var card_description_ = document.createElement("div");
        card_description_.className = "task-description";
        card_description_.contentEditable = true;

        //adicionando a descrição a div principal do card
        card_.append(card_description_);

        realTarget_.append(card_);

        card_description_.focus();
    });
};

const task_container = document.querySelectorAll(".tasks-container");

var focus_container = undefined;

task_container.forEach(task => {
    task.addEventListener("dragenter", (e) => {
        if(focus_container != task.id) {
            if(focus_container != undefined) document.getElementById(focus_container).classList.remove("focus")
            focus_container = task.id;

            task.classList.add("focus")
        }
    });

    task.addEventListener("dragover", function(e) { //evento acionado quando um objeto dragged estiver em cima dele 
        e.preventDefault(); //preventDefault: evita o comportamento padrão da area (section) quando um objeto dragged esta em cima dele
    });

    task.addEventListener("drop", function(e) {
        document.getElementById(focus_container).classList.remove("focus")

        e.preventDefault();

        var data_ = e.dataTransfer.getData("id"); //pega a data que estava guardada no nome de "id"
        var card_ = document.getElementById(data_); //pega o elemento pelo id conseguido
        card_.className = "task " + e.target.id;

        document.getElementById(focus_container).appendChild(card_); //adiciona o cartão na section
        focus_container = undefined;
    });
});
