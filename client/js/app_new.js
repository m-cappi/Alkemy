/** @format */

const server = "http://localhost:3000/";
let categoriesHtmlOptions; //setting this up as a global variable to prevent unnecesary fetchs

let constructorData = [
    { id: "date", type: "date" },
    { id: "concept", type: "text" },
    { id: "amount", type: "number" },
    { id: "category", type: "text" },
    { id: "kind", type: "text" },
];

Date.prototype.toDateInputValue = function () {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
};
document.getElementById("newDate").value = new Date().toDateInputValue();

wrapper();
async function wrapper() {
    categoriesHandler();

    let transactionsJson = await getData(server, "transactions");
    let headerContent = await constructTableHeader(transactionsJson);
    let bodyContent = await constructTableBody(transactionsJson);
    document.querySelector("#dataLog thead").innerHTML = headerContent;
    document.querySelector("#dataLog tbody").innerHTML = bodyContent;

    dataCheckboxesToggle(constructorData);
}

async function getData(server, router) {
    server = server + router;
    let data = await fetch(server).then((res) => {
        if (!res.ok) {
            throw new Error(`An error has occured: ${res.status}`);
        }
        return res.json();
    });
    return data;
}

function constructTableBody(data) {
    if (!Array.isArray(data)) {
        data = [data];
    }
    let bodyContent = "";
    data.forEach((element) => {
        bodyContent += `<tr data-id_transaction="${element["ID"]}" data-id_category="${element["id_category"]}"><td><input type="checkbox" name="transaction" id=""></td>`;
        Object.keys(element).forEach((key) => {
            if (key == "ID" || key == "id_category") {
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
}

function constructTableHeader(data) {
    if (!Array.isArray(data)) {
        data = [data];
    }
    let headerContent = "<tr><th></th>";
    Object.keys(data[0]).forEach((key) => {
        if (!(key == "ID" || key == "id_category")) {
            headerContent += `<th>${key}</th>`;
        }
    });
    headerContent += "</tr>";
    return headerContent;
}

async function categoriesHandler() {
    getData(server, "categories").then((categoriesJson) => {
        constructorData[3]["categories"] = categoriesJson;
        categoriesHtmlOptions = optionsConstructor(categoriesJson);
        document.querySelector("#newCategory").innerHTML +=
            categoriesHtmlOptions;
    });
}

function optionsConstructor(categories) {
    let temp = "";
    categories.forEach((category) => {
        temp += `<option value="${category["id_category"]}">${category["categ_name"]}</option>`;
    });
    return temp;
}

function dataCheckboxesToggle(constructorDataPack) {
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
}

function rowToInput(row, constructorDataPack) {
    for (let i = 1; i < row.childElementCount; i++) {
        switch (constructorDataPack[i - 1]["id"]) {
            case "date":
                row.children[
                    i
                ].innerHTML = `<input type="text" onfocus="(this.type='date')" onblur="(this.value == '' ? this.type='text' : this.type='date')" class="" name="${
                    constructorDataPack[i - 1]["id"]
                }" placeholder="${row.children[i].dataset.server_value}">`;
                break;
            case "kind":
                break;
            case "category":
                row.children[
                    i
                ].innerHTML = `<select name="category"><option hidden selected value="null">${row.children[i].dataset.server_value}</option> ${categoriesHtmlOptions} </select>`;
                break;
            default:
                row.children[i].innerHTML = `<input type="${
                    constructorDataPack[i - 1]["type"]
                }" class="" name="${
                    constructorDataPack[i - 1]["id"]
                }" placeholder="${row.children[i].dataset.server_value}">`;
                break;
        }
    }
}

function rowReverse(row) {
    for (let i = 1; i < row.childElementCount; i++) {
        // row.children[0] is the checkbox
        if (row.children[i].children[0]?.tagName == "INPUT") {
            row.children[i].innerHTML = row.children[i].dataset.server_value;
        } else if (row.children[i].children[0]?.tagName == "SELECT") {
            row.children[i].innerHTML = row.children[i].dataset.server_value;
        }
    }
}

let btnSubmitTransaction = document.querySelector(
    "#newEntry input[type=submit]"
);

btnSubmitTransaction.addEventListener("click", (event) => {
    event.preventDefault();
    pack = transactionPackaging();
    postData(server, 'transactions', [pack]).then((res) => {
        if(res.ok){
            window.alert('success!')
        }
    })
    newEntry.reset()
    document.getElementById("newDate").value = new Date().toDateInputValue();
});

function transactionPackaging() {
    return {
        concept: document.querySelector("#newConcept").value,
        amount: document.querySelector("#newAmount").value,
        creation_date: document.querySelector("#newDate").value,
        fk_category: document.querySelector("#newCategory").value,
        fk_type: document.querySelector("input[name=fk_type]:checked").value,
    };
}

async function postData(server, router, pack) {
    server = server + router;
    let data = await fetch(server, {
        method: "POST",
        body: JSON.stringify(pack),
        headers: { "Content-Type": "application/json" },
    }).then((res) => {
        if (!res.ok) {
            throw new Error(`An error has occured: ${res.status}`);
        }
        return res
    });
    return data;
}

