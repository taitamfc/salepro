import {API_URL} from '../env';
import axiosClient from './axiosClient';
class ProductModel {
    constructor(){
        this.api_url = API_URL + 'products';
    }

    async all(params = {}){
        const data = await axiosClient.get(this.api_url,params);
        return data.data;
    }
}

export default new ProductModel;