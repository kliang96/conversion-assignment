// Task 2 styles

(function () {
	"use strict";

	// Remove existing styles if they exist
	const existingStyle = document.querySelector("#footer-drawer-styles");
	if (existingStyle) {
		existingStyle.remove();
	}

	// Create new style element
	const style = document.createElement("style");
	style.id = "footer-drawer-styles";

	// Add all CSS content
	style.textContent = `
		/* Import Swiper CSS library */
		@import url('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
		
		/* Swiper carousel container */
		.swiper {
			width: 100%;
			height: 100%;
			overflow: visible;
		}
		
		/* Swiper slides wrapper */
		.swiper-wrapper {
			display: flex;
			align-items: stretch;
		}
		
		/* Individual swiper slide */
		.swiper-slide {
			padding: 1rem;
			flex-shrink: 0;
		}
		
		/* Pokemon card content container */
		.swiper-slide-content {
			background: white;
			border-radius: 8px;
			padding: 1.5rem;
			box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
			max-width: 300px;
			text-align: center;
		}
		
		/* Pokemon image styling */
		.pokemon-image {
			width: 120px;
			height: 120px;
			object-fit: contain;
			margin: 0 auto 1rem;
		}
		
		/* Pokemon name styling */
		.pokemon-name {
			font-size: 1.25rem;
			font-weight: 600;
			color: #333;
			margin-bottom: 0.5rem;
			text-transform: capitalize;
		}
		
		/* Pokemon description text */
		.pokemon-description {
			font-size: 0.875rem;
			color: #666;
			line-height: 1.4;
			margin-bottom: 1rem;
		}
		
		/* Pokemon type badges container */
		.pokemon-types {
			display: flex;
			gap: 0.5rem;
			justify-content: center;
			margin-bottom: 1rem;
			flex-wrap: wrap;
		}
		
		/* Pokemon type badge styling */
		.type-badge {
			padding: 0.25rem 0.5rem;
			border-radius: 12px;
			font-size: 0.75rem;
			font-weight: 500;
			text-transform: uppercase;
			color: white;
		}
		
		/* Pokemon type color schemes */
		.type-normal { background: #A8A878; }
		.type-fire { background: #F08030; }
		.type-water { background: #6890F0; }
		.type-electric { background: #F8D030; }
		.type-grass { background: #78C850; }
		.type-ice { background: #98D8D8; }
		.type-fighting { background: #C03028; }
		.type-poison { background: #A040A0; }
		.type-ground { background: #E0C068; } 
		.type-flying { background: #A890F0; }
		.type-psychic { background: #F85888; }
		.type-bug { background: #A8B820; }
		.type-rock { background: #B8A038; }
		.type-ghost { background: #705898; }
		.type-dragon { background: #7038F8; }
		.type-dark { background: #705848; }
		.type-steel { background: #B8B8D0; }
		.type-fairy { background: #EE99AC; }
		
		/* Pokemon card action button */
		.pokemon-button {
			background: #508232;
			color: white;
			border: none;
			padding: 0.5rem 1rem;
			border-radius: 4px;
			font-size: 0.875rem;
			font-weight: 500;
			cursor: pointer;
		}
		
		.pokemon-button:hover {
			background: #416E2D;
		}
		
		/* Pokemon tooltip container */
		.pokemon-tooltip {
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 0.25rem;
			border-radius: 0.25rem;
			transition: background-color 0.2s ease;
		}
		
		.pokemon-tooltip:hover {
			background-color: rgba(80, 130, 50, 0.1);
		}
		
		/* Tooltip popup content */
		.tooltip-content {
			visibility: hidden;
			width: 11.25rem; /* 180px */
			background-color: #333;
			color: white;
			text-align: center;
			border-radius: 0.5rem;
			padding: 0.75rem;
			position: absolute;
			z-index: 10002;
			bottom: calc(100%); 
			opacity: 0;
			transition: opacity 0.3s ease;
			font-size: 0.875rem;
			box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.2);
		}
		
		/* Pokemon name and info button container */
		.pokemon-name-container {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 0.75rem;
		}

		/* Info button styling */
		.info-button {
			width: 24px;
			height: 24px;
			border-radius: 50%;
			border: 1px solid #508232;
			background: transparent;
			color: #508232;
			font-size: 0.875rem;
			font-weight: bold;
			cursor: pointer;
			display: flex;
			align-items: center;
			justify-content: center;
			transition: all 0.2s ease;
		}

		/* Info button hover state */
		.pokemon-tooltip:hover .info-button {
			background-color: #508232;
			color: white;
		}

		/* Tooltip content hover state */
		.pokemon-tooltip:hover .tooltip-content {
			visibility: visible;
			opacity: 1;
			background-color: #508232;
		}
		
		/* Responsive design for tablets */
		@media (max-width: 768px) {
			.swiper-slide-content {
				padding: 1rem;
				max-width: 250px;
			}
            
            .swiper-slide {
                display: flex;
                justify-content: center;
            }
			
			.pokemon-image {
				width: 100px;
				height: 100px;
			}
			
			.pokemon-name {
				font-size: 1.125rem;
			}
		}
		
		/* Responsive design for small phones */
		@media (max-width: 480px) {
			.swiper-slide-content {
				padding: 0.75rem;
				max-width: 200px;
			}
			
			.pokemon-image {
				width: 80px;
				height: 80px;
			}
			
			.pokemon-name {
				font-size: 1rem;
			}
		}
		
		/* Responsive design for very small phones */
		@media (max-width: 375px) {
			.swiper-slide-content {
				padding: 0.5rem;
				max-width: 180px;
			}
			
			.pokemon-image {
				width: 70px;
				height: 70px;
			}
			
			.pokemon-name {
				font-size: 0.875rem;
			}
		}
		
		/* Footer drawer container */
		.footer-drawer-container {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			z-index: 10000;
			transform: translateY(calc(100% - 50px));
			transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
		}

		.footer-drawer-container.open {
			transform: translateY(0);
		}

		/* Drawer background overlay */
		.drawer-overlay {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.5);
			z-index: 9999;
			opacity: 0;
			visibility: hidden;
			transition: opacity 0.3s ease, visibility 0.3s ease;
		}

		.drawer-overlay.visible {
			opacity: 1;
			visibility: visible;
		}

		/* Drawer toggle tab */
		.drawer-toggle-tab {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 40%;
			min-width: 300px;
			max-width: 500px;
			height: 50px;
			background: #508232;
			color: white;
			border-radius: 8px 8px 0 0;
			box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
			padding: 0 1rem;
			margin: 0 auto;
			position: relative;
			z-index: 10001;
		}

		/* Drawer title */
		.drawer-title {
			font-size: 0.875rem;
			font-weight: 600;
			color: white;
			margin: 0;
		}

		/* Drawer buttons container */
		.drawer-buttons {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 0.5rem;
		}

		/* Navigation buttons (hidden by default) */
		.drawer-nav {
			display: none;
			align-items: center;
			gap: 0.5rem;
		}

		.drawer-nav.open {
			display: flex;
		}

		/* Chevron toggle button */
		.chevron-button {
			background: none;
			border: none;
			color: white;
			cursor: pointer;
			padding: 0.5rem;
		}

		.chevron-button:hover {
			background: rgba(255, 255, 255, 0.1);
		}

		/* Chevron arrow icons */
		.chevron::before {
			content: "▼"; 
			font-size: 0.75rem;
		}

		.chevron.rotated::before {
			content: "▲"; 
		}

		/* Drawer content area */
		.drawer-content {
			width: 100%;
			max-height: 70vh;
			background: #dbdbdb;
			border-radius: 8px 8px 0 0;
			box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
			overflow: hidden;
		}


		/* Navigation arrow buttons */
		.nav-button {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 40px;
			height: 40px;
			min-width: 40px;
			min-height: 40px;
			background: none;
			color: white;
			border: none;
			border-radius: 50%;
			cursor: pointer;
			transition: all 0.2s ease;
			box-sizing: border-box;
			flex-shrink: 0;
		}

		.nav-button:hover {
			background: rgba(255, 255, 255, 0.1);
			transform: scale(1.05);
		}

		.nav-button:disabled {
			background: none;
			cursor: not-allowed;
			opacity: 0.6;
			transform: none;
		}

		/* Navigation button arrows */
		.nav-button::before {
			content: "‹";
			font-size: 1.2em;
			font-weight: bold;
		}
		
		.nav-button:last-child::before {
			content: "›";
		}

		/* Page indicator text */
		.page-indicator {
			font-size: 0.875rem;
			color: #fff;
			font-weight: 500;
		}

		/* Drawer body content area */
		.drawer-body {
			padding: 1.5rem;
			min-height: 200px;
			display: flex;
			align-items: center;
			justify-content: center;
		}



		/* Responsive design for tablets */
		@media (max-width: 768px) {
			.drawer-toggle-tab { width: 50%; min-width: 280px; padding: 0 0.75rem; }
			.drawer-content { max-height: 60vh; }
			.drawer-title { font-size: 0.8rem; }
			.drawer-body { padding: 1rem; min-height: 150px; }
		}

		/* Responsive design for small phones */
		@media (max-width: 480px) {
			.drawer-toggle-tab { width: 80%; min-width: 250px; height: 45px; padding: 0 0.5rem; }
			.drawer-content { max-height: 50vh; }
			.drawer-body { padding: 0.75rem; min-height: 120px; }
		}

		/* Responsive design for very small phones */
		@media (max-width: 375px) {
			.drawer-toggle-tab { width: 70%; min-width: 200px; height: 40px; padding: 0 0.5rem; }
			.drawer-content { max-height: 45vh; }
			.drawer-body { padding: 0.5rem; min-height: 100px; }
			.drawer-title { font-size: 0.75rem; }
			.nav-button { width: 32px; height: 32px; min-width: 32px; min-height: 32px; }
		}
	`;

	// Inject styles into page head
	document.head.appendChild(style);
})();
