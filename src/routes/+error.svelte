<script>
	import { page } from '$app/stores';
</script>

<div style="margin:auto;width: 100%;">
	<div id="background" />
	<div class="top">
		<h1>{$page.status}</h1>
		<h3>{$page.error.message}</h3>
	</div>
	<div class="container">
		<div class="ghost-copy">
			<div class="one" />
			<div class="two" />
			<div class="three" />
			<div class="four" />
		</div>
		<div class="ghost">
			<div class="face">
				<div class="eye" />
				<div class="eye-right" />
				<div class="mouth" />
			</div>
		</div>
		<div class="shadow" />
	</div>
	<div class="bottom">
		<p>
			Boo, looks like a ghost stole this page! <br />
			Boo, il semblerait qu'un fantôme a volé cette page !
		</p>
		<div class="buttons">
			<button class="btn btn-primary">Back</button>
			<button class="btn btn-secondary">Home</button>
		</div>
	</div>

	<footer />
</div>

<style>
	@import url('https://fonts.googleapis.com/css?family=Abril+Fatface|Lato');
	.top {
		margin-top: 30px;
	}

	@media (max-width: 480px) {
		h1 {
			font-size: 4.5em !important;
		}

		h3 {
			font-size: 1.2em !important;
			margin-top: -10px !important;
			font-weight: 900 !important;
		}
	}

	.container {
		margin: 0 auto;
		position: relative;
		width: 250px;
		height: 250px;
		margin-top: -40px;
	}

	.ghost {
		width: 50%;
		height: 53%;
		left: 25%;
		top: 10%;
		position: absolute;
		border-radius: 50% 50% 0 0;
		background: #ededed;
		border: 1px solid #bfc0c0;
		border-bottom: none;
		animation: float 2s ease-out infinite;
	}

	.ghost-copy {
		width: 50%;
		height: 53%;
		left: 25%;
		top: 10%;
		position: absolute;
		border-radius: 50% 50% 0 0;
		background: #ededed;
		border: 1px solid #bfc0c0;
		border-bottom: none;
		animation: float 2s ease-out infinite;
		z-index: 0;
	}

	.face {
		position: absolute;
		width: 100%;
		height: 60%;
		top: 20%;
	}

	.eye,
	.eye-right {
		position: absolute;
		background: #585959;
		width: 13px;
		height: 13px;
		border-radius: 50%;
		top: 40%;
	}

	.eye {
		left: 25%;
	}

	.eye-right {
		right: 25%;
	}

	.mouth {
		position: absolute;
		top: 50%;
		left: 45%;
		width: 10px;
		height: 10px;
		border: 3px solid;
		border-radius: 50%;
		border-color: transparent #585959 #585959 transparent;
		transform: rotate(45deg);
	}

	.one,
	.two,
	.three,
	.four {
		position: absolute;
		background: #ededed;
		top: 85%;
		width: 25%;
		height: 23%;
		border: 1px solid #bfc0c0;
		z-index: 0;
	}

	.one {
		border-radius: 0 0 100% 30%;
		left: -1px;
	}

	.two {
		left: 23%;
		border-radius: 0 0 50% 50%;
	}

	.three {
		left: 50%;
		border-radius: 0 0 50% 50%;
	}

	.four {
		left: 74.5%;
		border-radius: 0 0 30% 100%;
	}

	.shadow {
		position: absolute;
		width: 30%;
		height: 7%;
		background: #bfc0c0;
		left: 35%;
		top: 80%;
		border-radius: 50%;
		animation: scale 2s infinite;
	}

	@keyframes scale {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.1);
		}
		100% {
			transform: scale(1);
		}
	}
	@keyframes float {
		50% {
			transform: translateY(15px);
		}
	}
	.bottom {
		margin-top: 10px;
	}

	/*text styling*/
	h1 {
		font-family: 'Abril Fatface', serif;
		color: #ededed;
		text-align: center;
		font-size: 9em;
		margin: 0;
		text-shadow: -1px 0 #bfc0c0, 0 1px #bfc0c0, 1px 0 #bfc0c0, 0 -1px #bfc0c0;
	}

	h3 {
		font-family: 'Lato', sans-serif;
		font-size: 2em;
		text-transform: uppercase;
		text-align: center;
		color: #bfc0c0;
		margin-top: -20px;
		font-weight: 900;
	}

	p {
		text-align: center;
		font-family: 'Lato', sans-serif;
		color: #585959;
		font-size: 0.6em;
		margin-top: -20px;
		text-transform: uppercase;
	}

	.buttons {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 10px;
	}

	footer {
		position: absolute;
		bottom: 0;
		right: 0;
		text-align: center;
		font-size: 0.8em;
		text-transform: uppercase;
		padding: 10px;
		color: #ea7996;
		letter-spacing: 3px;
		font-family: 'Lato', sans-serif;
	}
</style>
