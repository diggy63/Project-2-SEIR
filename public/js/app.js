const addI = document.querySelector("#addIngred");
const ulElement = document.querySelector("#ingredientList");
const newIngredAdd = document.querySelector("#newLiq");
const newAmountAdd = document.querySelector("#newAmount");
const ingredDisplay = document.querySelector("#drink-display");
const getAll = document.querySelectorAll(".row");
const wholeDoc = document.querySelector(".contain");
const commentCounter = document.querySelectorAll("#commentList");

if (commentCounter.length > 1) {
    
    let count = commentCounter.length - 1;
    let startHeight = 1200
    for (let i = count; i > 0; i--) {
        console.log("here");
         startHeight = startHeight + 300;
         console.log("grow");
         wholeDoc.style.height = `${startHeight}px`;
    }
}





if (getAll.length > 1) {
     let count = getAll.length - 2;
     let startHeight = 1000;
     for (let i = count; i > 0; i--) {
          startHeight = startHeight + 450;
          console.log("grow");
          wholeDoc.style.height = `${startHeight}px`;
     }
}


if (addI) {
     addI.addEventListener("click", addIngredient);
}

function addIngredient(e) {
     const valEl = newIngredAdd.value;
     const valAmount = newAmountAdd.value;

     const newEl = document.createElement("INPUT");
     newEl.setAttribute("type", "text");
     newEl.setAttribute("name", "ingredients");
     newEl.setAttribute("value", valEl);
     ulElement.appendChild(newEl);

     const newEl2 = document.createElement("INPUT");
     newEl2.setAttribute("type", "text");
     newEl2.setAttribute("name", "amount");
     newEl2.setAttribute("value", valAmount);
     ulElement.appendChild(newEl2);

     const newDisEl = document.createElement("li");
     const text = document.createTextNode(
          `Ingredient: ${valEl}       -        Amount: ${valAmount}`
     );
     const h4El = document.createElement("h4");
     h4El.appendChild(text);
     newDisEl.appendChild(h4El);
     ingredDisplay.appendChild(newDisEl);
     newIngredAdd.value = '';
     newAmountAdd.value = '';
}
