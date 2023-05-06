import MainModel from './MainModel';
import axiosClient from './axiosClient';
class ReportModel extends MainModel {
    constructor(){
        super('report');
    }
    async profitLoss(data = {}){
        const res = await axiosClient.get(this.api_url+'/profitLoss',{ params: data });
        return res;
    }
}
export default new ReportModel;