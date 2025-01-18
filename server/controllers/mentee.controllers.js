const Mentee = require("../models/Mentee.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const { sendMail } = require("../utils/mail.util.js");

async function createMentee(data) {
  try {
    const newMentee = new Mentee({
      name: data.name,
      email: data.email,
      password: data.password,
      avatar: data.avatar || "https://avatar.iran.liara.run/public/boy",
      bio: data.bio,
      interests: data.interests || [],
    });

    await newMentee.save();
    await sendMail(data.name, data.email, 'CreateAccount');
    return { success: true, message: "Mentee created successfully" };
  } 
  catch (error) 
  {
    return { success: false, message: `Error while creating mentee ${error}` };
  }
}
async function findMentee(id) {
  try {
    const mentee = await Mentee.findById(id)
    .populate('articles')
    .populate('readArticles')
    .populate('lastRead');
    return mentee;
  } catch (error) {
    return null;
  }
}

async function updateMentee(data) 
{
  const update = 
  {
    name: data.name,
    dob: data.dob,
    avatar: data.avatar || "https://avatar.iran.liara.run/public",
    bio: data.bio,
    socialLinks: data.socialLinks || [],
    interests: data.interests || [],
  };
  try 
  {
    let result = await Mentee.findByIdAndUpdate(data._id, update);
    return { success: true, message: "Mentee updated successfully" };
  } 
  catch (error) 
  {
    return { success: false, message: `Error while updating mentee ${error}` };
  }
}

async function loginMentee(data) {
  try 
  {
    const { email, password } = data;
    const mentee = await Mentee.findOne({ email }).select("+password");
    if (!mentee) 
    {
      return { success: false, message: "Mentee not found" };
    }
    const isRight = await bcrypt.compare(password, mentee.password);
    if (!isRight) 
    {
      return { success: false, message: "Invalid credentials" };
    }
    const token = jwt.sign({ id: mentee._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const { password: pass, ...rest } = mentee;
    
    await sendMail(data.name, data.email, 'Login');
    return { success: true, token, rest};
  }
  catch (error) 
  {
    return { success: false, message: `Error while logging in ${error}` };
  }
}

const client = new OAuth2Client(process.env.client_id);

async function googleLogin(token) 
{
  try 
  {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.client_id,
    });

    const payload = ticket.getPayload();
    const email = payload.email;
    const name = payload.name;
    const avatar = payload.picture;

    let mentee = await Mentee.findOne({ email });
    if (!mentee) 
    {
      mentee = new Mentee({
        name,
        email,
        avatar,
        password: "GooGleAuthAccount",
      });
      await sendMail(name, email, 'CreateAccount');   
      await mentee.save();
    }

    const jwtToken = jwt.sign({ id: mentee._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    
    const { ...menteeWithoutPassword } = mentee.toObject();
    await sendMail(name, email, 'Login');
    return { success: true, token: jwtToken, mentee: menteeWithoutPassword };
  } catch (error) {
    return { success: false, message: "Error during Google login" };
  }
}

function findMenteeByEmail(email) 
{
  return Mentee.findOne({ email});
}

module.exports = { createMentee, findMentee, updateMentee, loginMentee, googleLogin, findMenteeByEmail };