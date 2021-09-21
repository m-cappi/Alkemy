/** @format */

const server = "http://localhost:3000/";
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

const tableBuilder = async function (router, table) {
    let transactionsJson = await getData(server, router);
    let headerContent = constructTableHeader(transactionsJson);
    let bodyContent = constructTableBody(transactionsJson);
    document.querySelector(`${table} thead`).innerHTML = headerContent;
    document.querySelector(`${table} tbody`).innerHTML = bodyContent;

    dataCheckboxesToggle(constructorData);
};

const tableRefresher = async function (router, table) {
    let transactionsJson = await getData(server, router);
    let bodyContent = constructTableBody(transactionsJson);
    document.querySelector(`${table} tbody`).innerHTML = bodyContent;
    dataCheckboxesToggle(constructorData);
};

const getData = async function (server, router) {
    server = server + router;
    let data = await fetch(server).then((res) => {
        if (!res.ok) {
            throw new Error(`An error has occured: ${res.status}`);
        }
        return res.json();
    });
    return data;
};

const constructTableBody = function (data) {
    if (!Array.isArray(data)) {
        data = [data];
    }
    let bodyContent = "";
    data.forEach((element) => {
        bodyContent += `<tr data-id_transaction="${element["ID"]}" 
        data-id_category="${element["id_category"]}">
        <td><input type="checkbox" name="transaction" id=""></td>`;
        Object.keys(element).forEach((key) => {
            if (key == "ID" || key == "id_category" || key == "Type") {
            } else if (key == "Date") {
                let date = element[key].split("T")[0];
                bodyContent += `<td data-server_value="${date}">${date}</td>`;
            } else {
                bodyContent += `<td data-server_value="${element[key]}">${element[key]}</td>`;
            }
        });
        bodyContent += "</tr>";
    });
    return bodyContent;
};

const constructTableHeader = function (data) {
    if (!Array.isArray(data)) {
        data = [data];
    }
    let headerContent = "<tr><th></th>";
    Object.keys(data[0]).forEach((key) => {
        if (!(key == "ID" || key == "id_category" || key == "Type")) {
            headerContent += `<th>${key}</th>`;
        }
    });
    headerContent += "</tr>";
    return headerContent;
};

const categoriesHandler = async function () {
    let categoriesJson = await getData(server, "categories");
    categoriesHtmlOptions = optionsConstructor(categoriesJson);
    document.querySelector("#newCategory").innerHTML += categoriesHtmlOptions;
    document.querySelector("#filterExpenses").innerHTML +=
        categoriesHtmlOptions;
    document.querySelector("#filterIncome").innerHTML += categoriesHtmlOptions;
};

const optionsConstructor = function (categories) {
    let temp = "";
    categories.forEach((category) => {
        temp += `<option value="${category["id_category"]}">${category["categ_name"]}</option>`;
    });
    return temp;
};

const dataCheckboxesToggle = function (constructorDataPack) {
    let dataCheckboxes = document.querySelectorAll(
        "input[type=checkbox][name=transaction]"
    );
    dataCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
            let grandpaRow = checkbox.parentElement.parentElement;
            if (this.checked) {
                rowToInput(grandpaRow, constructorDataPack);
            } else {
                rowReverse(grandpaRow);
            }
        });
    });
};

const rowToInput = function (row, constructorDataPack) {
    for (let i = 1; i < row.childElementCount; i++) {
        switch (constructorDataPack[i - 1]["id"]) {
            case "creation_date":
                row.children[i].innerHTML = `<input type="text" 
                onfocus="(this.type='date')" 
                onblur="(this.value == '' ? this.type='text' : this.type='date')" 
                name="${constructorDataPack[i - 1]["id"]}" 
                placeholder="${row.children[i].dataset.server_value}">`;
                break;
            case "fk_type":
                break;
            case "fk_category":
                row.children[i].innerHTML = `<select name="fk_category">
                                    <option hidden selected value="null">${row.children[i].dataset.server_value}</option> 
                                    ${categoriesHtmlOptions} 
                                </select>`;
                break;
            default:
                row.children[i].innerHTML = `<input type="
                ${constructorDataPack[i - 1]["type"]}" 
                name="${constructorDataPack[i - 1]["id"]}" 
                placeholder="${row.children[i].dataset.server_value}">`;
                break;
        }
    }
};

