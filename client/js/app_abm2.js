/** @format */

const server = "http://localhost:3000/";
const connection = new CRUD(server);
let categoriesHtmlOptions; //setting this up as a global variable to prevent unnecesary fetchs

const constructorData = [
    { id: "creation_date", type: "date" },
    { id: "concept", type: "text" },
    { id: "amount", type: "number" },
    { id: "fk_category", type: "text" },
    { id: "fk_type", type: "text" },
];

Date.prototype.toDateInputValue = function () {
    let local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
};
document.getElementById("newDate").value = new Date().toDateInputValue();

const btnSubmitTransaction = document.querySelector(
    "#newEntry input[type=submit]"
);

btnSubmitTransaction.addEventListener("click", (event) => {
    event.preventDefault();
    let pack = newTransactionPackaging();
    connection.fetchMe("POST", pack, "transactions").then(() => {
        if (pack.fk_type == 1) {
            tableRefresher("transactions/income", "#incomeLog");
        } else {
            tableRefresher("transactions/expenses", "#expensesLog");
        }
    });
    newEntry.reset();
    document.getElementById("newDate").value = new Date().toDateInputValue();
});

tableBuilder("transactions/expenses", "#expensesLog");
tableBuilder("transactions/income", "#incomeLog");
categoriesHandler();

const btnEditExpenses = document.querySelector("#expensesEdit");

btnEditExpenses.addEventListener("click", () => {
    editWrapper("transactions/expenses", "#expensesLog");
});

const btnEditIncome = document.querySelector("#incomeEdit");

btnEditIncome.addEventListener("click", () => {
    editWrapper("transactions/income", "#incomeLog");
});

const btnDeleteExpenses = document.querySelector("#expensesDelete");

btnDeleteExpenses.addEventListener("click", () => {
    deleteWrapper("transactions/expenses", "#expensesLog");
});

const btnDeleteIncome = document.querySelector("#incomeDelete");

btnDeleteIncome.addEventListener("click", () => {
    deleteWrapper("transactions/income", "#incomeLog");
});

const filterExpenses = document.querySelector("#filterExpenses");

filterExpenses.addEventListener("change", () => {
    //console.log(filterExpenses.value)
    tableRefresher(
        `transactions/expenses?id_category=${filterExpenses.value}`,
        "#expensesLog"
    );
});

const filterIncome = document.querySelector("#filterIncome");

filterIncome.addEventListener("change", () => {
    tableRefresher(
        `transactions/income?id_category=${filterIncome.value}`,
        "#incomeLog"
    );
});
