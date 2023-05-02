import React from 'react';

function MyPagination(props) {
    const {pageData,setPage} = props;
    let pageNumbers = [];
    for(let i = 1; i <= pageData.last_page;i++){
        pageNumbers.push(i);
    }
    if(pageData.total == 0){
        return <></>
    }
    return (
        <div className="card-footer d-flex">
            <div className="ml-auto mt-2 d-flex align-items-center">
                <span className="mr-2 totalItemCount">
                {pageData.from} - {pageData.to} / {pageData.total}
                </span>
                <ul className="pagination pagination-sm">
                    { pageData.current_page > 1 && 
                        <li className="page-item">
                            <a onClick={()=>setPage(pageData.current_page - 1)} className="page-link cusorPoiter">
                                <i className="fal fa-step-backward" />
                            </a>
                        </li>
                    }
                    {
                        pageNumbers.map( (pageNumber,key) => {
                            const activeClass = pageData.current_page === pageNumber ? 'page-item active' : 'page-item';
                            return (
                                <li className={activeClass}>
                                    <a onClick={()=>setPage(pageNumber)} className="page-link cusorPoiter">
                                        {pageNumber}
                                    </a>
                                </li>
                            )
                        })
                    }
                    { pageData.current_page < pageData.last_page && 
                        <li className="page-item">
                            <a onClick={()=>setPage(pageData.current_page + 1)} className="page-link cusorPoiter">
                                <i className="fal fa-step-forward" />
                            </a>
                        </li>
                    }
                </ul>
            </div>
        </div>

    );
}

export default MyPagination;