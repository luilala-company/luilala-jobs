import Agency from "../models/agency_Model.js"; // Ensure correct import syntax
import _ from "lodash";

import Job from "../models/jobsModel.js";
// Create a new agency
export const createAgency = async (req, res) => {
  const agency = new Agency(req.body);
  try {
    const savedAgencyy = await agency.save();
    const savedAgency = _.omit(savedAgencyy, "__v");
    res.status(201).json(savedAgency);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all agencies

export const getAllAgencies = async (req, res) => {
  try {
    const agencies = await Agency.find();

    // Use map to omit __v from each agency object
    const filteredAgencies = _.map(agencies, (agency) =>
      _.omit(agency.toObject(), "__v")
    );

    res.json({
      "Total Agencies": filteredAgencies.length,
      DATA: filteredAgencies,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get an agency by ID

export const getAgencyById = async (req, res) => {
  try {
    const agency = await Agency.findById(req.params.id);

    // Check if the agency was found
    if (!agency) {
      return res.status(404).json({ message: "Agency not found" });
    }

    // Omit the __v property before sending the response
    const filteredAgency = _.omit(agency.toObject(), "__v");

    res.json(filteredAgency);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res
      .status(500)
      .json({ message: "An error occurred while retrieving the agency." });
  }
};
// Update an agency

export const updateAgency = async (req, res) => {
  try {
    const updatedAgency = await Agency.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Added runValidators to ensure data integrity
    );

    // Check if the agency was found
    if (!updatedAgency) {
      return res.status(404).json({ message: "Agency not found" });
    }

    // Omit the __v property before sending the response
    const filteredAgency = _.omit(updatedAgency.toObject(), "__v");

    res.json(filteredAgency);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res
      .status(400)
      .json({ message: "An error occurred while updating the agency." });
  }
};

// Delete an agency
export const deleteAgency = async (req, res) => {
  try {
    const deletedAgency = await Agency.findByIdAndDelete(req.params.id);

    // Check if the agency was found and deleted
    if (!deletedAgency) {
      return res.status(404).json({ message: "Agency not found" });
    }

    // Return a success message
    res.json({ message: "Agency deleted successfully" });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res
      .status(500)
      .json({ message: "An error occurred while deleting the agency." });
  }
};
// Controller to get top 3 agencies by job countimport _ from 'lodash'; // Make sure to import lodash

export const getTopAgencies = async (req, res) => {
  try {
    const topAgencies = await Agency.aggregate([
      {
        $lookup: {
          from: "jobs", // The name of the jobs collection
          localField: "jobId", // Field from the Agency model
          foreignField: "_id", // Field from the Job model
          as: "jobs", // Output array field
        },
      },
      {
        $match: { "jobs.0": { $exists: true } }, // Filter to include only agencies with jobs
      },
      {
        $group: {
          _id: "$_id", // Group by agency ID to ensure uniqueness
          name: { $first: "$name" },
          jobCount: { $sum: { $size: "$jobs" } }, // Total job count for each agency
        },
      },
      {
        $sort: { jobCount: -1 }, // Sort by job count in descending order
      },
      {
        $limit: 15, // Limit to the top 5 unique agencies
      },
    ]);

    // Use Lodash to map the result to only include name and jobCount
    const result = _.map(topAgencies, (agency) => ({
      name: agency.name,
      jobCount: agency.jobCount,
    }));

    // Send the response
    return res.status(200).json({
      success: true,
      count: result.length,
      data: result,
    });
  } catch (error) {
    console.error("Error fetching top agencies:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
/// git by country all agencies

// Get all unique locations from the agencies
export const getUniqueLocations = async (req, res) => {
  try {
    const locations = await Agency.distinct("location"); // Get distinct locations

    // Use a Set to filter out duplicates and trim whitespace
    const uniqueLocations = Array.from(
      new Set(locations.map((location) => location.trim()))
    );

    if (uniqueLocations.length === 0) {
      return res.status(404).json({ message: "No locations found" });
    }

    res.json(uniqueLocations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/////////////////////////// get all agency with there jobs alos
export const getAgenciesWithIndustry = async (req, res) => {
  try {
    const agencies = await Agency.find()
      .populate("indestorytype") // Populate the indestorytype field
      .exec();

    // Use a Set to collect unique industries
    const uniqueIndustries = new Set();

    // Iterate through agencies and their industries
    agencies.forEach((agency) => {
      agency.indestorytype.forEach((employer) => {
        uniqueIndustries.add(employer.industry); // Add each industry to the Set
      });
    });

    // Convert Set to Array
    const result = Array.from(uniqueIndustries);

    res.status(200).json({
      success: true,
      data: result, // Return the unique industries
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get  agency by name

export const byagencyname = async (req, res) => {
  const { name } = req.query; // Get the agency name from query parameters

  if (!name) {
    return res.status(400).json({ message: "Agency name is required" });
  }

  try {
    // Case-insensitive search for the agency name
    const agency = await Agency.findOne({ name: new RegExp(`^${name}$`, "i") });

    if (!agency) {
      return res.status(404).json({ message: "Agency not found" });
    }

    // Use lodash to omit the __v and _id fields from the agency result
    const cleanedAgency = _.omit(agency.toObject(), ["_id", "__v"]);

    // Find jobs associated with the agency's jobId
    const jobs = await Job.find({ _id: cleanedAgency.jobId });

    // Extract specific job fields
    const jobDetails = jobs.map((job) => ({
      title: job.title,
      city: job.city,
      country: job.country,
      minSalary: job.minSalary,
      maxSalary: job.maxSalary,
      location: job.location,
    }));

    // Return agency details and extracted job information
    return res.status(200).json({
      agency: cleanedAgency,
      jobs: jobDetails, // This will return an array of job details
    });
  } catch (error) {
    console.error("Error finding agency:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
