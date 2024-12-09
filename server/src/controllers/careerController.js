import { CareerAdvice } from "../models/careerAdvice.js";

// Create a new career advice entry
export const createCareerAdvice = async (req, res) => {
  try {
    const careerAdvice = new CareerAdvice(req.body);
    await careerAdvice.save();
    res.status(201).json({
      message: "You are success fully register ",
      careerAdvice,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all career advice entries
export const getAllCareerAdvice = async (req, res) => {
  try {
    const careerAdvices = await CareerAdvice.find().populate({
      path: "authorId",
      select: "image",
    });

    /// if we need to to get all user and comment or rattings add this .populate('authorId').populate('comments.userId')
    res.json({
      "total Career ": careerAdvices.length,
      careerAdvices,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific career advice entry by title
export const getCareerAdviceByTitle = async (req, res) => {
  try {
    const { title } = req.body; // Get title from the request body

    const careerAdvice = await CareerAdvice.findOne({ title }) // Use findOne to search by title
      .populate("authorId") // Populate author details
      .populate("comments.userId"); // Populate user details in comments

    if (!careerAdvice) {
      return res.status(404).json({ message: "Career advice not found" });
    }

    res.json(careerAdvice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Update a career advice entry
export const updateCareerAdvice = async (req, res) => {
  try {
    const careerAdvice = await CareerAdvice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!careerAdvice)
      return res.status(404).json({ message: "Career advice not found" });
    res.json(careerAdvice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a career advice entry
export const deleteCareerAdvice = async (req, res) => {
  try {
    const careerAdvice = await CareerAdvice.findByIdAndDelete(req.params.id);
    if (!careerAdvice)
      return res.status(404).json({ message: "Career advice not found" });
    res.json({ message: "Career advice deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a comment to a career advice entry
export const addComment = async (req, res) => {
  try {
    const careerAdvice = await CareerAdvice.findById(req.params.id);
    if (!careerAdvice)
      return res.status(404).json({ message: "Career advice not found" });

    const comment = {
      userId: req.params.userId,
      content: req.body.content,
      createdAt: new Date(),
    };

    careerAdvice.comments.push(comment);
    await careerAdvice.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Rate a career advice entry
export const rateCareerAdvice = async (req, res) => {
  try {
    const careerAdvice = await CareerAdvice.findById(req.params.id);
    if (!careerAdvice)
      return res.status(404).json({ message: "Career advice not found" });

    const rating = {
      userId: req.body.userId,
      value: req.body.value,
      createdAt: new Date(),
    };

    careerAdvice.ratings.push(rating);
    await careerAdvice.save();
    res.status(201).json(rating);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
////////////////// get onyly Image and title  Api for category ................

export const getCareerAdviceByCategoryIAT = async (req, res) => {
  try {
    const category = req.query.category;

    const adviceEntries = await CareerAdvice.find({ category }).select(
      "title -_id authorId"
    );

    if (!adviceEntries.length) {
      return res
        .status(404)
        .json({ message: "No advice found for this category" });
    }

    const populatedEntries = await CareerAdvice.populate(adviceEntries, {
      path: "authorId",
      select: "image -_id", // Assuming the User model has an image field
    });

    res.json({
      "Total ": populatedEntries.length,
      populatedEntries,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

////////// get Image , Title and created at api ...................

export const getCareerAdviceByCategory = async (req, res) => {
  try {
    const category = req.query.category;

    const adviceEntries = await CareerAdvice.find({ category }).select(
      "title createdAt authorId"
    );

    if (!adviceEntries.length) {
      return res
        .status(404)
        .json({ message: "No advice found for this category" });
    }

    const populatedEntries = await CareerAdvice.populate(adviceEntries, {
      path: "authorId",
      select: "image", // Assuming the User model has an image field
    });

    res.json({
      "Total ": populatedEntries.length,
      populatedEntries,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

////////////////////

export const addContentObject = async (req, res) => {
  try {
    const { category, text } = req.body;

    if (!category || !text) {
      return res
        .status(400)
        .json({ message: "Category and content text are required" });
    }

    const validCategories = [
      "Home",
      "Apprenticeship",
      "Career Development",
      "Graduates",
      "Cover Letter",
      "Getting Started",
      "Work Life",
      "CVs",
      "Interviews",
    ];

    if (!validCategories.includes(category)) {
      return res.status(400).json({ message: "Invalid category" });
    }

    let article = await CareerAdvice.findOne({ category });

    if (!article) {
      article = new CareerAdvice({
        title: "",
        contents: [{ text }],
        category,
        authorId: null,
      });
      await article.save();
      return res
        .status(201)
        .json({ message: "Content added successfully", article });
    }

    article.contents.push({ text });
    await article.save();

    res
      .status(200)
      .json({ message: "Content object added successfully", article });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getContentByCategory = async (req, res) => {
  try {
    const category = req.query.category;

    const validCategories = [
      "Home",
      "Apprenticeship",
      "Career Development",
      "Graduates",
      "Cover Letter",
      "Getting Started",
      "Work Life",
      "CVs",
      "Interviews",
    ];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ message: "Invalid category" });
    }

    const article = await CareerAdvice.findOne({ category });

    if (!article) {
      return res
        .status(404)
        .json({ message: "No content found for this category" });
    }

    res.json({ title: article.category, contents: article.contents[0].text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
