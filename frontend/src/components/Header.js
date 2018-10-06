import React from 'react';

const Header = ({text, city, lat, lon}) =>{
  if(lat && lon){
    return (
      <h2>{text} {city} (near {lat}, {lon})</h2>
    );
  }else{
    return (
        <h2>{text} {city}</h2>
    );

  }


}

export default Header
