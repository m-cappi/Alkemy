/** @format */
function newTransactions(json){
    if (!Array.isArray(json)) {
        json = [json];
    }
    let query =''
    json.forEach(element => {
        query += `INSERT INTO transactions (concept, amount, fk_type, fk_category, creation_date) VALUES ('${element?.concept}', ${element?.amount}, ${element?.fk_type}, ${element?.fk_category}, '${element?.creation_date}');`
    });
    return query
}

module.exports = newTransactions;