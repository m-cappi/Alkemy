import connection from "../database/db";
import { useCookies } from "react-cookie";
//import { UserSession } from "../helpers/userSession.js";

export const UserSession = () => {
    const [cookies, setCookie] = useCookies([]);

    const registerCookies = (params) => {
        const { token, email, name, is_admin } = params;
        setCookie("token", token, { path: "/" });
        setCookie("email", email, { path: "/" });
        setCookie("name", name, { path: "/" });
        setCookie("is_admin", is_admin, { path: "/" });
        if (token) setCookie("auth", 1, { path: "/" });
        return;
    };

    const unregisterCookies = () => {
        //??
        setCookie("token", null, { path: "/" });
        setCookie("name", null, { path: "/" });
        setCookie("email", null, { path: "/" });
        setCookie("is_admin", null, { path: "/" });
        setCookie("auth", 0, { path: "/" });
        return;
    };

    const logIn = async (email, password) => {
        const body = { data: { email: email, password: password } };
        const res = await connection.post("auth/login", body);
        if (!res.success) {
            console.log(res);
            throw new Error(res.message);
        } //else console.log(res);
        registerCookies(res.data);
        return res;
    };

    const logOut = () => {
        unregisterCookies();
        return;
    };

    const register = async (email, password, name) => {
        const body = {
            data: { email: email, password: password, full_name: name },
        };
        const res = await connection.post("auth/register", body);
        if (!res.success) {
            console.log(res);
            throw new Error(res.message);
        } //else console.log(res);
        registerCookies(res.data);
        return res;
    };

    return { logIn, logOut, register };
};
