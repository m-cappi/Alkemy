/** @format */

const CRUD = class {
    #server;
    constructor(server) {
        this.#server = server;
    }

    get(endpoint = false) {
        let route = endpoint ? this.#server + endpoint : this.#server;
        let response = fetch(route).then((res) => {
            if (!res.ok) {
                throw new Error(`An error has ocurred: ${res.status}`);
            } else {
                return res.json();
            }
        });
        return response;
    }

    fetchMe(_method, payload, endpoint = false) {
        let route = endpoint ? this.#server + endpoint : this.#server;
        let response = fetch(route, {
            method: _method,
            body: JSON.stringify(payload),
            headers: { "Content-Type": "application/json" },
        }).then((res) => {
            if (!res.ok) {
                throw new Error(`An error has ocurred: ${res.status}`);
            } else {
                return res.json();
            }
        });
        return response;
    }
};
