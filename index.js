import express from 'express';
import joi from 'joi';
import fs from 'fs';
const app = express();

const PORT = 3030;
const database = './database/db.json';
const data = JSON.parse(fs.readFileSync(database));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const handleServerError = (res) => {
    return res.status(500).json({ message: 'Interal server error'})
}

const handleClientError = (res, status, message) => {
    return res.status(status).json({ message })
}


// Get semua data
app.get('/all', (req, res) => {
    try {
        const datas = {
            employees: data.employees,
            managers: data.managers,
        }

        res.status(200).json({ data: datas, status: 200, message: 'Successfully get all data'})

    } catch (error) {
        return handleServerError(res)
    }
})

// Get data by name using query parameter
app.get('/all/data', (req, res) => {
    try {
        const { level, role, name } = req.query;

        if (!level || !role || !name || !data[level] || !data[level][role]) {
            return handleClientError(res, 404, 'Data not found');
        }

        const selectedName = data[level][role].find((el) => el.name.toLowerCase() === name.toLowerCase());

        if (!selectedName) {
            return handleClientError(res, 404, 'Data not found');
        }

        return res.status(200).json({ data: selectedName, status: 200, message: 'Successfully get data using query parameter' });
    } catch (error) {
        return handleServerError(res);
    }
});

// Get data by level
app.get('/all/:level', (req, res) => {
    try {
        const { level } = req.params;
        const listLevel = ['employees', 'managers'];
        if (!listLevel.includes(level)) {
            return handleClientError(res, 404,'URL not found');
        }
        return res.status(200).json({ data: data[level], status: 200, message: 'Successfully get data by level' });

    } catch (error) {
        return handleServerError(res);
    }
})

// Get data by name dari level dan role
app.get('/all/:level/:role/:name', (req, res) => {
    try {
        const { level, role, name } = req.params;
        if(!data[level][role].find((el) => el.name.toLowerCase() === name.toLowerCase())) {
            return handleClientError(res, 404, 'URL not found');
        }
        const selectedName = data [level][role].filter((el) => el.name.toLowerCase() === name.toLowerCase());
        return res.status(200).json({ data: selectedName[0], status: 200, message: 'Successfully get data by name'})
    } catch (error) {
        return handleServerError(res);
    }
})

// Schema validation joi
const employeesSchema = joi.object({
    name: joi.string().required(),
    age: joi.number().integer().min(18).required(),
    address: joi.object({
        province: joi.string().required(),
        street: joi.string().required(),
    }).required(),
})

const managersSchema = joi.object({
    name: joi.string().required(),
    age: joi.number().integer().min(18).required(),
    address: joi.object({
        province: joi.string().required(),
        street: joi.string().required(),
    }).required(),
    staff: joi.number().integer().min(4).required(),
})

// Create employee and manager
app.post('/create/:level/:role', (req, res) => {
    const { level, role } = req.params;
    const newData = req.body;

    try {
        const schema = level === 'employees' ? employeesSchema : (level === 'managers' ? managersSchema : null);

        if(!schema) {
            return handleClientError(res, 400, 'Check again your level')
        }

        const { error } = schema.validate(newData);
        if (error) {
            return res.status(400).json({ status: 'Validation Failed', message: error.details[0].message });
        }

        if (data[level][role].find((el) => el.name.toLowerCase() === newData.name.toLowerCase())){
            return handleClientError(res, 400, 'Data already exist')
        }

        data[level][role].push(newData);

        fs.writeFileSync(database, JSON.stringify(data))

        return res.status(201).json({ data: newData, status: 201, message: 'Succesfully create data'})

    } catch (error) {
        return handleServerError(res);
    }
})

// Update employee and manager
app.put('/all/:level/:role/:name', (req, res) => {
    const { level, role, name } = req.params;
    const newData = req.body;

    try {
        const schema = level === 'employees' ? employeesSchema : (level === 'managers' ? managersSchema : null);

        if(!schema) {
            return handleClientError(res, 400, 'Check again your level')
        }

        const { error } = schema.validate(newData);
        if (error) {
            return res.status(400).json({ status: 'Validation Failed', message: error.details[0].message });
        }

        const targetIndex = data[level][role].findIndex((el) => el.name.toLowerCase() === name.toLowerCase());

        if (targetIndex === -1) {
            return handleClientError(res, 404, 'Data not found');
        }

        data[level][role][targetIndex] = newData;

        fs.writeFileSync(database, JSON.stringify(data));

        return res.status(200).json({ data: newData, status: 200, message: 'Successfully update data' });


    } catch (error) {
        return handleServerError(res)
    }
})

// Delete employee and manager
app.delete('/all/:level/:role/:name', (req, res) => {
    try {
        const { level, role, name } = req.params;

        const targetIndex = data[level][role].findIndex((el) => el.name.toLowerCase() === name.toLowerCase())
        if(targetIndex === -1) {
            return handleClientError (res, 404, 'Data not found')
        }

        const deletedData = data[level][role].splice(targetIndex, 1)[0];

        fs.writeFileSync(database, JSON.stringify(data))

        return res.status(200).json({ data: deletedData, status: 200, message: 'Succesfully delete data!'})
    } catch (error) {
        return handleServerError(res);
    }
})





app.listen(PORT, () => {
    console.log(`App running on PORT ${PORT}`)
})
