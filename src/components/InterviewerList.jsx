import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";
import PropTypes from 'prop-types';

export default function InterviewerList(props) {

  const parsedInterviewers = props.interviewers
  .map(interviewer => (
  <InterviewerListItem 
  key={interviewer.id} 
  setInterviewer={() => props.onChange(interviewer.id)} 
  selected={interviewer.id === props.value} 
  {...interviewer} />)
  );

  return(
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {parsedInterviewers}
      </ul>
    </section>
  ); 
}
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};