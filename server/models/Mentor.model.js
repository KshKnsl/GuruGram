import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const mentorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    dob: { type: Date },
    avatar: { type: String }, // For profile picture
    bio: { type: String },
    socialLinks: { type: [String], default: [] },
    points: { type: Number, default: 100 },
    badges: { type: [String], default: ["First Steps"] },
    interests: { type: [String], default: ["Reading"] },
    articles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }],
    readArticles: { type: [mongoose.Schema.Types.ObjectId], ref: "Article", default: [] },
    lastRead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article",
    }
  },
  { timestamps: true }
);

mentorSchema.pre("save", async function (next) {
  if (this.password === undefined || this.password.length == 0) this.password = "GooGleAuthAccount";
  if (!this.isModified("password")) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

mentorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("Mentor", mentorSchema);
