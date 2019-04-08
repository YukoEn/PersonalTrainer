import React, { Component } from "react";
import BigCalendar from "react-big-calendar-like-google";
import moment from "moment";
import "react-big-calendar-like-google/lib/css/react-big-calendar.css";
import 'react-big-calendar/lib/less/styles.less';

const localizer = BigCalendar.momentLocalizer(moment);
const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

class CalendarView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trainings: [],
    };
  }

  //Fetch trainings
  componentDidMount() {
    this.loadTrainings();
  }

  loadTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(response => response.json())
      .then(jsondata => this.setState({ trainings: jsondata }))
      .catch(err => console.error(err));
  };

  eventStyleGetter = (event, start, end, isSelected) => {
    console.log(event);
    var backgroundColor = '#' + event.hexColor;
    var style = {
      backgroundColor: backgroundColor,
      borderRadius: '0px',
      opacity: 1,
      color: 'black',
      border: '0px',
      position: 'float',
      display: 'block',
      textAlign: 'left',
      fontSize: '0.8em',
      borderRadius: '5px',
    };
    return {
      style: style
    };
  }

  render() {
    const colorArray = [
      '#ff7f50', '#3174ad', '#dc143c', '#ff8c00', '#9932cc',
      '#e9967a', '#8fbc8f', '#cd5c5c', '#da70d6', '#eee8aa',
      '#98fb98', '#afeeee', '#db7093', '#cd853f', '#b0e0e6',
    ];

    const eventItem = this.state.trainings.map((obj, index) => {
      let container = {};
      container.start = new Date(moment(obj.date).format('LLL'))
      container.end = new Date(moment(obj.date).add(obj.duration, 'minutes').format('LLL'));
      container.title = obj.activity;
      container.desc = '#' + obj.customer.id + ' ' + obj.customer.firstname + ' ' + obj.customer.lastname;
      container.bgColor = colorArray[index % 15];
      return container;
    });

    //console.log(eventItem);

    const EventAgenda = ({ event }) => (
      <span>
        <em style={{ color: '#4285f4' }}>{event.title}</em>
        <p>{event.desc}</p>
      </span>
    );

    const Event = ({ event }) => (
      <span>
        <strong>{event.title}</strong>
        <p>{event.desc}</p>
      </span>
    );

    return (
      <div className="App">

        <BigCalendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={eventItem}
          views={allViews}
          step={60}
          style={{ height: "90vh", width: "90vw" }}
          selectable={true}
          components={{
            event: Event,
            agenda: {
              event: EventAgenda
            }
          }}
        />

      </div>
    )
  }
}

export default CalendarView;