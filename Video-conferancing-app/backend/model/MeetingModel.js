// Meeting Schema
import mongoose from "mongoose";
const MeetingSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    participants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  

  // Create models
const Meeting = mongoose.model('Meeting', MeetingSchema);

export default Meeting;
