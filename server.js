//using express and express-fileupload
const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

app.use(fileUpload());

app.post('/upload', (req, res) => {
  //if no files are selected
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }
  
  const file = req.files.file;
  //uploading file into 'your-images' folder
  file.mv(`${__dirname}/client/public/your-images/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/your-images/${file.name}` });
  });
});

app.listen(5000, () => console.log('Server is running'));
