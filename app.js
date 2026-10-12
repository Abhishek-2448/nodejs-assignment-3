import express from 'express';

const app = express();
const PORT = 3000;

const employees = [
    { name: "Aghil", age: 20, salary: 50000, department: "development", city: "Hyderabad" },
    { name: "Babu", age: 25, salary: 60000, department: "marketing", city: "Delhi" },
    { name: "Babu", age: 25, salary: 60000, department: "marketing", city: "Pune" },
    { name: "Chaitanya", age: 30, salary: 70000, department: "sales", city: "Mumbai" },
    { name: "Divya", age: 28, salary: 55000, department: "development", city: "Bangalore" },
    { name: "Eesha", age: 22, salary: 48000, department: "hr", city: "Chennai" },
    { name: "Farhan", age: 27, salary: 62000, department: "marketing", city: "Hyderabad" },
    { name: "Gaurav", age: 32, salary: 72000, department: "sales", city: "Delhi" },
    { name: "Harini", age: 29, salary: 53000, department: "development", city: "Pune" },
    { name: "Ishita", age: 24, salary: 49000, department: "hr", city: "Mumbai" },
    { name: "Jatin", age: 31, salary: 71000, department: "sales", city: "Bangalore" },
    { name: "Kritika", age: 26, salary: 59000, department: "development", city: "Chennai" },
    { name: "Lalita", age: 23, salary: 54000, department: "marketing", city: "Hyderabad" },
    { name: "Manan", age: 33, salary: 73000, department: "sales", city: "Delhi" },
    { name: "Neha", age: 21, salary: 47000, department: "hr", city: "Pune" },
    { name: "Omkar", age: 30, salary: 70000, department: "marketing", city: "Mumbai" },
    { name: "Priyanka", age: 28, salary: 56000, department: "development", city: "Bangalore" },
    { name: "Rajesh", age: 22, salary: 50000, department: "hr", city: "Chennai" }
];

const withTier = (emp) => ({ ...emp, tier: emp.salary > 50000 ? 1 : 2 });
const sumSalaries = (list) => list.reduce((sum, emp) => sum + emp.salary, 0);
const byCity = (city) =>
    employees.filter((emp) => emp.city.toLowerCase() === city.toLowerCase());

app.get('/api/employees', (req, res) => {
    const city = req.query.city?.trim();
    const list = city ? byCity(city) : employees;
    res.status(200).json(list.map(withTier));
});

// GET /api/employees/salary/total?city=<cityName>
app.get('/api/employees/salary/total', (req, res) => {
    const city = req.query.city?.trim();
    const list = city ? byCity(city) : employees;
    res.status(200).send(sumSalaries(list).toString());
});

app.get('/api/employees/salary/tier1', (req, res) => {
    const tier1 = employees.filter((emp) => emp.salary > 50000);
    res.status(200).send(sumSalaries(tier1).toString());
});

app.listen(PORT, () => {
    console.log(`Server running smoothly on port ${PORT}`);
});