const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const app = express();
const port = 3000;
const url = 'mongodb://localhost:27017';
const dbName = 'mydb';
const collectionName = 'products';

// Middleware pour parser le corps des requêtes en JSON
app.use(bodyParser.json());

// Middleware pour gérer les erreurs
app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

// Connexion à la base de données
MongoClient.connect(url, function (err, client) {
	if (err) throw err;

	const db = client.db(dbName);
	const collection = db.collection(collectionName);

	// Routes pour le CRUD
	app.get('/products', function (req, res, next) {
		collection.find({}).toArray(function (err, docs) {
			if (err) return next(err);
			res.json(docs);
		});
	});

	app.get('/products/:id', function (req, res, next) {
		const id = req.params.id;
		collection.findOne({ _id: ObjectID(id) }, function (err, doc) {
			if (err) return next(err);
			if (!doc) return res.sendStatus(404);
			res.json(doc);
		});
	});

	app.post('/products', function (req, res, next) {
		const product = req.body;
		collection.insertOne(product, function (err, result) {
			if (err) return next(err);
			res.json(result.ops[0]);
		});
	});

	app.put('/products/:id', function (req, res, next) {
		const id = req.params.id;
		const product = req.body;
		collection.replaceOne({ _id: ObjectID(id) }, product, function (err, result) {
			if (err) return next(err);
			if (result.modifiedCount === 0) return res.sendStatus(404);
			res.json(product);
		});
	});

	app.delete('/products/:id', function (req, res, next) {
		const id = req.params.id;
		collection.deleteOne({ _id: ObjectID(id) }, function (err, result) {
			if (err) return next(err);
			if (result.deletedCount === 0) return res.sendStatus(404);
			res.sendStatus(204);
		});
	});

	// Démarrage du serveur
	app.listen(port, function () {
		console.log(`Server listening on port ${port}`);
	});
});
