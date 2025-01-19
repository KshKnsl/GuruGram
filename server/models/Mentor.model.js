import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const mentorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, default: "Dr. Emily Chen" },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    dob: { type: Date },
    avatar: { type: String, default: "https://avatar.iran.liara.run/public/boy" },
    bio: { type: String, default: "Experienced software engineer with a passion for mentoring. Specialized in distributed systems and machine learning. Committed to helping the next generation of developers excel in their careers." },
    socialLinks: { type: [String], default: [] },
    points: { type: Number, default: 100 },
    badges: { type: [String], default: ["First Steps"] },
    interests: { type: [String], default: ["Reading"] },
    articles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }],
    readArticles: { type: [mongoose.Schema.Types.ObjectId], ref: "Article", default: [] },
    lastRead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article",
    },
    location: { type: String, default: "New York, NY" },
    occupation: { type: String, default: "Senior Software Engineer" },
    education: { type: String, default: "Ph.D. in Computer Science" },
    skills: {
      type: [
        {
          name: { type: String },
          level: { type: Number },
        },
      ],
      default: [
        { name: "Python", level: 95 },
        { name: "Machine Learning", level: 90 },
        { name: "Distributed Systems", level: 85 },
        { name: "System Design", level: 88 },
      ],
    },
    specialties: { type: [String], default: ["AI/ML", "Big Data", "Cloud Architecture", "Tech Leadership"] },
    ranking: { type: Number, default: 4.9 },
    totalMentees: { type: Number, default: 47 },
    badges: {
      type: [
        {
          name: { type: String },
          description: { type: String },
        },
      ],
      default: [
        { name: "Top Contributor", description: "Recognized for exceptional community contributions" },
        { name: "ML Expert", description: "Demonstrated expertise in machine learning" },
        { name: "Mentor of the Year", description: "Voted as the top mentor by mentees" },
      ],
    },
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
