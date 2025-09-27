// Task 3 styles

(function () {
	"use strict";

	// Remove existing styles if they exist
	const existingStyle = document.querySelector("#task3-all-styles");
	if (existingStyle) {
		existingStyle.remove();
	}

	// Create new style element
	const style = document.createElement("style");
	style.id = "task3-all-styles";

	// Add all CSS content (Step 1 + Step 2 only)
	style.textContent = `
		/* Hero section layout */
		.lm-hero.lm-hero {
			height: auto;
			display: flex;
			flex-direction: row;
			align-items: stretch;
		}
		
		/* Hero left content area */
		.lm-hero__left.lm-hero__left {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: flex-start;
			gap: 1rem;
			min-width: 0;
		}
		
		/* Hero header positioning */
		.lm-hero__header.lm-hero__header {
			flex-shrink: 0;
			order: 1;
		}
		
		/* Hero buttons positioning */
		.lm-hero__buttons.lm-hero__buttons {
			order: 3;
			flex-shrink: 0;
			display: flex;
			gap: 1rem;
		}
		
		/* Hero image positioning */
		.lm-hero__image.lm-hero__image {
			order: 4;
			flex-shrink: 0;
		}
		
		/* Step 1: H1 heading styling */
		.lm-hero .lm-hero__header.lm-hero__header {
			margin-bottom: 0.625rem;
			line-height: 1.2;
			text-align: left;
            max-width: 35rem;
		}

        /* Button layout for medium screens */
        @media (max-width: 1100px) {
            .lm-hero .lm-hero__left .lm-hero__buttons{
                flex-direction: row;
            }
        }

		/* Responsive heading for tablets */
		@media (max-width: 768px) {
			.lm-hero .lm-hero__header.lm-hero__header {
				font-size: 2rem;
			}
		}

		/* Responsive heading for small phones */
		@media (max-width: 375px) {
			.lm-hero .lm-hero__header.lm-hero__header {
				font-size: 1.75rem;
			}
		}

		/* Value proposition list */
		.value-proposition {
			margin: 0;
			padding: 0;
			max-width: 35rem;
			width: 100%;
			overflow: hidden;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: flex-start;
			word-wrap: break-word;
			overflow-wrap: break-word;
			order: 2;
			flex-shrink: 0;
		}
		
		/* Value proposition list styling */
		.value-proposition ul {
			padding: 0;
			display: flex;
			flex-direction: column;
			gap: 0.625rem;
		}
		
		/* Value proposition list items */
		.value-proposition li {
			color: #fff;
			font-size: 1rem;
			line-height: 1.4;
			overflow-wrap: break-word;
			display: flex;
			align-items: flex-start;
		}
		 
        /* Hero image sizing */
        .lm-hero .lm-hero__left .lm-hero__image{
            max-width: 44rem;
            width: 50%;
        }

		/* Responsive layout */
		@media (max-width: 950px) {
			.lm-hero.lm-hero {
				flex-direction: column;
				min-height: 60vh;
			}
			
			.lm-hero__left.lm-hero__left {
				flex: 0.5;
			}

			/* Button alignment for mobile */
			.lm-hero .lm-hero__left .lm-hero__buttons{
                justify-content: unset; 
            }

			/* Image positioning for mobile */
			.lm-hero .lm-hero__image.lm-hero__image {
				position: absolute;
				top: 90%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: clamp(12.5rem, 50vw, 25rem);
			}
			
			/* Adjusted spacing for mobile */
			.value-proposition ul {
				gap: 0.5625rem;
			}

			.value-proposition li {
				font-size: 0.9375rem;
			}
		}
	
		
		/* Height-responsive adjustments for shorter screens */
		@media (max-height: 1000px) {
			.lm-hero.lm-hero {
				padding-bottom: 2rem;
			}
			
			.lm-hero .lm-hero__image.lm-hero__image {
				top: 100%;
			}
			
			.lm-hero__left.lm-hero__left {
				margin-bottom: 2rem;
			}
			
			.lm-hero__buttons.lm-hero__buttons {
				margin-bottom: 1rem;
			}
		}
		
		/* Responsive adjustments for very small phones */
		@media (max-width: 375px) {
			.value-proposition ul {
				gap: 0.375rem;
			}
			
			.value-proposition li {
				font-size: 0.8125rem;
			}
		}
	`;

	// Inject styles into page head
	document.head.appendChild(style);
})();
