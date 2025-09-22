// Task 3

(function () {
	"use strict";

	console.log("Starting modifications");

	function applyAllModifications() {
		// Update the main heading
		const h1 = document.querySelector(".lm-hero__header");
		if (h1) {
			h1.textContent = "We are the best experimentation agency in the world";
		}

		// Add value proposition list
		if (!document.querySelector(".value-proposition")) {
			// only add if not already present
			const valueProp = document.createElement("div");
			valueProp.className = "value-proposition";
			valueProp.innerHTML = `
                <ul>
                    <li>✓ Increase conversion rate across your website</li>
                    <li>✓ Iterative site redesign</li>
                    <li>✓ Improve ROAS efficiency</li>
                    <li>✓ Standing or scaling an experimentation program</li>
                    <li>✓ Advanced customer research</li>
                </ul>
            `;
			if (h1) {
				h1.parentNode.insertBefore(valueProp, h1.nextSibling);
			}
		}

		// Update button text
		const firstButton = document.querySelector(
			".lm-hero__buttons .btn:first-child"
		);
		if (firstButton) {
			firstButton.textContent = "Contact us";
		}

		// Add scroll functionality to the "Why Liftmap?" button
		const whyButton = document.querySelector(".btn-video");
		if (whyButton && !whyButton.hasAttribute("data-scroll-handler")) {
			// prevent duplicate handlers
			whyButton.addEventListener(
				"click",
				function (e) {
					e.preventDefault();
					e.stopImmediatePropagation();

					const whySection = document.querySelector(".lm-why");
					if (whySection) {
						// smooth scrolling
						whySection.scrollIntoView({ behavior: "smooth" });
					}
				},
				true
			);
			whyButton.setAttribute("data-scroll-handler", "true");
		}

		console.log("Modifications applied");
	}

	// SPA persistence setup
	// Using MutationObserver to detect route changes
	const observer = new MutationObserver(function (mutations) {
		let shouldReapply = false;

		mutations.forEach(function (mutation) {
			if (mutation.type === "childList") {
				mutation.addedNodes.forEach(function (node) {
					if (
						node.nodeType === 1 &&
						node.classList &&
						(node.classList.contains("lm-hero") ||
							node.querySelector(".lm-hero"))
					) {
						shouldReapply = true;
					}
				});
			}
		});

		if (shouldReapply) {
			console.log("Route change detected, reapplying");
			setTimeout(applyAllModifications, 200); // small delay to let DOM settle
		}
	});

	// Also listen for navigation clicks
	function setupNavigationListeners() {
		const overviewLink = document.querySelector(
			'a[href="/"], a[href*="overview"]'
		);
		const plansLink = document.querySelector('a[href*="plans"]');

		function handleNavClick() {
			console.log("Navigation clicked");
			setTimeout(applyAllModifications, 200); // wait for navigation
		}

		if (overviewLink) overviewLink.addEventListener("click", handleNavClick);
		if (plansLink) plansLink.addEventListener("click", handleNavClick);
	}

	// Apply modifications immediately
	applyAllModifications();

	// Set up persistence
	observer.observe(document.body, { childList: true, subtree: true });
	setupNavigationListeners();

	console.log("All modifications applied with SPA persistence");
})();
