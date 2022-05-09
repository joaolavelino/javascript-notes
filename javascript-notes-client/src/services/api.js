//1 - Import Axios
import axios from "axios";
//2 - set the base URL - preconfig
const Api = axios.create({ baseURL: "http://localhost:3001" });

export default Api;
