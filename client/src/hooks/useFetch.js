import { useEffect, useState, useCallback, useRef} from "react";

export function useFetch({ url, fetchOnce = false }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setData(data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
        }, [url])


    // useEffect(() => {
    //     fetchData();
    // }, [fetchData]);

    const initialUrl = useRef(url);
    useEffect(() => {
        if (fetchOnce && url !== initialUrl.current) {
            return;
        }
        fetchData();
        console.log("fetch")
    }, [url, fetchData, fetchOnce]);

    return { data, loading, error };
}