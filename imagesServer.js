
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors'); // Add this line

const app = express();
const PORT = 4000;

app.use(cors()); // Enable CORS for all routes

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const itemId = req.params.id;
        const destinationPath = path.join(__dirname, 'images', String(itemId));
        if (!fs.existsSync(destinationPath)) {
            fs.mkdirSync(destinationPath);
        }

        cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

// // Serve static files from the 'images' folder
app.use('/images', express.static(path.join(__dirname, 'images')));

// Endpoint for getting all images for a provided ID
app.get('/getImages/:id', (req, res) => {
    const itemId = req.params.id;

    if (!itemId) {
        return res.status(400).json({ error: 'ID parameter is required.' });
    }

    const imagesPath = path.join(__dirname, 'images', String(itemId));
    const itemImages = fs.readdirSync(imagesPath).map(fileName => `http://127.0.0.1:4000/images/${itemId}/${fileName}`);

    console.log(itemImages);

    res.status(200).json({ images: itemImages });
});

// Endpoint for uploading images
app.post('/images/:id', upload.array('slika'), (req, res) => {
    try {
        const files = req.files;
        const itemId = req.params.id;

        const uploadedImages = [];

        for (const file of files) {
            const fileName = file.filename;
            const imageUrl = `http://127.0.0.1:4000/images/${itemId}/${fileName}`;
            console.log(`File ${fileName} uploaded successfully.`);
            uploadedImages.push(file.filename);
        }

        res.status(200).json({ message: 'Image uploaded successfully.', uploadedImages });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
