import Meeting from "../model/MeetingModel.js";


export const createMeetings = async (req, res) => {
  try {   
    console.log( " checking body data :",req.body);
    const { title, participants, startTime, endTime } = req.body;
    console.log(` title : `, title , " participants : ", participants , " startTime :", startTime , "  endTime :", endTime);
    const meeting = new Meeting({
      title,
      organizer: req.user._id,
      participants,
      startTime,
      endTime
    });
    console.log(" Meeitng : ", meeting);
   const result =  await meeting.save();

   console.log("Result : ", result);
    res.status(201).json(meeting);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
    }
    
    

export const ScheduleMeetings = async (req, res) => {

  console.log("schedul meetings  : ", req.body);

  res.send("Status succes : " )
    // try{
        
    //      // Get User's Meetings
    // const userMeetings = await Meeting.find({$or: [ { organizer: userId }, { participants: userId }]})
    // .populate('organizer participants', 'name email');
    
    // // await newMeeting.save();
    // console.log();
    
    // }catch(err){
    //     console.log("eeror : ", err );
    //     res.send(500).json({massage : "Something went wrong !! ", error :err })
    // }
    }
    
  
 



    
    
 
 