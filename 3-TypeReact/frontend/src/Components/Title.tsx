import React from 'react'

type MyProps={};

const Title = ({children}:React.PropsWithChildren<MyProps>) => {
    return (
        <div className="content-header row mt-3">
            <div className="content-header-left col-md-6 col-xs-12 mb-1">
                <h2 className="content-header-title">{children}</h2>
            </div>
        </div>
    )
}

export default Title
