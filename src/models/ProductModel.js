import {API_URL} from '../env';
import axiosClient from './axiosClient';
import axios from "axios";
class ProductModel {
    constructor(){
        this.api_url = API_URL + 'products';
    }

    async all(data = {}){
        try {
            const res = await axiosClient.get(this.api_url,{ params: data });
            return res;
        } catch (error) {
            alert(error.message);
        }
    }
    async find(id){
        const data = await axiosClient.get(this.api_url + '/' + id);
        return data;
    }

    async store(data){
        const res = await axiosClient.post(this.api_url,data);
        return res;
    }
    async update(id,data){
        const res = await axiosClient.put(this.api_url + '/' + id,data);
        return res;
    }
    async delete(id){
        const data = await axiosClient.delete(this.api_url + '/' + id);
        return data;
    }
    async processImport(data){
        const res = await axios.post(this.api_url + '/processImport',data);
        return res;
    }
}

export default new ProductModel;