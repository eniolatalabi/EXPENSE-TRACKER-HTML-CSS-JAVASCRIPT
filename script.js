let totalAmount = document.getElementById("totalAmount");
let userAmount = document.getElementById("userAmount");
const checkAmountButton = document.getElementById("checkAmount");
const totalAmountButton = document.getElementById("enterAmountButton");
const productTitle = document.getElementById("expenseTitle");
const errorMessage = document.getElementById("budgetError");
const productTitleError = document.getElementById("expenseTitleError");
const productCostError = document.getElementById("expenseCostError");
const amount = document.getElementById("amount");
const expenditureValue = document.getElementById("expenditureValue");
const balanceValue = document.getElementById("balanceAmount");
const list = document.getElementById("list");

let tempAmount = 0;

totalAmountButton.addEventListener ("click", () => {
    tempAmount = totalAmount.value;

    if (tempAmount === "" || tempAmount < 0) {
        errorMessage.classList.remove("hide")
    }
    else {
        errorMessage.classList.add("hide")
        amount.innerHTML=tempAmount;
        balanceValue.innerText= tempAmount - expenditureValue.innerText
        totalAmount.value = "";
    }
})

const disableButtons = (bool) => {
    let editButtons = document.getElementsByClassName ("edit")
    Array.from(editButtons).forEach((element) => {
        element.disaled= bool;
    })
}

const modifyElement = (element, edit=false) => {
    let parentDiv = element.parentElement;
    let currentBalance = balanceValue.innerText;
    let currentExpense = expenditureValue.innerText;
    let parentAmount = parentDiv.querySelector(".amount").innerText;

    if (edit) {
        let parentText = parentDiv.querySelector(".product").innerText;
        productTitle.value = parentText;
        userAmount.value = parentAmount;
        disableButtons(true)
    }

    balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount);
    expenditureValue.innerText = parseInt(currentExpense) - parseInt(parentAmount)
    parentDiv.remove();
}

const listCreator = (expenseName, expenseValue) => {
    let subListContent = document.createElement("div");
    subListContent.classList.add("sublist-content", "flexSpace");
    list.appendChild(subListContent);
    subListContent.innerHTML = `<p class="product">${expenseName}</> <p class="amount">${expenseValue}</p>`;


let editButton = document.createElement("button");
editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
editButton.style.fontSize = "24px"
editButton.addEventListener("click", () => {
    modifyElement(editButton, true);
});

let deleteButton = document.createElement("button");
deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
deleteButton.style.fontSize = "24px"
deleteButton.addEventListener("click", ()=>{
    modifyElement(deleteButton);
});

subListContent.appendChild(editButton);
subListContent.appendChild(deleteButton);
document.getElementById("list").appendChild(subListContent)

};

checkAmountButton.addEventListener("click", () => {
    if (!userAmount.value|| !productTitle.value){
        productTitleError.classList.remove("hide")
        return false
    }

    disableButtons (false);

    let expenditure = parseInt(userAmount.value)
    let sum = parseInt(expenditureValue.innerText) + expenditure;
    expenditureValue.innerText = sum;
    const totalBalance = tempAmount - sum;
    balanceValue.innerText = totalBalance;

    listCreator(productTitle.value, userAmount.value);

    productTitle.value ="";
    userAmount.value = "";
})