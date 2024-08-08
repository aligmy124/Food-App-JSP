import axios from 'axios'
import React, { useEffect } from 'react'
import Header from '../../../Shared/Components/Header/Header'
import freepik from "../../../../assets/img/freepik.png"
// import freepik2 from "../../../../assets/img/freepik2.png"
export default function Home() {

  return (
    <Header 
    title={"Welcome ..."}
    description={"This is a welcoming screen for the entry of the application , you can now see the options"}
    imgUrl={freepik}
    type={"home"}
    />
  )
}
