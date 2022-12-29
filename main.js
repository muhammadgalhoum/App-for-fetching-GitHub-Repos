let input = document.querySelector(".container .header input");
let btn = document.querySelector(".container .header button")
let dataDiv = document.querySelector(".container .show-data");
let responseSpanError = document.querySelector(".container .show-data span");

btn.onclick = function () {
  if (input.value.trim() !== '') {
    dataDiv.innerHTML = "";
    getRepos();
  }
}

async function getRepos() {
  try {
    let response = await fetch(`https://api.github.com/users/${input.value.trim()}/repos`);
    let data = await response.json();

    let numberOfRepos = document.createElement("h3");
    numberOfRepos.textContent = `Numbers of Repos [${data.length}]`;
    dataDiv.appendChild(numberOfRepos);

    data.forEach((repo) => {
      
      let repoDiv = document.createElement("div");
      repoDiv.className = "repoDiv";

      let repoLink = document.createElement("a");
      repoLink.href = `${repo.html_url}`;
      repoLink.target = "_blank";
      repoLink.textContent = `${repo.name}`;

      let repoStars = document.createElement("span");
      repoStars.innerHTML = `<i class="fa-regular fa-star"></i> ${repo.stargazers_count}`;

      repoDiv.appendChild(repoLink);
      repoDiv.appendChild(repoStars);

      dataDiv.appendChild(repoDiv);
    });
  } catch (error) {
    dataDiv.innerHTML =
      `<span>No data to show, make sure that the username is written correctly</span>`;
  }
}