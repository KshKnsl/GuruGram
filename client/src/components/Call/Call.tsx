import { useEffect, useState } from "react";
import axios from "axios";
import "./call.css";
import { ZoomMtg } from "@zoom/meetingsdk";

interface CallProps {
  meetingNumber: string;
  password: string;
}

function Call({ meetingNumber, password}: CallProps) {
  const [userName, setUserName] = useState("");

  const menteeId = localStorage.getItem("_id");
  const rolee = localStorage.getItem("role");

  useEffect(() => {
    if (menteeId) {
      const endpoint = rolee === "mentor" ? `${import.meta.env.VITE_BACKEND_URL}/api/mentor/${menteeId}` : `${import.meta.env.VITE_BACKEND_URL}/api/mentee/${menteeId}`;
      
      axios
        .get(`${endpoint}`)
        .then((response) => {
          setUserName(response.data.name);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the mentee data!", error);
        });
    }
  }, [menteeId]);

  useEffect(() => {
    try {
      ZoomMtg.preLoadWasm();
      ZoomMtg.prepareWebSDK();
    } catch (err) {
      console.error("Zoom SDK init failed:", err);
    }
  }, []);

  const sdkKey = import.meta.env.VITE_ZOOM_SDK_KEY ?? "";
  const authEndpoint = `${import.meta.env.VITE_BACKEND_URL ?? window.location.origin}/generateSignature`;
  const role = 0;
  const userEmail = "";
  const registrantToken = "";
  const zakToken = "";
  const leaveUrl = import.meta.env.VITE_LEAVE_URL ?? window.location.origin;

  // Local meeting state (can be created server-side or passed via props)
  const [localMeetingNumber, setLocalMeetingNumber] = useState<string>(meetingNumber ?? "");
  const [localPassword, setLocalPassword] = useState<string>(password ?? "");
  const [topic, setTopic] = useState<string>("GuruGram Meeting");
  const [creating, setCreating] = useState(false);
  const [creatingError, setCreatingError] = useState<string | null>(null);

  const getSignature = async () => {
    if (!sdkKey) {
      console.error("Missing VITE_ZOOM_SDK_KEY environment variable");
      alert("Video call is not configured. Contact the administrator.");
      return;
    }

    if (!localMeetingNumber) {
      alert("Please provide or create a meeting first.");
      return;
    }

    try {
      const req = await fetch(authEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          meetingNumber: localMeetingNumber,
          role: role,
        }),
      });
      if (!req.ok) {
        const text = await req.text();
        throw new Error(`Signature endpoint error: ${req.status} - ${text}`);
      }
      const res = await req.json();
      const signature = res.signature as string;
      startMeeting(signature);
    } catch (e) {
      console.error("Failed to obtain signature:", e);
      alert("Failed to join meeting. See console for details.");
    }
  };

  async function createMeeting() {
    const backend = import.meta.env.VITE_BACKEND_URL ?? window.location.origin;
    setCreating(true);
    setCreatingError(null);
    try {
      const res = await fetch(`${backend}/api/zoom/createMeeting`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, type: 1, duration: 60 }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Create meeting failed: ${res.status} - ${text}`);
      }
      const data = await res.json();
      setLocalMeetingNumber(String(data.meetingNumber));
      setLocalPassword(data.password || "");
      // Auto-join after creation
      await getSignature();
    } catch (err) {
      console.error(err);
      setCreatingError(String(err));
      alert("Failed to create meeting. See console for details.");
    } finally {
      setCreating(false);
    }
  }

  function startMeeting(signature: string) {
    console.log("Starting meeting", { signature, meetingNumber: localMeetingNumber });
    const root = document.getElementById("zmmtg-root");
    if (root) root.style.display = "block";

    ZoomMtg.init({
      leaveUrl,
      patchJsMedia: true,
      leaveOnPageUnload: true,
      success: () => {
        ZoomMtg.join({
          signature: signature,
          sdkKey: sdkKey,
          meetingNumber: localMeetingNumber,
          passWord: localPassword,
          userName: userName,
          userEmail: userEmail,
          tk: registrantToken,
          zak: zakToken,
          success: (success: unknown) => {
            console.log("Joined meeting:", success);
          },
          error: (error: unknown) => {
            console.error("Join error:", error);
            alert("Failed to join meeting. See console for details.");
          },
        });
      },
      error: (error: unknown) => {
        console.error("Init error:", error);
        alert("Video initialization failed. See console for details.");
      },
    });
  }

  return (
    <div className="pt-20 container flex flex-col items-center justify-center dark:bg-gray-900 w-screen">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Zoom Meeting</h1>

        <div className="mb-4 text-left">
          <label className="block text-sm font-medium mb-1">Topic</label>
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Meeting topic"
          />
        </div>

        <div className="flex gap-2 justify-center mb-4">
          <button
            onClick={createMeeting}
            disabled={creating}
            className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition duration-300 dark:bg-primary/90 dark:hover:bg-primary/80"
          >
            {creating ? 'Creating...' : 'Create Meeting'}
          </button>
          <button
            onClick={getSignature}
            className="bg-secondary text-secondary-foreground px-4 py-2 rounded hover:bg-secondary/90 transition duration-300 dark:bg-secondary/90 dark:hover:bg-secondary/80"
          >
            Join Meeting
          </button>
        </div>

        {localMeetingNumber && (
          <div className="text-sm text-left mt-2">
            <div><strong>Meeting:</strong> {localMeetingNumber}</div>
            <div><strong>Password:</strong> {localPassword || '(none)'}</div>
            <div className="mt-2 text-xs text-gray-500">You can share these details with the other participant.</div>
          </div>
        )}

        {creatingError && <p className="text-red-600 mt-3">{creatingError}</p>}
      </div>
    </div>
  );
}

export default Call;
