// const express = require('express');
// const multer = require('multer');
// const path = require('path');

// const app = express();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const itemId = req.params.itemId; // Dohvati ID iz URL-a
//     const folder = path.join(__dirname, 'uploads', itemId);
//     cb(null, folder); // Sačuvaj slike u folderu za taj artikal
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
//   }
// });

// const upload = multer({ storage });

// // Upload slika za određeni artikal
// app.post('/api/images/:itemId', upload.array('images'), (req, res) => {
//   const uploadedImages = req.files;
//   res.send({ success: true, uploadedImages });
// });

// // Dohvati slike za određeni artikal
// app.get('/api/images/:itemId', (req, res) => {
//   const itemId = req.params.itemId;
//   const folder = path.join(__dirname, 'uploads', itemId);
//   const imagePaths = fs.readdirSync(folder);

//   res.json(imagePaths);
// });

// app.listen(4000, () => console.log('Server started on port 4000'));


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
            uploadedImages.push(imageUrl);
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
console.log("svemoguca dunja");
//postavke cors middleware-a, omogucava angularu pristup
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// });

/*const express = require('express');
const multer = require('multer'); //bibiloteka za obradu slika
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 4000;

//postavke za multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const itemId = req.body.itemId;
        const uploadPath = path.join('uploads', itemId.toString()); //naziv foldera ce biti uploads/itemId

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }

        cb(null, uploadPath);  //folder gdje se cuvaju slike
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

//postavke cors middleware-a, omogucava angularu pristup
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

//endpoint
app.post('/upload', upload.array('images'), (req, res) => {
    //res.json({ message: 'Images uploades successfully.' });
    res.send('Images uploades successfully.');
});

app.get('/getImages', (req, res) => {
    const itemId = req.query.itemId;

    if (!itemId) {
        return res.status(400).json({ error: 'itemId parameter is required' })
    }
    const imagePath = path.join('uploads', itemId.toString());

    //citanje slike
    fs.readdir(imagePath, (err, files) => {
        if (err) {
            res.status(500).json({ error: 'Error reading images' });
        }

        const imageUrls = files.map(file => path.join(imagePath, file));

        res.json(imageUrls);
    })
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
*/