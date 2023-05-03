import React from 'react';
import MasterLayout from '../../layouts/MasterLayout';
import Breadcrumb from '../../includes/page/Breadcrumb';
import CreateFromExcelForm from '../../components/product/CreateFromExcelForm';
import { useParams } from 'react-router-dom';

function CreateFromExcel(props) {
    const { id = 0 } = useParams();

    return (
        <MasterLayout>
            <div className='page-header'>
                <Breadcrumb pageName='Import sản phẩm' parentName='Sản phẩm' parentLink='products' />
            </div>
            <CreateFromExcelForm id={id}/>
        </MasterLayout>
    );
}

export default CreateFromExcel;