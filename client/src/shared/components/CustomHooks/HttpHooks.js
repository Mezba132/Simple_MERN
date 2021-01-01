import {useCallback, useEffect, useRef, useState} from 'react';

export const useHttpClient = () => {

    const [isLoading,setIsLoading] = useState(false);
    const [error, setError] = useState();

    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback( async (url, method="GET", headers={}, body=null) =>
    {
        setIsLoading(true);
        const controller = new AbortController();
        activeHttpRequests.current.push(controller);

        try {
            const response = await fetch(url,
                {
                    method,
                    headers,
                    body,
                    signal:controller.signal
                });

            const responseData = await response.json();

            if (!response.ok) {
                throw new error(responseData.message);
            }

            activeHttpRequests.current = activeHttpRequests.current.filter(
                reqCtrl => reqCtrl !== controller
            )

            setIsLoading(false);
            return responseData;

        } catch (err) {
            setError(err.message || "something went wrong, try again");
            setIsLoading(false);
            throw err;
        }
    }, []);

    const errClear = () => {
        setError(null);
    }

    useEffect(() => {
        return activeHttpRequests.current.forEach( abtCtrl => abtCtrl.abort());
    }, [])

    return {isLoading, error, sendRequest, errClear};
}