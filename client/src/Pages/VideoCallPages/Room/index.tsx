import React from 'react'
import { useParams } from 'react-router-dom';
import { ZegoSuperBoardManager } from "zego-superboard-web";
import { ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt'
const RoomPage = () => {
    const { roomId } = useParams();

    const mentorMeeting = async (element) => {
        const appID = 876381742;
        const serversecret = '7a44198a8a2e938f2489ca32f76c9e2a'
        const kittoken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serversecret, roomId, `${Date.now()}`, "User Name here");
        const zc = ZegoUIKitPrebuilt.create(kittoken);
        zc.addPlugins({ZegoSuperBoardManager});
        zc.joinRoom({
            container: element,
            scenario:
            {
                mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
            turnOnMicrophoneWhenJoining: false,
           	turnOnCameraWhenJoining: false,
           	showMyCameraToggleButton: true,
           	showMyMicrophoneToggleButton: true,
           	showAudioVideoSettingsButton: true,
           	showScreenSharingButton: true,
           	showTextChat: true,
           	showUserList: true,
           	maxUsers: 2,
           	layout: "Auto",
           	showLayoutButton: true,
            showTurnOffRemoteCameraButton: true,
            showRemoveUserButton: true,
            lowerLeftNotification: {
                showUserJoinAndLeave: true,
                showTextChat: true,
            },
            whiteboardConfig: {
                showAddImageButton: true,
                showCreateAndCloseButton: true,
            },
            showRoomTimer: true,
            showMoreButton: true,
        });
    }
    return (
        <div>
            <div ref={mentorMeeting} className='VideoContainer h-screen w-screen'/>
        </div>
    )
}

export default RoomPage;