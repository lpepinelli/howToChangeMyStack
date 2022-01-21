import React from 'react'

const Input = ({type, id, value, setValue, error, ...props}) => {
    return (
        <>
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
