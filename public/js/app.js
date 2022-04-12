const addI = document.querySelector('#addIngred');
const ulElement = document.querySelector('#ingredientList');
const newIngredAdd = document.querySelector('#newLiq');
const newAmountAdd = document.querySelector('#newAmount');
const ingredDisplay = document.querySelector('#drink-display');

addI.addEventListener("click", addIngredient);

function addIngredient(e){
    const valEl = newIngredAdd.value;
    const valAmount = newAmountAdd.value



    const newEl = document.createElement("INPUT");
    newEl.setAttribute("type","text");
    newEl.setAttribute("name","ingredients");
    newEl.setAttribute("value", valEl);
    ulElement.appendChild(newEl);


    const newEl2 = document.createElement("INPUT");
    newEl2.setAttribute("type","text");
    newEl2.setAttribute("name","amount");
    newEl2.setAttribute("value", valAmount);
    ulElement.appendChild(newEl2);


    
    const newDisEl = document.createElement("li");
    const text = document.createTextNode(valEl);
    newDisEl.appendChild(text);
    ingredDisplay.appendChild(newDisEl);
}

