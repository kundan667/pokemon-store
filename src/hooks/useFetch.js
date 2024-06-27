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
export default useFetch;