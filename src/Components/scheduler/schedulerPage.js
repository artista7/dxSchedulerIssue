//import libraries
import React from 'react';
import PropTypes from "prop-types";
import Scheduler from 'devextreme-react/scheduler';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.compact.css';
import './SchedulerPage.css';

var timeout;

// create a component
class SchedulerPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            appointments: [{
                id: 1,
                appointmentTypeName: "flare outage",
                assetName: "stop1",
                isPlanned: true,
                status: 'active',
                startDate: setDateObject(new Date().toISOString(), "13:00:00"),
                endDate: setDateObject(new Date().toISOString(), "14:00:00")
            },
            {
                id: 2,
                appointmentTypeName: "Oil leakage",
                assetName: "stop2",
                isPlanned: true,
                status: 'active',
                startDate: setDateObject(new Date().toISOString(), "15:00:00"),
                endDate: setDateObject(new Date().toISOString(), "16:00:00")
            },
            {
                id: 3,
                appointmentTypeName: "Meter reading",
                assetName: "stop3",
                isPlanned: true,
                status: 'active',
                startDate: setDateObject(new Date().toISOString(), "11:00:00"),
                endDate: setDateObject(new Date().toISOString(), "12:00:00")
            }],
        }

        //Using scheduler methods to hide appointment form
        this.scheduler = null;
        this.setScheduler = (ref) => {
            if (ref) { this.scheduler = ref.instance; }
        }

        this.onCellClick = this.onCellClick.bind(this);     //To imitate double click oncell\
        this.onAppointmentFormCreated = this.onAppointmentFormCreated.bind(this);     //to create/edt appointment form
    }

    onCellClick(e) {
        if (!timeout) {
            timeout = setTimeout(function () {
                timeout = null;
            }, 300);
        }
        else {
            this.props.showForm(true);  //This is double-click. Do anything you want here. 
            return;
        }
        e.cancel = true;
    }

    onAppointmentFormCreated(e) {
        this.scheduler.hideAppointmentPopup();
        this.props.showForm(true, e.appointmentData);  //This is double-click. Do anything you want here.
    }

    render() {
        return (
            <div>
                <Scheduler
                    ref={this.setScheduler}
                    dataSource={this.state.appointments}
                    views={[{
                        type: "day",
                        appointmentTemplate: function (cellData, index, container) {
                            container.style.backgroundColor = "white";//"rgb(242,253,252)";
                            container.style.color = "black";
                            container.style.fontWeight = "bold";
                            container.style.fontSize = "12px";
                            container.style.borderLeft = cellData.isPlanned == true ? "12px solid rgb(190,177,213)" : "12px solid rgb(240,224,162)";
                            container.style.boxShadow = "1px 1px 10px rgba(0, 0, 0, .5)";//container.style.boxShadow = "1px 1px 10px rgb(228, 228, 228)";
                            return `<div style="font-family: JoynFontBook; margin-top:10px; font-size:14px; margin-left:5px">${cellData.appointmentTypeName} <span style="float: right; margin-right:10px; margin-top:7px; font-weight: normal; font-family: JoynFontBook"><div class='blue-dot'></div>${cellData.status}</span></div>` +
                                `<div style="margin-top: 5px;">` +
                                `<div style="font-size:10px; font-weight: normal; margin-left:5px; display:inline-block">
                                        ${cellData.assetName}
                                    </div>` +
                                `</div>`;
                        },
                        dataCellTemplate: function (cellData, index, container) {
                            container.style.border = "none";
                            container.style.borderBottom = "1px dashed rgb(228,228,228)";
                        }
                    }, {
                        type: 'week',
                        appointmentTemplate: function (cellData, index, container) {
                            container.style.backgroundColor = "white";
                            container.style.color = "black";
                            container.style.fontWeight = "bold";
                            container.style.fontSize = "13px";
                            container.style.borderTop = cellData.isPlanned == true ? "7px solid rgb(190,177,213)" : "7px solid rgb(240,224,162)";
                            container.style.borderLeft = "1px solid rgb(228,228,228)";
                            container.style.borderRight = "1px solid rgb(228,228,228)";
                            container.style.borderBottom = "1px solid rgb(228,228,228)";
                            container.style.boxShadow = "1px 1px 10px rgba(0, 0, 0, .5)";
                            return `<div style="font-family: JoynFontBook">${cellData.appointmentTypeName}</div>` +
                                `<div style="font-size:10px; font-weight: lighter; font-family: JoynFontBook; padding-top:5px;">${cellData.assetName}</div>`;
                        },
                        dataCellTemplate: function (cellData, index, container) {
                            container.style.border = "none";
                            container.style.borderBottom = "1px dashed rgb(228,228,228)";
                        }
                    }, {
                        type: 'month',
                        appointmentTemplate: function (cellData, index, container) {
                            container.style.backgroundColor = "white";
                            container.style.color = "black";
                            container.style.fontWeight = "bold";
                            container.style.fontSize = "12px";
                            container.style.borderLeft = cellData.isPlanned == true ? "4px solid rgb(190,177,213)" : "4px solid rgb(240,224,162)";
                            container.style.boxShadow = "1px 1px 5px rgba(0, 0, 0, .5)";
                            return `<div style="font-family: JoynFontBook">${cellData.appointmentTypeName}</div>`;
                        },
                    }]}
                    useDropDownViewSwitcher={false}
                    height={"calc(100vh - 55.6px)"}
                    defaultCurrentView={'week'}
                    defaultCurrentDate={new Date()}
                    startDayHour={9}
                    editing={{ "allowAdding": false, "allowEditing": false }}
                    onCellClick={this.onCellClick}
                    onAppointmentFormCreated={this.onAppointmentFormCreated}
                />
            </div>
        );
    }
}

SchedulerPage.propTypes = {
    showForm: PropTypes.func.isRequired
};

//make this component available to the app
export default SchedulerPage;


//returns new dateTime object from date and time   //used in scheduler
function setDateObject(date, time) {
    date = date.includes('T') ? date.split("T")[0] : date;
    var dateObj = new Date(date);
    dateObj = new Date(dateObj.getTime() - dateObj.getTimezoneOffset() * 60000);
    if (time != null) {
        dateObj.setHours(time.split(":")[0]);
        dateObj.setMinutes(time.split(":")[1]);
        dateObj.setSeconds(time.split(":")[2]);
    }
    return dateObj;
}


