import React from 'react';
import "./components/styles/App.css"
import PostItem from "./components/PostItem";

function App() {

    return (
        <div className="App">
            <PostItem post={{id: 1, title: "Javascript", body: "description"}}/>
            <PostItem post={{id: 2, title: "Javascript", body: "description"}}/>
            <PostItem post={{id: 3, title: "Javascript", body: "description"}}/>
            <PostItem post={{id: 4, title: "Javascript", body: "description"}}/>
            <PostItem post={{id: 5, title: "Javascript", body: "description"}}/>

        </div>
    );
}

export default App;
