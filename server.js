var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/restful');
var TaskSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String, default: " " },
}, { timestamp: true });

mongoose.model('Task', TaskSchema);
var Task = mongoose.model('Task')
app.use(express.static(__dirname + '/public/dist/public'));

app.get('/', function (req, res) {
    Task.find({}, function (err, tasks) {
        if (err) {
            res.json({ message: "error", error: err })
        }
        else {
            res.json({ message: 'Success!', data: tasks })
        }
    })
})

// GET: Retrieve all Tasks
app.get('/tasks', function (req, res) {
    Task.find({}, function (err, tasks) {
        if (err) {
            res.json({ message: "error", error: err })
        }
        else {
            res.json({ message: 'Success! All tasks!', data: tasks })
        }
    })
})

// GET: Retrieve a Task by ID
app.get('/tasks/:id', function (req, res) {
    Task.findOne({ _id: req.params.id }, function (err, task) {
        if (err) {
            res.json({ message: 'error', data: err })
        } else {
            console.log(task)
            res.json({ message: 'Success! Task by ID!', data: task })
        }
    })
})

// POST: Create a Task
app.post('/tasks', function (req, res) {
    var task = new Task({
        title: req.body.title,
        description: req.body.description,
    })
    task.save(function (err, tasks) {
        if (err) {
            res.json({ message: 'error', error: err })
        } else {
            res.json({ message: 'Success! Created a Task!', data: tasks })
        }
    })
})

// PUT: Update a Task by ID
app.put('/tasks/:id', function (req, res) {
    Task.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            title: req.body.title,
            description: req.body.description, 
            completed: req.body.completed
        }
    }, function (err, tasks) {
        if (err) {
            res.json({ message: 'error' })
        } else {
            res.json({ message: 'Success! Update a Task by ID', data: tasks })
        }
    })
})

// DELETE: Delete a Task by ID
app.delete('/tasks/:id', function (req, res) {
    Task.remove({ _id: req.params.id }, function (err) {
        if (err) {
            console.log('Returned Error:', err);
            res.json({ message: 'error' })
        }
        else {
            res.json({ message: "Success" })
        }
    })
})
const server = app.listen(8000);