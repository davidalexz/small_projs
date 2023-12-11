const USERSAPI = 'https://api.github.com/users/';
// const REPOSAPI = 'https://api.github.com/users/davidalexz/repos';

const main = document.getElementById('main');
const search = document.getElementById('search');
const form = document.getElementById('form');

getUser('davidalexz');

async function getUser(username) {
    const res = await fetch(USERSAPI + username);
    const data = await res.json();

    createUSerCard(data);

    getRepos(username);
}

async function getRepos(username) {
    const res = await fetch(USERSAPI + username + '/repos');
    const data = await res.json();

    addReposToCard(data);
}

function createUSerCard(user) {
    const cardHTML = `
		<div class="card">
			<div>
				<img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
			</div>
			<div class="user_info">
				<h2>${user.name}</h2>
				<p>${user.bio}</p>
				<ul class="info">
					<li><strong>Followers</strong>${user.followers}</li>
					<li><strong>Following</strong>${user.following}</li>
					<li><strong>Repos</strong>${user.public_repos}</li>
				</ul>
				<h4>Repos:</h4>
				<div id="repos"></div>
			</div>
		</div>	
	`;

    main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
    const reposEl = document.getElementById('repos');

    repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 10)
        .forEach((repo) => {
            const repoEl = document.createElement('a');
            repoEl.classList.add('repo');

            repoEl.href = repo.html_url;
            repoEl.target = '_blank';
            repoEl.innerText = repo.name;

            reposEl.appendChild(repoEl);
        });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = search.value;
    if (user) {
        getUser(user);

        search.value = '';
    }
});
