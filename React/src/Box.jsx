import React  from 'react';
import img from './samples/receipt.png'
import './Box.css'

const Box=(props)=>{

   
    return(

        <>
        <div className="container">
            <div className="box-img">
                    <img src={img} alt="CAR"></img>

            </div>
            <div className="box-content">
             <div className="box-heading">
             <div> {props.color}, {props.modelName}</div>
             <div> Slot No:- {props.slot}</div>
             </div>
             
             <div className="box-detail">
                {props.plateNumber}<br/>
                {props.date}

                
             </div>

            </div>

            
        </div>


        </>
    )




}
export default Box