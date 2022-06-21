const express = require('express');
const app = express();
require("dotenv").config()

const port = process.env.PORT || 3000;
const stripe=require("stripe")(process.env.STRIPE_SECRET_TEST)
const bodyParser=require("body-parser")
const cors=require("cors")


app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json())
app.use(cors())


app.post("/payment", cors(), async (req, res) => {
    let {amount, id}=req.body
    try {
        const payment=await stripe.paymentIntents.create({
            amount,
            currency:"USD",
            description:"Thrift store",
            payment_method:id,
            confirm:true,
        })
        console.log("Payment", payment)
        res.json({
            message:"Payment successful",
            success:true
        })
    }
    catch (e) {
        console.log("error",e)
        res.json({
            message:"payment failed",
            success:false
        })
    }
})
app.listen(port, ()=>{
    console.log("you are listening on port " + port)
})

