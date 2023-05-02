import {API_URL} from '../env';
import axiosClient from './axiosClient';
class WarehouseModel {
    constructor(){
        this.api_url = API_URL + 'warehouse';
    }
    async all(data = {}){
        const res = await axiosClient.get(this.api_url,{ params: data });
        return res;
    }
    async find(id){
        const res = await axiosClient.get(this.api_url + '/' + id);
        return res;
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

export default new WarehouseModel;