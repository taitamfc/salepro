import React from 'react';
import { NumericFormat } from 'react-number-format';

function MyNumberFormat(props) {
    const {value} = props;
    return (
        <NumericFormat displayType='text' thousandSeparator=","  value={value ?? 0}/>
    );
}

export default MyNumberFormat;