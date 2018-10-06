import React from 'react';

const Icon = ({icon}) =>{
  return (
    <div className="icon">
      { icon && <img src={`/img/${icon}.svg`} /> }
    </div>
  );
}

export default Icon
