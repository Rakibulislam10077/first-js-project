const loadPhones = async (searching, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searching}`;
    const res = await fetch(url)
    const data = await res.json()
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    console.log(phones)
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.textContent = ``;
    const showMore = document.getElementById('show-btn');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showMore.classList.remove('d-none');
    }
    else {
        showMore.classList.add('d-none');
    }


    const nophones = document.getElementById('no-message');
    if (phones.length === 0) {
        nophones.classList.remove('d-none');
    }
    else {
        nophones.classList.add('d-none');
    }

    phones.forEach(phone => {
        const creatCardCon = document.createElement('div');
        creatCardCon.classList.add('col')
        creatCardCon.innerHTML = `
         <div class="card p-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                    to additional
                    content. This content is a little bit longer.</p>
                    <button onclick="loadPhoneDetail('${phone.slug}')" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">show details</button>
            </div>
        </div>
        `;
        phonesContainer.appendChild(creatCardCon)
    });
    toggleSpinner(false);
}
const showAll = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById('input-field');
    const searchFieldvalue = searchField.value;
    loadPhones(searchFieldvalue, dataLimit);
}


document.getElementById('search-btn').addEventListener('click', function () {
    showAll(10);
})

const toggleSpinner = (isLoading) => {
    const loaderSection = document.getElementById('loadSpinner');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}
document.getElementById('btn-show-all').addEventListener('click', function () {
    showAll();
})

document.getElementById('input-field').addEventListener('keypress', function (enter) {
    if (enter.key === 'Enter') {
        showAll(10)
    }
});

const loadPhoneDetail = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url)
    const data = await res.json()
    loadDetails(data.data)
}
const loadDetails = detail => {
    console.log(detail)
    const modalTitl = document.getElementById('phoneDetailModalLabel');
    modalTitl.innerText = detail.name;
    const phoneDetaile = document.getElementById('phone-details');
    phoneDetaile.innerHTML = `
    <img src="${detail.image}">
    <h5>brand: ${detail.brand}</h5>
    <p>MainFeatures: ${detail.mainFeatures.chipSet} 
    ${detail.mainFeatures.displaySize} 
    ${detail.mainFeatures.memory}</p>
    <p>Sensor: ${detail.mainFeatures.sensors[0]}</P>
    <p>ReleaseDate:${detail.releaseDate}</p>
    <p>Slug: ${detail.slug}</p>
    `;
}

loadPhones('a')

