import React, {forwardRef} from 'react';
import "./MyInput.css"

const MyInput = forwardRef((props: any, ref) => {
    return (
        <input ref={ref} className="myInput" {...props}/>
    )
}
)
export default MyInput;