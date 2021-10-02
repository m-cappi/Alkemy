import React from "react";

const NotFoundScreen = () => {
    return (
        <article className="d-flex flex-column text-center gap-5 p-3">
            <h1>
                <span className="fw-bold">Error 404:</span> Page not found. 
            </h1>
            <section className="container">
                <img src="/animate.gif" alt="error 404 animation" style={{maxWidth:"80vw"}}/>
            </section>
        </article>
    );
};

export default NotFoundScreen;
