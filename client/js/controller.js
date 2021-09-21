/** @format */

const categoriesHandler = async function () {
    let categoriesJson = await connection.get("categories");
    categoriesHtmlOptions = optionsConstructor(categoriesJson);
    document.querySelector("#newCategory").innerHTML += categoriesHtmlOptions;
    document.querySelector("#filterExpenses").innerHTML +=
        categoriesHtmlOptions;
    document.querySelector("#filterIncome").innerHTML += categoriesHtmlOptions;
};

const tableBuilder = async function (router, table) {
    let transactionsJson = await connection.get(router);
    let headerContent = constructTableHeader(transactionsJson);
    let bodyContent = constructTableBody(transactionsJson);
    document.querySelector(`${table} thead`).innerHTML = headerContent;
    document.querySelector(`${table} tbody`).innerHTML = bodyContent;

    dataCheckboxesToggle(constructorData);
};

const tableRefresher = async function (router, table) {
    let transactionsJson = await connection.get(router);
    let bodyContent = constructTableBody(transactionsJson);
    document.querySelector(`${table} tbody`).innerHTML = bodyContent;
    dataCheckboxesToggle(constructorData);
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

const newTransactionPackaging = function () {
    return {
        concept: document.querySelector("#newConcept").value,
        amount: document.querySelector("#newAmount").value,
        creation_date: document.querySelector("#newDate").value,
        fk_category: document.querySelector("#newCategory").value,
        fk_type: document.querySelector("input[name=fk_type]:checked").value,
    };
};

const editWrapper = function (router, table) {
    let package = selectedRowsPackage(table);
    connection
        .fetchMe("PUT", package, "transactions")
        .then(() => tableRefresher(router, table));
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

const deleteWrapper = function (router, table) {
    let package = selectedRowsPackage(table);
    connection
        .fetchMe("DELETE", package, "transactions")
        .then(() => tableRefresher(router, table));
};
