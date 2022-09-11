import classNames from "classnames";
import React from "react";
import { AlertType } from "../reducers/commonReducer";

interface Props {
  alert: AlertType
}

const AlertComponent = (props: Props) => {
  const modalClass = classNames({
    "alert": true,
    "alert-success": props.alert.state === 'success',
    "alert-danger": props.alert.state === 'failed'
  });
  return (
    <div className="alertNotification">
      <div className={modalClass} role="alert">
        {props.alert.message}
      </div>
    </div>
  );
}

export default AlertComponent;

