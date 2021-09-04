/** @format */
/*DELETE FROM your_table
WHERE id IN (value1, value2, ...); */

function deleteTransactions(json){
    if (!Array.isArray(json)) {
        json = [json];
    }
    let idGroup
    json.forEach(element => {
        idGroup = idGroup ? idGroup + `, ${element?.id_transaction}` :`${element?.id_transaction}`
    });
    let query = `DELETE FROM transactions WHERE id_transaction IN (${idGroup});`
    return query
}

module.exports = deleteTransactions;