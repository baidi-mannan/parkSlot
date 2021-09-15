import React,{useState, useEffect} from 'react';
import './Receipt.css'
import img from './samples/receipt.png'
import axios from 'axios'
import {useParams} from 'react-router-dom'


const Receipt=() => {

  let {number}  = useParams();
  JSON.stringify(number).replace(/['"]+/g, '')
   const [p,setp]= useState({});

useEffect(()=>{

  let url = '/api/'+ number
  console.log(url)
  axios.get(url).then(function(res){
     console.log(res.data);
     if(res.data!=null){
       res.data["_id"]= res.data["_id"].substring(0, 10)
       setp(res.data);
      
     }
     else
     {
         return(<>
           NO CAR EXISTS
          </>)
      
     }

     
 })
    

},[])


  return(
  <>
  <div className="body">
    <div className="receipt-title">
      Parking Receipt
    </div>
    <div className="receipt-pic">

        <img src={img} alt="CAR"></img>
    </div>
    <div className="receipt-car">
        <div className="receipt-car-title">
            <div><h4> Parking Details</h4></div>

            <div>{p._id}</div>
        </div>
    
        <div className="receipt-car-name">
            <div> {p.color}, {p.modelName}<br/> {p.plateNumber}</div>

            <div>Slot No. :- {p.slot}</div>
        </div>

    </div>
    <div className="receipt-right">
        
    <a href='/filter'>Parking History ></a>

      </div>
  </div>
  </>)

}

export default Receipt;