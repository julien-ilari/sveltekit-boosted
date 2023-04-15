<script lang="ts">
	import ElementArticle from '@/compoments/common/card/SimpleCard.svelte';
	import ElementAside from '@/compoments/common/ElementAside.svelte';
	import ElementField from '@/compoments/common/forms/Input.svelte';
	import OptionTag from '@/compoments/utilities/ElementFilterTag.svelte';
	import TitleIcon from '@/compoments/layout/TitleHeader.svelte';
	import translate, { type I18n } from '$lib/utils/translate';

	const translations: Array<I18n> = [
		{
			key: 'motorizated.equipments.title',
			values: { fr: 'équipement avec motorisation', en: 'document' }
		},
		{
			key: 'motorizated.equipments.aria',
			values: { fr: 'filtrer équipements motorisés', en: 'motorizated equipments filter' }
		},
		{
			key: 'filter.motorizated.equipments.title',
			values: { fr: 'Filtrer sur les équipements motorisés (véhicules/engins)', en: ' types of motorization' }
		},
		{
			key: 'filter.motorizated.equipments.aside',
			values: {
				fr: 'Pour une gestion efficace du filtre, vos fiches véhicules/engins doivent être renseignées convenablement.',
				en: '##none'
			}
		},
		{
			key: 'filter.types.motorization.aria',
			values: { fr: 'filtrer sur les types de motorisation', en: ' motorization types filter' }
		}
	];

	const l = (key: string, upper = false, hasplurial = false) => {
		return translate(key, translations, upper, hasplurial);
	};

	let filtreFabricator = {
		motorisation: [],
		vehicles: [],
		entities: [],
		periode: { debut: '', fin: '' }
	};
</script>

<header aria-label="main header">
	<o-title-bar>
		<h1>Gestion du filtre globale</h1>
	</o-title-bar>
</header>

<div class="m-1 p-2 row">
	<aside>
		<p>
			Il facilite la recherche d'informations cohérentes et permet de gagner du temps en appliquant les mêmes filtres
			sur toutes les pages.
		</p>
		<p>
			L'utilisation du filtre transversal est un moyen efficace de trouver rapidement les véhicules qui correspondent à
			vos critères de recherche, sans avoir à naviguer sur plusieurs pages. <br />
		</p>
	</aside>

	<article id="transferse-filter-actif">
		<TitleIcon title="transverse filters" icomoon="filter">
			<ElementAside>description à compléter</ElementAside>
		</TitleIcon>
		<!-- Contenu de la section "filtre actif" -->
	</article>

	<article id="transferse-filter-fabricator" aria-label={l('motorizated.equipments.aria')}>
		<TitleIcon title="Transverse filter - Fabricator" icomoon="filtres-clusters">
			<ElementAside>description à compléter</ElementAside>
		</TitleIcon>

		<ElementField label="Nom du filtre" value="<<type-motorization>> <<entity>>" />

		<ElementArticle title={l('filter.motorizated.equipments.title')}>
			<ElementAside>
				{l('filter.motorizated.equipments.aside')}
			</ElementAside>

			<section class="mb-2" aria-label={l('filter.types.motorization.aria')}>
				<header><h4>{l('fleet.vehicle.types.of.motorization', true)}</h4></header>
				<div class="d-flex gap-2">
					<OptionTag
						icomoon="thermal-car"
						ariaLabel={l('fleet.motor-equipment.thermal')}
						label={l('energy.thermal', true)}
					/>
					<OptionTag
						icomoon="hybrid-car"
						ariaLabel={l('fleet.motor-equipment.hybrid')}
						label={l('energy.hybrid', true)}
					/>
					<OptionTag
						icomoon="electrical-car"
						ariaLabel={l('fleet.motor-equipment.electrical')}
						label={l('energy.electrical', true)}
					/>
				</div>
			</section>

			<hr />

			<section class="mb-2" aria-label="categoies filter">
				<header>
					<h4><span>{l('categories', true)}</span></h4>
				</header>
				<div class="d-flex gap-2">
					<OptionTag
						icomoon="Construction_19371"
						ariaLabel={l('fleet.off-road.motor-equipment')}
						label={l('fleet.engin_', true, true)}
					/>
					<OptionTag
						icomoon="Car"
						ariaLabel={l('fleet.road.motor-equipment')}
						label={l('fleet.vehicle_', true, true)}
					/>
				</div>
			</section>
		</ElementArticle>
		<button title="Annuler saisie" class="btn btn-secondary">Annuler</button>
		<button title="Enregistrer saisie" class="btn btn-primary">Enregistrer</button>
	</article>
</div>

<style>
	h4 {
		display: inline-block;
		margin: 0;
	}
	h4::after {
		display: block;
		width: 2rem;
		height: 0.375rem;
		content: '';
		background: #ff7900;
	}
</style>
