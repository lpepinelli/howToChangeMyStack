import React from 'react'

const Input = ({type, id, value, setValue, error, ...props}) => {
    return (
        <>
            <input
                type={type}
                id={id}
                value={value}
                onChange={({target}) => setValue(target.value)}
                {...props}/>
            {error && <div class="text-danger" style="display: none">{error}</div>}
        </>
    )
}

export default Input
