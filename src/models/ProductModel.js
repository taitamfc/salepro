import axios from 'axios';
import MainModel from './MainModel';
class ProductModel extends MainModel {
    constructor(){
        super('products');
    }
    async processImport(data){
        const res = await axios.post(this.api_url + '/processImport',data);
        return res;
    }
}
export default new ProductModel;

