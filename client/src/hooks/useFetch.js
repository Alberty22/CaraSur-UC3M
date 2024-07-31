import { useEffect, useState, useCallback} from "react";

export function useFetch({ url }) {
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


    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error };
}