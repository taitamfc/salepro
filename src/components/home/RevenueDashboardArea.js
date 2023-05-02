import React from 'react';


function RevenueDashboardArea(props) {
    const {profit,purchase_return,revenue,sale_return} = props;
    return (
        <div className="card" id="revenueDashboardArea">
            <div className="card-body">
                <div className="row">
                    <div className="col-sm-3 col-6 px-1 px-lg-2">
                        <div className="py-2 bg-success mb-2 mb-md-0 rounded text-center text-white">
                            <div>
                                <i className="fal fa-chart-bar mr-2 fa-lg" /> DOANH THU
                            </div>
                            <div className="text-center pt-2">
                                <span className="totalRevenue text-white">{revenue}</span>
                                
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3 col-6 px-1 px-lg-2">
                        <div className="py-2 bg-blue-400 mb-2 mb-md-0 rounded text-center text-white">
                            <div>
                                <i className="fal fa-shopping-bag mr-2 fa-lg" /> TRẢ HÀNG BÁN
                            </div>
                            <div className="text-center pt-2">
                                <span className="totalRetailRevenue">{sale_return}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3 col-6 px-1 px-lg-2">
                        <div className="bg-orange-600 py-2 mb-md-0 rounded text-center text-white">
                            <div>
                                <i className="fal fa-shopping-cart mr-2 fa-lg" /> TRẢ HÀNG NHẬP
                            </div>
                            <div className="text-center pt-2">
                                <span className="totalShippingRevenue">{purchase_return}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3 col-6 px-1 px-lg-2">
                        <div className="bg-brown-300 py-2 rounded text-center text-white">
                            <div>
                                <i className="fal fa-cube mr-2 fa-lg" /> LỢI NHUẬN
                            </div>
                            <div className="pt-2">
                                <span className="totalRemainValue">{profit}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="chart position-relative" id="chartRevenue" />
        </div>
    );
}

export default RevenueDashboardArea;