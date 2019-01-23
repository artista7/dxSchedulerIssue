//import libraries
import React from 'react';
import PropTypes from 'prop-types';

// create a component
class CreateForm extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <div>
                {this.props.selectedAppointment != undefined && <p>Selected appointment type - {this.props.selectedAppointment.appointmentTypeName}</p>}
                <button onClick={() => { this.props.showForm(false) }}>Go to scheduler</button>
            </div>
        );
    }
}

CreateForm.propTypes = {
    showForm: PropTypes.func.isRequired,
    selectedAppointment: PropTypes.object
};
//make this component available to the app
export default CreateForm;
