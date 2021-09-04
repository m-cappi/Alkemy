/** @format */

const server = "http://localhost:3000/";
//http://localhost:3000/transactions/pagination/?pos=1&step=2
tableBuilder();
async function tableBuilder() {
    let transactionsJson = await getData(
        server,
        "transactions/pagination/?pos=0&step=10"
    );
    let headerContent = constructTableHeader(transactionsJson);
    let bodyContent = constructTableBody(transactionsJson);
    document.querySelector("#latestLog thead").innerHTML = headerContent;
    document.querySelector("#latestLog tbody").innerHTML = bodyContent;
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
        bodyContent += `<tr>`;
        Object.keys(element).forEach((key) => {
            if (key == "ID" || key == "id_category") {
            } else if (key == "Date") {
                let date = element[key].split("T")[0];
                bodyContent += `<td>${date}</td>`;
            } else {
                bodyContent += `<td>${element[key]}</td>`;
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
    let headerContent = "<tr>";
    Object.keys(data[0]).forEach((key) => {
        if (!(key == "ID" || key == "id_category")) {
            headerContent += `<th>${key}</th>`;
        }
    });
    headerContent += "</tr>";
    return headerContent;
}

setBalance();
async function setBalance() {
    let response = await getData(server, "balance");
    document.querySelector("#balance").innerHTML = response.balance;
}
