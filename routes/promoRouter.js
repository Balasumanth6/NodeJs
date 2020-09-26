const express = require('express');
const bodyParser = require('body-parser');

const promotionsRouter = express.Router();

promotionsRouter.use(bodyParser.json());

promotionsRouter.route('/')
.all((req, res, next) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	next();
})
.get((req, res, next) => {
	res.end('Will send all the Promotions to you!');
})
.post((req, res, next) => {
	res.end("will add the Promotion: " + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
	res.statusCode = 403;
	res.end('PUT operation not supported on /Promotions');
})
.delete((req, res, next) => {
	res.end('Deleting all Promotions!');
});

promotionsRouter.route('/:promotionId')
.all((req, res, next) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	next();
})
.get((req, res, next) => {
	res.end('Will send all the details of Promotion: ' + req.params.promotionId + ' to you!');
})
.post((req, res, next) => {
	res.statusCode = 403;
	res.end('POST operation not supported on /Promotions/' + req.params.promotionId);
})
.put((req, res, next) => {
	res.write('updating the Promotion: ' + req.params.promotionId + '\n');
	res.end('Will update the Promotion: ' + req.body.name + ' with details: ' + req.body.description);
})
.delete((req, res, next) => {
	res.end('Deleting the Promotion: ' + req.params.promotionId + ' !!');
});

module.exports = promotionsRouter;
