import React from 'react'

type propsType = {
    title: string
}

const Head = ({title} :propsType) => {
    React.useEffect(()=> {
        document.title = title;
    }, [title])
    return <></>;
}

export default Head