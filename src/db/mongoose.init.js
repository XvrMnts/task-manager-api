mongoose = require('mongoose')

const connectionUrl = 'mongodb://127.0.0.1:27017'

mongoose.connect(connectionUrl+'/task-manager-api',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

/* 
mongodb+srv://taskapp:<password>@cluster0-qyhsz.mongodb.net/test */