// Task 2

// Need swiper for the carousel stuff
function loadSwiperJS() {
	return new Promise((resolve, reject) => {
		if (window.Swiper) {
			resolve();
			return;
		}

		const script = document.createElement("script");
		script.src = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
		script.onload = () => resolve();
		script.onerror = () => reject(new Error("Failed to load Swiper.js"));
		document.head.appendChild(script);
	});
}

// Some config stuff
const POKEMON_COUNT = 7;
const MAX_POKEMON_ID = 1025;
const SCROLL_THRESHOLD = 10;

// Get some random pokemon data
async function fetchPokemonData() {
	const pokemonIds = generateUniquePokemonIds(POKEMON_COUNT);
	const pokemonData = [];

	for (const id of pokemonIds) {
		try {
			const pokemon = await fetchSinglePokemon(id);
			pokemonData.push(pokemon);
		} catch (error) {
			console.error(`Error fetching Pokemon ${id}:`, error);
		}
	}

	return pokemonData;
}

// Pick random pokemon IDs without duplicates
function generateUniquePokemonIds(count) {
	const pokemonIds = new Set();
	while (pokemonIds.size < count) {
		pokemonIds.add(Math.floor(Math.random() * MAX_POKEMON_ID) + 1);
	}
	return Array.from(pokemonIds);
}

// Get individual pokemon details
async function fetchSinglePokemon(id) {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
	const data = await response.json();

	// Need the species data for descriptions
	const speciesResponse = await fetch(data.species.url);
	const speciesData = await speciesResponse.json();

	return {
		id: data.id,
		name: data.name,
		image:
			data.sprites.other["official-artwork"].front_default ||
			data.sprites.front_default,
		types: data.types.map((type) => type.type.name),
		description:
			speciesData.flavor_text_entries.find(
				(entry) => entry.language.name === "en"
			)?.flavor_text || "A mysterious Pokemon.",
	};
}

// Build the HTML for each pokemon card
function createPokemonSlide(pokemon) {
	const typeBadges = pokemon.types
		.map((type) => `<span class="type-badge type-${type}">${type}</span>`)
		.join("");

	return `
		<div class="swiper-slide">
			<div class="swiper-slide-content">
				<img src="${pokemon.image}" alt="${pokemon.name}" class="pokemon-image" 
					 onerror="this.src='https://via.placeholder.com/120x120/508232/ffffff?text=${pokemon.name
							.charAt(0)
							.toUpperCase()}'">
                <div class="pokemon-name-container">
				    <h3 class="pokemon-name">${pokemon.name}</h3>
					<div class="pokemon-tooltip">
						<button class="info-button">i</button>
						<div class="tooltip-content">
							<p><em>This is a super cool Pokemon!</em></p>
						</div>
					</div>
                </div>
				<p class="pokemon-description">${pokemon.description.replace(/\f/g, " ")}</p>
				<div class="pokemon-types">${typeBadges}</div>
                <button class="pokemon-button" onclick="flipCard(this)">
                    Flip!
                </button>
			</div>
		</div>
	`;
}

// Flip animation
function flipCard(button) {
	const slideContent = button.closest(".swiper-slide-content");
	slideContent.style.transform = "rotateY(180deg)";

	setTimeout(() => {
		slideContent.style.transform = "rotateY(0deg)";
	}, 1000);
}

// The main drawer HTML
const DRAWER_HTML = `
	<!-- Background Overlay -->
	<div class="drawer-overlay" id="drawerOverlay"></div>
	
	<div class="footer-drawer-container">
		<!-- Toggle Tab -->
		<div class="drawer-toggle-tab">
			<h3 class="drawer-title">Content Drawer</h3>
			<div class="drawer-buttons">
				<div class="drawer-nav">
					<button class="nav-button" id="prevButton" disabled></button>
					<span class="page-indicator" id="pageIndicator">1 / 1</span>
					<button class="nav-button" id="nextButton" disabled></button>
				</div>
				<button class="chevron-button" id="drawerToggleTab">
					<span class="chevron" id="chevronIcon"></span>
				</button>
			</div>
		</div>
		
		<!-- Drawer Content -->
		<div class="drawer-content" id="drawerContent">
			<div class="drawer-body">
				<div class="swiper" id="pokemonSwiper">
					<div class="swiper-wrapper" id="swiperWrapper"></div>
				</div>
			</div>
		</div>
	</div>
`;

// Main function that puts everything together
function createFooterDrawer() {
	removeExistingDrawer();
	injectDrawerHTML();
	initializeDrawer();
	initializeSwiper();
	console.log("Footer drawer created");
}

// Clean up any existing drawer first
function removeExistingDrawer() {
	const existingDrawer = document.querySelector(".footer-drawer-container");
	if (existingDrawer) {
		existingDrawer.remove();
	}
}

// Stick the HTML into the page
function injectDrawerHTML() {
	document.body.insertAdjacentHTML("beforeend", DRAWER_HTML);
}

