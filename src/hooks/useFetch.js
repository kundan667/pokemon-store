import axios from "axios";

const useFetch = async (url) => {
    let data = [];
    let error = null;
    try {
        const res = await axios.get(url);
        data = res.data
    } catch (err) {
        error = err
    }
    // console.log("fetch:", url)
    // console.log("data:", data)
    return { data, error };
}
export default useFetch

// function useFetch(url) {
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const handleFetch = async () => {
//         setLoading(true);
//         try {
//             const res = await axios.get(url);
//             setData(res.data);
//         } catch (error) {
//             setError(error);
//         } finally {
//             setLoading(false);
//         }
//     }

//     useEffect(() => {
//         handleFetch()
//     }, [url]);

//     return { data, loading, error };
// }

// export default useFetch;

// const useFetch = (url) => {
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const handleFetch = async () => {
//         setLoading(true);
//         try {
//             const res = await axios.get(url);
//             setData(res.data);
//         } catch (error) {
//             setError(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         handleFetch();
//     }, [url]);

//     const refetch = () => {
//         handleFetch();
//     };

//     return { data, loading, error, refetch };
// };

// export default useFetch;