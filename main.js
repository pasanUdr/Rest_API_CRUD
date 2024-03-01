const express = require("express");
const app = express();
const port = 3003;

app.use(express.json());

//temporary data array for testing
const students = [
    { id: 1, name: "stu.01" },
    { id: 2, name: "stu.02" },
    { id: 3, name: "stu.03" }
];

//READ
app.get("/", (req, res) => {
    res.send("Hello my name is Pasan Udara");
});
app.get("/a", (req, res) => {
    res.send([1, 2, 3]);
});
app.get("/students", (req, res) => {
    res.json(students);
});
//READ by specific ID
app.get("/students/:id", (req, res) => {
    //look up at the student to check if it exists
    const student = students.find(c => c.id === parseInt(req.params.id))
    if (!student) return res.status(404).send('Not Found');
    res.send(student);
});

//CREATE
app.post("/create/students", (req, res) => {
    const student = {
        id: students.length + 1,
        name: req.body.name
    };
    students.push(student);
    res.send(student);
});

//UPDATE
app.put('/update/:id', (req, res) => {
    //look up at the student to check if it exists
    const student = students.find(c => c.id === parseInt(req.params.id))
    if (!student) return res.status(404).send('Not Found');

    //update the student
    student.name = req.body.name;
    res.send(student);
});

//DELETE
app.delete('/delete/:id', (req, res) => {
    //look up at the student to check if it exists
    const student = students.find(c => c.id === parseInt(req.params.id))
    if (!student) return res.status(404).send('Not Found');

    //delete the student
    const index = students.indexOf(student);
    students.splice(index, 1);
    res.send(student)
});


app.listen(port, () => {
    console.log(`example app listening on ${port}`);
});