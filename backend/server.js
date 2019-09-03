const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);
io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('User Disconnected');
    });
    socket.on('example_message', function(msg){
      console.log('message: ' + msg);
    });
  });
io.listen(8000);

//Connect database
connectDB();

//Init Middleware
app.use(express.json({extended: false}));

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api', require('./routes/api/resume'));

//Serve static assets in production
if(process.env.NODE_ENV === 'production' ){
  //Set static folder
  app.use(express.static('frontend/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server stared on port ${PORT}`));