const container = document.getElementById("content");
const versionDisplay = document.getElementById("version");

const VERSION = "1.1.8";
const PROJECTNAME = "Trip Water Park";
const APIURL = "https://trip-api-v2.onrender.com/tasks";

let completedCount = 0;
let debug = true;
let warns = 0;

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

function manageNoService(error) {
  // if element already exists return
  if (warns >= 1) {
    return;
  }

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

  warns++;
}

function getRandomLoadingMessage() {
  const messages = ["Por favor, espere alguns segundos. Estamos esperando receber as tarefas :D", "Parece que as tarefas ainda estão a chegar!", "Ás vezes as APIs demoram um tempo a processar os dados!", "Não se preocupe! As tarefas estão a caminho!"];
  
  return messages[Math.floor(Math.random() * messages.length)];
}

function loadRefreshContent() {

  if (document.getElementById("loaderMessager")) {
    document.getElementById("loaderMessager").innerText = getRandomLoadingMessage();
  }

  fetch(APIURL)
  .then(response => {
    
    if (!response.ok) {
      throw new Error(response.status);
    }
    
    return response.json(); 
  })
  .then(tasks => {

    container.style.display = "flex";
    container.style.alignItems = "stretch";

    container.innerText = "";

    warns--;
    completedCount = 0;

    if (debug) {
      console.log(`Tasks recived with {${tasks.length}} tasks`);
    }

    tasks.forEach(task => {

      if (task["complete"]) {
        task["Status"] = "Completa";
      }

      if (debug) {
        console.log(`Tasks recived! Name: ${task["Name"]}, Status: ${task["Status"]}`);
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

versionDisplay.innerText = `v${VERSION} | ${PROJECTNAME}`;