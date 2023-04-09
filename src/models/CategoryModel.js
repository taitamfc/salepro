import {API_URL} from '../env';
import axiosClient from './axiosClient';
class CategoryModel {
    constructor(){
        this.api_url = API_URL + 'categories';
    }

    async all(params = {}){
        const data = await axiosClient.get(this.api_url,params);
        return data.data;
    }
}

export default new CategoryModel;