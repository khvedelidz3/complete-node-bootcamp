const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.time,
    data: { tours }
  });
};

exports.getTour = (req, res) => {
  const { id } = req.params;

  const tour = tours.find(val => val.id === +id);

  if (!tour) {
    return res.status(404).json({
      success: 'Fail',
      message: 'Invalid id'
    });
  }

  res.status(200).json({
    status: 'success',
    data: { tour }
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  const newTour = { id: newId, ...req.body };

  tours.push(newTour);
  fs.writeFile(
    './../dev-data/data/tours-simple.json',
    JSON.stringify(tours),
    // eslint-disable-next-line no-unused-vars
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    }
  );
};

exports.updateTour = (req, res) => {
  const { id } = req.params;

  // eslint-disable-next-line no-shadow
  const tour = tours.find(tour => tour.id === +id);
  const tourIndex = tours.indexOf(tour);

  if (tourIndex === -1) {
    return res.status(404).json({
      success: 'Fail',
      message: 'Could not find tour'
    });
  }

  tours[tourIndex] = { ...tours[tourIndex], ...req.body };

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(200).json({
        success: 'Success',
        data: {
          tour: tours[tourIndex]
        }
      });
    }
  );
};

exports.deleteTour = (req, res) => {
  const id = +req.params.id;

  const tour = tours.find(tour => tour.id === +id);
  const tourIndex = tours.indexOf(tour);

  if (tourIndex === -1) {
    return res.status(404).json({
      success: 'Fail',
      message: 'Could not find tour'
    });
  }

  tours.splice(tourIndex, 1);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(204).json({
        success: 'Success',
        data: null
      });
    }
  );
};

exports.checkBody = (req, res, next) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({
      success: 'Fail',
      message: 'name or price is missing from request!'
    });
  }
  next();
};
