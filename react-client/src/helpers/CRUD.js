import connection from "../database/db";
import { Cookies } from "react-cookie";
import { validateTransaction } from "./payloadValidation";
//import {} from "../helpers/CRUD";

const getToken = () => {
    const cookie = new Cookies();
    const token = cookie.get("token");
    return token && { Authorization: `Bearer ${token}` };
};

export const editTransaction = async (payload) => {
    const validation = validateTransaction(payload, false);
    if (validation.hasError) {
        console.log(validation.errors.concept[0]);
        throw new Error(validation.errors.concept[0]);
    }
    const token = getToken();
    const head = token ? token : {};
    return await connection.put("transaction", { data: payload }, head);
};

export const deleteTransaction = async (payload) => {
    const token = getToken();
    const head = token ? token : {};
    return await connection.delete("transaction", { data: payload }, head);
};

export const submitTransaction = async (payload) => {
    const validation = validateTransaction(payload, true);
    if (validation.hasError) {
        console.log(validation.errors.concept[0]);
        throw new Error(validation.errors.concept[0]);
    }
    const token = getToken();
    const head = token ? token : {};
    return await connection.post("transaction", { data: payload }, head);
};

export const loadBalance = async () => {
    const token = getToken();
    const head = token ? token : {};
    return await connection.get("view/balance", head);
};

export const loadCategories = async () => {
    const token = getToken();
    const head = token ? token : {};
    return await connection.get("category", head);
};

export const loadExpense = async ({ endpoint }) => {
    const token = getToken();
    const head = token ? token : {};
    return await connection.get(endpoint, head);
};

export const loadIncome = async ({ endpoint }) => {
    const token = getToken();
    const head = token ? token : {};
    return await connection.get(endpoint, head); //endpoint
};

export const loadTable = async () => {
    const token = getToken();
    const head = token ? token : {};
    return await connection.get("view/last10", head);
};
