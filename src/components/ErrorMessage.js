import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap'

class ErrorMessage extends Component {

    constructor(props){
        super(props);
        this.handleCancel=this.handleCancel.bind(this);
    }

    handleCancel() {
        this.props.onHide();
    }
    render() {
        return (<Modal show={this.props.show} onHide={this.handleCancel}>
            <Modal.Header closeButton>
                <Modal.Title id="modalTitle">Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Invalid Login and password </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.handleCancel}>Cancel</Button>
            </Modal.Footer>
        </Modal>)
    }
} 

export default ErrorMessage;