//constante que guardará todos os botões de "+" em um array
const ADDCARD_BUTTON = document.querySelectorAll(".add-card-area"); 

//variavel que vai definir os id's dos cards
var qtdId = 0; 

//loop que rodará por todos os elementos da constante
for(var i = 0; i< ADDCARD_BUTTON.length; i++) { 
    ADDCARD_BUTTON[i].addEventListener("click", function(e) { //evento acionado ao botão ser clicado
        //criando a div principal do card
        var card_ = document.createElement("div");
        card_.className = "card";
        card_.id = qtdId;
        qtdId++;
        card_.draggable = true;

        //adicionando um evento que será acionado quando o card começar a ser arrastado
        card_.addEventListener("dragstart", function(e) {
            //vou guardar o id do meu objeto em uma data com o nome de "id"
            e.dataTransfer.setData("id", e.target.id); //param: nome da data, data em si
        });
        
        //criando a descrição do card
        var card_description_ = document.createElement("div");
        card_description_.className = "description-card";
        card_description_.contentEditable = true;

        //adicionando a descrição a div principal do card
        card_.append(card_description_);

        //setando onde a div onde o card vai ser criado e adicionando logo em seguida
        var realTarget_ = e.currentTarget.parentElement.parentElement.querySelector(".cards-area");
        realTarget_.append(card_);

        //setando para assim que o card for criado, ele logo tenha foco
        card_description_.focus();
        
    });
};

//constante que guardará todos as section's 
const CARDS_AREA = document.querySelectorAll(".cards-area");

var defaultColor;

//loop que rodará por todos os elementos da constante (section s)
for(var j = 0; j < CARDS_AREA.length;j++) {
    CARDS_AREA[j].addEventListener("dragover", function(e) { //evento acionado quando um objeto dragged estiver em cima dele
        e.preventDefault(); //preventDefault: evita o comportamento padrão da area (section) quando um objeto dragged esta em cima dele
    });

    CARDS_AREA[j].addEventListener("drop", function(e) {
        if(e.target.classList.contains("cards-area")) { 
            e.preventDefault();
            var data_ = e.dataTransfer.getData("id"); //pega a data que estava guardada no nome de "id"
            var card_ = document.getElementById(data_); //pega o elemento pelo id conseguido
            
            e.target.appendChild(card_); //adiciona o cartão na section
        }
    });
};
