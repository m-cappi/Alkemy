import connection from "../database/connection";
import { validateTransaction } from "./payloadValidation";
import { getAuthorizationHeader } from "./getAuthorizationHeader";
//import {} from "../helpers/CRUD";

export const editTransaction = async (payload) => {
    validateTransaction(payload, false);
    const headers = getAuthorizationHeader();
    return await connection.put("transaction", { data: payload }, headers);
};

export const deleteTransaction = async (payload) => {
    const headers = getAuthorizationHeader();
    return await connection.delete("transaction", { data: payload }, headers);
};

export const submitTransaction = async (payload) => {
    validateTransaction(payload, true);
    const headers = getAuthorizationHeader();
    return await connection.post("transaction", { data: payload }, headers);
};

export const loadBalance = async () => {
    const headers = getAuthorizationHeader();
    return await connection.get("view/balance", headers);
};

export const loadCategories = async () => {
    const headers = getAuthorizationHeader();
    return await connection.get("category", headers);
};

export const loadExpense = async ({ endpoint }) => {
    const headers = getAuthorizationHeader();
    return await connection.get(endpoint, headers);
};

export const loadIncome = async ({ endpoint }) => {
    const headers = getAuthorizationHeader();
    return await connection.get(endpoint, headers); //endpoint
};

export const loadTable = async () => {
    const headers = getAuthorizationHeader();
    return await connection.get("view/last10", headers);
};
