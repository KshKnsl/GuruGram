import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [value , setValue] = React.useState('');
    const navigate = useNavigate();
    const handleRoomJoin = useCallback(() => {
        navigate(`/room/${value}`);
    } ,[navigate,value]);
    return (
        <div>
            <input type="text" placeholder="Enter Room Code" value={value} onChange={(e)=> setValue(e.target.value)}/>
            <button onClick={handleRoomJoin}>Join Room</button>
        </div>
    )
}

export default HomePage;