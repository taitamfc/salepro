import React from 'react';

function LoadingIcon(props) {
    return (
        <div className="text-center"><span className="spinner-border"></span></div>
    );
}

LoadingIcon.defaultProps = {
    colSpan: 10
}

export default LoadingIcon;