import React from 'react';
import { useParams } from 'react-router-dom';
import MasterLayout from '../../layouts/MasterLayout';
import Breadcrumb from '../../includes/page/Breadcrumb';
import AddPaymentForm from '../../components/purchase/AddPaymentForm';

function AddPayment(props) {
    const { id = 0 } = useParams();
    return (
        <MasterLayout>
            <div className='page-header'>
                <Breadcrumb pageName='Thêm thanh toán' parentName='Công nợ nhập hàng' parentLink='report/due-purchase' />
            </div>
            <AddPaymentForm id={id}/>
        </MasterLayout>
    );
}

export default AddPayment;