mongoose = require('mongoose')

const connectionUrl = process.env.MONGODB_URL

mongoose.connect(connectionUrl,{
    dbName: "task-manager-api",
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: false,
    useFindAndModify: false
})

/* 
mongodb+srv://taskapp:<password>@cluster0-qyhsz.mongodb.net/test */