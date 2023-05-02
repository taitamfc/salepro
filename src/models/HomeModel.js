import {API_URL} from '../env';
import axiosClient from './axiosClient';
class HomeModel {
    constructor(){
        this.api_url = API_URL + 'home';
    }
    async index(data = {}){
        const res = await axiosClient.get(this.api_url,{ params: data });
        return res;
    }
    
}

export default new HomeModel;