const rowReverse = function (row) {
    for (let i = 1; i < row.childElementCount; i++) {
        // row.children[0] is the checkbox
        if (row.children[i].children[0]?.tagName  == "INPUT") {
            row.children[i].innerHTML = row.children[i].dataset.server_value;
        } else if (row.children[i].children[0]?.tagName == "SELECT") {
            row.children[i].innerHTML = row.children[i].dataset.server_value;
        }
    }
};

const btnSubmitTransaction = document.querySelector(
    "#newEntry input[type=submit]"
);

btnSubmitTransaction.addEventListener("click", (event) => {
    event.preventDefault();
    let pack = transactionPackaging();
    postData(server, "transactions", [pack])
        .then((res) => {
            if (res.ok) {
                window.alert("success!");
            }
        })
        .then(() => {
            tableRefresher("transactions/expenses", "#expensesLog");
            tableRefresher("transactions/income", "#incomeLog");
        });
    newEntry.reset();
    document.getElementById("newDate").value = new Date().toDateInputValue();
});

const transactionPackaging = function () {
    return {
        concept: document.querySelector("#newConcept").value,
        amount: document.querySelector("#newAmount").value,
        creation_date: document.querySelector("#newDate").value,
        fk_category: document.querySelector("#newCategory").value,
        fk_type: document.querySelector("input[name=fk_type]:checked").value,
    };
};

const postData = async function (server, router, pack) {
    server = server + router;
    let data = await fetch(server, {
        method: "POST",
        body: JSON.stringify(pack),
        headers: { "Content-Type": "application/json" },
    }).then((res) => {
        if (!res.ok) {
            throw new Error(`An error has occured: ${res.status}`);
        }
        return res;
    });
    return data;
};

const btnEditExpenses = document.querySelector("#expensesEdit");

btnEditExpenses.addEventListener("click", () => {
    editWrapper("transactions/expenses", "#expensesLog");
});

const btnEditIncome = document.querySelector("#incomeEdit");

btnEditIncome.addEventListener("click", () => {
    editWrapper("transactions/income", "#incomeLog");
});

const editWrapper = function (router, table) {
    let package = selectedRowsPackage(table);
    putData(server, "transactions", package)
        .then((res) => {
            if (res.ok) {
                window.alert("success!");
            }
        })
        .then(() => tableRefresher(router, table));
};

const putData = async function (server, router, pack) {
    server = server + router;
    let data = await fetch(server, {
        method: "PUT",
        body: JSON.stringify(pack),
        headers: { "Content-Type": "application/json" },
    }).then((res) => {
        if (!res.ok) {
            throw new Error(`An error has occured: ${res.status}`);
        }
        return res;
    });
    return data;
};

const selectedRowsPackage = function (table) {
    let selected = document.querySelectorAll(
        `${table} input[type=checkbox][name=transaction]:checked`
    );
    selected = getRows(selected);
    return compilePackage(selected);
};

const getRows = function (children) {
    let myRows = [];
    children.forEach((child) => {
        myRows.push(child.parentElement.parentElement);
    });
    return myRows;
};

const compilePackage = function (rows) {
    let package = [];
    rows.forEach((row) => {
        let temp = { id_transaction: row.dataset.id_transaction };
        for (let i = 1; i < row.childElementCount; i++) {
            temp[row.children[i].children[0].getAttribute("name")] = row
                .children[i].children[0].value
                ? row.children[i].children[0].value
                : row.children[i].dataset.server_value;
        }
        package.push(temp);
    });
    return package;
};

const btnDeleteExpenses = document.querySelector("#expensesDelete");

btnDeleteExpenses.addEventListener("click", () => {
    deleteWrapper("transactions/expenses", "#expensesLog");
});

const btnDeleteIncome = document.querySelector("#incomeDelete");

btnDeleteIncome.addEventListener("click", () => {
    deleteWrapper("transactions/income", "#incomeLog");
});

const deleteWrapper = function (router, table) {
    let package = selectedRowsPackage(table);
    deleteData(server, "transactions", package)
        .then((res) => {
            if (res.ok) {
                window.alert("success!");
            }
        })
        .then(() => tableRefresher(router, table));
};

const deleteData = async function (server, router, package) {
    server = server + router;
    let data = await fetch(server, {
        method: "DELETE",
        body: JSON.stringify(package),
        headers: { "Content-Type": "application/json" },
    }).then((res) => {
        if (!res.ok) {
            throw new Error(`An error has occured: ${res.status}`);
        }
        return res;
    });
    return data;
};

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

tableBuilder("transactions/expenses", "#expensesLog");
tableBuilder("transactions/income", "#incomeLog");
categoriesHandler();
