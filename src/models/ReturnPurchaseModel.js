import {API_URL} from '../env';
import axiosClient from './axiosClient';
class ReturnSaleModel {
    constructor(){
        this.api_url = API_URL + 'return-sales';
    }

    async all(params = {}){
        const data = await axiosClient.get(this.api_url,params);
        return data;
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
}

export default new ReturnSaleModel;