const url = "https://swapi.dev/api/people/";
const getPeople = document.getElementById('people');
const container = document.getElementById('peopleContainer');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
let nextURL;
let prevURL;

getPeople.addEventListener('click', () => {
    fetch(url)
        .then(response => {
            container.innerHTML = "";
            if (response.ok) {
                return response;
            }
            throw Error(response.statusText);
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            nextURL = data.next;
            console.log(nextURL);

            for (let i = 0; i <= 10; i++) {
                const name = document.createElement("p");
                name.textContent = data.results[i].name;
                container.appendChild(name);
            }
        })
        .catch(error => console.log('There was an error: ', error))
}, false);

nextBtn.addEventListener('click', () => {
    fetch(nextURL)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            container.innerHTML = "";
            nextURL = data.next;
            console.log(nextURL);
            prevURL = data.previous;
            console.log(prevURL);
            for (let i = 0; i <= 10; i++) {
                const p = document.createElement("p");
                p.textContent = data.results[i].name;
                container.appendChild(p);
            }
            if (nextURL === null) {
                nextBtn.setAttribute("display", "hidden");
            };
        })
        .catch(error => console.log('There was an error: ', error))
}, false);

prevBtn.addEventListener('click', () => {
    fetch(prevURL)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            container.innerHTML = "";
            nextURL = data.next;
            console.log(nextURL);
            prevURL = data.previous;
            console.log(prevURL);
            for (let i = 0; i <= 10; i++) {
                const p = document.createElement("p");
                p.textContent = data.results[i].name;
                container.appendChild(p);
            }
            if (nextURL === null) {
                prevBtn.setAttribute("display", "hidden");
            };
        })
        .catch(error => console.log('There was an error: ', error))
}, false);