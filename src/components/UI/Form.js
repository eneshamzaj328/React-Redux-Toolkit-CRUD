const Form = ({ children, onSubmit: onSubmitCallBack }, props) => {
    let formClasses = "";
    if ('className' in props) {
        const { className } = props;
        formClasses += " " + className;
    }

    const submitHandler = (event) => {
        onSubmitCallBack(event);
    };

    return (
        <form onSubmit={submitHandler} {...props} className={formClasses}>
            {children}
        </form>
    );
};

export default Form;