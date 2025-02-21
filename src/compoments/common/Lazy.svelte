<script>
	//https://svelte.dev/repl/6d7714fa3cce4909af6c6d187271e0a1?version=3.59.1
	import { fade } from 'svelte/transition';
	import Placeholder from './Placeholder.svelte';
	export let height = 0;
	export let offset = 150;
	export let fadeOption = {
		delay: 0,
		duration: 400
	};
	export let resetHeightDelay = 0;
	export let onload = null;
	export let placeholder = null;
	let className = '';
	export { className as class };

	const rootClass = 'svelte-lazy' + (className ? ' ' + className : '');
	const contentClass = 'svelte-lazy-content';
	let loaded = false;

	let contentDisplay = '';
	$: contentStyle = contentDisplay === 'hide' ? 'display: none' : 'display: flex';

	function load(node) {
		setHeight(node);

		const loadHandler = throttle((e) => {
			const nodeTop = node.getBoundingClientRect().top;
			const expectedTop = getContainerHeight(e) + offset;

			if (nodeTop <= expectedTop) {
				loaded = true;
				resetHeight(node);
				onload && onload(node);
				removeListeners();
			}
		}, 200);

		loadHandler();
		addListeners();

		function addListeners() {
			document.addEventListener('scroll', loadHandler, true);
			window.addEventListener('resize', loadHandler);
		}

		function removeListeners() {
			document.removeEventListener('scroll', loadHandler, true);
			window.removeEventListener('resize', loadHandler);
		}

		return {
			destroy: () => {
				removeListeners();
			}
		};
	}

	function setHeight(node) {
		if (height) {
			node.style.height = typeof height === 'number' ? height + 'px' : height;
		}
	}

	function resetHeight(node) {
		// Add delay for remote resources like images to load
		setTimeout(() => {
			const handled = handleImgContent(node);
			if (!handled) {
				node.style.height = 'auto';
			}
		}, resetHeightDelay);
	}

	function handleImgContent(node) {
		const img = node.querySelector('img');
		if (img) {
			if (!img.complete) {
				contentDisplay = 'hide';

				node.addEventListener(
					'load',
					() => {
						contentDisplay = '';
						node.style.height = 'auto';
					},
					{ capture: true, once: true }
				);

				node.addEventListener(
					'error',
					() => {
						// Keep passed height if there is error
						contentDisplay = '';
					},
					{ capture: true, once: true }
				);

				return true;
			} else if (img.naturalHeight === 0) {
				// Keep passed height if img has zero height
				return true;
			}
		}
	}

	function getContainerHeight(e) {
		if (e && e.target && e.target.getBoundingClientRect) {
			return e.target.getBoundingClientRect().bottom;
		} else {
			return window.innerHeight;
		}
	}

	// From underscore souce code
	function throttle(func, wait, options) {
		let context, args, result;
		let timeout = null;
		let previous = 0;
		if (!options) options = {};
		const later = function () {
			previous = options.leading === false ? 0 : new Date();
			timeout = null;
			result = func.apply(context, args);
			if (!timeout) context = args = null;
		};

		return function (event) {
			const now = new Date();
			if (!previous && options.leading === false) previous = now;
			const remaining = wait - (now - previous);
			context = this;
			args = arguments;
			if (remaining <= 0 || remaining > wait) {
				if (timeout) {
					clearTimeout(timeout);
					timeout = null;
				}
				previous = now;
				result = func.apply(context, args);
				if (!timeout) context = args = null;
			} else if (!timeout && options.trailing !== false) {
				timeout = setTimeout(later, remaining);
			}
			return result;
		};
	}
</script>

<div use:load class={rootClass}>
	{#if loaded}
		<div in:fade={fadeOption || {}} class={contentClass} style={contentStyle}>
			<slot>Lazy load content</slot>
		</div>
		{#if contentDisplay === 'hide'}
			<Placeholder {placeholder} />
		{/if}
	{:else}
		<Placeholder {placeholder} />
	{/if}
</div>
