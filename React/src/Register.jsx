
import React ,{useState, useEffect} from 'react';
import './Register.css'
import img from './samples/register.png'
import axios from 'axios';
import {useHistory,useParams} from 'react-router-dom';



const Register = ()=> {

    let {id}  = useParams();
    if(id===undefined)
    id=""
    
const [number, setNumber]= useState(JSON.stringify(id).replace(/['"]+/g, ''));
const history = useHistory();
useEffect(()=>{

    checkNumber()

},[number])
const Submit = async (e)=>{
    e.preventDefault();
    
    let url = '/api/'+ number
     axios.get(url).then(function(res){
        console.log(res.data);
        if(res.data==null){
          console.log("unique")
          history.push('../car-details/'+number);
        }
        else
        {
            console.log("Lll");
            history.push('../receipt/'+number);
        }

        
    })

}

const checkNumber =(event)=>{
     let flag=1;
     
     if(number.length<12)
      {
          flag=0;
      }
     if(flag)
     {
         document.querySelector('.reg-park').disabled= false;
         document.querySelector('.reg-park').style.backgroundColor="#5E188C";
         document.querySelector('.reg-park').style.color="white";

     }
     else {
        document.querySelector('.reg-park').disabled= true;
        document.querySelector('.reg-park').style.backgroundColor="#7E8184";
        

     }
    }

    return(
    <>
     <div className="body"> 
     
     <div className="reg-pic">

     <img src={img} alt="CAR"></img>
      </div>
     <div className="reg-number-plate">
      <h1> HOLA!</h1>
      <form method="GET" onSubmit={Submit}>
      <div className="reg-input-box">
         <h4>Park your car</h4> 
         Car Plate Number <span style={{color: "red"}}>*</span><br/>
         <input type="text" name="plate-number" value={number} placeholder="Type your car plate number" onChange={(e) =>{setNumber(e.target.value)}}/>
      </div>
      <div className="reg-buttons">
          <button type="button" className="reg-exit" name="exit" >Exit</button>
          <button type="submit" className="reg-park" name="park" disabled>Park</button>

      </div>
      </form>
      <div className="reg-new">
          <div className="reg-new1">
           New here? Don't worry we got you.

          </div>
          <div className="reg-now">
          <a href='/car-details'>Register now</a>
              
          </div>
      </div>
    
     </div>
     </div>

    </>
)


}
export default Register;