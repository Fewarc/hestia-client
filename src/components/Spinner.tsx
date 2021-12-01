import React from "react";

const Spinner: React.FC<{
  className?: string,
  dimensionsClass?: string,
  borderClass?: string
}> = ({
  className,
  dimensionsClass = 'w-20 h-20',
  borderClass = ''
}) => {
  return (
    <div className={className}>
      <div style={{borderTopColor: 'transparent'}} className={`border-8 border-primary border-solid rounded-full animate-spin ${dimensionsClass} ${borderClass}`}></div>
    </div>
  );
}

export default Spinner;