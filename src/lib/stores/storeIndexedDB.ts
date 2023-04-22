import { writable } from 'svelte/store';

// Définir un magasin pour les véhicules
export const vehicleStore = writable<any[]>([]);

// Définir un magasin pour les entités
export const entityStore = writable<any[]>([]);

// Définir un magasin pour les chaufferus
export const driverStore = writable<any[]>([]);

const DB_NAME = 'mydb';
const DB_VERSION = 1;
const VEHICLE_STORE = 'vehicles';
const ENTITY_STORE = 'entities';
const DRIVER_STORE = 'drivers';

let db: IDBDatabase | null = null;

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
		getItems(ENTITY_STORE).then((vehicles) => {
			entityStore.set(vehicles);
		});
		getItems(VEHICLE_STORE).then((vehicles) => {
			vehicleStore.set(vehicles);
		});
		getItems(DRIVER_STORE).then((vehicles) => {
			driverStore.set(vehicles);
		});
	};
	request.onupgradeneeded = (event) => {
		const target: any = event?.target;

		console.log("Tentative de création des magasins d'objets");
		db = target.result;
		db?.createObjectStore(VEHICLE_STORE, { keyPath: 'id', autoIncrement: false });
		db?.createObjectStore(ENTITY_STORE, { keyPath: 'id', autoIncrement: false });
		db?.createObjectStore(DRIVER_STORE, { keyPath: 'id', autoIncrement: false });
	};
}

// Ajouter un véhicule dans le magasin d'objets
export function addVehicle(data: any) {
	// Local storage et update entity store
	const dboEntityStore = getObjectStore(ENTITY_STORE);
	if (data.entite) {
		dboEntityStore?.put(data.entite);
	}
	getItems(ENTITY_STORE).then((entities) => {
		entityStore.set(entities);
	});

	console.log("Tentative de mise à jour du local storage'");
	console.log(data);

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

// update vehicle store

// update driver store

// Ajouter plusieurs véhicules dans le magasin d'objets
export function addVehicles(vehicles: any[]) {
	console.log("Tentative de mise à jour du local storage'");

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
	console.log(items);
	// Local storage
	let dboEntityStore = getObjectStore(ENTITY_STORE);
	let dboVehicletore = getObjectStore(VEHICLE_STORE);
	let dboDriverStore = getObjectStore(DRIVER_STORE);

	// update the local storage
	console.log(items);
	for (let item of items) {
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

	// update entity store
	getItems(ENTITY_STORE).then((entities) => {
		entityStore.set(entities);
	});

	// update vehicle store
	getItems(VEHICLE_STORE).then((vehicles) => {
		vehicleStore.set(vehicles);
	});

	// update driver store
	getItems(DRIVER_STORE).then((drivers) => {
		driverStore.set(drivers);
	});
}

function getObjectStore(storeNames = VEHICLE_STORE || ENTITY_STORE || DRIVER_STORE) {
	console.log("Tentative d'ouverture d'une transaction pour le magasin de données " + storeNames);

	let transaction = db?.transaction([storeNames], 'readwrite');
	let objectStore = transaction?.objectStore(storeNames);
	console.log('OK !');
	return objectStore;
}

// Récupérer tous les véhicules du magasin d'objets
function getItems(storeNames = VEHICLE_STORE || ENTITY_STORE || DRIVER_STORE): Promise<any[]> {
	return new Promise((resolve, reject) => {
		let data: any[] = [];
		let transaction = db?.transaction([storeNames], 'readonly');
		let objectStore = transaction?.objectStore(storeNames);
		let request = objectStore?.openCursor();

		request?.addEventListener('success', (event: any) => {
			let cursor = event.target.result;
			if (cursor) {
				data.push(cursor.value);
				cursor.continue();
			} else {
				resolve(data);
			}
		});

		request?.addEventListener('error', (event: any) => {
			reject(event.target.error);
		});
	});
}

// Ouvrir la base de données au démarrage de l'application
openDatabase();

// Exporter le magasin de véhicules
export default vehicleStore;
