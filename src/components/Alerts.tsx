import React from "react";
import { useSelector } from "react-redux";
import { AlertsTypes } from "../interfaces/Alerts";
import { getAlerts } from "../selectors/AlertsSelector";
import Button from "./Button";

const alertTypes = {
  error: '',
  warnign: '',
  info: ''
}

const Alerts: React.FC = () => {
  const alerts = useSelector<AlertsTypes[], AlertsTypes[]>(state => getAlerts(state));

  console.log(alerts);

  return (
    <div>
      {alerts && alerts.map((alert: AlertsTypes) => 
        <div className={alertTypes[alert.type as keyof typeof alertTypes]}>
          <div>
            {alert.message}
          </div>
          <Button 
            type='floating'
            onClick={() => console.log('alert button clicked')}
          />
        </div>
      )}
      
    </div>
  );
}

export default Alerts;