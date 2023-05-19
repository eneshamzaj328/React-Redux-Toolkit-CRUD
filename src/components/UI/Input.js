import { forwardRef } from 'react';

const TextField = forwardRef(({ className = '', label, options, onChange, onBlur, value }, ref) => {
    let layoutClasses = "flex flex-col";
    let labelClasses = "mb-2 text-base text-gray-800 rounded";
    let inputClasses = "bg-gray-200 py-2 px-3 border-2 outline-none";

    if (className !== null) {
        layoutClasses += " " + className;
    }

    if ('classNameInput' in options || 'classNameLabel' in options) {
        const { classNameInput, classNameLabel } = options;

        if (classNameLabel !== '') {
            labelClasses = `${labelClasses} ${options.classNameLabel}`;
        }

        if (classNameInput !== '') {
            inputClasses = `${inputClasses} ${options.classNameInput}`;
        }
    }

    return (
        <div className={layoutClasses}>
            <label className={labelClasses}>{label}</label>
            <input ref={ref}
                className={inputClasses}
                {...options}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
            />
        </div>
    );
});

export default TextField;