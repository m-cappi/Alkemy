/** @format */
function newTransactions(json){
    let query =''
    json.forEach(element => {
        query += `INSERT INTO transactions (concept, amount, fk_type, fk_category) VALUES ('${element?.concept}', ${element?.amount}, ${element?.fk_type}, ${element?.fk_category});`
    });
    return query
}

module.exports = newTransactions;