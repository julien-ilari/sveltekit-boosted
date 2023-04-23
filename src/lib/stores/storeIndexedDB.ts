import { writable, type Writable } from 'svelte/store';

// Définir un magasin pour les véhicules
const vehicleStore: Writable<[]> = writable([]);
vehicleStore.subscribe((v) => {
	console.log(JSON.stringify(v));
});

// Définir un magasin pour les entités
const entityStore: Writable<[]> = writable([]);

// Définir un magasin pour les chaufferus
const driverStore: Writable<[]> = writable([]);

const DB_NAME = 'mydb';
const DB_VERSION = 1;
const VEHICLE_STORE = 'vehicles';
const ENTITY_STORE = 'entities';
const DRIVER_STORE = 'drivers';

let db: any = null;

// Ouvrir la base de données
function openDatabase() {
	let request = indexedDB.open(DB_NAME, DB_VERSION);
	request.onerror = (event) => {
		const target: any = event?.target;
		console.error("Erreur lors de l'ouverture de la base de données", target.errorCode);
	};

	request.onsuccess = (event) => {
		const target: any = event?.target;

		db = target.result;

		console.log('Base de données ouverte avec succès');
		getItems(ENTITY_STORE).then((entities) => {
			entityStore.set(entities);
		});
		getItems(VEHICLE_STORE).then((vehicles) => {
			vehicleStore.set(vehicles);
		});
		getItems(DRIVER_STORE).then((drivers) => {
			driverStore.set(drivers);
		});
	};
	request.onupgradeneeded = (event) => {
		const target: any = event?.target;
		console.log("Tentative de création des magasins d'objets");
		db = target.result;
		if (db) {
			db.createObjectStore(VEHICLE_STORE, { keyPath: 'id', autoIncrement: false });
			console.log(' |=> création de VEHICLE_STORE avec succès');
			db.createObjectStore(ENTITY_STORE, { keyPath: 'id', autoIncrement: false });
			console.log(' |=> création de ENTITY_STORE avec succès');
			db.createObjectStore(DRIVER_STORE, { keyPath: 'id', autoIncrement: false });
			console.log(' |=> création de DRIVER_STORE avec succès');
		}
	};
}

// Ajouter un véhicule dans le magasin d'objets
export function addVehicle(data: any) {
	console.log("Tentative de mise à jour du local storage'");

	const dboEntityStore = getObjectStore(ENTITY_STORE);
	if (data.entite) {
		dboEntityStore?.put(data.entite);
	}
	getItems(ENTITY_STORE).then((entities) => {
		entityStore.set(entities);
	});

	const dboVehicletore = getObjectStore(VEHICLE_STORE);
	if (data.vehicle) {
		dboVehicletore?.put(data.vehicle);
	}
	getItems(VEHICLE_STORE).then((vehicles) => {
		vehicleStore.set(vehicles);
	});

	const dboDriverStore = getObjectStore(DRIVER_STORE);
	if (data.chauffeur) {
		dboDriverStore?.put(data.chauffeur);
	}
	getItems(DRIVER_STORE).then((drivers) => {
		driverStore.set(drivers);
	});
}

// Ajouter plusieurs véhicules dans le magasin d'objets
export function addVehicles(vehicles: any[]) {
	console.log("Tentative de mise à jour du local storage'");
	if (!db) {
		return;
	}

	let transaction = db?.transaction([VEHICLE_STORE], 'readwrite');
	let objectStore = transaction?.objectStore(VEHICLE_STORE);
	for (let data of vehicles) {
		let d: any = data;
		objectStore?.put(d.vehicle);
	}

	getItems(VEHICLE_STORE).then((vehicles) => {
		vehicleStore.set(vehicles);
	});
}

// Ajouter plusieurs véhicules dans le magasin d'objets
export function addEntitiesVehiclesDrivers(items: any[]) {
	console.log('Tentative de mise à jour du local storage, items :');
	// Local storage
	let dboEntityStore = getObjectStore(ENTITY_STORE);
	let dboVehicletore = getObjectStore(VEHICLE_STORE);
	let dboDriverStore = getObjectStore(DRIVER_STORE);

	// update the local storage
	for (let item of items) {
		if (item) {
			if (item.entite && item.entite !== null) {
				dboEntityStore?.put(item.entite);
			}
			if (item.vehicle && item.vehicle !== null) {
				dboVehicletore?.put(item.vehicle);
			}
			if (item.chauffeur && item.chauffeur !== null) {
				dboDriverStore?.put(item.chauffeur);
			}
		}
	}

	// update entity store
	getItems(ENTITY_STORE)
		.then((entities) => {
			entityStore.set(entities);
		})
		.catch((error) => {
			console.error(error);
		});

	// update vehicle store
	getItems(VEHICLE_STORE)
		.then((vehicles) => {
			vehicleStore.set(vehicles);
		})
		.catch((error) => {
			console.error(error);
		});

	// update driver store
	getItems(DRIVER_STORE)
		.then((drivers) => {
			driverStore.set(drivers);
		})
		.catch((error) => {
			console.error(error);
		});
}

function getObjectStore(storeNames = VEHICLE_STORE || ENTITY_STORE || DRIVER_STORE) {
	console.log("Tentative d'ouverture d'une transaction pour le magasin de données " + storeNames);

	let transaction = db?.transaction([storeNames], 'readwrite');
	let objectStore = transaction?.objectStore(storeNames);

	return objectStore;
}

// Récupérer tous les véhicules du magasin d'objets
function getItems(storeNames: string = VEHICLE_STORE || ENTITY_STORE || DRIVER_STORE): Promise<[]> {
	return new Promise((resolve, reject) => {
		if (!db) {
			reject(new Error('Database not initialized'));
			return;
		}
		const objectStore = db.transaction(storeNames.split(','), 'readonly').objectStore(storeNames);
		const request = objectStore.getAll();

		request.onerror = (event: any) => {
			console.error('Erreur lors de la récupération des données', event.target.errorCode);
			reject(event.target.errorCode);
		};

		request.onsuccess = (event: any) => {
			console.log('Données récupérées avec succès');
			resolve(event.target.result);
		};
	});
}

// Ouvrir la base de données au démarrage de l'application
openDatabase();

export { vehicleStore, entityStore, driverStore };
