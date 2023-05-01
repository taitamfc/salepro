import React from 'react';

function MyModal(props) {
    const {show,children,modal_title,size} = props;
    let classShow = '';
    if(show){
        classShow = 'show';
    }
    return (
        <>
            <div className={'modal fade '+ classShow} style={{'display' : show ? 'block' : ''}} id="defaultModal" tabIndex={-1} role="dialog" aria-modal="true">
                <div className={'modal-dialog modal-dialog-centered modal-scroll modal-' + size}>
                    <div className="modal-content">
                        <div className="modal-header bg-light py-2 ">
                            <h5 className="modal-title"> {modal_title} </h5>
                            <button onClick={ () => props.setShowModal(false) } type="button" className="close" data-dismiss="modal" aria-label="Close" >
                                <i className="far fa-times font-size-xl" />
                            </button>
                        </div>
                        <div className="modal-body">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            { show ? <div className='modal-backdrop fade show'></div> : '' }
            
        </>
    );
}
MyModal.defaultProps = {
    show: false,
    modal_title: ''
}
export default MyModal;