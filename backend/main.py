from flask import Flask, jsonify
from flask_cors import CORS
import datetime

app = Flask(__name__)
CORS(app)

tasks = [
  {"Name": "Atividade na mente", "Status": "Completa", "description": "Aprovado!", "complete": True, "rejected": False},
  {"Name": "Aprovação do Bruno", "Status": "Completa", "description": "Aprovado por Bruno!", "complete": True, "rejected": False},
  {"Name": "Aprovação da mãe do Dinis", "Status": "Completa", "description": "Aprovado por mãe do Dinis!", "complete": True, "rejected": False},
  {"Name": "Aprovado por mãe do Bruno", "Status": "Completa", "description": "Aprovado por Rosa!", "complete": True, "rejected": False},
  {"Name": "Compras para atividades aquáticas da Decathlon", "Status": "Completa", "description": "Dia de comprar os nosso produtos para atividades aquáticas", "complete": True, "rejected": False},
  {"Name": "Compras a caminho!", "Status": "Completa", "description": "As nossas compras já estou bem pertinho! Já é possivel sentir a sensação de usar oculos de piscina daqui!", "complete": True, "rejected": False},
  {"Name": "Compras Decathlon chegaram ao Cacifo!", "Status": "Completa", "description": "As compras da Decathlon finalmente chegaram ao cacifo, agora basta só esperar o Bruno chegar lá e pegar!", "complete": True, "rejected": False},
  {"Name": "Bruno tem as encomendas na mão!", "Status": "Completa", "description": "O Bruno já colocou o código no cacifo e chegou a casa seguro com as encomendas!", "complete": True, "rejected": False},
  {"Name": "Dinis agora tem a sua encomenda", "Status": "Completa", "description": "O Bruno já entregou a encomenda do Dinis, a ele!", "complete": True, "rejected": False},
  {"Name": "Fazer Playlist de músicas para a viagem!", "Status": "Completa", "description": "Não pode faltar fazer uma playlist para ouvir ao longo da viagem! Disponível em: https://open.spotify.com/playlist/7qVNHiPNDCckNW3AYpRcbC?si=mih2tBmRThyVddFeEeKWJA&pt=f8c602bdde93f6b2cc9eae2f92d989f7&pi=N_ZVD4FGSP2Ax", "complete": True, "rejected": False},
  {"Name": "Esperando data de abertura do NaturWaterPark 29/05/26", "Status": "Em Andamento", "description": "Ainda temos de esperar para o paque aquático abrir, primeiro!", "complete": True, "rejected": False},
  {"Name": "Esperando data para perguntar", "Status": "Completa", "description": "Esperando pela hora de perguntar em breve!", "complete": True, "rejected": False},
  {"Name": "Aprovado por pai do Bruno", "Status": "Completa", "description": "Esperando pela hora de perguntar em breve!", "complete": True, "rejected": False},
  {"Name": "Aprovação do pais do Bruno", "Status": "Completa", "description": "Esperando pela aprovação dos pais do Bruno ainda! :)", "complete": True, "rejected": False},
  {"Name": "Permissão de Deixar o Dinis vir.", "Status": "-", "description": "Os pais do Bruno ainda têm de permitir o Dinis vir na viagem!", "complete": False, "rejected": False},
  {"Name": "Dia confirmado. Dia: (em breve vai aparecer aqui)", "Status": "Em Andamento", "description": "Ainda esperamos pela confirmação do dia oficial à visita!", "complete": False, "rejected": False},
  {"Name": "Verificação do clima para o dia comfirmado", "Status": "Em Andamento", "description": "Ainda temos de verificar como vai estar o nosso dia", "complete": False, "rejected": False},
  {"Name": "Arrumar a mochila para a viagem!", "Status": "-", "description": "Temos de esperar a anterior estar completa ;(\n Itens:\n - Toalha\n - Oculos de Natação & Meias de Natação\n - protetor solar\n - Roupa Suplente\n - E Muita Emocão\n", "complete": False, "rejected": False},
  {"Name": "Dia Da Viagem Chegou!", "Status": "-", "description": "Chegou finalmente o momento de diversão que esperamos!", "complete": False, "rejected": False},
  {"Name": "Postar story do instagram, não podia faltar :D", "Status": "-", "description": "Não podia faltar colocar algo nas redes sociais sobre o parque, não é mesmo?", "complete": False, "rejected": False},
  {"Name": "Dia Acabou!", "Status": "-", "description": "Deve ter sido um dia divertido para todos! Espero que tenha sido fixe :)", "complete": False, "rejected": False},
]

@app.route("/tasks", methods=['GET'])
def getTasks():

  # update status if task is completed
  for task in tasks:
    if task["complete"]:
      task["status"] = "Completa"
  
  return jsonify(tasks)

@app.route("/updates", methods=['GET'])
def check_updates():

  task = []

  for i in range(len(tasks)):
    if tasks[i]["complete"] and tasks[i + 1]["complete"] == False:

      if tasks[i]["complete"]:
        tasks[i]["status"] = True

      task = tasks[i]
      break

  return jsonify({"task": task})

@app.route("/")
def home():
  return jsonify({"message": "API is current online!"})

if __name__ == "__main__":
  app.run(host="0.0.0.0", port=5000)