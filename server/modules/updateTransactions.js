/** @format */
//update _table set _col1=(case when _id='id1' then 'val1' when _id='id2' then 'val2' end), _col2 = (case when _id='id1' then num when _id='id2' then num end), _col3 = (case when _id='id1' then 'val1' when _id='id2' then 'val2' end) where _id in ('id1', 'id2')
//[{"id":1 ,"concept":"upd3" ,"amount":30 ,"fk_category":1 ,"creation_date":"2021-09-28" },{"id":2 ,"concept":"upd2" ,"amount":40 ,"fk_category":2 ,"creation_date":"1991-18-11" }]
function updateTransaction(json) {
    if (!Array.isArray(json)) {
        json = [json];
    }
    console.log("estoy en update");
    console.log(json);
    let concept = "case ";
    let amount = "case ";
    let fk_category = "case ";
    let creation_date = "case ";
    let id_group;
    json.forEach((element) => {
        if (element?.id_transaction) {
            concept += element?.concept
                ? `when id_transaction=${element["id_transaction"]} then IfNull(NullIf('${element["concept"]}', ''), concept) `
                : `when id_transaction=${element["id_transaction"]} then concept `;
            amount += element?.amount
                ? `when id_transaction=${element["id_transaction"]} then IfNull(NullIf(${element["amount"]}, ''), amount) `
                : `when id_transaction=${element["id_transaction"]} then amount `;
            fk_category += element?.fk_category
                ? `when id_transaction=${element["id_transaction"]} then IfNull(NullIf(${element["fk_category"]}, ''), fk_category) `
                : `when id_transaction=${element["id_transaction"]} then fk_category `;
            creation_date += element?.creation_date
                ? `when id_transaction=${element["id_transaction"]} then IfNull(NullIf('${element["creation_date"]}', ''), creation_date) `
                : `when id_transaction=${element["id_transaction"]} then creation_date `;
            id_group = id_group
                ? id_group + `, ${element["id_transaction"]}`
                : element["id_transaction"];
        }
    });
    let query = `UPDATE transactions SET concept =(${concept} end), amount =(${amount} end), fk_category =(${fk_category} end), creation_date =(${creation_date} end) where id_transaction in (${id_group})`;
    return query;
}

module.exports = updateTransaction;
