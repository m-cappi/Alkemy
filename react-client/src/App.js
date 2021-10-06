//import React from "react";
import IndexRouter from "./routes/IndexRouter";
//import { CookiesProvider } from "react-cookie";

const App = () => {
    //Probable q el cookieprovider este mal usado xq no parece cambiar nada cuando lo quito
    return (
        <>
        {/* <CookiesProvider> */}
            <IndexRouter />
        {/* </CookiesProvider> */}
        </>
    );
};

export default App;
