import React from 'react'

const useFetch = () => {
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [message, setMessage] = React.useState(null);

    const request = React.useCallback(async(url, method, data=null, options=null) =>{
        let messages = {
            200: "200 - Ok",
            201: "201 - Created",
            204: "204 - No Content",
            400: "400 - Bad Request",
            401: "401 - Unauthorized",
            403: "403 - Forbidden",
            404: "404 - Not Found",
            405: "405 - Method Not Allowed",
            415: "415 - Unsupported Media Type",
            418: "418 - I'm a teapot",
            500: "500 - Internal Server Error",
            501: "501 - Not Implemented",
            503: "503 - Service Unavailable"
        }
        if(options==null){
            switch(method){
                case "CREATE":
                    options = {method: "POST", headers: {"Accept": "application/json","Content-Type": "application/json; charset=utf-8"}, body: JSON.stringify(data)};
                    break;
                case "READ":
                    if(data == null)
                        options = {method: "GET", headers: {"Content-Type": "application/json; charset=utf-8"}};
                    else
                        options = {method: "POST", headers: {"Accept": "application/json","Content-Type": "application/json; charset=utf-8"}, body: JSON.stringify(data)};
                    break;
                case "UPDATE":
                    options = {method: "PUT", headers: {"Accept": "application/json","Content-Type": "application/json; charset=utf-8"}, body: JSON.stringify(data)};
                    break;
                case "DELETE":
                    options = {method: "DELETE", headers: {"Accept": "application/json", "Content-Type": "application/json; charset=utf-8"}};
                    break;
                default:
                    setError("invalid method");
                    break;
            }
        }
        let response, json, message, error;
        try{
            setError(null);
            error=null;
            setLoading(true);
            response = await fetch(url, options);
            setMessage(messages[response.status]);
            message = messages[response.status];
            json = await response.json();
            if(!response.ok){
                setError({
                    message: "StatusCode: "+message+" | Error: "+json.title,
                    errors: json.errors
                });
                error = {
                    message: "StatusCode: "+message+" | Error: "+json.title,
                    errors: json.errors
                };
            }
        }
        catch(erro){
            json = null;
            setMessage(messages[response.status]);
            message = messages[response.status];
            setError("StatusCode: "+message+
            "\n"+erro);
            error = "StatusCode: "+message+
            "\n"+erro;
        }
        finally{
            setData(json);
            setLoading(false);
            return {response, json, error, message};
        }
    }, []);

    return {
        data,
        loading,
        error,
        request,
        message
    }
}

export default useFetch
