import connection from "../database/db";

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