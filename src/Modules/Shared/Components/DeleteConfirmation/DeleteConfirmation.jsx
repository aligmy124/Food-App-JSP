import React from 'react'
import deleteimg from '../../../../assets/img/Deleteimg.png'
export default function DeleteConfirmation({deleteItem}) {
  return (
<div className="text-center">
          <img src={deleteimg} alt="deleteimg" />
          <h5 className='pt-2'>Delete This {deleteItem}?</h5>
          <p>are you sure you want to delete this item ? if you are sure just click on delete it</p>
          </div>
  )
}
