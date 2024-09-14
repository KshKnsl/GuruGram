import React from 'react'
import { useParams } from 'react-router-dom';

import { ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt'
const RoomPage = () => {
    const { roomId } = useParams();

    const mentorMeeting = async (element) => {
        const appID = 876381742;
        const serversecret = '7a44198a8a2e938f2489ca32f76c9e2a'
        const kittoken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serversecret, roomId, `${Date.now()}`, "User Name here");
        const zc = ZegoUIKitPrebuilt.create(kittoken);
        zc.joinRoom({
            container: element,
            scenario:
            {
                mode: ZegoUIKitPrebuilt.OneONoneCall,
            }
        });
    }
    return (
        <div>
            <div ref={mentorMeeting}/>
        </div>
    )
}

export default RoomPage;