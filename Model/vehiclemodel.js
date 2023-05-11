// const mongoose = require('mongoose');

// const vehicleSchema = new mongoose.Schema({
//     FirstName:{type:String},
//     LastName:{type:String},
//     NumberofWheels:{type:Number, required:true},
//     TypeofVehicle:{type:String, required:true},
//     SpecificModel:{type:String, required:true},
//     isRented:{type:Boolean, default:false},
//     StartDate:{type:Date},
//     EndDate:{type:Date}
// })

// const Vehicle = mongoose.model('Vehicle',vehicleSchema);

// const Data =[
//     {
//         NumberofWheels: 2,
//         TypeofVehicle:'cruiser',
//         SpecificModel:'Java',
//     },
//     {
//         NumberofWheels: 2,
//         TypeofVehicle:'cruiser',
//         SpecificModel:'Avenger',
//     },
//     {
//         NumberofWheels: 2,
//         TypeofVehicle:'cruiser',
//         SpecificModel:'Harley Davidson',
//     },
//     {
//         NumberofWheels: 2,
//         TypeofVehicle:'sports',
//         SpecificModel:'BMW S1000 RR',
//     },
//     {
//         NumberofWheels: 2,
//         TypeofVehicle:'sports',
//         SpecificModel:'Kawasaki Ninja',
//     },
//     {
//         NumberofWheels: 2,
//         TypeofVehicle:'sports',
//         SpecificModel:'Yahama R1', 
//     },
//     {
//         NumberofWheels: 2,
//         TypeofVehicle:'sports',
//         SpecificModel:'Ducati Panigale',
//     },
//     {
//         NumberofWheels: 4,
//         TypeofVehicle:'hatchback',
//         SpecificModel:'Maruti Swift',
//     },
//     {
//         NumberofWheels: 4,
//         TypeofVehicle:'hatchback',
//         SpecificModel:'Hyundai i20',
//     },
//     {
//         NumberofWheels: 4,
//         TypeofVehicle:'hatchback',
//         SpecificModel:'Tata indica',
//     },
//     {
//         NumberofWheels: 4,
//         TypeofVehicle:'hatchback',
//         SpecificModel:'Renault Kwid',
//     },
//     {
//         NumberofWheels: 4,
//         TypeofVehicle:'suv',
//         SpecificModel:'Tata Nexon',
//     },
//     {
//         NumberofWheels: 4,
//         TypeofVehicle:'suv',
//         SpecificModel:'Toyota Fortuner',
//     },
//     {
//         NumberofWheels: 4,
//         TypeofVehicle:'suv',
//         SpecificModel:'Kia Seltos',
//     },
//     {
//         NumberofWheels: 4,
//         TypeofVehicle:'suv',
//         SpecificModel:'Land Rover',
//     },
//     {
//         NumberofWheels: 4,
//         TypeofVehicle:'sedan',
//         SpecificModel:'Honda City',
//     },
//     {
//         NumberofWheels: 4,
//         TypeofVehicle:'sedan',
//         SpecificModel:'Audi A4',
//     },
//     {
//         NumberofWheels: 4,
//         TypeofVehicle:'sedan',
//         SpecificModel:'Hyundai Verna',
//     },
//     {
//         NumberofWheels: 4,
//         TypeofVehicle:'sedan',
//         SpecificModel:'Skoda Slavia',
//     }
// ]

// Vehicle.insertMany(Data)
//     .then(() => {
//         console.log('Data inserted successfully');
//     })
//     .catch((error) => {
//         console.log(error);
//     });

// module.exports = Vehicle;

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


// Check if collection is empty before seeding initial data
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

