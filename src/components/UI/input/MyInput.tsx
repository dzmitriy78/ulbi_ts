import React from 'react';
import "./MyInput.css"

const MyInput = (props: any) => {
    return (
        <input className="myInput" {...props}/>
    );
};

export default MyInput;