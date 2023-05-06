import MainModel from './MainModel';
import axiosClient from './axiosClient';
class PurchaseModel extends MainModel {
    constructor(){
        super('purchases');
    }
    async getDue(data = {}){
        const res = await axiosClient.get(this.api_url+'/allDue',{ params: data });
        return res;
    }
    async getPayments(id,data = {}){
        const res = await axiosClient.get(this.api_url+'/getPayments/'+id,{ params: data });
        return res;
    }
    async storePayment(id,data){
        const res = await axiosClient.put(this.api_url+'/storePayment/'+id,data);
        return res;
    }
}
export default new PurchaseModel;