const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/images');
	},

	filename: (req, file, cb) => {
		cb(null, file.originalname)
	} 
});

const imageFileFilter = (req, file, cb) => {
	if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
		return cb(new Error("you can upload only image files!"), false);
	}
	else {
		cb(null, true);
	}
};

const upload = multer({ storage: storage , fileFilter: imageFileFilter});

const uploadRouter = express.Router();

uploadRouter.use(bodyParser.json());

uploadRouter.route('/')
.get(authenticate.verifyUser, (req, res, next) => {authenticate.verifyAdmin(req, res, next)}, 
	(req, res, next) => {
		res.statusCode = 403;
		res.end('GET operation not supported on /imageUpload');
})
.put(authenticate.verifyUser, (req, res, next) => {authenticate.verifyAdmin(req, res, next)}, 
	(req, res, next) => {
		res.statusCode = 403;
		res.end('PUT operation not supported on /dishes');
})
.post(authenticate.verifyUser, (req, res, next) => {authenticate.verifyAdmin(req, res, next)}, 
	upload.single('imageFile'), (req, res) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(req.file);
})
.delete(authenticate.verifyUser, (req, res, next) => {authenticate.verifyAdmin(req, res, next)}, 
	(req, res, next) => {
		res.statusCode = 403;
		res.end('PUT operation not supported on /dishes');
})
module.exports = uploadRouter;