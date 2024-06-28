const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const outputPath = path.join(__dirname, 'outputs');

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filePath) => {
    const jobId = path.basename(filePath).split('.')[0];
    const filename = `${jobId}.out`;
    const outPath = path.join(outputPath, filename);
    
    return new Promise((resolve, reject) => {
        const command = `g++ "${filePath}" -o "${outPath}" && cd "${outputPath}" && ./${filename}`;
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing command: ${error.message}`);
                console.error(`Command output: ${stderr}`);
                return reject({ error: error.message, stderr });
            }
            if (stderr) {
                console.error(`Standard error: ${stderr}`);
                return reject(stderr);
            }
            resolve(stdout);
        });
    });
};

module.exports = {
    executeCpp,
};
