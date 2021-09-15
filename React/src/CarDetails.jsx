
import React,{useState, useEffect} from 'react';
import './CarDetails.css'
import axios from 'axios'
import {useParams, useHistory} from 'react-router-dom'


const CarDetails = ()=> {
    const history= useHistory();
    let {id}  = useParams();
    if(id===undefined)
    id=""
    
    const [colorID, setColor] =useState(-1);
    const colorOption=["white","black","red","yellow","green","blue"];
    const [msg, setMessage] = useState('')
    const [carInfo, updateCarInfo] = useState({
        company:"",modelName:"",plateNumber:JSON.stringify(id).replace(/['"]+/g, ''),colorID:-1
    })
 


    const Style =(color)=>
    {
        let font= "black";
        if(color==="black")
        font="white"
        
      return{
        borderRadius: 12,
        width: 112,
        height: 44,  
        backgroundColor : color,
        color: font,
     
        marginTop: 10
        
    }
}

useEffect(()=>{

    checkNumber()
    

},[carInfo])
const checkNumber =()=>{
    let flag=1;
    if(colorID===-1 || carInfo.plateNumber.length<12)
     {
         flag=0;
     }
    if(flag)
    {
        document.querySelector('.car-details-button').disabled= false;
        document.querySelector('.car-details-button').style.backgroundColor="#5E188C";

    }
    else {
       document.querySelector('.car-details-button').disabled= true;
       document.querySelector('.car-details-button').style.backgroundColor="#7E8184";
    }
   }
const Clicked = (e)=> {
     e.preventDefault();
     let id= e.target.value
    setColor(id);
    updateCarInfo({...carInfo,["colorID"]:colorOption[id].capitalize()})
    
  
    
     const buttonList= document.querySelectorAll('.car-details-color-box button')
     for(let i=0; i< buttonList.length; i++)
     {
        buttonList[i].style.border="none";
        buttonList[i].style.filter="grayscale(30%)"

     }
    buttonList[id].style.border="3px solid #0bf14d"
    buttonList[id].style.filter="none"
    
    
}
const update=(e)=>{


    let cName= e.target.name;
    let cValue= e.target.value;
    updateCarInfo({...carInfo,[cName]:cValue})
    
}
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

const Submit = async (e)=>{
    e.preventDefault();
   
     axios.post('/api',
    
    {
        company: carInfo.company,
        modelName: carInfo.modelName,
        plateNumber: carInfo.plateNumber,
        color: carInfo.colorID,
    }).then(function(res){
        console.log(res.data);
        setMessage(res.data);
        if(res.data==="SUCCESS!!")
        history.push('../register/'+carInfo.plateNumber)

    
    })

}
 
return(

<>
<div className="body"> 

   <div className="car-details-title">
       Car Registration
   </div>
       {msg}
   
   <form method="POST" className="car-details-form" onSubmit={Submit} >
        Company <span style={{color: "red"}}>*</span><br/>
        <input type="text" name="company" className="car-details-input" placeholder="Type your Company name" required={true} value={carInfo.company}  onChange={update}/> <br/>
        Model Name <span style={{color: "red"}}>*</span><br/>
        <input type="text" name="modelName" className="car-details-input" placeholder="Type your Model name" required={true} value={carInfo.modelName} onChange={update}/><br/>  
        Car Plate Number <span style={{color: "red"}}>*</span><br/>
        <input type="text" name="plateNumber" className="car-details-input" placeholder="Type your Car Plate Number" required={true} value={carInfo.plateNumber} onChange={update}/>  <br/> <br/>
  
  
        Select your Car color <span style={{color: "red"}}>*</span><br/> 
        <div className="car-details-color-box">
            {colorOption.map((color, i) => {     
                            
            return (<button type="none" key={i} value={i} style={Style(color)} onClick={Clicked} >{color.capitalize()}</button>) 
            })}

        </div>
   <input type="hidden" name="colorID"  value={colorID}/>
   <input type="submit" className="car-details-button"  value="Register Now" disabled/> 
   </form>

</div>
</>
)
}
export default  CarDetails