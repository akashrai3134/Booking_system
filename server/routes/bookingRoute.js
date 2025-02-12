const router = require('express').Router();
const stripe = require('stripe')('sk_test_51JKPQWSJULHQ0FL7LbqLKOaIcjurlUcdP2hJQkXZw3txlhh0hFrEEEOTwdVxf6sWKqLIrerKpV5EfGvmvntYu7Mt00vJq4YQKL');
const authMiddleware = require('../middlewares/authMiddleware');
const Booking = require('../models/BookingModel');
const Show = require('../models/showModel');
const Razorpay = require("razorpay");
const crypto = require("crypto");


router.post('/make-payment',  async (req, res) => {
    try{
        const {token, amount} = req.body;
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            customer: customer.id,
            payment_method_types: ['card'],
            receipt_email: token.email,
            description: "Token has been assigned to the movie!"
        });

        // const charge = await stripe.charges.create({
        //     amount: amount,
        //     currency: "usd",
        //     customer: customer.id,
        //     receipt_email: token.email,
        //     description: "Token has been assigned to the movie!"
        // });
        
        const transactionId = paymentIntent.id;

        res.send({
            success: true,
            message: "Payment Successful! Ticket(s) booked!",
            data: transactionId
        });
    }catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
});

// Create a booking after the payment
router.post('/book-show', async (req, res) => {
    try{
        const newBooking = new Booking(req.body);
        await newBooking.save();

        const show = await Show.findById(req.body.show).populate("movie");
        const updatedBookedSeats = [...show.bookedSeats, ...req.body.seats];
        await Show.findByIdAndUpdate(req.body.show, { bookedSeats: updatedBookedSeats });
        res.send({
            success: true,
            message: 'New Booking done!',
            data: newBooking
        });
    }catch(err){
        res.send({
            success: false,
            message: err.message
        });
    }
});


router.get("/get-all-bookings", authMiddleware,  async (req, res) => {
    try{
        const bookings = await Booking.find({ user: req.body.userId })
        .populate("user")
        .populate("show")
            .populate({
                path: "show",
                populate: {
                    path: "movie",
                    model: "movies"
                }
            })
            .populate({
                path: "show",
                populate: {
                    path: "theatre",
                    model: "theatres"
                }
            });
        
        res.send({
            success: true,
            message: "Bookings fetched!",
            data: bookings
        })

    }catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
});

router.post('/razorpay-make-payment', async (req, res) => {
    const razorpay = new Razorpay({
        key_id: "rzp_test_uLAx2yN1mSKs36", 
        key_secret: "ysZrIZBteFgu5ECl08pfa3mR"
    });

    const { amount, currency } = req.body;

    const options = {
        amount: amount * 100, // Convert to paisa (INR)
        currency: currency || "INR",
        receipt: `receipt_${Date.now()}`,
        payment_capture: 1, // Auto capture payment
    };
    try{
        const order = await razorpay.orders.create(options);
        res.send({
            success: true,
            message: "Order created!",
            data: order
        });
    }catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
});

router.post("/verify-razorpay-payment", (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        
        const hmac = crypto.createHmac("sha256", "ysZrIZBteFgu5ECl08pfa3mR");
        hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
        const expectedSignature = hmac.digest("hex");

        
        console.log("expectedSignature", expectedSignature);
        console.log("razorpay_signature", razorpay_signature);

        if (expectedSignature === razorpay_signature) {
            res.send({ success: true, message: "Payment verified successfully" });
        } else {
            console.log("signature is not matching")
            res.send({ success: false, message: "Invalid signature" });
        }
    } catch (error) {
        console.log("error", error);
        res.send({  success: false, error: error.message });
    }
});





module.exports = router;