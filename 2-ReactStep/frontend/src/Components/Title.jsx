import React from 'react'

const Title = (props) => {
    return (
        <div className="content-header row mt-3">
            <div className="content-header-left col-md-6 col-xs-12 mb-1">
                <h2 className="content-header-title">{props.children}</h2>
            </div>
        </div>
    )
}

export default Title
