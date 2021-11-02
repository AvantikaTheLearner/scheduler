import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });
  //const setDays = (days) => setState(prev => ({ ...prev, days }));

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      const days = updateSpots("create");
      setState({ ...state, days, appointments });

    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.delete(`/api/appointments/${id}`).then(() => {
      const days = updateSpots();
      setState({ ...state, days, appointments });
    });
  }

  // useEffect(() => {
  //   if(Object.keys(state.appointments).length) {
  //     spotsLeftForDay(state.day);
  //   }
  // },[state.appointments]);

  // function spotsLeftForDay(day) {
  //   let count = 0;
  //   const filteredDay = state.days.find((d) => d.name === day);

  //   for (const elem of filteredDay.appointments) {
  //     if (state.appointments[elem].interview === null) count++;
  //   }
  //   const updatedDay = {
  //     ...filteredDay,
  //     spots: count,
  //   };
  //   const days = state.days.map((day) => day.id === filteredDay.id ? updatedDay : day);
  //   setState({ ...state, days });
  //   // return axios.put(`/api/days/${filteredDay.id}`, { spots }).then(() => {
  //   //   setState({ ...state, days });
  //   // });
  // }
  function updateSpots(requestType) {
    const dayIndex = state.days.findIndex((d) => d.name === state.day);
    const days = state.days;
    if (requestType === "create") {
      days[dayIndex].spots -= 1;
    } else {
      days[dayIndex].spots += 1;
      }
      return days;
  }

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
