const charactersContainer = document.querySelector('.characters_container');
const buttonBack = document.querySelector('#backButton')
const buttonNext = document.querySelector('#nextButton')

function getFetchData() {
    fetch('../data/charactersItem.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            charactersContainer.innerHTML = '';

            data.forEach(item => {
                const characterItem = document.createElement('div');
                characterItem.classList.add('character-item');

                characterItem.setAttribute('data-description', item.description || 'Пока описаний нет');

                characterItem.innerHTML = `
                    <img src="${item.images}" alt="${item.name}">
                    <h2>${item.name}</h2>
                    <p>${item.years}</p>
                `;

                characterItem.addEventListener('click', () => {
                    charactersContainer.querySelectorAll('.character-item').forEach((item) => {
                        item.style.transition = 'opacity 0.5s';
                        item.style.opacity = '0';
                        buttonBack.style.display = 'block'
                        buttonNext.style.display = 'block'
                    });

                    buttonBack.addEventListener('click', () => {

                        buttonBack.style.display = 'none'
                        buttonNext.style.display = 'none'
                        getFetchData()

                    })

                    setTimeout(() => {
                        charactersContainer.innerHTML = '';

                        const descriptionContentCharacter = document.createElement('div');
                        descriptionContentCharacter.classList.add('description-content-character');
                        descriptionContentCharacter.textContent = characterItem.getAttribute('data-description');
                        charactersContainer.appendChild(descriptionContentCharacter);
                        descriptionContentCharacter.classList.add('show');
                    }, 500);
                });

                charactersContainer.appendChild(characterItem);
            });
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
}




getFetchData();
