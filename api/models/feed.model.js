import mongoose from 'mongoose';

const feedSchema=new mongoose.Schema({
   


  currentId: {
    type: String,
    required:true,
   
    
  },
    name: {
        type: String,
        unique: false
       
        
      },
    rate: {
        type: String,
        unique: false
        
        
      },
   
      Description: {
      type: String,
      unique: false
   
      
    },
   
     
    
    
    

})

const feed=mongoose.model('feed',feedSchema);

export default feed;                         