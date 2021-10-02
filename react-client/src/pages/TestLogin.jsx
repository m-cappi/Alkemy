import React, { useRef } from "react";
import { useCookies } from "react-cookie";

function App() {
    const [cookies, setCookie] = useCookies([]);
    const newName = useRef(null);
    console.log(cookies);
    function onChange() {
        console.log(newName.current.value);
        setCookie("beta", { beta: newName.current.value }, { path: "/" });
        console.log(cookies.beta);
    }

    //{cookies.name && <h1>Hello {cookies.name}!</h1>}
    return (
        <div>
            <input ref={newName} />
            <button onClick={onChange}>asd</button>
        </div>
    );
}

export default App;
