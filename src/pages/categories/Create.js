import React from 'react';
import { useParams } from 'react-router-dom';
import MasterLayout from '../../layouts/MasterLayout';
import Breadcrumb from '../../includes/page/Breadcrumb';
import CategoryForm from '../../components/category/CategoryForm';

function Create(props) {
    const { id = 0 } = useParams();
    return (
        <MasterLayout>
            <div className='page-header'>
                <Breadcrumb pageName='Thêm danh mục' parentName='Danh mục' parentLink='categories' />
            </div>
            <CategoryForm id={id}/>
        </MasterLayout>
    );
}

export default Create;