/**
 * Module dependencies.
 */
var express = require('express')
	, routes = require('./routes')
	, user = require('./routes/user')
	, http = require('http')
	, path = require('path');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// app.get('/about_us', function(req, res){
	// res.redirect('/about_us',{
		// title: 'Todos about_us view' });
// });
app.get('/plans', function(req, res){
	res.render('plans', {
		title: 'Plans'
	});
});
app.get('/contact', function(req, res){
	res.render('contact', {
		title: 'Contact Us'
	});
});
app.get('/web_development', function(req, res){
	res.render('web_development', {
		title: 'Web Development'
	});
});


app.get('/', routes.index);
// app.get('/users', user.list);

app.get('/contact', routes.contact);


// once submit is clicked, it sends an email, and sends it to another page. i will clean this up
// later. i will find out how to send the variables later.
app.get('/contact_us_confirm', function(req, res){
	res.render('contact_us_confirm', {
		title: 'contact_us_confirm'
	});
});

app.get('/mobile_app_development', function(req, res){
	res.render('mobile_app_development', {
		title: 'mobile_app_development'
	});
});
app.post('/contact', function(req, res){

	var nodemailer = require("nodemailer");

	// create reusable transport method (opens pool of SMTP connections)
	var smtpTransport = nodemailer.createTransport("SMTP",{
		service: "Gmail",
		auth: {
			user: "ivywireline@gmail.com",
			pass: "dograpist1234"
		}
	});

	// setup e-mail data with unicode symbols
	var mailOptions = {
		from: "Client", // sender address
		to: "ivywireline@gmail.com", // list of receivers
		subject: "Client Contact Form", // Subject line
		text: "Name: " + req.body.name + "\n" + "Email: " + req.body.email + "\n" + 
			"Phone: " + req.body.phone + "\n" + "Message: " + 
			req.body.message, // plaintext body
	}

	// send mail with defined transport object
	smtpTransport.sendMail(mailOptions, function(error, response){
		if(error){
			console.log(error);
		}else{
			console.log("Message sent: " + response.message);
		}

		// if you don't want to use this transport object anymore, uncomment following line
		//smtpTransport.close(); // shut down the connection pool, no more messages
	});
	res.render('contact_us_confirm', {
		title: 'contact_us_confirm'
	});
});