export const UserReducer = (state, action) => {
    switch (action.type) {
        case "login":
            return { auth: true };
        case "logout":
            return { auth: false };
        default:
            return state;
    }
};
