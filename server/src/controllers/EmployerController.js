import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";

import Employer from "../models/EmployersModel.js";
import Job from "../models/jobsModel.js";
import generateToken from "../utils/create-token.js";
import asyncHandler from "../middlewares/asyncHandler.js";

export const getIndustryTypes = asyncHandler(async (req, res) => {
  const industries = await Employer.distinct("industry");

  if (!industries || industries.length === 0) {
    res.status(404);
    throw new Error("Industries not found");
  }
  // Sort industries alphabetically
  industries.sort((a, b) => a.localeCompare(b));

  res.json(industries);
});

// Multer setup
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const __dirname = path.resolve();
const dir = path.join(__dirname, "public/img/employers");
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
export const uploadEmployerPhoto = upload.single("photo");

export const resizeEmployerPhoto = asyncHandler(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `employer-${req.user._id}-${Date.now()}.jpeg`;
  try {
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/img/employers/${req.file.filename}`);
  } catch (error) {
    throw new Error(error);
  }
  next();
});

export const updateEmployerPhoto = asyncHandler(async (req, res) => {
  const user = await Employer.findByIdAndUpdate(
    req.user._id,
    {
      logo: req.file.filename,
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

export async function createEmployer(req, res) {
  try {
    const {
      employerName,
      natureContent,
      industry,
      website,
      contactEmail,
      password,
      contactPhone,
      logo,
      description,
    } = req.body;

    const employer = await Employer.create({
      employerName,
      natureContent,
      industry,
      website,
      contactEmail,
      password,
      contactPhone,
      logo,
      description,
    });
    generateToken(res, employer._id);

    res.status(201).json({ success: true, data: employer });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}

export const loginEmployer = asyncHandler(async (req, res) => {
  const { contactEmail, password } = req.body;
  if ((!contactEmail, !password)) {
    throw new Error("Please fill all the fields");
  }

  const currentEmployer = await Employer.findOne({ contactEmail });

  if (currentEmployer && (await currentEmployer.isPasswordValid(password))) {
    generateToken(res, currentEmployer._id);
    res.status(200).json({
      currentEmployer,
    });
  } else {
    res.status(401);
    throw new Error("You are not logged in pleas log in!");
  }
});

export const logoutCurrentEmployer = (req, res) => {
  res.cookie("jwt", " ", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logout successfully" });
};

export async function getAllEmployers(req, res) {
  try {
    const employers = await Employer.find().populate({
      path: "jobs",
      select: "title minSalary maxSalary",
    });
    res.status(200).json({
      length: employers.length,
      success: true,
      data: employers,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
}

export const getCurrentEmployerProfile = asyncHandler(async (req, res) => {
  const currentEmployer = await Employer.findById(req.user._id);
  if (currentEmployer) {
    res.status(200).json({
      _id: currentEmployer._id,
      employerName: currentEmployer.employerName,
      contactEmail: currentEmployer.contactEmail,
      contactPhone: currentEmployer.contactPhone,
    });
  } else {
    res.status(404);
    throw new Error("Employer not found!");
  }
});

export const updateCurrentEmployerProfile = asyncHandler(async (req, res) => {
  const { employerName, contactEmail } = req.body;
  const currentEmployer = await Employer.findById(req.user._id);

  if (currentEmployer) {
    currentEmployer.employerName = employerName || currentEmployer.employerName;
    currentEmployer.contactEmail = contactEmail || currentEmployer.contactEmail;

    await currentEmployer.save();
    res.status(200).json({
      currentEmployer,
    });
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
});

export async function getEmployerByID(req, res) {
  try {
    const employer = await Employer.findById(req.params.id).populate("jobs");
    if (!employer) {
      return res
        .status(404)
        .json({ success: false, error: "Employer not found" });
    }
    res.status(200).json({ success: true, data: employer });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}

export async function updateEmployerByID(req, res) {
  try {
    const employer = await Employer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!employer) {
      return res
        .status(404)
        .json({ success: false, error: "Employer not found" });
    }
    res.status(200).json({
      success: "Employes were successfully updated!",
      data: employer,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}

export async function deleteEmployerByID(req, res) {
  try {
    const employer = await Employer.findByIdAndDelete(req.params.id);
    if (!employer) {
      return res
        .status(404)
        .json({ success: false, error: "Employer not found" });
    }
    res.status(200).json({
      success: "Employer successfully deleted!",
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}

export const searchEmployerByName = asyncHandler(async (req, res) => {
  const { name, filter } = req.query;
  let query = {};

  if (name) {
    query.employerName = { $regex: name, $options: "i" };
  }

  if (filter) {
    if (/^[A-Z]$/.test(filter)) {
      query.employerName = { $regex: `^${filter}`, $options: "i" };
    }
    if (/^[0-9]$/.test(filter)) {
      query.employerName = { $regex: `^${filter}` };
    }
  }

  try {
    const employer = await Employer.find(query);
    res.status(200).json({
      employer,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;

  const employer = await Employer.findById(_id);
  if (password) {
    employer.password = password;
    employer.save();

    res.json("Password updated");
  } else {
    res.json(employer);
  }
});

export const employersLogos = asyncHandler(async (req, res) => {
  const employersLogos = await Employer.aggregate([
    {
      $lookup: {
        from: "jobs",
        let: { employerId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$empId", "$$employerId"] },
                  { $eq: ["$active", true] },
                  { $gte: ["$liveTime", new Date()] },
                ],
              },
            },
          },
        ],
        as: "liveJobs",
      },
    },
    {
      $match: {
        "liveJobs.0": { $exists: true }, // Ensure the employer has at least one live job
      },
    },
    {
      $project: {
        _id: 0, // Exclude the _id field
        logo: 1, // Project only the logo field
      },
    },
  ]);

  res.status(200).json(employersLogos);
});

export const getAllJobsOfCurrentEmployer = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const jobs = await Job.find({ empId: _id });

  res.json(jobs);
});

///////// *********** ////////////////

////////////////// Agency Function ///////////

export const searchAgencies = async (req, res) => {
  var { agency } = req.query;
  if (!agency) {
    agency = "Popular";
    const results = await Employer.find({ agency });

    return res
      .status(200)
      .json({ "Total Agencys": results.length, data: results });
  } else if (!["Popular", "County", "Industries"].includes(agency)) {
    return res.status(400).json({ error: "Invalid agency type" });
  }

  try {
    const results = await Employer.find({ agency });
    res.json({
      "Total Agencys": results.length,
      data: results,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
///////////  By Campany Name get all Jobs that campany //////////////////////

export const getAllJobsBycName = async (req, res) => {
  const companyName = req.params.employeeName;

  if (!companyName) {
    return res.status(400).json({ error: "Company name is required" });
  }

  try {
    // Find the company by name
    const company = await Employer.findOne({ employerName: companyName });

    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    // Find jobs associated with the company
    const jobs = await Job.find({ empId: company._id }); // Querying Job model

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ error: "Jobs not found" });
    }

    // Access job details
    const jobDetails = jobs.map((job) => ({
      title: job.title,
      location: job.location,
      salary: {
        min: job.minSalary,
        max: job.maxSalary,
      },
    }));

    res.json({
      total: jobs.length,
      result: jobDetails,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
///////////  By Agency Type get all Jobs that campany //////////////////////

export const getAllJobsByAgencyType = async (req, res) => {
  const companyName = req.params.employeeName;
  const agencyType = req.params.agency;

  if (!companyName) {
    return res.status(400).json({ error: "Company name is required" });
  }

  try {
    // Find the company by name and agency type
    const company = await Employer.findOne({
      employerName: companyName,
      agency: agencyType, // Include agency type in the query
    });

    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }
    console.log("===============================================");
    console.log(companyName);
    console.log(agencyType);

    console.log(company);

    console.log("===============================================");

    // Find jobs associated with the company
    const jobs = await Job.find({ empId: company._id }); // Querying Job model

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ error: "Jobs not found" });
    }

    // Access job details
    const jobDetails = jobs.map((job) => ({
      title: job.title,
      location: job.location,
      salary: {
        min: job.minSalary,
        max: job.maxSalary,
      },
    }));

    res.json({
      total: jobs.length,
      result: jobDetails,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
