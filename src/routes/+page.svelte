
<o-title-bar class="title-bar">
	<h1 class="display-4">Page d'accueil</h1>
</o-title-bar>

<div class="container-xxl pt-4">
	<div class="row">
		<div class="col-sm-12 col-lg-5 offset-lg-3">
			<form class="needs-validation mb-5" novalidate>
				<div class="row">
					<div class="col-12">
						<p class="fw-bold mb-4">
							<span class="text-primary me-1">*</span>indicates required
						</p>
					</div>
					<div class="col-sm-4 col-md-6 mb-3">
						<label for="selectTitle" id="selectTitleLabel" class="form-label is-required">Title</label>
						<select
							class="form-select"
							id="selectTitle"
							aria-labelledby="selectTitleLabel selectTitleFeedback"
							autocomplete="sex"
							required>
							<option selected disabled value="" aria-hidden="true">Select a title</option>
							<option value="1">Miss</option>
							<option value="2">Mr.</option>
							<option value="3">Mrs.</option>
							<option value="3">Ms.</option>
							<option value="4">Prefer not to say</option>
						</select>
						<div class="valid-feedback">Looks good!</div>
						<div id="selectTitleFeedback" class="invalid-feedback">
							Please select a valid title.
						</div>
					</div>
					<div class="col-12">
						<o-input class="mb-3" label="sfdsf" value="test" required="true" />

						<div class="mb-3">
							<label for="message" id="messageLabel" class="form-label is-required">Message</label
							>
							<button
								type="button"
								class="form-helper"
								data-bs-toggle="tooltip"
								data-bs-placement="top"
								data-bs-title="Help for text area"
							>
								<span class="visually-hidden">Helper for text area</span>
							</button>
							<textarea
								class="form-control"
								id="message"
								rows="5"
								placeholder="Describe your business and your motivation in becoming an Orange reseller"
								aria-labelledby="messageLabel messageFeedback"
								required
							/>
							<div class="valid-feedback">Looks good!</div>
							<div id="messageFeedback" class="invalid-feedback">
								Please enter a valid message.
							</div>
						</div>
						<button type="submit" class="btn btn-primary mt-2">Submit</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>