## Starting project
- npm install
- npm start



## Issue:-
On double clicking appointment, I am hiding default appointment template and opening my own custom form.
So in the SchedulerPage component i have a function :-

onAppointmentFormCreated(e) {
        this.scheduler.hideAppointmentPopup();
        this.props.showForm(true, e.appointmentData); 
}

On double clicking the appointment, the following error is thrown in the console:- Uncaught TypeError: Cannot read property 'onResize' of null.
1. What should i do to prevent this?
2. Is there a better way to open my custom form and hiding default form?

Issue link - https://www.devexpress.com/Support/Center/Question/Details/T709026/scheduler-uncaught-typeerror-cannot-read-property-onresize-of-null



## App component structure is:-
Mainpage with two child components - SchedulerPage & CreatForm