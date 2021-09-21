/** @format */

const optionsConstructor = function (categories) {
    let temp = "";
    categories.forEach((category) => {
        temp += `<option value="${category["id_category"]}">${category["categ_name"]}</option>`;
    });
    return temp;
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
        if (row.children[i].children[0]?.tagName == "INPUT") {
            row.children[i].innerHTML = row.children[i].dataset.server_value;
        } else if (row.children[i].children[0]?.tagName == "SELECT") {
            row.children[i].innerHTML = row.children[i].dataset.server_value;
        }
    }
};
