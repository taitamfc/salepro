import MainModel from './MainModel';
import axiosClient from './axiosClient';
class HomeModel extends MainModel {
    constructor(){
        super('home');
    }
    async index(data = {}){
        const res = await axiosClient.get(this.api_url,{ params: data });
        return res;
    }
}
export default new HomeModel;