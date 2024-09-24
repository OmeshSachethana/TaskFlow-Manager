const Schedule = require('../models/schedule'); // Adjust the path as necessary

// Create a new schedule
exports.createSchedule = async (req, res) => {
  try {
    const schedule = new Schedule(req.body);
    await schedule.save();
    res.status(201).json({
      message: 'Schedule created successfully',
      data: schedule
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error creating schedule',
      error: error.message
    });
  }
};

// Get all schedules
exports.getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.status(200).json({
      message: 'Schedules fetched successfully',
      data: schedules
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching schedules',
      error: error.message
    });
  }
};

// Get a schedule by ID
exports.getScheduleById = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({
        message: 'Schedule not found'
      });
    }
    res.status(200).json({
      message: 'Schedule fetched successfully',
      data: schedule
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching schedule',
      error: error.message
    });
  }
};

// Update a schedule by ID
exports.updateSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!schedule) {
      return res.status(404).json({
        message: 'Schedule not found'
      });
    }
    res.status(200).json({
      message: 'Schedule updated successfully',
      data: schedule
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error updating schedule',
      error: error.message
    });
  }
};

// Delete a schedule by ID
exports.deleteSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id);
    if (!schedule) {
      return res.status(404).json({
        message: 'Schedule not found'
      });
    }
    res.status(200).json({
      message: 'Schedule deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting schedule',
      error: error.message
    });
  }
};



