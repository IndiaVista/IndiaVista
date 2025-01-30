import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  date: { 
    type: String,  
    required: true,
    unique: true,  
  },
  event: { 
    type: String, 
    required: true 
  },
  type: { 
    type: String, 
    required: true 
  },
  extras: { 
    type: String, 
    required: false 
  },
  region: { 
    type: String, 
    required: true 
  },
  religion: { 
    type: String, 
    required: true 
  },
  festive_type: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: false 
  }

});

export const Event = mongoose.model('Event', eventSchema);