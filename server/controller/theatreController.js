const Theatre = require('../models/theaterModel');

const getAllTheatres = async (req, res) => {
  try {
    const theatres = await Theatre.find();
    res.status(200).json(theatres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addTheatre = async (req, res) => {
  try {
    const newTheatre = new Theatre(req.body);
    await newTheatre.save();
    res.send({
      success: true,
      message: "New theatre has been added!"
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message
    });
  }
};

const updateTheatre = async (req, res) => {
  try {
    await Theatre.findByIdAndUpdate(req.body.theatreId, req.body);
    res.send({
      success: true,
      message: "Theatre has been updated!"
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message
    });
  }
};

const deleteTheatre = async (req, res) => {
  try {
    await Theatre.findByIdAndDelete(req.body.theatreId);
    res.send({
      success: true,
      message: "The theatre has been deleted!"
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getAllTheatres,
  addTheatre,
  updateTheatre,
  deleteTheatre
};
