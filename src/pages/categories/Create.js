import React from 'react';
import { useParams } from 'react-router-dom';
import MasterLayout from '../../layouts/MasterLayout';
import Breadcrumb from '../../includes/page/Breadcrumb';

function Create(props) {
    const { id = 0 } = useParams();
    return (
        <MasterLayout>
            <div className='page-header'>
                <Breadcrumb pageName='Thêm danh mục' parentName='Danh mục' parentLink='categories' />
            </div>
            <form className='form-add-custom'>
                <div className='content pt-0 pb-0'>
                </div>
                <div id='formProductAdd' className='content'>
                    <div className='tab-content'>
                        <div className='tab-pane fade active show'>
                            
                        </div>
                    </div>
                </div>
            </form>
        </MasterLayout>
    );
}

export default Create;