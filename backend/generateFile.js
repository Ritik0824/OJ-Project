const fs = require('fs');
const path = require('path');
const {v4 : uuid} = require('uuid');

const direCodes = path.join(__dirname,'codes');

if(!fs.existsSync(direCodes)){
    fs.mkdirSync(direCodes, {recursive: true});
}
const generateFile = (language,code) => {
    const jobId = uuid();
    const filename = `${jobId}.${language}`;
    const filePath = path.join(direCodes,filename);
    fs.writeFileSync(filePath,code);
    return filePath;
};

module.exports = {
    generateFile
};