
import axios from "axios";

const instance = axios.create({
    baseURL:"https://techforcinfbcknd.onrender.com/api/auth/",
    // baseURL:" http://localhost:5000/api/auth/",

    withCredentials:true
})

export default instance;