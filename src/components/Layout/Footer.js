const Footer = () => {
    return (
        <footer className="bg-white rounded-lg shadow dark:bg-gray-800 relative">
            <div className="w-full fixed bottom-0 mx-auto text-center py-4 md:flex border-t border-violet-300 md:items-center md:justify-between">
                <p className="block select-none cursor-grab text-sm text-gray-500 mx-auto text-center dark:text-gray-400">
                    React Redux Toolkit
                    <span className="mx-4">|</span>
                    &copy;Copyright {new Date().getFullYear()}
                    &nbsp; - &nbsp;
                    <span>All Rights Reserved.</span>
                </p>
            </div>
        </footer>

    );
};

export default Footer;