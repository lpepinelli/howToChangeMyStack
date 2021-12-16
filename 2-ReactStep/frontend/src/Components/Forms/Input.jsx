import React from 'react'

const Input = ({type, id, value, setValue, ...props}) => {
    return (
            <input
                type={type}
                id={id}
                value={value}
                onChange={({target}) => setValue(target.value)}
                {...props}/>
    )
}

export default Input
