import countries from "../data/countries";

const countriesPerPage = 15;
let visibleCountries = countriesPerPage;
let isDropdownOpen = false;
let loadingCountries = false;
let filteredCountries: string[] = [];

const createCountryList = () => {
  const countryDropdown = document.querySelector<HTMLDivElement>('[data-id="country_dropdown"]');
  if (!countryDropdown) return;

  countryDropdown.innerHTML = "";

  const countriesToDisplay = filteredCountries.length > 0 ? filteredCountries : Object.keys(countries);

  if (countriesToDisplay.length === 0) {
    const notFoundElement = document.createElement("div");
    notFoundElement.classList.add("flex", "justify-center", "px-1", "items-center", "text-red-500");
    notFoundElement.textContent = "Country not found :?";
    countryDropdown.append(notFoundElement);
    return;
  }

  for (let i = 0; i < visibleCountries; i++) {
    const countryCode = countriesToDisplay[i];
    const countryName = countries[countryCode];

    if (!countryName) continue; // Skip undefined countries

    const countryElement = document.createElement("div");
    countryElement.classList.add("flex", "justify-between", "px-1", "items-center", "cursor-pointer");
    countryElement.innerHTML = `
        <img src="https://flagsapi.com/${countryCode}/flat/64.png" draggable="false" width="50" />
        <span class="select-none">${countryName}</span>
    `;
    countryElement.addEventListener("click", () => selectCountry(countryName));

    countryDropdown.append(countryElement);
  }
};

const isNearBottom = (container: any) => {
  const scrollHeight = container.scrollHeight;
  const scrollTop = container.scrollTop;
  const clientHeight = container.clientHeight;

  return scrollHeight - scrollTop <= clientHeight + 200;
};

const loadMoreCountries = () => {
  const countryDropdown = document.querySelector('[data-id="country_dropdown"]');
  if (!countryDropdown || loadingCountries) return;

  const isBottom = isNearBottom(countryDropdown);

  const totalCountries = filteredCountries.length > 0 ? filteredCountries.length : Object.keys(countries).length;

  if (isBottom && visibleCountries < totalCountries) {
    loadingCountries = true;
    const remainingCountries = totalCountries - visibleCountries;
    const countriesToLoad = Math.min(countriesPerPage, remainingCountries);
    visibleCountries += countriesToLoad;
    createCountryList();
    loadingCountries = false;

    if (visibleCountries === totalCountries) {
      countryDropdown.removeEventListener("scroll", loadMoreCountries);
    }
  }
};

const toggleDropdown = () => {
  const countryDropdownContainer = document.querySelector('[data-id="country_dropdown-container"]');
  const countryDropdown = document.querySelector('[data-id="country_dropdown"]');
  const button = document.querySelector('[data-id="btn_countries"]');

  if (!countryDropdownContainer || !countryDropdown || !button) return;

  isDropdownOpen = !isDropdownOpen;

  if (isDropdownOpen) {
    button.classList.remove("rounded-full");
    button.classList.add("rounded-t-2xl");

    countryDropdownContainer.classList.remove("hidden");
    countryDropdownContainer.classList.add("flex");

    createCountryList();
    countryDropdown.addEventListener("scroll", loadMoreCountries);
  } else {
    countryDropdown.innerHTML = "";
    countryDropdownContainer.classList.add("hidden");
    countryDropdownContainer.classList.remove("flex");

    button.classList.add("rounded-full");
    button.classList.remove("rounded-t-2xl");

    countryDropdown.removeEventListener("scroll", loadMoreCountries);
  }
};

const selectCountry = (country: string) => {
  // User selected a country from the list, load weather.
};

const searchCountry = (query: string) => {
  filteredCountries = Object.keys(countries).filter((countryCode) =>
    countries[countryCode].toLowerCase().includes(query.toLowerCase())
  );

  visibleCountries = countriesPerPage;
  const countryDropdown = document.querySelector('[data-id="country_dropdown"]');
  if (countryDropdown) {
    countryDropdown.addEventListener("scroll", loadMoreCountries);
  }

  createCountryList();
};

export default {
  eventListener: toggleDropdown,
  create: createCountryList,
  select: selectCountry,
  search: searchCountry,
};
