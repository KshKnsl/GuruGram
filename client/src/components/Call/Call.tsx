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
    <div className="min-h-screen pt-20 bg-stone-50 dark:bg-gray-950 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-900 border border-amber-500/20 p-8 w-full max-w-md">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="inline-block w-6 h-px bg-amber-500 shrink-0" />
            <span className="text-xs font-medium tracking-widest uppercase text-amber-500">Video Session</span>
          </div>
          <h1 className="font-serif-display text-2xl font-bold text-gray-900 dark:text-stone-100">
            Zoom Meeting
          </h1>
        </div>

        {/* Topic input */}
        <div className="mb-5">
          <label className="block text-xs font-medium tracking-widest uppercase text-gray-500 dark:text-gray-400 mb-2">
            Topic
          </label>
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-4 py-2.5 text-sm bg-transparent border border-amber-500/20 text-gray-900 dark:text-stone-100 placeholder:text-gray-400 focus:outline-none focus:border-amber-500 transition-colors"
            placeholder="Meeting topic"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={createMeeting}
            disabled={creating}
            className="flex-1 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-gray-900 text-xs font-medium tracking-widest uppercase transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {creating ? 'Creating...' : 'Create Meeting'}
          </button>
          <button
            onClick={getSignature}
            className="flex-1 px-5 py-2.5 border border-amber-500/30 text-xs font-medium tracking-widest uppercase text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-gray-900 hover:border-amber-500 transition-all duration-200"
          >
            Join Meeting
          </button>
        </div>

        {/* Meeting details */}
        {localMeetingNumber && (
          <div className="border border-amber-500/20 p-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-xs tracking-widest uppercase text-gray-400">Meeting ID</span>
              <span className="font-medium text-gray-900 dark:text-stone-100">{localMeetingNumber}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-xs tracking-widest uppercase text-gray-400">Password</span>
              <span className="font-medium text-gray-900 dark:text-stone-100">{localPassword || '(none)'}</span>
            </div>
            <p className="text-xs text-gray-400 pt-1 border-t border-amber-500/10">
              Share these details with the other participant.
            </p>
          </div>
        )}

        {creatingError && (
          <p className="mt-4 text-xs text-red-500 border border-red-500/20 bg-red-500/5 px-4 py-2.5">
            {creatingError}
          </p>
        )}
      </div>
    </div>
  );
}

export default Call;
