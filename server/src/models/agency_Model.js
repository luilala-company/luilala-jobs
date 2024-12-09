import mongoose from "mongoose";
import Job from "../models/jobsModel.js";
import Employer from "./EmployersModel.js";

const agencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  services: {
    type: [String],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  established: {
    type: Date,
    default: Date.now,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  teamSize: {
    type: Number,
    required: true,
  },
  clients: {
    type: [String], // List of client names
  },
  socialMediaLinks: {
    facebook: String,
    twitter: String,
    linkedin: String,
    instagram: String,
  },
  description: {
    type: String,
    required: true,
  },
  indestorytype: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employer",
    },
  ],
});

const Agency = mongoose.model("Agency", agencySchema);
export default Agency;
