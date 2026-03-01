import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns";

export function configureDnsServers(servers = ["8.8.8.8", "1.1.1.1"]) {
  try {
    dns.setServers(servers);
    console.log(`DNS servers set to: ${dns.getServers().join(", ")}`);
  } catch (e) {
    console.warn("Unable to configure DNS servers", e);
  }
}

dotenv.config();

async function connect() {
  configureDnsServers();

  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in the environment variables");
    }
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    if (err.code === 'ECONNREFUSED' && /querySrv/.test(err.message)) {
      console.error(
        'SRV lookup failed – your network appears to block DNS SRV. ' +
          'You can either configure the DNS servers (see db/Connect.js) ' +
          'or switch to a non-+srv URI obtained from Atlas.'
      );
    }
  }
}
export { connect };
