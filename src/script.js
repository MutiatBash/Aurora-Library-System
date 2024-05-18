document.addEventListener("DOMContentLoaded", () => {
	const loginForm = document.getElementById("loginForm");
	const signupForm = document.getElementById("signupForm");

	if (loginForm) {
		handleFormSubmission(loginForm);
	}

	if (signupForm) {
		handleFormSubmission(signupForm);
	}
});

function handleFormSubmission(form) {
	const submitButton = form.querySelector("button");
	const buttonText = submitButton.querySelector(".button-text");
	const buttonSpinner = submitButton.querySelector(".button-spinner");

	form.addEventListener("submit", (event) => {
		event.preventDefault();
		showButtonSpinner(submitButton, buttonText, buttonSpinner);
		setTimeout(() => {
			hideButtonSpinner(submitButton, buttonText, buttonSpinner);
			form.submit();
		}, 1000);
	});
}

function showButtonSpinner(button, textElement, spinnerElement) {
	textElement.style.display = "none";
	spinnerElement.style.display = "inline-block";
	button.disabled = true;
}

function hideButtonSpinner(button, textElement, spinnerElement) {
	textElement.style.display = "inline-block";
	spinnerElement.style.display = "none";
	button.disabled = false;
}
