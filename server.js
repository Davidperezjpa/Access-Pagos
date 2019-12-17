var express = require('express');
var stripe = require('stripe')('sk_test_C3CLDSDRliHNPU3kSVVLlgxZ0007diIGot');
var hbs = require('hbs');
var bodyParser = require('body-parser');
var app = express();

var PORT = process.env.PORT || 3000;


//const stripeSecretKey = process.env.STRIPE_SECRET_KEY
//const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

app.set('view engine','hbs');
app.set('views',__dirname + '/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.get('/', function(req,res){
  res.render('Pay',{});
});

app.get('/paysuccess', function(req,res){
  res.render('paymentsuccessful',{});
})

app.post('/charge', function (req,res){
  var token = req.body.stripeToken;
  var chargeAmount = req.body.chargeAmount;
  var charge = stripe.charges.create({
      amount: chargeAmount,
      currency: "mxn",
      source: token
  }, function(err, charge){
    if(err & err.type === "StripeCardError"){
      console.log("your card was declined");
    }
  });
  //refreshReservationPayment(req.body.reservationid);
  console.log("your payment was successful");
  res.redirect('/paysuccess');
});


var server = app.listen(PORT, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
});
/*
function refreshReservationPayment(reservationid){
  jQuery.support.cors = true;
  $.ajax({
      url: "https://apex.oracle.com/pls/apex/access-a/access/CreateInvitationCode",
      type: "PUT",
      dataType: "json",
      headers: {'reservationid': reservationid, 'paymentstatus': 't'},
  });
}
*/