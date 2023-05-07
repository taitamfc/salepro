import React, { useEffect, useState } from 'react';
import ProductModel from '../../models/ProductModel';
import MyTable from './MyTable';
import CategoryModel from '../../models/CategoryModel';
import BrandModel from '../../models/BrandModel';
import UnitModel from '../../models/UnitModel';
import MyModal from './MyModal';
import { useSelector } from 'react-redux';
import MyPagination from './MyPagination';

function MyProductList(props) {
    const {show,setShowModal,modal_title,size} = props;
    const store_warehouse_id = useSelector(state => state.warehouse_id);

    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [selected_items, setSelectedItems] = useState([]);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState({});
    const [pageData, setPageData] = useState({});

    const [categories, setCategories] = useState([]);
    const [brands, setBranches] = useState([]);
    const [units, setUnits] = useState([]);


    useEffect(() => {
        if(show){
            CategoryModel.all( {limit: -1, tree: true} ).then( res => {
                setCategories(res.data);
            }).catch( err => {  });

            BrandModel.all( {limit: -1} ).then( res => {
                setBranches(res.data);
            }).catch( err => {  });

            UnitModel.all( {limit: -1} ).then( res => {
                setUnits(res.data);
            }).catch( err => {  });
        }

    }, [show]);
    useEffect(() => {
        if(show){
            ProductModel.all({
                page: page,
                limit: 10,
                filter: filter,
                warehouse_id: store_warehouse_id
            }).then(res => {
                setLoading(false);
                setItems(res.data);
                setPageData(res.meta);
            })
        }
    }, [page, filter, loading,show,store_warehouse_id]);

    const handleChangeFilter = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setFilter({ ...filter, [name]: value });
    }

    const handleSelectProducts = (products) =>{
        setSelectedItems(products);
    }

    const handleSelectProductsDone = () => {
        setShowModal(false);
        props.handleSelectProducts(selected_items);
    }

    return (
        <MyModal show={show} setShowModal={setShowModal} size='xl' modal_title='Tất cả sản phẩm'>
            <div className='row'>
                <div className='col'>
                    <div className="form-group">
                        <input type="text" onChange={handleChangeFilter} placeholder="Tên, mã sản phẩm" className="form-control" name="name_or_code"/>
                    </div>
                </div>
                <div className='col'>
                    <div className="form-group">
                        <select className="form-control" onChange={handleChangeFilter} name="brand_id">
                            <option value="">Tất cả nhãn hiệu</option>
                            {
                                brands.map( (brand,key) => (
                                    <option key={key} value={brand.id}>{brand.title}</option>
                                ) )
                            }
                        </select>
                    </div>
                </div>
                <div className='col'>
                    <div className="form-group">
                        <select className="form-control" onChange={handleChangeFilter} name="category_id">
                            <option value="">Tất cả thể loại</option>
                            {
                                categories.map( (category,key) => (
                                    <option key={key} value={category.id}>{category.name}</option>
                                ) )
                            }
                        </select>
                    </div>
                </div>
                <div className='col'>
                    <div className="form-group" onChange={handleChangeFilter} name="unit_id">
                        <select className="form-control">
                            <option value="">Tất cả đơn vị</option>
                            {
                                units.map( (unit,key) => (
                                    <option key={key} value={unit.id}>{unit.unit_name}</option>
                                ) )
                            }
                        </select>
                    </div>
                </div>
            </div>
            <div className='table-responsive'>
                <MyTable
                    items={items}
                    loading={loading}
                    headers={['Tên', 'Mã', 'Nhãn hiệu', 'Thể loại', 'Số lượng', 'Đơn vị', 'Giá']}
                    cols={['name', 'code', 'brand_name', 'category_name', 'qty', 'unit_name', 'price_format']}
                    actions={['Sửa', 'Xóa']}
                    base_link={'products'}
                    col_action={false}
                    col_active={false}
                    handleSelectProducts={handleSelectProducts}
                />
            </div>
            <MyPagination pageData={pageData} setPage={setPage}/>
            <div className='row mt-2'>
                <div className='col'>
                    <div className='text-right'>
                        <button type='button' onClick={ handleSelectProductsDone } className='btn btn-info'>Chọn những sản phẩm này</button>
                    </div>
                </div>
            </div>
        </MyModal>
    );
}
MyProductList.defaultProps = {
    warehouse_id: 0
}
export default MyProductList;