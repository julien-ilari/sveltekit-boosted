import { writable } from 'svelte/store';

// Définir un magasin pour les véhicules
export const vehicleStore = writable<any[]>([]);

const DB_NAME = 'mydb';
const DB_VERSION = 1;
const VEHICLE_STORE = 'vehicles';

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
		getVehicles().then((vehicles) => {
			vehicleStore.set(vehicles);
		});
	};
	request.onupgradeneeded = (event) => {
		const target: any = event?.target;

		db = target.result;
		console.log("Tentative de création du magasin d'objets de véhicules");
		db?.createObjectStore(VEHICLE_STORE, { keyPath: 'id', autoIncrement: false });
	};
}

// Ajouter un véhicule dans le magasin d'objets
export function addVehicle(data: any) {
	let transaction = db?.transaction([VEHICLE_STORE], 'readwrite');
	let objectStore = transaction?.objectStore(VEHICLE_STORE);
	objectStore?.add(data.vehicle);

	getVehicles().then((vehicles) => {
		vehicleStore.set(vehicles);
	});
}

// Ajouter plusieurs véhicules dans le magasin d'objets
export function addVehicles(vehicles: any[]) {
	let transaction = db?.transaction([VEHICLE_STORE], 'readwrite');
	let objectStore = transaction?.objectStore(VEHICLE_STORE);
	for (let data of vehicles) {
		let d: any = data;
		objectStore?.put(d.vehicle);
	}

	getVehicles().then((vehicles) => {
		vehicleStore.set(vehicles);
	});
}

// Récupérer tous les véhicules du magasin d'objets
function getVehicles(): Promise<any[]> {
	return new Promise((resolve, reject) => {
		let vehicles: any[] = [];
		let transaction = db?.transaction([VEHICLE_STORE], 'readonly');
		let objectStore = transaction?.objectStore(VEHICLE_STORE);
		let request = objectStore?.openCursor();

		request?.addEventListener('success', (event: any) => {
			let cursor = event.target.result;
			if (cursor) {
				vehicles.push(cursor.value);
				cursor.continue();
			} else {
				resolve(vehicles);
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
