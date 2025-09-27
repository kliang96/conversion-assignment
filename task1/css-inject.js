// Task 1 styles

(function () {
	"use strict";

	// Remove existing styles if they exist
	const existingStyle = document.querySelector("#contact-overlay-styles");
	if (existingStyle) {
		existingStyle.remove();
	}

	// Create new style element
	const style = document.createElement("style");
	style.id = "contact-overlay-styles";

	// Add all CSS content
	style.textContent = `
		/* Full-screen dark overlay for modal background */
		html::before {
			content: '';
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.6);
			z-index: 10000;
			pointer-events: none;
		}

		/* Remove existing ::after pseudo-element from contact form */
		.contact-form__form::after {
			content: none;
			display: none;
		}

		.contact-form__inner {
			align-items: start;
		}
			
		/* Main modal content container */
		.kam-world {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin: 0 auto;
			z-index: 10001;
		}

		/* Modal content styling */
		.contact-modal-content {
			background: white;
			animation: slideInUp 0.6s ease-out;
		}

		.contact-modal-content h2 {
			color: #333;
			font-size: 3rem;
			font-weight: 700;
			text-align: left;
		}

		.contact-modal-content p {
			color: #666;
			font-size: 1rem;
			line-height: 1.5;
			margin-bottom: 1.5rem;
			text-align: left;
		}

		/* Contact button styling - all states */
		.modal-contact-btn {
			padding: 0.75rem 1.5rem;
			background: #508232;
			color: white;
			font-weight: 600;
			transition: all 0.3s ease;
			align-self: flex-end;
			margin-top: 1rem;
			border: none;
			border-radius: 4px;
			cursor: pointer;
		}

		/* Button hover state */
		.modal-contact-btn:hover {
			background: #416E2D;
			transform: translateY(1px);
		}

		/* Button focus state for accessibility */
		.modal-contact-btn:focus {
			outline: 2px solid #007bff;
			outline-offset: 2px;
		}

		/* Button disabled state */
		.modal-contact-btn:disabled {
			background: #EBE1E1;
			color: #666;
			transform: none;
			box-shadow: none;
		}

		/* Button pressed/active state */
		.modal-contact-btn:active {
			background: #375F23;
			transform: translateY(0);
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		}


		/* Animation keyframes */
		@keyframes fadeIn {
			from {
				opacity: 0;
			}
			to {
				opacity: 1;
			}
		}

		@keyframes slideInUp {
			from {
				opacity: 0;
				transform: translateY(30px);
			}
			to {
				opacity: 1;
				transform: translateY(0);
			}
		}

		/* Responsive Design */
		@media (max-width: 768px) {
			.contact-modal {
				margin: 1rem;
				padding: 1.5rem;
			}
			
			.contact-modal h2 {
				font-size: 1.8rem;
			}
		}

		@media (max-width: 375px) {
			.contact-modal {
				margin: 0.5rem;
				padding: 1rem;
			}
			
			.contact-modal h2 {
				font-size: 1.6rem;
			}
		}

		/* Multi-step contact form overlay */
		.contact-form-overlay {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.8);
			display: flex;
			align-items: center;
			justify-content: center;
			z-index: 10002;
		}

		/* Contact form modal container */
		.contact-form-modal {
			background: white;
			border-radius: 8px;
			padding: 2rem;
			max-width: 500px;
			width: 90%;
			max-height: 80vh;
			overflow-y: auto;
		}

		/* Form header with close button */
		.form-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 1.5rem;
		}

		.form-header h3 {
			margin: 0;
			color: #333;
		}

		.close-btn {
			background: none;
			border: none;
			font-size: 1.5rem;
			cursor: pointer;
			color: #666;
		}

		/* Progress bar for multi-step form */
		.progress-bar {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 2rem;
		}

		.progress-line {
			flex: 1;
			height: 5px;
			background: #808080;
			margin: -1.5rem -3.5rem 0;
			z-index: 1;
		}

		.progress-line.completed {
			background: #508232;
		}

		.progress-step {
			display: flex;
			flex-direction: column;
			align-items: center;
		}s

		.step-icon {
			font-size: 1.5rem;
			margin-bottom: 0.5rem;
			/* Apply fixed dimensions to ensure perfect circles */
			width: 3rem;
			height: 3rem;
			display: flex;
			align-items: center;
			justify-content: center;
			border: 3px solid #808080;
			border-radius: 50%;
			z-index: 2;
			background: white;
		}

		.step-label {
			font-size: 0.875rem;
			color: #508232;
			font-weight: normal;
		}

		.progress-step.active .step-label {
			font-weight: bold;
		}

		.progress-step.completed{
			color: white;
		}

		.progress-step.completed .step-icon,
		.progress-step.active .step-icon {
			opacity: 1;
			border: 3px solid transparent;
			background: #508232;
			color: white;
		}

		/* Form step visibility */
		.form-step {
			display: none;
		}

		.form-step.active {
			display: block;
		}

		.form-step h4 {
			margin-bottom: 1.5rem;
			color: #333;
		}

		/* Form input styling */
		.form-group {
			margin-bottom: 1rem;
		}

		.form-group label {
			display: block;
			margin-bottom: 0.5rem;
			color: #333;
			font-weight: 500;
		}

		.form-group input,
		.form-group textarea {
			width: 100%;
			padding: 0.75rem;
			border: 1px solid #ddd;
			border-radius: 4px;
			font-size: 1rem;
		}

		/* Input focus states */
		.form-group input:focus,
		.form-group textarea:focus {
			outline: none;
			border-color: #508232;
		}

		/* Checkbox styling */
		.checkbox-label {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			cursor: pointer;
		}

		.checkbox-label input[type="checkbox"] {
			width: auto;
			cursor: pointer;
			-webkit-appearance: checkbox;
			appearance: checkbox;
			position: relative;
			z-index: 1;
		}

		/* Form navigation buttons */
		.form-buttons {
			display: flex;
			gap: 1rem;
			justify-content: space-between;
			margin-top: 2rem;
		}

		.form-btn {
			padding: 0.75rem 1.5rem;
			border: none;
			border-radius: 4px;
			font-size: 1rem;
			font-weight: 600;
			cursor: pointer;
		}

		/* Primary action buttons */
		.next-btn,
		.submit-btn {
			background: #508232;
			color: white;
		}

		.next-btn:hover,
		.submit-btn:hover {
			background: #416E2D;
		}

		/* Secondary action button */
		.prev-btn {
			background: #f5f5f5;
			color: #333;
		}

		.prev-btn:hover {
			background: #e5e5e5;
		}
	`;

	// Inject styles into page head
	document.head.appendChild(style);
})();
