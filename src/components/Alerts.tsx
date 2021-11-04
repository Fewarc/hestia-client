import React from "react";
import Button from "./Button";

const Alerts: React.FC = () => {
  const message = '';

  return (
    <div>
      <div>
        {message}
      </div>
      <Button 
        type='floating'
        onClick={() => console.log('alert button clicked')}
      />
    </div>
  );
}

export default Alerts;