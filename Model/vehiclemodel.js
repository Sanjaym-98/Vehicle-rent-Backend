const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  name: {
    first: {
      type: String,
      required: true
    },
    last: {
      type: String,
      required: true
    }
  },
  vehicleType: {
    type: String,
    enum: ['hatchback', 'suv', 'sedan', 'sports', 'cruiser'],
    required: true
  },
  wheels: {
    type: Number,
    enum: [2, 4],
    required: true
  },
  model: {
    type: String,
    required: true
  },
  booking: {
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    }
  }
});

const Vehicles = mongoose.model('Vehicles', vehicleSchema);

Vehicles.countDocuments().then(count => {
  if (count === 0) {
    const initialVehicles = [
      { name: { first: 'John', last: 'Doe' }, vehicleType: 'hatchback', wheels: 4, model: 'Hyundai i20', booking: { startDate: new Date('2023-05-11'), endDate: new Date('2023-05-13') } },
      { name: { first: 'Jane', last: 'Doe' }, vehicleType: 'suv', wheels: 4, model: 'Toyota Fortuner', booking: { startDate: new Date('2023-05-15'), endDate: new Date('2023-05-18') } },
      { name: { first: 'Bob', last: 'Smith' }, vehicleType: 'sedan', wheels: 4, model: 'Honda City', booking: { startDate: new Date('2023-05-20'), endDate: new Date('2023-05-22') } },
      { name: { first: 'Alice', last: 'Johnson' }, vehicleType: 'sports', wheels: 2, model: 'Ducati Panigale', booking: { startDate: new Date('2023-05-12'), endDate: new Date('2023-05-14') } },
      { name: { first: 'Steve', last: 'Jones' }, vehicleType: 'cruiser', wheels: 2, model: 'Harley Davidson', booking: { startDate: new Date('2023-05-16'), endDate: new Date('2023-05-19') } }
    ];

    Vehicles.insertMany(initialVehicles)
      .then(() => console.log('Initial vehicles seeded successfully'))
      .catch(err => console.error('Error seeding initial vehicles:', err));
  }
}).catch(err => console.error('Error counting documents:', err));

module.exports = Vehicles;

