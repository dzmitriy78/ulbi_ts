import React, {useState} from 'react';

const Counter = () => {
    const [count, setCount] = useState(0);
    const incHandler = () => {
        setCount(count + 1)
    }
    const decHandler = () => {
        setCount(count - 1)
    }
    return (
        <div>
            <h1>{count}</h1>
            <button onClick={incHandler}>Increment</button>
            <button onClick={decHandler}>Decrement</button>
        </div>
    );
};

export default Counter;