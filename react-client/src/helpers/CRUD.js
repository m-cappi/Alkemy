import connection from "../database/db";
//import {} from "../helpers/CRUD";

export const editTransaction = async (payload) => {
    const res = await connection.put("transaction", { data: payload });
    if (!res.ok) throw new Error(res.message);
    return res.json();
};

export const deleteTransaction = async (payload) => {
    const res = await connection.delete("transaction", { data: payload });
    if (!res.ok) throw new Error(res.message);
    return res.json();
};

export const submitTransaction = async (payload) => {
    const res = await connection.post("transaction", { data: payload });
    if (!res.ok) throw new Error(res.message);
    else console.log(res);
    return res.json();
};

export const loadBalance = async () => {
    const res = await connection.get("view/balance");
    if (!res.ok) throw new Error(res.message);
    return res.json();
};

export const loadCategories = async () => {
    const res = await connection.get("category");
    if (!res.ok) throw new Error(res.message);
    return res.json();
};

