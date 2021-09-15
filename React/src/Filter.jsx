import React,{useState, useEffect} from 'react';
import './Filter.css'
import axios from 'axios'
import Box from './Box.jsx'


const Filter= ()=>
{
    const [color,setColor]= useState("All");
    const[carsList, updateCarList]= useState([])

        const update=(e)=>
        {
          e.preventDefault();

          setColor(e.target.value);

        }

    useEffect(()=>{
       
               updateList();
               
    
    },[color])
    const updateList=()=>
    {
         

          let url = '/api/color'+ color
          axios.get(url).then(function(res){
          
               updateCarList(res.data);
               
          })

     }

  return (
    <>
   <div className="body">

        <div className="filter-title">
             Parking History
        </div>
        <div className="filter-select">
                    
                    <select name="color" value={color} onChange={update} id="color">
                    <option className="filter-option" value="White">White</option>
                    <option value="Black">Black</option>
                    <option value="Red">Red</option>
                    <option value="Blue">Blue</option>
                    <option value="Green">Green</option>
                    <option value="Yellow">Yellow</option>
                    <option value="All">All</option>
                    </select>


        </div>

        <div className="filter-list">
        {carsList.map((car, i) => {     
                            
             return (<Box
             key={i}
             color={car.color}
             modelName={car.modelName}
             slot={car.slot}
             plateNumber={car.plateNumber}
             date={car.date}
                    />) 
                            })}




        </div>



   </div>
    



    </>)




}


export default Filter