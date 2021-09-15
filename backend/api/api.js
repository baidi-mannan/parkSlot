const express = require('express');
const router= express.Router();
const CarInfo = require('../models/CarInfo');
// Create a Car


router.post('/', async (req, res) => {
    
    const Exist = await CarInfo.findOne({plateNumber : req.body.plateNumber})

    if(Exist)
    {
        console.log(Exist)
        res.send("CAR WITH THIS NUMBER PLATE EXISTS");
        return;

    }
    const  dt= new Date();
    let dateI= JSON.stringify(dt.getDate());
    dateI= dateI + '-' + dt.getMonth() + '-' + dt.getFullYear();
  
   slotFilled = await CarInfo.find({}).select('slot -_id') 

    for(var i=0;i<slotFilled.length;i++)
    {
        slotFilled[i] = slotFilled[i].slot;
    }
    
    slotFilled.push(0);
    slotFilled.sort();
    let slotAvalible =-1
    console.log(slotFilled);
    for(var i=0;i<slotFilled.length;i++)
    {
        if(slotFilled[i]!=i)
        {
            slotAvalible=i;
            break;
        }
    }
    if(slotAvalible===-1)
    slotAvalible=slotFilled.length;

    const Car = new CarInfo({
        date: dateI,
        company: req.body.company,
        modelName: req.body.modelName,
        plateNumber: req.body.plateNumber,
        color: req.body.color,
        slot: slotAvalible,
        

    });
        Car.save(function(err) {
          if (!err) 
              res.send("SUCCESS!!");
          });  
   

})
// GET ALL CARS
router.get('/', async (req, res) => {
try {
    const CarsList = await CarInfo.find()
    res.json(CarsList);
}
catch (err) {
    res.status(500).json({message: err.message});
}
})


// GET CAR BY ID
router.get('/:id',async (req, res) => {
    
    if(req.params.id.includes("color"))
    {
        let str= req.params.id
       str=  str.replace('color', "");
        
     if(str==="All")
      { 
        
        try {
            const CarsList = await CarInfo.find()
            res.json(CarsList);
            return;
        }
        catch (err) {
            res.status(500).json({message: err.message});
        }
    }
    else
    {
        
                try {
                const CarsList = await CarInfo.find({color:str})
                res.json(CarsList);
                return;
            }
            catch (err) {
                res.status(400).json({message: err.message});
            }
           

    }


    }
    else
    {
    try {
        const CarsList = await CarInfo.findOne({plateNumber:req.params.id})
        res.json(CarsList);
    }
    catch (err) {
        res.status(400).json({message: err.message});
    }
}
    
})


module.exports = router