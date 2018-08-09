import React, { Component } from 'react';
import Jobform from './Jobform';
import { listJobs,addJob } from '../api/api.js'
import { Table } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

function Details(props) {
    const items = props.jobs.map((job) => {
        return (
            <tr key={job.id}>
                <td>{job.title}</td>
                <td>{job.description}</td>
                <td>{job.clients[0].first_name} {job.clients[0].last_name}</td>
                <td>{job.address.address1} {job.address.city} {job.state} {job.postcode}</td>
                <td>{job.job_status.name}</td>
            </tr>
        )
    });
    return items;
}

class Jobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            access_token: undefined,
            show: false
        };
        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleHideForm = this.handleHideForm.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleAddClick(e) {
        this.setState({ show: true });
    }

    handleSave({ title, description }) {

        const data = {
            title,
            description,
            reference: null,
            order_number: null,
            billed_client_id: null,
            address: {
                id: 1921,
                owner_id: 275200,
                owner_type: "Client",
                type: "Addresses::Physical",
                address1: "10 Pitt Street",
                address2: "",
                city: "Redfern",
                state: "New South Wales",
                country: null,
                postcode: "2016",
                longitude: null,
                latitude: null,
                active: true,
                updated_at: "2017-12-05T23:12:27.779Z",
                created_at: "2017-12-05T23:12:27.752Z"
            },
            priority: 1,
            job_status_id: 1020,
            client_id: "275200"
        };
    
        addJob(data, this.props.access_token)
            .then((res) => {
                this.handleHideForm();
                this.handleRefresh(this.props.access_token);
            })
            .catch((e) => {                
                alert('An error occurred');
                this.props.clearToken();
            });
    }

    handleHideForm() {
        this.setState({ show: false });
    }

    handleRefresh(access_token) {
        listJobs(access_token).then((results) => {
            console.log(results.data);
            this.setState({ jobs: results.data });
        }).catch((e) => {
            console.log(e);
        });
    }

    componentWillMount() {

        this.setState({ access_token: this.props.access_token });
        listJobs(this.props.access_token).then((results) => {
            this.setState({ jobs: results.data });
        }).catch((e) => {
            console.log(e);
        });
    }

    render() {
        var { access_token, show } = this.state;
        return (
            <div>
                <h3>Jobs</h3>
                <div className="form">
                    <Button bsStyle="primary" onClick={this.handleAddClick}>add new </Button>
                    <Jobform visible={show} access_token={access_token} onRefresh={this.handleRefresh} onHide={this.handleHideForm} onSave={this.handleSave} />
                </div>
                <Table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Client Name</th>
                            <th>Job Address</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Details key={this.state.jobs.id} jobs={this.state.jobs} striped bordered condensed hover />
                    </tbody>
                </Table>
            </div>

        )
    }
}

export default Jobs;



