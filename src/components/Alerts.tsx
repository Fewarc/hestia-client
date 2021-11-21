import classNames from "classnames";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeAlert } from "../actions/AlertsActions";
import { AlertsTypes } from "../interfaces/AlertsInterface";
import { getAlerts } from "../selectors/AlertsSelector";
import { XIcon } from "@heroicons/react/solid";
import Button from "./Button";

const typesOfAlerts = {
  error: 'bg-error bg-opacity-30 border border-error text-error ',
  warnign: 'bg-warning bg-opacity-30 border border-warning text-warning ',
  info: 'bg-info bg-opacity-30 border border-info text-info '
}

const alertClass = classNames(
  'relative',
  'py-4',
);

const iconClass = classNames(
  'w-8',
  'h-8',
);

const Alerts: React.FC = () => {
  const dispatch = useDispatch();
  const alerts = useSelector<AlertsTypes[], AlertsTypes[]>(state => getAlerts(state));

  return (
    <div className="fixed w-full text-center mt-20 z-50">
      {alerts && alerts.map((alert: AlertsTypes) => 
        <div className={typesOfAlerts[alert.type as keyof typeof typesOfAlerts] + alertClass}>
          <div>
            {alert.message}
          </div>
          <Button 
            type='floating'
            onClick={() => dispatch(removeAlert(alert))}
            children={<XIcon className={iconClass}/>}
            className='absolute right-4 top-1/2 transform -translate-y-1/2'
          />
        </div>
      )}
    </div>
  );
}

export default Alerts;