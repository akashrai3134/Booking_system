const Theatre = require('../models/theaterModel');

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
    console.log("Delete request received for theatreId:", req.body);
    const deletedTheatre = await Theatre.findByIdAndDelete(req.body.theatreId);
    if (!deletedTheatre) {
      return res.send({
        success: false,
        message: "Theatre not found!"
      });
    }
    res.send({
      success: true,
      message: "The theatre has been deleted!"
    });
  } catch (error) {
    console.error("Error deleting theatre:", error);
    res.send({
      success: false,
      message: error.message
    });
  }
};

const getAllTheatres = async (req, res) => {
  try {
    const theatres = await Theatre.find().populate('owner');
    res.send({
      success: true,
      message: "All theatres fetched!",
      data: theatres
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message
    });
  }
};

const getAllTheatresByOwner =  async (req, res) => {
    try{
        const allTheatres = await Theatre.find({owner: req.body.owner});
        res.send({
            success: true,
            message: "All theatres fetched successfully!",
            data: allTheatres
        })
    }catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
}

module.exports = {
  addTheatre,
  updateTheatre,
  deleteTheatre,
  getAllTheatres,
  getAllTheatresByOwner
};
