import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/Icon';

function Breadcrumb(props) {
    let {pageName,parentName,parentLink} = props;
    return (
        <>
            <div className="breadcrumb-line breadcrumb-line-light header-elements-md-inline border-top-0">
                <div className="d-flex">
                    <div className="breadcrumb align-items-center">
                        <Link to={'/'}><Icon fa='fa fa-home-alt mr-2'/></Link>
                        <Link to={'/'+parentLink} className=" breadcrumb-item">{parentName}</Link>
                        <span className="breadcrumb-item">{pageName}</span>                
                    </div>
                </div>
            </div>
            <div className="page-header-content header-elements-md-inline"></div>
        </>
    );
}

export default Breadcrumb;