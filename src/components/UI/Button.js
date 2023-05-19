const Button = ({ children, onClick, options }) => {
    const className = options?.classes || null;

    let btnClasses = "bg-indigo-600 text-white py-2 px-6 my-10 rounded hover:bg-indigo-700";

    if (className !== null) {
        btnClasses += " " + className;
    }

    return <button {...options || null}
        onClick={onClick}
        className={btnClasses}>
        {children}
    </button>
};

export default Button;