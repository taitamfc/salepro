import {API_URL} from '../env';
import axiosClient from './axiosClient';
class SaleModel {
    constructor(){
        this.api_url = API_URL + 'sales';
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

    async getDue(params = {}){
        const data = await axiosClient.get(this.api_url+'/allDue',params);
        return data;
    }
    async getPayments(id,params = {}){
        const data = await axiosClient.get(this.api_url+'/getPayments/'+id,params);
        return data;
    }
    async storePayment(id,data){
        const res = await axiosClient.put(this.api_url+'/storePayment/'+id,data);
        return res;
    }
}

export default new SaleModel;