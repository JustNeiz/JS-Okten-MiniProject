
let url = new URL(location.href);
let userID = url.searchParams.get('userId');
userID = parseInt(userID);
let display = document.getElementsByClassName('display')[0];
display.style.flexFlow = 'column-reverse';
let buttonCounter = 0;



function isObjInside(user, str = '') {
    for (const userKey in user) {
        if (typeof user[userKey] !== 'object') {
            str = str + `${userKey} : ${user[userKey]}\n`;
        } else {
            str = str + `${userKey} : \n${isObjInside(user[userKey], '')}`;

        }
    }
    return str;
}
fetch('https://jsonplaceholder.typicode.com/users')
    .then((response)=> response.json())
    .then((users) => {
        let user = users[userID - 1];
        let str ='';
        str = str + isObjInside(user, str);
        let objBlock = document.createElement('div');
        objBlock.classList.add('contentCard');
        objBlock.style.fontSize = '16px'
        let key = document.createElement('span');
        key.innerText = str;
        key.classList.add('span');
        objBlock.appendChild(key);

        display.appendChild(objBlock);
    })
let flex = document.createElement('div');

 let viewButton = document.getElementById('viewPostDetails');
viewButton.style.width ='90%';
viewButton.onclick = async function (){
if(buttonCounter === 0) {
    await fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(posts => {
            for (const post of posts) {
                if (post.userId === userID) {
                    let card = document.createElement('div');
                    card.classList.add('contentPostCard');
                    let span = document.createElement('span');
                    span.innerText = post.title;
                    flex.appendChild(card);
                    let button = document.createElement('button');
                    button.classList.add('detailsPostButton');
                    button.innerText = 'View post details';
                    button.onclick = () => {
                        window.location.href = 'post-details.html?postId=' + JSON.stringify(post.id);
                    };
                    card.append(span, button);

                }
            }
        });
    buttonCounter++;
}
}
flex.classList.add('flex');
document.body.appendChild(flex);