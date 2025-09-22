// Task 1

function createContactModal() {
	// Find the existing contact form and replace its content
	const existingForm = document.querySelector(".contact-form__form");

	if (existingForm) {
		// Clear existing content first
		existingForm.innerHTML = "";

		// Add new content to the same container
		existingForm.innerHTML = `
			<div class="contact-modal-content">
				<h2>Hello Conversion!</h2>
				<p>Click on the button below to contact us</p>
			</div>
			<button class="modal-contact-btn" onclick="openContactForm()">Click here</button>
			
			<!-- 3-Step Contact Form -->
			<div class="contact-form-overlay" id="contactFormOverlay" style="display: none;">
				<div class="contact-form-modal">
					<div class="form-header">
						<h3>Contact Us</h3>
						<button class="close-btn" onclick="closeContactForm()">&times;</button>
					</div>
					
					<!-- Progress Bar -->
					<div class="progress-bar">
						<div class="progress-step active" data-step="1">
							<div class="step-icon">👤</div>
							<div class="step-label">User Information</div>
						</div>
						<div class="progress-line"></div>
						<div class="progress-step" data-step="2">
							<div class="step-icon">💬</div>
							<div class="step-label">Inquiry</div>
						</div>
						<div class="progress-line"></div>
						<div class="progress-step" data-step="3">
							<div class="step-icon">✅</div>
							<div class="step-label">Complete</div>
						</div>
					</div>
					
					<!-- Step 1: Personal Info -->
					<div class="form-step active" id="step1">
						<h4>Personal Information</h4>
						<form id="contactForm">
							<div class="form-group">
								<label for="firstName">First Name *</label>
								<input type="text" id="firstName" name="firstName" required>
							</div>
							<div class="form-group">
								<label for="lastName">Last Name *</label>
								<input type="text" id="lastName" name="lastName" required>
							</div>
							<div class="form-group">
								<label for="email">Email *</label>
								<input type="email" id="email" name="email" required>
							</div>
							<button type="button" class="form-btn next-btn" onclick="nextStep()">Next</button>
						</form>
					</div>
					
					<!-- Step 2: Message & Submit -->
					<div class="form-step" id="step2">
						<h4>How can we help you?</h4>
						<div class="form-group">
							<label for="message">Message</label>
							<textarea id="message" name="message" rows="4"></textarea>
						</div>
						<div class="form-group">
							<label class="checkbox-label" for="newsletter">
								<input type="checkbox" id="newsletter" name="newsletter">
								Subscribe to our newsletter
							</label>
						</div>
						<div class="form-buttons">
							<button type="button" class="form-btn prev-btn" onclick="prevStep()">Previous</button>
							<button type="button" class="form-btn submit-btn" onclick="submitForm()">Submit</button>
						</div>
					</div>
					
					<!-- Step 3: Thank You -->
					<div class="form-step" id="step3">
						<h4>Thank You!</h4>
						<p>Your message has been sent successfully. We'll get back to you soon.</p>
						<button type="button" class="form-btn" onclick="closeContactForm()">Close</button>
					</div>
				</div>
			</div>
		`;

		console.log("Contact modal created");

		// Set up checkbox handling after modal is created
		setupCheckboxHandling();
	} else {
		console.log("Contact form not found");
	}
}

// Form state and functionality
let currentStep = 1;

function openContactForm() {
	document.getElementById("contactFormOverlay").style.display = "flex";
}

function closeContactForm() {
	document.getElementById("contactFormOverlay").style.display = "none";
	resetForm();
}

function nextStep() {
	if (validateStep(currentStep)) {
		showStep(currentStep + 1);
	}
}

function prevStep() {
	showStep(currentStep - 1);
}

function showStep(step) {
	// Hide all steps
	document
		.querySelectorAll(".form-step")
		.forEach((s) => s.classList.remove("active"));
	// Show current step
	document.getElementById(`step${step}`).classList.add("active");

	// Update progress bar
	document.querySelectorAll(".progress-step").forEach((s, i) => {
		s.classList.toggle("completed", i < step);
		s.classList.toggle("active", i === step - 1);
	});

	// Update progress lines
	document.querySelectorAll(".progress-line").forEach((line, i) => {
		if (i < step - 1) {
			line.classList.add("completed");
		} else {
			line.classList.remove("completed");
		}
	});

	currentStep = step;
}

function validateStep(step) {
	if (step === 1) {
		const firstName = document.getElementById("firstName").value.trim();
		const lastName = document.getElementById("lastName").value.trim();
		const email = document.getElementById("email").value.trim();

		// check if fields have content
		if (!firstName || !lastName || !email) {
			alert("Please fill in all required fields.");
			return false;
		}

		// validate email format
		if (!isValidEmail(email)) {
			alert("Please enter a valid email address.");
			return false;
		}
	}
	return true;
}

// basic email validation
function isValidEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

function submitForm() {
	showStep(3); // go to thank you step
}

function resetForm() {
	showStep(1); // back to first step
	document.getElementById("contactForm").reset();
}

// Checkbox handling
function setupCheckboxHandling() {
	document.addEventListener("click", function (e) {
		// Only handle label clicks, not direct checkbox clicks
		if (e.target.classList.contains("checkbox-label")) {
			e.preventDefault(); // Prevent default label behavior
			e.stopPropagation(); // Stop event bubbling

			const checkbox = document.getElementById("newsletter");
			if (checkbox) {
				// Simple toggle
				checkbox.checked = !checkbox.checked;

				// Force browser to recognize the change
				checkbox.setAttribute("checked", checkbox.checked ? "checked" : "");

				// Trigger change event
				checkbox.dispatchEvent(new Event("change", { bubbles: true }));
			}
		}
	});
}

// Run immediately
createContactModal();
