import axios from "axios";

const httpClient = axios.create({
    baseURL: 'http://localhost:8080'
})

class ApiService{

    constructor(apiUrl){

        this.apiUrl = apiUrl;
    }

    post(url, objeto){
        const requestUrl = `${this.apiUrl}${url}`
        return httpClient.post(requestUrl, objeto);
    }

    put(url, objeto){
        const requestUrl = `${this.apiUrl}${url}`
         return httpClient.put(requestUrl, objeto);
    }

    delete(url){
        const requestUrl = `${this.apiUrl}${url}`
        return httpClient.delete(requestUrl);
    }

    get(url){
        const requestUrl = `${this.apiUrl}${url}`
        return httpClient.get(requestUrl);
    }


}

export default ApiService;