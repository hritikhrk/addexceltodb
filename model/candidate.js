const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
  {
    name: {
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
    },
    dob: {
      type: String,
    },
    woe: {
      type: String,
    },
    resume_title: {
      type: String,
    },
    curr_location: {
      type: String,
    },
    postal_addr: {
      type: String,
    },
    curr_employer: {
      type: String,
    },
    curr_designation: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Candidate = mongoose.model("Candidates", candidateSchema);
module.exports = Candidate;
