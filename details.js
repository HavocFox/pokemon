document.addEventListener('DOMContentLoaded', () => {
    const storedData = sessionStorage.getItem('pokemonData');
    if (storedData) {
        const myData = JSON.parse(storedData);
        console.log('Stored Data:', myData); // Log the stored data to inspect it
        addToPage(myData);
    } else {
        console.error('No stored data found.');
    }
});

const createTable = (p) => {
    const headers = ["HP", "Attack", "Defense", "Special Attack", "Special Defense", "Speed"];
    const table = document.createElement("table");  // Create a table element for the page
    table.classList.add('pokemon-stats-table'); // Add a class for styling purposes
    
    // Create table header row
    const headerRow = table.createTHead().insertRow();
    headers.forEach(headerText => {
        const th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    // Create table body rows for stats
    const statsRow = table.insertRow();
    p.statsNum.forEach(stat => {
        const td = statsRow.insertCell();
        td.textContent = stat;
    });

    return table;
};



const addToPage = (p) => {
    // Convert string to title case because it looks nicer
    const toTitleCase = (str) => {
        return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };

    console.log('Pokemon Data:', p); // Log the data passed to addToPage to inspect it

    const abilitiesText = p.abilities.map(ability => toTitleCase(ability)).join(', ');

    const card = document.createElement('div');
    card.classList.add('card', 'text-center'); // Add Bootstrap classes for styling
    card.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="${p.imgUrl}" class="card-img-top" alt="${p.name}">
            <div class="card-body justify-content-center">
                <h5 class="card-title">${toTitleCase(p.name)}</h5>
                <p class="card-text"><strong>ID:</strong> ${p.id}</p>
                <p class="card-text"><strong>Type:</strong> ${toTitleCase(p.type)}</p>
                <p class="card-text"><strong>Abilities:</strong> ${abilitiesText}</p>
            </div>
        </div>
    `;

    const container = document.querySelector('.container');
    container.appendChild(card);

    // Create a section for stats
    const statsSection = document.createElement('div');
    statsSection.classList.add('stats-section', 'text-center');
    statsSection.innerHTML = `
        <h3>Stats</h3>
    `;
    
    // Create and append the stats table
    const statsTable = createTable(p);
    statsSection.appendChild(statsTable);

    container.appendChild(statsSection);
};

