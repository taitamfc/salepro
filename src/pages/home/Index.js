import React, { useEffect, useState } from 'react';
import MasterLayout from '../../layouts/MasterLayout';
import RevenueDashboardArea from '../../components/home/RevenueDashboardArea';
import TopDashboardOrder from '../../components/home/TopDashboardOrder';
import HomePageHeader from '../../components/home/HomePageHeader';
import HomeModel from '../../models/HomeModel';
import TopDashboardPurchase from '../../components/home/TopDashboardPurchase';
import { useSelector } from 'react-redux';

function Index(props) {
    const [loading,setLoading] = useState(true);
    const [item,setItem] = useState([]);
    const filter_home = useSelector(state => state.filter_home);


    useEffect( () => {
        HomeModel.index(filter_home).then( res => {
            setLoading(false);
            setItem(res.data);
        } )
    }, [filter_home]);
    return (
        <MasterLayout>
            <HomePageHeader/>
            <div className='content pt-0'>
                <div className='d-flex flex-wrap'>
                    {/* Content Left */}
                    <div className='col-xl-12'>
                        <RevenueDashboardArea 
                            profit={item.profit} 
                            purchase_return={item.purchase_return}
                            revenue={item.revenue}
                            sale_return={item.sale_return}
                        />
                        <div className="row">
                            <div className="col-12 col-lg-6">
                                <div className="card">
                                    <TopDashboardOrder items={item.recent_sale}/>
                                </div>
                            </div>
                            <div className="col-12 col-lg-6">
                                <div className="card">
                                    <TopDashboardPurchase items={item.recent_purchase}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MasterLayout>
    );
}

export default Index;