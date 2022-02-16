import React from 'react'

interface propsTypes extends React.InputHTMLAttributes<HTMLInputElement> {
    type: string,
    id?: string,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    error?: string,
    label?: string,
    placeholder?: string
}

const Input = ({type, id, value, setValue, error, label, required, ...props} : propsTypes) => {
    return (
        <>
            {label && <label>{label} {required && <span className="text-danger">*</span>}</label>}
            <input
                type={type}
                className={'form-control '+(error && 'invalido')}
                id={id}
                value={value}
                onChange={({target}) => setValue(target.value)}
                {...props}/>
            {error && <div className="text-danger">{error}</div>}
        </>
    )
}

export default Input
