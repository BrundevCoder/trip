const container = document.getElementById("content");
const versionDisplay = document.getElementById("version");

let completedCount = 0;

const VERSION = "1.1.7";
const PROJECTNAME = "Trip Water Park";
const APIURL = "https://trip-api-v1.onrender.com/tasks";

function showTasks(name, status, decp, complete) {

  // create a section element
  // status
  const section = document.createElement("section");
  section.classList.add("block")

  // bar
  const bar = document.createElement("div");
  bar.classList.add("bar");
  section.appendChild(bar);

  const statusDiv = document.createElement("div");
  statusDiv.classList.add("stats");

  section.appendChild(statusDiv);

  const para = document.createElement("p");
  para.classList.add("para")
  const span = document.createElement("span");

  statusDiv.appendChild(para)
  para.innerText = "Status: ";

  span.innerText = status;

  para.appendChild(span);

  // ball
  const ball = document.createElement("div");
  para.appendChild(ball);

  ball.classList.add("ball");

  // title
  const title = document.createElement("h2")
  section.appendChild(title);

  title.classList.add("title");
  title.innerText = name;

  // descp
  const description = document.createElement("p");
  description.classList.add("description");

  description.innerText = decp;

  // if the description is too long, make it break
  if (decp.length >= 65) {
    description.classList.add("description-breaker");
  }

  section.appendChild(description);

  // check if it is complete
  if (complete) {
    bar.classList.add("complete");
    section.classList.add("complete");
    span.classList.add("span-completed");
    completedCount++;
  }

  if (status.includes("Andamento") && !complete) {
    bar.classList.add("progress");
    span.classList.add("span-in-progress");
    section.classList.add("border-in-progress");
  }

  if (status === "-") {
    bar.classList.add("bar-null");
    section.classList.add("occ");
  }

  // show it
  container.appendChild(section);
}

/*function update() {
  let len = tasks.length;

  container.innerText = "";
  completedCount = 0;

  for (let i = 0; i < len; i++) {
    let name = tasks[i]["Name"];
    let status = tasks[i]["Status"];
    let description = tasks[i]["description"];
    let complete = tasks[i]["complete"];
    let date = tasks[i]["Date"];

    if (complete) {
      status = "Completa";
    }

    showTasks(name, status, description, complete);
    showTasksDetails(name, complete, date);
  }

  let percent = Math.floor(100 * (completedCount / len));

  versionDisplay.innerText = `v${VERSION} | ${PROJECTNAME}`;

  document.getElementById("quantity").innerText = String(completedCount);
  document.getElementById("maxTasks").innerText = String(len);

  setTimeout(() => {
    document.getElementById("percent-bar").style.width = `${percent}%`;
  }, 1);
  document.getElementById("percent-bar").innerText = `${percent}%`
}

update();*/

function manageNoService(error) {
  container.innerText = "";

  const header = document.createElement("h2");
  header.innerHTML = `Server Error: ${error}. Somethings may be broken, contact the creator of this page`;
  header.classList.add("error-header");


  const link = document.createElement("a");
  link.innerText = "Try Again";
  link.href = "https://brundevcoder.github.io/trip/";
  link.classList.add("error-link");

  container.style.minHeight = "fit-content";
  container.style.display = "flex";
  container.style.justifyContent = "center";
  container.style.alignItems = "center";

  container.appendChild(header);
  container.appendChild(link);
}

function loadRefreshContent() {

  versionDisplay.innerText = `v${VERSION} | ${PROJECTNAME}`;

  fetch(APIURL)
  .then(response => {
    
    if (!response.ok) {
      throw new Error(response.status);
    }
    
    return response.json(); 
  })
  .then(tasks => {

    container.innerText = "";

    completedCount = 0;

    tasks.forEach(task => {

      if (task["complete"]) {
        task["Status"] = "Completa";
      }

      showTasks(task["Name"], task["Status"], task["description"], task["complete"])
    });

    let len = tasks.length;
    let percent = Math.floor(100 * (completedCount / len));

    if (percent > 100) {
      percent = 0;
      console.log("Percent pass over 100...")
    }

    document.getElementById("quantity").innerText = String(completedCount);
    document.getElementById("maxTasks").innerText = String(len);

    setTimeout(() => {
      document.getElementById("percent-bar").style.width = `${percent}%`;
    }, 1);
    document.getElementById("percent-bar").innerText = `${percent}%`;
  })
  .catch(error => {
    let erro;

    if (isNaN(parseInt(error))) {
      erro = error;
    }
    else {
      erro = parseInt(error);
    }

    manageNoService(error.message);
  });
}

setInterval(() => {
  loadRefreshContent();
}, 20000);

loadRefreshContent();