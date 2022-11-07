import axios from "axios";

const consoleApi = axios.create({
    baseURL: 'https://console-api-v2.dev.arborknot.io',
    headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`
    }
})

export default consoleApi;