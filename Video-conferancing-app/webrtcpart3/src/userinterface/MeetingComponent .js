import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MeetingComponent.css';
import axios from 'axios';

const MeetingComponent = () => {
    const navigate = useNavigate();
    const [view, setView] = useState('join'); // 'join' or 'create'
    const [name, setName] = useState('');
    const [meetingId, setMeetingId] = useState('');
    const [title, setTitle] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [participants, setParticipants] = useState([]);
    const [participantInput, setParticipantInput] = useState('');
    const [meetingLink, setMeetingLink] = useState('');

    // const [name, setName] = useState("");
    const [roomId, setRoomId] = useState("");
    const handleJoinMeeting = () => {
        // Logic to join a meeting
        // alert(`Joining meeting with ID: ${meetingId}`);
         // Check if room ID and username are provided
    if (roomId.trim() && name.trim()) {
        // Redirect to the meeting room with roomID and username as query params
        navigate(`/room/${roomId}?username=${encodeURIComponent(name)}`);
      } else {
        alert("Please enter both room ID and username.");
      }
    };

//     const handleCreateMeeting = async() => {
//         // Logic to create a meeting


//         console.log(" title",title , "startTime ",startTime, "endTime",endTime  , "participants :", participants  );
//         const link = `https://example.com/meeting/${Date.now()}`; // Dummy link
//         setMeetingLink(link);
//         // alert('Meeting created successfully');
//         setView('join');
//         console.log( " meeting link : ", link);

//         const data = {
//             title : title,
//             startTime:startTime,
//             endTime :endTime,
//             participants :participants

//         }
//         try {
//             console.log( "data : ", data);
//             const token = localStorage.getItem('token'); // Retrieve token

//             console.log(token);

// if(token){
//     const response = await axios.post(`http://localhost:3001/meetings/create`, {
//         headers: { Authorization: `Bearer ${token}` } // Include JWT in request header
//     } ,  data);
  
//     console.log("response : ", response);
// }else {
//     console.log(" unauthorized user : ");
//     navigate('/login')
// }
//  } catch (err) {
//                     console.log(err);
//                     if (err.response?.status === 401) {
//                         // Redirect to login if unauthorized
//                         navigate('/login');
//                     }else{
//                         console.log("error : ", err)
                        
//                     }
//                 }

//     };

const handleCreateMeeting = async () => {
    console.log("title:", title, "startTime:", startTime, "endTime:", endTime, "participants:", participants);
    
    const link = `https://example.com/meeting/${Date.now()}`; // Dummy link
    setMeetingLink(link);
    setView('join');
    console.log("meeting link:", link);

    const data = {
        title: title,
        startTime: startTime,
        endTime: endTime,
        participants: participants
    };

    try {
        console.log("data:", data);
        const token = localStorage.getItem('token'); // Retrieve token

        if (token) {
            const response = await axios.post(
                `http://localhost:3001/meetings/create`,
                data, // Data to be sent in the body of the request
                {
                    headers: { Authorization: `Bearer ${token}` } // Include JWT in request header
                }
            );

            console.log("response:", response);
        } else {
            console.log("Unauthorized user");
            navigate('/login');
        }
    } catch (err) {
        console.log(err);
        if (err.response?.status === 401) {
            // Redirect to login if unauthorized
            navigate('/login');
        } else {
            console.log("error:", err);
        }
    }
};

    const addParticipant = () => {
        if (participantInput) {
            setParticipants([...participants, participantInput]);
            setParticipantInput('');
        }
    };

    return (
        <div className="container mt-5">
            {view === 'join' ? (
                <div className="join-container">
                    <h2>Join a Meeting</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="meetingId">Meeting ID</label>
                            <input
                                type="text"
                                className="form-control"
                                id="meetingId"
                                value={roomId}
                                onChange={(e) => setRoomId(e.target.value)}
                            />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={handleJoinMeeting}>
                            Join Meeting
                        </button>
                        <button type="button" className="btn btn-secondary ml-2" onClick={() => setView('create')}>
                            Create Meeting
                        </button>
                    </form>
                </div>
            ) : (
                <div className="create-container">
                    <h2>Create a Meeting</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Meeting Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="startTime">Start Time</label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                id="startTime"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="endTime">End Time</label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                id="endTime"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="participants">Participants</label>
                            <div className="d-flex">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="participants"
                                    value={participantInput}
                                    onChange={(e) => setParticipantInput(e.target.value)}
                                />
                                <button type="button" className="btn btn-info ml-2" onClick={addParticipant}>
                                    Add
                                </button>
                            </div>
                            <ul className="list-group mt-2">
                                {participants.map((participant, index) => (
                                    <li key={index} className="list-group-item">
                                        {participant}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button type="button" className="btn btn-success mt-3" onClick={handleCreateMeeting}>
                            Create Meeting
                        </button>
                        {meetingLink && (
                            <div className="alert alert-success mt-3" role="alert">
                                Meeting created successfully! <a href={meetingLink} target="_blank" rel="noopener noreferrer">Join here</a>
                            </div>
                        )}
                        <button type="button" className="btn btn-secondary mt-3" onClick={() => setView('join')}>
                            Back to Join Meeting
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default MeetingComponent;
