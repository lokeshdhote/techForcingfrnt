
import axios from "axios";

const instance = axios.create({
    baseURL:"https://techforcinfbcknd.onrender.com/api",
    // baseURL:" http://localhost:5000/api",

    withCredentials:true
})

export default instance;