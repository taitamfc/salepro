import MainModel from './MainModel';
class AccountModel extends MainModel {
    constructor(){
        super('accounts');
    }
}
export default new AccountModel;