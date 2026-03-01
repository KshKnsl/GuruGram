import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connect } from "./db/Connect.js";
import mentorRoutes from "./routes/mentor.routes.js";
import menteeRoutes from "./routes/mentee.routes.js";
import articleRoutes from "./routes/article.routes.js";
import { KJUR } from 'jsrsasign';
import { app, server } from "./middlewares/socket.js";
import morgan from 'morgan';

import messageRoutes from "./routes/message.routes.js";



dotenv.config();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

const coerceRequestBody = (body) => ({
  ...body,
  role: typeof body?.role === 'string' ? parseInt(body.role, 10) : body?.role,
  expirationSeconds: typeof body?.expirationSeconds === 'string' ? parseInt(body.expirationSeconds, 10) : body?.expirationSeconds,
});

app.post('/generateSignature', (req, res) => {
  const { meetingNumber, role, expirationSeconds } = coerceRequestBody(req.body);
  const iat = Math.floor(Date.now() / 1000);
  const exp = expirationSeconds ? iat + expirationSeconds : iat + 60 * 60 * 2;
  const oHeader = { alg: 'HS256', typ: 'JWT' };

  const oPayload = {
    appKey: process.env.ZOOM_MEETING_SDK_KEY,
    sdkKey: process.env.ZOOM_MEETING_SDK_KEY,
    mn: meetingNumber,
    role,
    iat,
    exp,
    tokenExp: exp
  };

  const sHeader = JSON.stringify(oHeader);
  const sPayload = JSON.stringify(oPayload);
  const sdkJWT = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, process.env.ZOOM_MEETING_SDK_SECRET);
  return res.json({ signature: sdkJWT });
});

app.post('/api/zoom/createMeeting', async (req, res) => {
  const { topic = 'GuruGram Meeting', type = 1, duration = 60, start_time } = req.body || {};
  const apiKey = process.env.ZOOM_MEETING_SDK_KEY;
  const apiSecret = process.env.ZOOM_MEETING_SDK_SECRET;
  if (!apiKey || !apiSecret) return res.status(500).json({ error: 'Zoom API credentials are not configured on the server.' });

  try {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60;
    const oHeader = { alg: 'HS256', typ: 'JWT' };
    const oPayload = { iss: apiKey, exp };
    const sHeader = JSON.stringify(oHeader);
    const sPayload = JSON.stringify(oPayload);
    const jwt = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, apiSecret);

    const response = await fetch('https://api.zoom.us/v2/users/me/meetings', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic, type, duration, start_time }),
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Zoom API error', details: data });
    }

    return res.json({ meetingNumber: data.id, password: data.password, join_url: data.join_url, raw: data });
  } catch (err) {
    console.error('Create meeting failed:', err);
    return res.status(500).json({ error: 'Failed to create meeting', details: err?.message || err });
  }
});

app.use("/api/mentor", mentorRoutes);
app.use("/api/mentee", menteeRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/messages", messageRoutes);


connect()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error.message));

export { app, server };
