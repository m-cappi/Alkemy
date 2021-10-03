const Loading = () => {
    return (
        <div className="text-center mt-5">
            <button className="btn btn-primary" type="button" disabled>
                <span
                    className="spinner-border spinner-border-sm "
                    role="status"
                    aria-hidden="true"
                />
                {"   "}
                Loading...
            </button>
        </div>
    );
};

export default Loading;
