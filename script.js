const container = document.getElementById("content");
const percentageDisplay = document.getElementById("percentage");

const tasks = [
  {"Name": "Atividade na mente", "Status": "Completa", "description": "Esperando pela aprovação do Bruno ainda!", "complete": true},
  //
  {"Name": "Aprovação do Bruno", "Status": "Completa", "description": "Aprovado por Bruno!", "complete": true},
  //
  {"Name": "Aprovação da mãe do Dinis", "Status": "Completa", "description": "Aprovado por mãe do Dinis!", "complete": true},
  //
  {"Name": "Aprovado por mãe do Bruno", "Status": "Completa", "description": "Aprovado por Rosa!", "complete": true},
  //
  {"Name": "Compras para atividades aquáticas da Decathlon", "Status": "Completa", "description": "Dia de comprar os nosso produtos para atividades aquáticas", "complete": true},
  //
  {"Name": "Compras a caminho!", "Status": "Completa", "description": "As nossas compras já estou bem pertinho! Já é possivel sentir a sensação de usar oculos de piscina daqui!", "complete": true},
  //
  {"Name": "Compras Decathlon chegaram ao Cacifo!", "Status": "Completa", "description": "As compras da Decathlon finalmente chegaram ao cacifo, agora basta só esperar o Bruno chegar lá e pegar!", "complete": true},
  //
  {"Name": "Bruno tem as encomendas na mão!", "Status": "Completa", "description": "O Bruno já colocou o código no cacifo e chegou a casa seguro com as encomendas!", "complete": true},
  //
  {"Name": "Dinis agora tem a sua encomenda", "Status": "Completa", "description": "O Bruno já entregou a encomenda do Dinis, a ele!", "complete": true},
  //
  {"Name": "Esperando data de abertura do NaturWaterPark 29/05/26", "Status": "Em Andamento", "description": "Esperando pela hora de perguntar em breve!", "complete": false},
  //
  {"Name": "Fazer Playlist de músicas para a viagem!", "Status": "Completa", "description": "Não pode faltar fazer uma playlist para ouvir ao longo da viagem! Disponível em: https://open.spotify.com/playlist/7qVNHiPNDCckNW3AYpRcbC?si=mih2tBmRThyVddFeEeKWJA&pt=f8c602bdde93f6b2cc9eae2f92d989f7&pi=N_ZVD4FGSP2Ax", "complete": true},
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
  {"Name": "Verificação do clima para o dia comfirmado", "Status": "-", "description": "Ainda temos de verificar como vai estar o nosso dia", "complete": false},
  //
  {"Name": "Arrumar a mochila para a viagem!", "Status": "-", "description": "Temos de esperar a anterior estar completa ;(", "complete": false},
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