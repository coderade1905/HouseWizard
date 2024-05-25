import * as React from 'react';
import DrawerFilters from './Filter';
import { House } from '../Home';


export default function PermanentDrawerLeft() {
  return (
    <div >
        <DrawerFilters margin={20}/>
        <h1 style={{color: "#fff", marginBottom: "0px", marginLeft: "20px"}}>Nearby</h1>
        <div className='nearbylist'>
          <House title="Blah blah blah" price={2000} distance={25}/>
          <House title="Blah blah blah" price={2000} distance={25}/>
          <House title="Blah blah blah" price={2000} distance={25}/>
          <House title="Blah blah blah" price={2000} distance={25}/>
        </div>
    </div>
  );
}