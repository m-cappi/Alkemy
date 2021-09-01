/** @format */

let checkedDataCheckboxes = document.querySelectorAll(
    "input[type=checkbox][name=transaction]:checked"
);
let dataCheckboxes = document.querySelectorAll(
    "input[type=checkbox][name=transaction]"
);

let constructorData = [
    { id: "date", type: "date" },
    { id: "concept", type: "text" },
    { id: "amount", type: "number" },
    { id: "kind", type: "text" },
    {
        id: "category",
        type: "text",
        categories: [
            { key: 1, value: "Food" },
            { key: 2, value: "Medicine" },
            { key: 3, value: "Automobile" },
        ],
    },
];

dataCheckboxesToggle(constructorData);

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
        //hacer un switch en base a dataKeys
        switch (constructorDataPack[i - 1]["id"]) {
            case "date":
                row.children[
                    i
                ].innerHTML = `<input type="text" onfocus="(this.type='date')" onblur="(this.value == '' ? this.type='text' : this.type='date')" class="" name="${
                    constructorDataPack[i - 1]["id"]
                }" placeholder="${row.children[i].innerHTML}">`;
                break;
            case "kind":
                break;
            case "category":
                let categories = constructorDataPack[i - 1]["categories"];
                let temp = `<select name="category"><option hidden selected value="${row.children[i].innerHTML}">${row.children[i].innerHTML}</option>`;
                categories.forEach((category) => {
                    temp += `<option value="${category["key"]}">${category["value"]}</option>`;
                });
                temp += "</select>";
                row.children[i].innerHTML = temp;
                break;
            default:
                row.children[i].innerHTML = `<input type="${
                    constructorDataPack[i - 1]["type"]
                }" class="" name="${
                    constructorDataPack[i - 1]["id"]
                }" placeholder="${row.children[i].innerHTML}">`;
                break;
        }
    }
}

function rowReverse(row) {
    for (let i = 1; i < row.childElementCount; i++) {
        // row.children[0] is the checkbox
        if (row.children[i].children[0]?.tagName == "INPUT") {
            row.children[i].innerHTML = row.children[i].children[0].placeholder;
        } else if (row.children[i].children[0]?.tagName == "SELECT") {
            row.children[i].innerHTML =
                row.children[i].children[0].children[0].value;
        }
    }
}
