
import axios from "axios";

const instance = axios.create({
    baseURL:"https://tech-forcinfbcknd.vercel.app/api",
    // baseURL:" http://localhost:5000/api",

    withCredentials:true
})

export default instance;