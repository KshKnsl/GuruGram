import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom';

const VideoHome = () => {
    const [value , setValue] = React.useState('');
    const navigate = useNavigate();
    const handleRoomJoin = useCallback(() => {
        navigate(`/room/${value}`);
   } ,[navigate,value]);
    return (
        <div className='flex items-center justify-center h-screen' >
            <input className='p-6 bg-gray-800 text-white border border-gray-600 rounded' type="text" placeholder="Enter Room Code" value={value} onChange={(e)=> setValue(e.target.value)}/>
            <button onClick={handleRoomJoin} className='p-6 bg-blue-600 text-white border border-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'>Join Room</button>
        </div>
    )
}

export default VideoHome;