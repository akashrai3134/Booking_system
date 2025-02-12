import React from "react";
import axios from "axios";
import  {makeRazorpayPayment, varifyRazorpayPayment} from "../../apicalls/bookings";
import { Button } from "antd";
import {axiosInstance} from "../../apicalls";

const RazorpayPayment = ({amount, book}) => {

    const handlePayment = async () => {
        try {
            // Step 1: Create an order from the backend
            const { data } = await makeRazorpayPayment( {amount: amount, currency: "INR" });

            console.log(data);

            // Step 2: Open Razorpay checkout popup
            const options = {
                key: "rzp_test_uLAx2yN1mSKs36", // Replace with your Key ID
                amount: data.amount,
                currency: data.currency,
                name: "BookMyShow",
                description: "Test Payment",
                order_id: data.id, // Order ID from backend
                handler: async function (response) {
                    console.log("Payment Response: ", response);
    
                    // Step 3: Verify Payment Signature
                    const verifyResponse = await fetch("/api/bookings/verify-razorpay-payment", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(response),
                    });
    
                    const verifyData = await verifyResponse.json();
                    console.log("Payment Verification: ", verifyData);
    
                    if (verifyData.success) {
                        book(response.razorpay_payment_id);
                        alert("Payment Successful!");
                    } else {
                        alert("Payment Verification Failed!");
                    }
                },
                prefill: {
                    name: "Akash Rai",
                    email: "akashrai@gmail.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            if (typeof window !== "undefined" && window.Razorpay) {
                const razor = new window.Razorpay(options);
                razor.open();
            } else {
                console.error("Razorpay SDK failed to load");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    React.useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    
        return () => {
            document.body.removeChild(script);
        };
    }, []);


    return (
        <div className="max-width-600 mx-auto">
            <h1>Razorpay Payment Gateway</h1>
            <Button type="primary" shape="round" size="large" block onClick={handlePayment}>
                Pay Now
            </Button>
        </div>
    );
};

export default RazorpayPayment;
