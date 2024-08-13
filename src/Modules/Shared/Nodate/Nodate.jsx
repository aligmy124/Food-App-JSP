import React from 'react'
import logo from '../../../../src/assets/img/Deleteimg.png';
export default function Nodate() {
  return (
    <div className="text-center">
        <img src={logo} alt="Nodata" width={"95px"}/>
        <h5 className='pt-2'>No Data</h5>
        <p>are you sure you want to delete this item ? if you are sure just click on delete it</p>
    </div>
  )
}
