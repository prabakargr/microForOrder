const router = require('express').Router();
const mongoose=require('mongoose')
const Orders = mongoose.model('Orders');
var Request = require("request");


// create order

router.post('/createOrder', (req, res, next) => {
    const { body: { order } } = req
    console.log(req.body)
    const finalOrder = new Orders(order)
    finalOrder.save()
        .then(() =>
        Request.post({
            "headers": { "content-type": "application/json" },
            "url": "https://inventorymicro.herokuapp.com/api/inventory/reduceQty",
            "body": JSON.stringify(req.body)
        }, (error, response,body) => {
            if (error) {
                return console.dir(error);
            }
           console.log( typeof(body));
           
            res.json({message:"order created"})
        })
        );
});

router.post('/cancelOrder',(req,res,next)=>{
    const {body:{order}}=req
    const productId=order.productId
    console.log(productId);
    
    return Orders.findOneAndDelete({productId}).then((data)=>
    Request.post({
        "headers": { "content-type": "application/json" },
        "url": "https://inventorymicro.herokuapp.com/api/inventory/addQty",
        "body": JSON.stringify(req.body)
    }, (error, response,body) => {
        if (error) {
           return error
        }
        res.json({message:"order cancelled"})
    })
    
    )

})

module.exports = router;

//res.json({ order: finalOrder.toAuthJSON()})\\\


