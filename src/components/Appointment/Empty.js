import React from "react";

export default function Empty(props) {
  return(<main className="appointment__add">
  <img
    className="appointment__add-button"
    src="images/add.png"
    alt="Add"
    onClick={props.onAdd}
    //onClick={props.onAdd} and onClick={(event) => props.onAdd(event)} works the same way as
    //onClick={() => props.setDay(props.name)} mentioned in DayListItem.js. This "onClick={props.onAdd}"
    //can be considered as shorthand and used when no parameters are being passed to function
  />
</main>);
}