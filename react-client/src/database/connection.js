const urlBase = "http://localhost:3005";
// url a la cual consultar
// esta funcion detecta si es una nueva url base (comienza con http:// o https://).
// en caso de ser asi, retorna la url. en caso contrario, se asume que es un fragmento
// de path por lo que se concatena con la constante urlBase

const readUrl = (url = "") => {
    return url.startsWith("http://") || url.startsWith("https://")
        ? url
        : `${urlBase}/${url}`;
};

const get = async (url = "", headers = {}) => {
    const res = await fetch(readUrl(url), {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...headers,
        },
    })
        .then((res) => {
            if (!res.ok) {
                console.log(res);
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .catch((err) => {
            throw new Error(err);
        });

    if (!res.success) {
        console.log(res);
        throw new Error(res.message);
    } //else console.log(res);

    return res;
};

const post = async (url = "", body = {}, headers = {}) => {
    const res = await fetch(readUrl(url), {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...headers,
        },
    })
        .then((res) => {
            if (!res.ok) {
                console.log(res);
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .catch((err) => {
            throw new Error(err);
        });

    if (!res.success) {
        console.log(res);
        throw new Error(res.message);
    } //else console.log(res);

    return res;
};

const put = async (url = "", body = {}, headers = {}) => {
    const res = await fetch(readUrl(url), {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...headers,
        },
    })
        .then((res) => {
            if (!res.ok) {
                console.log(res);
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .catch((err) => {
            throw new Error(err);
        });

    if (!res.success) {
        console.log(res);
        throw new Error(res.message);
    }

    return res;
};

const del = async (url = "", body = {}, headers = {}) => {
    const res = await fetch(readUrl(url), {
        method: "DELETE",
        body: JSON.stringify(body),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...headers,
        },
    })
        .then((res) => {
            if (!res.ok) {
                console.log(res);
                throw new Error(res.statusText);
            }
            return res;
        })
        .catch((err) => {
            throw new Error(err);
        });

    return res;
};

const connection = {
    get,
    post,
    put,
    delete: del,
};

export default connection;
