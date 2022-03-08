import React from 'react';

class ClassCounter extends React.Component<any, any> {
    constructor(props: number) {
        super(props);
        this.state = {
            count: 0
        }
    }

    incHandler = () => {
        this.setState({count: this.state.count + 1})
    }
    decHandler = () => {
        this.setState({count: this.state.count - 1})
    }

    render() {
        return (
            <div>
                <h1>{this.state.count}</h1>
                <button onClick={this.incHandler}>Increment</button>
                <button onClick={this.decHandler}>Decrement</button>
            </div>
        );
    };
}

export default ClassCounter;