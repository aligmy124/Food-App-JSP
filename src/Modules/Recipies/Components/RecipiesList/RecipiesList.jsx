import React from 'react'
import Header from '../../../Shared/Components/Header/Header'
import users from "../../../../assets/img/users.png"
export default function Recipieslist() {
  return (
    <Header
    title={"Recipes List"}
    description={"You can now add your items that any user can order it from the Application and you can edit"}
    imgUrl={users}
    type={"Users"}
    />
  )
}
