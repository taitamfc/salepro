import React from 'react';

function Icon(props) {
    let {fa} = props
    return (
        <i className={fa}></i>
    );
}

export default Icon;