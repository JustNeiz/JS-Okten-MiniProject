let display = document.getElementsByClassName('display');
let card, button, userDescr;
let url = new URL('https://jsonplaceholder.typicode.com/users');

fetch(url)
    .then(response => response.json())
    .then(users => {
        for (const user of users) {
            card = document.createElement('div');
            card.classList.add('contentCard');

            userDescr = document.createElement('h6');
            userDescr.innerText = `User's id is: ${user.id}\n User's name is: ${user.name}`;

            button = document.createElement('button');
            button.classList.add('detailsButton');
            button.innerText = 'View more info';
            button.onclick = () => {
                window.location.href = 'user-details.html?userId=' + JSON.stringify(user.id);
            }
            card.append(userDescr, button);

            display[0].append(card);
        }
    })