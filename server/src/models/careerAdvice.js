import mongoose from "mongoose";
import User from "./userModel.js";

const contentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const careerAdviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  contents: [contentSchema],
  category: {
    type: String,
    required: true,
    enum: [
      "Home",
      "Apprenticeship",
      "Career Development",
      "GS",
      "Graduates",
      "Cover Letter",
      "Getting Started",
      "Work Life",
      "CVs",
      "Interviews",
    ],
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comments: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      content: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  ratings: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      value: { type: Number, required: true, min: 1, max: 5 },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

///// Career Model
export const CareerAdvice = mongoose.model("CareerAdvice", careerAdviceSchema);
