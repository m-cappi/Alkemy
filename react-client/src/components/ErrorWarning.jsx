import React from "react";

const ErrorWarning = ({error}) => {
    if (error) console.log("ErrorWarning: ",error.message)
    return (
        <>
        {error && (
            <div className="alert alert-danger" role="alert">
                Ups! Something went wrong <br />
               {error.message && error.message}
            </div>
        )}
        </>
    );
};

export default ErrorWarning;
