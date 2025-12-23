const url = './travel_recommendation_api.json';
var data;

async function searchDestinations() {
    const query = document.getElementById('searchBarInput').value.toLowerCase().trim();
    const resultsContainer = document.getElementById('result-container');
    resultsContainer.innerHTML = '';

    try {
        const response = await fetch(url);
        const data = await response.json();
        let results = [];

        if (query.includes('beach') || query.includes('beaches')) {
            results = data.beaches;
        } else if (query.includes('temple') || query.includes('temples')) {
            results = data.temples;
        } 
        else {
            const countryMatch = data.countries.find(c => c.name.toLowerCase() === query);
            if (countryMatch) {
                results = countryMatch.cities; 
            } else if (query.includes('country') || query.includes('countries')) {
                data.countries.forEach(c => results.push(...c.cities));
            }
        }

        if (results.length > 0) {
            results.forEach(item => {
                const options = { timeZone: `${item.timezone}`, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
                const currentTime = new Date().toLocaleTimeString('en-US', options);
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('result-item');
                itemDiv.innerHTML = `
                    <img src="${item.imageUrl}" alt="${item.name}" class="result-image"/>
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <p>Current Time: ${currentTime}</p>
                    <button class="visit-btn">Visit</button>
                `;
                resultsContainer.appendChild(itemDiv);
            });
        } else {
            resultsContainer.innerHTML = '<p class="error-msg">No results found. Try "beach", "temple", or a country name like "Japan".</p>';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

document.getElementById('btnSubmitSearch').addEventListener('click', (e) => {
    e.preventDefault();
    searchDestinations();
});

function clearSearch() {
    document.getElementById('result-container').innerHTML = '';
}

document.getElementById('btnClearSearch').addEventListener('click', clearSearch);

function contactUs() {
    alert('Thank you for reaching out! We will get back to you shortly.');
}

document.getElementById('btnSubmitContact').addEventListener('click', contactUs);