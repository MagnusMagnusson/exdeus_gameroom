import React, { Component } from 'react';
import { FormControl, Form, Button } from 'react-bootstrap'; 

class NameEntryField extends Component{
    constructor() {
        super();
        this.state = { name: "" };
        this.changeName = this.changeName.bind(this);
    }
    
    changeName() {
        this.props.changeName(this.state.name);
    }

    render() {
        return (<div>
            <h1>Welcome!</h1>
            <Form>
                <Form.Label>Enter your name</Form.Label>
                <Form.Control onChange={e => this.setState({ name:e.target.value })} value={this.state.name} placeholder="Gunna Jónsdóttir" />
                <Button onClick={this.changeName} variant="primary">Submit Name</Button>
            </Form >
            </div>
        );
    }
}

export { NameEntryField}