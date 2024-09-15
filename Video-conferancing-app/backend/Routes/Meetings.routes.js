import express from 'express'
import { createMeetings  ,ScheduleMeetings} from '../Controller/MeetingController.js'
import auth from '../middilware/authentication.js';


const router = express.Router();
// const meetingController = require('../controllers/meetingController');
// const auth = require('../middleware/auth');

router.post('/create', auth ,  createMeetings);
router.get('/scheduled', ScheduleMeetings)

export default router;
    
    