
import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap'

class Jobform extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.visible,
            show: false
        };
        console.log(`upon construct ${this.state.visible}`)
        this.handleAdd = this.handleAdd.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }
    handleShow() {
        this.setState({ show: true });
    }

    handleAdd(e) {
        e.preventDefault();
        console.log('saving...');
        var data = {
            title: e.target.elements.title.value,
            description: e.target.elements.description.value
            }
        this.props.onSave(data);
    }

    handleCancel(e) {
        //   e.preventDefault();
        this.props.onHide();
    }

    componentWillReceiveProps(newProps) {
        this.setState({ visible: newProps.visible });
    }

    render() {
        return (
            <div>
                <Modal show={this.state.visible} onHide={this.handleCancel}>
                    <Modal.Header closeButton>
                        <Modal.Title id="modalTitle">Add a Job</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.handleAdd}>
                            <div className="form-group">
                                <input name='title' className="form-control" placeholder="title" id="title" required="required" />
                            </div>
                            <div className="form-group">
                                <input name='description' className="form-control" placeholder="description" id="description" required="required" />
                            </div>
                            <Modal.Footer>
                                <button className="btn btn-primary" value="Submit">Save</button>
                                <Button onClick={this.handleCancel}>Cancel</Button>
                        </Modal.Footer>                 
                        </form>
                    </Modal.Body>

                </Modal>
            </div>
        );
    }
}
export default Jobform;

