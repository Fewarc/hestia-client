import React from 'react';

import './Container.scss';

interface ContainerProps {
  size?: string | undefined,
  children: JSX.Element | JSX.Element[]
}

const Container: React.FC<ContainerProps> = ({
  size = 'xl',
  children
}) => {
  return (
    <div className={`container-${size}`}>
      {children}
    </div>
  );
}

export default Container;