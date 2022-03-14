import React from 'react';

interface MySelectPropsType {
    options: Array<any>
    defaultValue:string
    value:string
    onChange(value: string):void
}

const MySelect = ({options, defaultValue, value, onChange}:MySelectPropsType) => {
    return (
        <select
            value={value}
            onChange={event => onChange(event.target.value)}
        >
            <option disabled value="">{defaultValue}</option>
            {options
                .map((option: { value: any; name: any; }) =>
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
                )}
        </select>
    );
};

export default MySelect;