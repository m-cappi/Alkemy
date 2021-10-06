import { Cookies } from "react-cookie";

const getToken = () => {
    const cookie = new Cookies();
    const token = cookie.get("token");
    return token && { Authorization: `Bearer ${token}` };
};

export const getAuthorizationHeader = () => {
    const token = getToken();
    const authorization = token ? token : {};
    return authorization;
};

 