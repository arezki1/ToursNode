const Tour = require('../models/tourModule');

exports.getAllTours = async (req, res) => {
  try {
    const request = {
      ...req.query,
    };
    const toDelete = ['sort', 'limit'];
    toDelete.forEach((el) => delete request[el]);
    const requestString = JSON.stringify(request);
    const values = requestString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    console.log(values);
    const query = Tour.find(JSON.parse(values));
    const tours = await query;
    res.status(200).json({
      status: 'success',
      result: tours.length,
      data: tours,
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: 'No tours found',
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: tour,
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: 'No tours found',
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const create = await Tour.create(req.body);
    console.log('failed');
    res.status(201).json({
      status: 'success',
      data: {
        tour: create,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Tour.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: 'No tour found',
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Tour.findByIdAndRemove(id, req.body);
    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch {
    res.status(404).json({
      status: 'Failed',
      message: 'No tour found',
    });
  }
};
