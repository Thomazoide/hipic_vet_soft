from pymongo import MongoClient
from datetime import date, timedelta
import random as r

cliente = MongoClient("mongodb+srv://Thomazoide:Thom1232!@mastercluster.hasjpif.mongodb.net/Club_Hipico")

db = cliente["Club_Hipico"]

db_caballos = db["caballos"]
db_fichas = db["fichas_medicas"]
db_usuarios = db["usuarios"]

def getPplData():
    with open('./nentrada.txt', 'r', encoding='UTF-8') as f:
        for linea in f.readlines():
            yield linea.split('\n')[0].split(',')

def getHssData():
    with open('./caballos.txt', 'r', encoding='UTF-8') as f:
        for linea in f.readlines():
            yield linea.split('\n')

personal_data = list(getPplData())
horse_names = list(map(lambda x: x[0], list(getHssData())))

print('-------------PERSONAS--------------\n{}\n------------------CABALLOS---------------\n{}'.format(personal_data, horse_names))



def crearCaballos():
    horses = []
    muestra = personal_data[20:40]
    for x in range(0, 6):
        ncab = horse_names[x]
        npr = muestra[x][1]
        plantilla = {
            'nombre': horse_names[x],
            'propietario': muestra[x][1],
            'codigo_caballo': '{}'.format(((ncab[1:3])+(npr[1:3]))),
            'codigo_equipo': '011tell',
            'codigo_corral': 'crr001'
        }
        horses.append(plantilla)
    return horses

dfs = crearCaballos()

print('\n---------------data a insertar------------\n', dfs)

def guardarCaballos():
    for hs in dfs:
        db_caballos.insert_one(hs)

guardarCaballos()