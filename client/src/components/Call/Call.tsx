import "./call.css";
import { ZoomMtg } from "@zoom/meetingsdk";


function Call() {
  
  ZoomMtg.preLoadWasm();
  ZoomMtg.prepareWebSDK();
  const authEndpoint = "http://localhost:5000/generateSignature";
  const sdkKey = "79Qt0lnLTCSLN8z8Q8vHWw";
  const meetingNumber = "79545907036";
  const passWord = "UA2s9u";
  const role = 0;
  const userName = "React";
  const userEmail = "";
  const registrantToken = "";
  const zakToken = "";
  const leaveUrl = "http://localhost:5173";

  const getSignature = async () => {
    try {
      const req = await fetch(authEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          meetingNumber: meetingNumber,
          role: role,
        }),
      });
      const res = await req.json()
      const signature = res.signature as string;
      startMeeting(signature)
    } catch (e) {
      console.log(e);
    }
  };

  function startMeeting(signature: string) {
    console.log(signature);
    document.getElementById("zmmtg-root")!.style.display = "block";

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      patchJsMedia: true,
      leaveOnPageUnload: true,
      success: (success: unknown) => {
        console.log(success);
        ZoomMtg.join({
          signature: signature,
          sdkKey: sdkKey,
          meetingNumber: meetingNumber,
          passWord: passWord,
          userName: userName,
          userEmail: userEmail,
          tk: registrantToken,
          zak: zakToken,
          success: (success: unknown) => {
            console.log(success);
          },
          error: (error: unknown) => {
            console.log(error);
          },
        });
      },
      error: (error: unknown) => {
        console.log(error);
      },
    });
  }
  return (
    <div className="pt-20 container min-h-screen flex flex-col items-center justify-center dark:bg-gray-900 w-screen">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center">
      <h1 className="text-2xl font-bold mb-4">Zoom Meeting SDK Sample React</h1>
      <button 
        onClick={getSignature} 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 dark:bg-blue-700 dark:hover:bg-blue-900"
      >
        Join Meeting
      </button>
      </div>
    </div>
  );
}

export default Call;
