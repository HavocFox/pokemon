const getFormData = async (e) => {
    e.preventDefault();
    const pokemon = e.target.elements.pokemon.value.trim();
    if (!pokemon) {
        alert('Please enter a Pokemon name.');
        return;
    }

    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error('Pokemon not found!');
        }
        const data = await res.json();

        console.log('API Response:', data); // Log the entire response to inspect it

        const name = data.name;
        const id = data.id;
        const imgUrl = data.sprites.front_default;

        type = data.types[0].type.name;

        const abilities = data.abilities.map(a => a.ability.name);
        console.log('Extracted Abilities:', abilities);

        const statsNum = data.stats.map(a => a.base_stat);

        


        const myData = {
            name: name,
            id: id,
            imgUrl: imgUrl,
            type: type,
            abilities: abilities,
            statsNum: statsNum
        };

        console.log('Storing Data:', myData); // Log the data being stored

        // Store data in sessionStorage
        sessionStorage.setItem('pokemonData', JSON.stringify(myData));

        // Redirect to details.html
        window.location.href = 'details.html';
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Pokemon not found. Please try again.');
    }
};

const myForm = document.getElementById('myForm');
myForm.addEventListener('submit', getFormData);
