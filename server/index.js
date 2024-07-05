const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const EmployeeModel = require("./models/Employee")

const app = express()
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

mongoose.connect("mongodb+srv://shivambscsses21:UAgZxVPTGrZITr3d@cluster0.bxqebzj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    EmployeeModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success")
                } else {
                    res.json("Wrong password")
                }
            } else {
                res.json("User not found")
            }
        })
        .catch(err => res.status(500).json(err));
})

app.post('/register', (req, res) => {
    EmployeeModel.create(req.body)
        .then(employees => res.json(employees))
        .catch(err => res.status(500).json(err));
})

// New route to get all users
app.get('/users', (req, res) => {
    EmployeeModel.find()
        .then(users => res.json(users))
        .catch(err => res.status(500).json(err));
})

// New route to update a user
app.put('/user/:id', (req, res) => {
    const { id } = req.params;
    EmployeeModel.findByIdAndUpdate(id, req.body, { new: true })
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err));
})

// New route to delete a user
app.delete('/user/:id', (req, res) => {
    const { id } = req.params;
    EmployeeModel.findByIdAndDelete(id)
        .then(() => res.json({ message: 'User deleted' }))
        .catch(err => res.status(500).json(err));
})

app.get('/', (req, res) => res.json("Hello World"))
app.listen(3001, () => {
    console.log("server is running on PORT: 3001")
})
