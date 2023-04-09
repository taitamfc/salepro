import React from 'react';
import Header from '../includes/Header';
import Footer from '../includes/Footer';

function MasterLayout({ children }) {
    return (
        <>
            <Header/>
            <div className="page-content">
                <div className="content-wrapper">
                    <div className="container">
                        { children }
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default MasterLayout;