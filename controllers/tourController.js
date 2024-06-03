const fs = require('fs')

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/tours-simple.json`)
)

exports.checkBody = (req, res, next) => {
  const { name, price } = req.body
  if (!name || !price) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Missing name or price' })
  }
  next()
}

exports.checkId = (req, res, next, val) => {
  if (!val || !tours.find((tour) => tour.id == val)) {
    return res.status(404).json({ status: 'error', message: '404 Not Found' })
  }
  next()
}

exports.getAllTours = (req, res) => {
  console.log(req.requestTime)
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  })
}

exports.getTourById = (req, res) => {
  const { id } = req.params
  const tour = tours.find((tour) => parseInt(tour.id) === parseInt(id))
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  })
}

exports.updateTour = (req, res) => {
  const { id } = req.params
  const tour = tours.find((tour) => parseInt(tour.id) === parseInt(id))
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'Update tour here',
    },
  })
}

exports.deleteTour = (req, res) => {
  const { id } = req.params
  const tour = tours.find((tour) => parseInt(tour.id) === parseInt(id))
  res.status(204).json({
    status: 'success',
    data: null,
  })
}

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1] + 1
  const newTour = { id: newId, ...req.body }
  tours.push(newTour)
  fs.writeFile(
    `${__dirname}/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      })
    }
  )
}
