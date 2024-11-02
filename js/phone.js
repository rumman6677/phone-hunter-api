const loadPhone = async (searchText='13', isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  //    console.log(phones);
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
//   console.log(phones);

  const phoneContainer = document.getElementById("phone-container");
  // clear search
  phoneContainer.textContent = "";

  const ShowAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    ShowAllContainer.classList.remove("hidden");
  } else {
    ShowAllContainer.classList.add("hidden");}
//   console.log("is show all", isShowAll);

  // display first 12 phones
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  //  console.log(phones);
  phones.forEach((phone) => {
    // console.log(phones);
    // create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-gray-100 w-96 shadow-xl`;

    // set inner html
    phoneCard.innerHTML = `
    <div class="card bg-gray-100 p-4 shadow-xl">
    <figure>
    <img src="${phone.image}"alt="Shoes"/>
    </figure>
    <div class="card-body">
      <h2 class="card-title">${phone.phone_name}</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions justify-center">
    <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
      </div>
    </div>
    </div>
    `;
    // append child
    phoneContainer.appendChild(phoneCard);
  });

  // hide loading spinner
  ToggleLoadingSpinner(false);
};

const handleShowDetails = async (id) => {
//   console.log("show details", id);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
};

const showPhoneDetails = (phone) =>{
    console.log(phone);
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
    <img src="${phone.image}" alt="">
    <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
    <p><span>Gps:</span>${phone?.others?.GPS}</p>
    <p><span>Sensors:</span>${phone?.mainFeatures?.sensors
    }</p>
    <p><span>Display:</span>${phone?.mainFeatures?.
        displaySize}</p>
    `


    // show the model
    show_details_modal.showModal();
}

// handle search button
const handleSearch = (isShowAll) => {
  ToggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  console.log(searchText);
  loadPhone(searchText, isShowAll);
};

// const handleSearch2 = () =>{
//     ToggleLoadingSpinner(true);
//     const searchField = document.getElementById('search-field2');
//     const searchText = searchField.value;
//     loadPhone(searchText);
// }
const ToggleLoadingSpinner = (isLoading) => {
  const LoadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    LoadingSpinner.classList.remove("hidden");
  } else {
    LoadingSpinner.classList.add("hidden");
  }
};

const handleShowAll = () => {
  handleSearch(true);
};

loadPhone();

