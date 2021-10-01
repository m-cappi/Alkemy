import React from "react";

const Footer = () => {
    return (
        <footer className="footer mt-auto py-3 px-2 bg-dark ">
            <p className="text-center w-100 text-white m-0">
                Martin Cappi - &copy; {new Date().getFullYear()}
            </p>
        </footer>
    );
};

export default React.memo(Footer);
