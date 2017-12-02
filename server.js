// load in environmental variables
// safe
require('dotenv').load();

var express = require('express'),
app = express(),
mongoose = require('mongoose'),
expressSanitizer = require('express-sanitizer'),
bodyParser = require('body-parser'),
cors = require('cors'),
// db_server = process.env.DB_ENV || 'mongodb://localhost:27017/exploringTech',
db_server = process.env.MONOGO_DB_URL,
port = process.env.PORT || 3000;



// routes
var volunteerRoutes = require('./routes/txtVolunteerRouter'),
mentorRoutes = require('./routes/txtMentorRouter'),
contactRoutes = require('./routes/txtWebsiteContactUsRouter'),
subscriberRoutes = require('./routes/txtMailingSubscriberRouter'),
blogRoutes = require('./routes/txtBlogRouter'),
appRoutes = require('./routes/txtHackathonAppRouter'),
commentRoutes = require('./routes/txtBlogCommentsRouter');
cubeAppRoutes = require('./routes/txtCubeAppRouter');
testRoutes = require('./routes/test');
txtPortalRoutes = require('./routes/txtPortalRouter');

mongoose.connect(db_server);
mongoose.connection.on('connected',function(){
    console.log("Connected to " + db_server + " DB!")
});
mongoose.connection.on('error',function(err){
    console.log("Connection error " + err);
    console.log("Terminating application");
    process.exit(0);
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/volunteer',volunteerRoutes);
app.use('/mentor',mentorRoutes);
app.use('/contact',contactRoutes);
app.use('/subscribe',subscriberRoutes);
app.use('/blogs',blogRoutes);
app.use('/comments',commentRoutes);
app.use('/app', appRoutes);
app.use('/cubeApp', cubeAppRoutes);
app.use('/test', testRoutes);
app.use('/txtportal', txtPortalRoutes);



// testing out slack api built in to this

// grabs Slack network information to add bot
app.get('/slack', function(req, res){
    if (!req.query.code) { // access denied
      res.redirect('http://mijii.me/party/');
      return;
    }
    var data = {form: {
        client_id: process.env.SLACK_CLIENT_ID,
        client_secret: process.env.SLACK_CLIENT_SECRET,
        code: req.query.code
    }};
    request.post('https://slack.com/api/oauth.access', data, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        // Get an auth token
        let token = JSON.parse(body).access_token;
  
        // Get the team domain name to redirect to the team URL after auth
        request.post('https://slack.com/api/team.info', {form: {token: token}}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            if(JSON.parse(body).error == 'missing_scope') {
              res.send('BananaCSV has been added to your team!');
            } else {
              let team = JSON.parse(body).team.domain;
              res.redirect('http://' +team+ '.slack.com');
            }
          }
        });
      }
    })
});

// run the code for the slash command
function handleQueries(q, req, res) {
    if(q.token !== process.env.SLACK_VERIFICATION_TOKEN) {
      // the request is NOT coming from Slack!
      return;
    }
    let code = 'creed'; // if command is '/csv creed' run the rest of the code
    if (code) {
      if(!code) {
        res.send('Bummer, ' + q.text + ' is not an official HTTP status code 🙃'); // if command is not '/csv creed' run this error
        return;
      }
  
      let data = {
        response_type: 'in_channel', // public to the channel
        text: code + ': ' + status
      };
      res.json(data);
    } else {
      let data = {
        response_type: 'ephemeral', // private message
        text: 'How to use /csv command:',
        attachments:[
        {
          text: 'Type `/csv <code>` to grab an Excel sheet of the recruitment apps.'
        }
      ]};
      res.json(data);
    }
  }


app.listen(port, function() {
    console.log('listening on port ' + port);
});