from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

tasks = [
  {"Name": "Atividade na mente", "Status": "Completa", "description": "Aprovado!", "complete": True},
  {"Name": "Aprovação do Bruno", "Status": "Completa", "description": "Aprovado por Bruno!", "complete": True},
  {"Name": "Aprovação da mãe do Dinis", "Status": "Completa", "description": "Aprovado por mãe do Dinis!", "complete": True},
  {"Name": "Aprovado por mãe do Bruno", "Status": "Completa", "description": "Aprovado por Rosa!", "complete": True},
  {"Name": "Compras para atividades aquáticas da Decathlon", "Status": "Completa", "description": "Dia de comprar os nosso produtos para atividades aquáticas", "complete": True},
  {"Name": "Compras a caminho!", "Status": "Completa", "description": "As nossas compras já estou bem pertinho! Já é possivel sentir a sensação de usar oculos de piscina daqui!", "complete": True},
  {"Name": "Compras Decathlon chegaram ao Cacifo!", "Status": "Completa", "description": "As compras da Decathlon finalmente chegaram ao cacifo, agora basta só esperar o Bruno chegar lá e pegar!", "complete": True},
  {"Name": "Bruno tem as encomendas na mão!", "Status": "Completa", "description": "O Bruno já colocou o código no cacifo e chegou a casa seguro com as encomendas!", "complete": True},
  {"Name": "Dinis agora tem a sua encomenda", "Status": "Completa", "description": "O Bruno já entregou a encomenda do Dinis, a ele!", "complete": True},
  {"Name": "Esperando data de abertura do NaturWaterPark 29/05/26", "Status": "Em Andamento", "description": "Ainda temos de esperar para o paque aquático abrir, primeiro!", "complete": False},
  {"Name": "Fazer Playlist de músicas para a viagem!", "Status": "Completa", "description": "Não pode faltar fazer uma playlist para ouvir ao longo da viagem! Disponível em: https://open.spotify.com/playlist/7qVNHiPNDCckNW3AYpRcbC?si=mih2tBmRThyVddFeEeKWJA&pt=f8c602bdde93f6b2cc9eae2f92d989f7&pi=N_ZVD4FGSP2Ax", "complete": True},
  {"Name": "Esperando data para perguntar", "Status": "Em Andamento", "description": "Esperando pela hora de perguntar em breve!", "complete": False},
  {"Name": "Aprovado por pai do Bruno", "Status": "Em Andamento", "description": "Esperando pela hora de perguntar em breve!", "complete": False},
  {"Name": "Aprovação do pais do Bruno", "Status": "-", "description": "Esperando pela aprovação dos pais do Bruno ainda! :)", "complete": False},
  {"Name": "Permissão de Deixar o Dinis vir.", "Status": "-", "description": "Os pais do Bruno ainda têm de permitir o Dinis vir na viagem!", "complete": False},
  {"Name": "Dia confirmado. Dia: (em breve vai aparecer aqui)", "Status": "-", "description": "Ainda esperamos pela confirmação do dia oficial à visita!", "complete": False},
  {"Name": "Verificação do clima para o dia comfirmado", "Status": "-", "description": "Ainda temos de verificar como vai estar o nosso dia", "complete": False},
  {"Name": "Arrumar a mochila para a viagem!", "Status": "-", "description": "Temos de esperar a anterior estar completa ;(", "complete": False},
  {"Name": "Dia Da Viagem Chegou!", "Status": "-", "description": "Chegou finalmente o momento de diversão que esperamos!", "complete": True},
  {"Name": "Postar story do instagram, não podia faltar :D", "Status": "-", "description": "Não podia faltar colocar algo nas redes sociais sobre o parque, não é mesmo?", "complete": True},
  {"Name": "Dia Acabou!", "Status": "-", "description": "Deve ter sido um dia divertido para todos! Espero que tenha sido fixe :)", "complete": True},
]

@app.route("/tasks", methods=['GET'])
def getTasks():
  return jsonify(tasks)

@app.route("/")
def home():
    return jsonify({
        "message": "API is current online!"
    })

if __name__ == "__main__":
  app.run(host="0.0.0.0", port=5000)