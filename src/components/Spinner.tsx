import React from "react";

const Spinner: React.FC<{className?: string | undefined}> = ({
  className
}) => {
  return (
    <div className={className}>
      <div style={{borderTopColor: 'transparent'}} className="w-20 h-20 border-8 border-primary border-solid rounded-full animate-spin"></div>
    </div>
  );
}

export default Spinner;