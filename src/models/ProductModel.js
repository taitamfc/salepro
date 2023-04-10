import {API_URL} from '../env';
import axiosClient from './axiosClient';
class ProductModel {
    constructor(){
        this.api_url = API_URL + 'products';
    }

    async all(params = {}){
        const data = await axiosClient.get(this.api_url,params);
        return data;
    }
    async store(data){
        const res = await axiosClient.post(this.api_url,data);
        console.log(res);
    }
}

export default new ProductModel;