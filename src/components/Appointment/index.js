import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {
  //console.log("props", props);
  return (
    <>
      <Header time={props.time} />
      <article className="appointment">
        {props.interview ? <Show student={props.interview.student} interviewer={props.interviewer}/> : <Empty />}
      </article>
    </>
  );
}