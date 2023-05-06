import React from 'react';
import { NumericFormat } from 'react-number-format';

function MyNumberFormatInput(props) {
    const {value,className,name} = props;
    return (
        <NumericFormat className={className ?? ''} name={name ?? ''} thousandSeparator=","  value={value ?? 0}/>
    );
}

export default MyNumberFormatInput;