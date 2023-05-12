const router = require('express').Router();
const Vehicles = require('../Model/vehiclemodel');
const bodyParser = require('body-parser')
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }));

router.get("/vehicle/:wheels", async (req, res) => {
    try {
        const data = await Vehicles.find({ wheels: req.params.wheels }, { vehicleType: 1 });  //giving wheels as params, this will display only vehicleYpe in it.
        res.status(200).json({
            status: "success",
            data
        })
    } catch (e) {
        res.status(404).json({
            status: "Failed",
            message: e.message
        })
    }
})


router.get("/vehicle/:wheels/:type", async (req, res) => {
    try {
        const data = await Vehicles.find({ wheels: req.params.wheels, vehicleType: req.params.type }, { model: 1 }); //taking wheels and vehicleType from the params, this will display only models
        res.status(200).json({
            status: "success",
            data
        })
    } catch (e) {
        res.status(404).json({
            status: "Failed",
            message: e.message
        })
    }
})

router.post("/vehicle", async (req, res) => {
    try {

        const checkExistingBookings = await Vehicles.findOne({     //will check if vehicle is already booked in that date range
            vehicleType: req.body.vehicleType,
            model: req.body.model,
            'booking.endDate': { $gte: req.body.booking.startDate },
            'booking.startDate': { $lte: req.body.booking.endDate },
        });


        if (checkExistingBookings) {
            res.status(409).json({
                status: "Failed",
                message: "Vehicle already booked for this date range"
            });
            return;
        }

        const data = {
            name: {
                first: req.body.name.first,
                last: req.body.name.last
            },
            vehicleType: req.body.vehicleType,
            wheels: req.body.wheels,
            model: req.body.model,
            booking: {
                startDate: req.body.booking.startDate,
                endDate: req.body.booking.endDate
            }
        };
        const vehicledata = await Vehicles.create(data);  //if vehicle not booked , then booking will happen.
        res.status(201).json({
            status: "success",
            vehicledata
        })
    } catch (e) {
        res.status(501).json({
            status: "Failed",
            message: e.message
        })
    }
})

module.exports = router;