// Set up all the drawer interactions
function initializeDrawer() {
	const elements = {
		container: document.querySelector(".footer-drawer-container"),
		toggleTab: document.querySelector(".drawer-toggle-tab"), // The entire tab div
		chevronButton: document.getElementById("drawerToggleTab"), // The chevron button
		chevron: document.getElementById("chevronIcon"),
		nav: document.querySelector(".drawer-nav"),
		overlay: document.getElementById("drawerOverlay"),
	};

	let isDrawerOpen = false;

	// Toggle the drawer state
	function updateDrawerState(open) {
		isDrawerOpen = open;
		const action = open ? "add" : "remove";

		elements.container.classList[action]("open");
		elements.chevron.classList[action]("rotated");
		elements.nav.classList[action]("open");
		elements.overlay.classList[action]("visible");
	}

	function openDrawer() {
		if (!isDrawerOpen) {
			updateDrawerState(true);
		}
	}

	function closeDrawer() {
		if (isDrawerOpen) {
			updateDrawerState(false);
		}
	}

	// Click handlers
	elements.toggleTab.addEventListener("click", function (e) {
		e.preventDefault();
		e.stopPropagation();

		if (!isDrawerOpen) {
			// Only open when drawer is closed
			openDrawer();
		}
		// If drawer is open, clicking the tab does nothing
	});

	// Chevron button - only closes when drawer is open
	elements.chevronButton.addEventListener("click", function (e) {
		e.preventDefault();
		e.stopPropagation();
		if (isDrawerOpen) {
			closeDrawer();
		} else if (!isDrawerOpen) {
			openDrawer();
		}
	});

	elements.overlay.addEventListener("click", function (e) {
		e.preventDefault();
		e.stopPropagation();
		closeDrawer();
	});

	// Close when scrolling to bottom
	window.addEventListener("scroll", function () {
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		const windowHeight = window.innerHeight;
		const documentHeight = document.documentElement.scrollHeight;

		if (
			scrollTop + windowHeight >= documentHeight - SCROLL_THRESHOLD &&
			isDrawerOpen
		) {
			closeDrawer();
		}
	});

	// ESC key support
	document.addEventListener("keydown", function (e) {
		if (e.key === "Escape" && isDrawerOpen) {
			closeDrawer();
		}
	});

	console.log("Drawer initialized");
}

// Swiper settings
const SWIPER_CONFIG = {
	slidesPerView: 4,
	spaceBetween: 20,
	centeredSlides: false,
	grabCursor: true,
	keyboard: { enabled: true },
	breakpoints: {
		320: { slidesPerView: 1, spaceBetween: 10 },
		480: { slidesPerView: 1, spaceBetween: 15 },
		768: { slidesPerView: 2, spaceBetween: 20 },
		1024: { slidesPerView: 4, spaceBetween: 20 },
	},
	on: {
		slideChange: function () {
			updateNavigation(this.activeIndex + 1, this.slides.length);
		},
	},
};

// Set up the swiper with pokemon data
async function initializeSwiper() {
	try {
		await loadSwiperJS();
		const pokemonData = await fetchPokemonData();

		populateSwiperSlides(pokemonData);
		const swiper = createSwiperInstance();
		setupSwiperNavigation(swiper, pokemonData.length);

		console.log("Swiper loaded with", pokemonData.length, "pokemon");
	} catch (error) {
		console.error("Swiper error:", error);
		showSwiperError();
	}
}

// Fill the swiper with pokemon cards
function populateSwiperSlides(pokemonData) {
	const slidesHTML = pokemonData.map(createPokemonSlide).join("");
	const swiperWrapper = document.getElementById("swiperWrapper");
	swiperWrapper.innerHTML = slidesHTML;
}

// Make the swiper instance
function createSwiperInstance() {
	return new Swiper("#pokemonSwiper", SWIPER_CONFIG);
}

// Wire up the nav buttons
function setupSwiperNavigation(swiper, totalSlides) {
	const prevButton = document.getElementById("prevButton");
	const nextButton = document.getElementById("nextButton");

	prevButton.addEventListener("click", () => swiper.slidePrev());
	nextButton.addEventListener("click", () => swiper.slideNext());
	updateNavigation(1, totalSlides);
}

// Show error if something goes wrong
function showSwiperError() {
	const swiperWrapper = document.getElementById("swiperWrapper");
	swiperWrapper.innerHTML = `
		<div class="swiper-slide">
			<div class="swiper-slide-content">
				<h3>Error Loading Content</h3>
				<p>Failed to load Pokemon data. Please try again.</p>
			</div>
		</div>
	`;
}

// Update the nav buttons and page counter
function updateNavigation(currentSlide, totalSlides) {
	const prevButton = document.getElementById("prevButton");
	const nextButton = document.getElementById("nextButton");
	const pageIndicator = document.getElementById("pageIndicator");

	if (prevButton && nextButton && pageIndicator) {
		prevButton.disabled = currentSlide <= 1;
		nextButton.disabled = currentSlide >= totalSlides;
		pageIndicator.textContent = `${currentSlide} / ${totalSlides}`;
	}
}

// Run on injection
createFooterDrawer();
