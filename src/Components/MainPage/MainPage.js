//import libraries
import React from 'react';
import PropTypes from 'prop-types';
import SchedulerPage from '../Scheduler/SchedulerPage';
import CreateForm from '../CreateForm/CreateForm';

// create a component
class MainPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            currentView: "schedulerPage",
            selectedAppointment: {}
        }

        this.showForm = this.showForm.bind(this);
    }

    showForm(bool, appointment) {
        if (bool) {
            this.setState({
                currentView: "createForm",
                selectedAppointment: appointment
            })
        }
        else {
            this.setState({
                currentView: "schedulerPage",
                selectedAppointment: {}
            })
        }
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.currentView == "schedulerPage" && <SchedulerPage
                        showForm={this.showForm}
                    />}
                </div>
                <div>
                    {this.state.currentView == "createForm" && <CreateForm
                        showForm={this.showForm}
                        selectedAppointment={this.state.selectedAppointment}
                    />}
                </div>

            </div>
        );
    }
}
MainPage.propTypes = {
};
//make this component available to the app
export default MainPage;
