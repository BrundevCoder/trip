const container = document.getElementById("content");
const percentageDisplay = document.getElementById("percentage");

const tasks = [
  {"Name": "Atividade na mente", "Status": "Completa", "description": "Esperando pela aprovação do Bruno ainda!", "complete": true},
  //
  {"Name": "Aprovação do Bruno", "Status": "Completa", "description": "Aprovado por Bruno!", "complete": true},
  //
  {"Name": "Aprovação do mãe da Dinis", "Status": "Completa", "description": "Aprovado por mãe do Dinis!", "complete": true},
  //
  {"Name": "Aprovado por mãe do Bruno", "Status": "Completa", "description": "Aprovado por Rosa!", "complete": true},
  //
  {"Name": "Compras para atividades aquáticas da Decathlon", "Status": "Em Andamento", "description": "Dia de comprar os nosso produtos para atividades aquáticas", "complete": false},
  //
  {"Name": "Esperando data para perguntar", "Status": "Em Andamento", "description": "Esperando pela hora de perguntar em breve!", "complete": false},
  //
  {"Name": "Aprovado por pai do Bruno", "Status": "Em Andamento", "description": "Esperando pela hora de perguntar em breve!", "complete": false},
  //
  {"Name": "Aprovação do pais do Bruno", "Status": "-", "description": "Esperando pela aprovação dos pais do Bruno ainda! :)", "complete": false},
  //
  {"Name": "Permissão de Deixar o Dinis vir.", "Status": "-", "description": "Os pais do Bruno ainda têm de permitir o Dinis vir na viagem!", "complete": false},
  //
  {"Name": "Dia confirmado. Dia: (em breve vai aparecer aqui)", "Status": "-", "description": "Ainda esperamos pela confirmação do dia oficial à visita!", "complete": false},
  //
  {"Name": "Dia Da Viagem Chegou!", "Status": "-", "description": "Chegou finalmente o momento de diversão que esperamos!", "complete": false},
  //
  {"Name": "Postar story do instagram, não podia faltar :D", "Status": "-", "description": "Não podia faltar colocar algo nas redes sociais sobre o parque, não é mesmo?", "complete": false},
  //
  {"Name": "Dia Acabou!", "Status": "-", "description": "Deve ter sido um dia divertido para todos! Espero que tenha sido fixe :)", "complete": false}
];

let completedCount = 0;

function showTasks(name, status, decp, complete) {

  // create a section element
  // status
  const section = document.createElement("section");
  section.classList.add("block")

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

  section.appendChild(description);

  // check if it is complete
  if (complete) {
    section.classList.add("complete");
    span.classList.add("span-completed");
    completedCount++;
  }

  if (status.includes("Andamento") && !complete) {
    span.classList.add("span-in-progress");
  }

  if (status === "-") {
    section.classList.add("occ");
  }

  // show it
  container.appendChild(section);
}

function update() {
  let len = tasks.length;

  for (let i = 0; i < len; i++) {
    let name = tasks[i]["Name"];
    let status = tasks[i]["Status"];
    let description = tasks[i]["description"];
    let complete = tasks[i]["complete"];

    showTasks(name, status, description, complete);
  }

  let percent = 100 * (completedCount / len);

  percentageDisplay.innerText = `${percent.toFixed(0)}%`;
}

update();