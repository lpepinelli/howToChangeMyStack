import React from 'react'

const Input = ({type, id, value, setValue, error, label, required, ...props}) => {
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
