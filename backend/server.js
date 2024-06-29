const express = require('express');
const { generateFile } = require('./generateFile');
const { executeCpp } = require('./executeCpp');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const cors = require('cors');
const COMPILER_PORT=process.env.COMPILER_PORT || 4000

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({
        online : "compiler"
    });
});

app.post('/run', async (req, res) => {
    const { language='cpp',code } = req.body;
    if(code === undefined){
        return res.status(400).json({ success: false, message: 'Empty Code body' });
    }

    try {
        const filePath =  generateFile(language, code);
        const output = await executeCpp(filePath);
        res.send({ filePath, output});
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error: ',error });
    }
});

app.listen(4000, () => {
    console.log(`Server started on port ${COMPILER_PORT}`);
});