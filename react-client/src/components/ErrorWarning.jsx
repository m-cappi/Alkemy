import React from "react";

const ErrorWarning = ({ error }) => {
    return (
        <>
            {error && (
                <div className="alert alert-danger" role="alert">
                    Ups! Something went wrong <br />
                    {error.message && error.message}
                    {error.statusText && error.statusText}
                </div>
            )}
        </>
    );
};

export default ErrorWarning;
