/**
 * Tyepe of Langs
 */
export type Langs = {
	fr: string;
	en?: string;
};

/**
 * Type of I18n
 */
export type I18n = {
	key?: string;
	values: Langs;
};

export type Lang = 'fr' | 'en';

const data: Array<I18n> = [
	{ key: 'id', values: { fr: '#id', en: '#id' } },
	{ key: 'to', values: { fr: 'à', en: 'to' } },
	{ key: 'of', values: { fr: 'sur', en: 'of' } },

	{ key: 'datatable.previous', values: { fr: 'précédent', en: 'previous' } },
	{ key: 'datatable.next', values: { fr: 'suivant', en: 'next' } },
	{ key: 'datatable.search', values: { fr: 'rechercher', en: 'search' } },

	{
		key: 'datatable.display',
		values: { fr: 'Affichage des lignes %1 à %2 sur %3' }
	},

	{ key: 'energy.thermal', values: { fr: 'thermique', en: 'thermal' } },
	{ key: 'energy.hybrid', values: { fr: 'hybride', en: 'hybrid' } },
	{ key: 'energy.electrical', values: { fr: 'électrique', en: 'electrical' } },

	// sectionfFlotte
	{ key: 'fleet.vehicle_', values: { fr: 'véhicule', en: 'vehicle' } },
	{ key: 'fleet.vehicle.immat', values: { fr: 'immatriculation', en: 'registration number' } },
	{ key: 'fleet.vehicle.desc', values: { fr: 'description', en: 'description' } },
	{ key: 'fleet.vehicle.motorisation.type', values: { fr: 'type motorisation', en: 'motorysation type' } },
	{ key: 'fleet.vehicle.category', values: { fr: 'catégorie', en: 'category' } },

	{ key: 'fleet.engin_', values: { fr: 'engin', en: 'engin' } },
	{ key: 'fleet.material_', values: { fr: 'matériel', en: 'off-road motor equipment' } },

	{
		key: 'fleet.motor-equipment.thermal',
		values: { fr: 'équipement à moteur thermique', en: 'motor equipment thermal' }
	},
	{
		key: 'fleet.motor-equipment.hybrid',
		values: { fr: 'équipement à moteur hybride', en: 'motor equipment hybride' }
	},
	{
		key: 'fleet.motor-equipment.electrical',
		values: { fr: 'équipement à moteur électrique', en: 'motor equipment electrical' }
	},

	{
		key: 'fleet.vehicle.types.of.motorization',
		values: { fr: 'types de motorisation', en: 'types of motorization' }
	},
	{
		key: 'fleet.road.motor-equipment',
		values: { fr: 'équipement à moteur routier', en: 'road motor equipment' }
	},
	{
		key: 'fleet.off-road.motor-equipment',
		values: { fr: 'équipement à moteur hors route', en: 'off-road motor equipment' }
	},

	{ key: 'document', values: { fr: 'document', en: 'document' } },
	{ key: 'name', values: { fr: 'nom', en: 'name' } },
	{ key: 'position', values: { fr: 'position', en: 'position' } },
	{ key: 'reference', values: { fr: 'référence', en: 'reference' } },
	{ key: 'summary', values: { fr: 'résumé', en: 'summary' } },
	{ key: 'languageCode', values: { fr: 'langue', en: 'language' } },
	{
		key: 'created',
		values: { fr: 'création', en: 'created' }
	},
	{
		key: 'updated',
		values: { fr: 'modification', en: 'updated' }
	},

	{
		key: 'displayed',
		values: { fr: 'visible', en: 'displayed' }
	}
];

/**
 * Traduction français ou anglais en fonction d'une clé i18n
 * @param {*} key clé i18n
 * @param {*} lang langue cible
 * @returns message traduit dans la langue cible pour la clé i18n correspondante
 */
export default (
	key = 'empty',
	translations: Array<I18n> = [],
	upperCaseOneLetter: boolean = true,
	hasplural: boolean = false,
	lang: Lang = 'fr'
): string => {
	let format = undefined;
	let message: string = '#' + key;
	let plural = hasplural ? 's' : '';
	if (translations.length != 0) {
		translations.forEach((item) => {
			if (item.key === key) {
				message = lang === 'fr' ? item.values.fr : item.values.en + plural;
				return;
			}
		});
	}

	data.forEach((item) => {
		if (item.key === key) {
			message = lang === 'fr' ? item.values.fr : item.values.en + plural;
			return;
		}
	});

	return upperCaseOneLetter && !message.includes('#') ? message[0].toUpperCase() + message.substring(1) : message;
};
