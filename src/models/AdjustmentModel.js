import {API_URL} from '../env';
import axiosClient from './axiosClient';
class AdjustmentModel {
    constructor(){
        this.api_url = API_URL + 'adjustment';
    }
    async all(params = {}){
        const data = await axiosClient.get(this.api_url,params);
        return data;
    }
    async find(id,params = {}){
        const data = await axiosClient.get(this.api_url + '/' + id,params);
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

export default new AdjustmentModel;