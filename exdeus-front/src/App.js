import React, { Component } from 'react';
import { NameEntryField } from './js/components';
import logo from './logo.svg';
import './App.css';
import socketIOClient from "socket.io-client";

class App extends Component {
    constructor() {
        super();
        this.state = {
            response: false,
            endpoint: "http://127.0.0.1:2020"
        };
        this.nameChange = this.nameChange.bind(this);
    }

    componentDidMount() {
        const { endpoint } = this.state;
        this.socket = socketIOClient(endpoint);
    }

    nameChange(newName) {
        this.socket.emit("rename", newName);
    }

    render() {
        const { response } = this.state;
        return (
            <NameEntryField changeName={this.nameChange} />
        );
    }
}
export default App;
