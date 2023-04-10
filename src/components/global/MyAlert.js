import React, { useEffect } from 'react';

function MyAlert(props) {
    useEffect( () => {
        alert(props.msg)
    },[] )
    return (
        <></>
    );
}

export default MyAlert;