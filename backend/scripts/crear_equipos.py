from pymongo import MongoClient
import random as r

cliente = MongoClient("mongodb+srv://Thomazoide:Thom1232!@mastercluster.hasjpif.mongodb.net/Club_Hipico")

db = cliente['Club_Hipico']

equipos = db['equipos']

corrales = db['corrales']

def crearEquipos():
    lista = []
    for x in range(1, 61):
        plantilla = {}
        plantilla['codigo'] = ('equipo'+str(x))
        plantilla['prep'] = 'open'
        lista.append(plantilla)
    return lista

teams = crearEquipos()

def guardarEquiposEnDB():
    for t in teams:
        try:
            equipos.insert_one(t)
        except:
            print('error')
        else:
            print('Equipo {} insertado correctamente'.format(t))

def crearCorrales():
    crrs = []
    for i in range(1,61):
        plantilla = {}
        plantilla['cod_corral'] = ('crr0'+str(i))
        plantilla['capacidad'] = str(r.choice(range(6, 13)))
        plantilla['cant_caballos'] = 0
        plantilla['equipo'] = 'open'
        crrs.append(plantilla)
    return crrs

stables = crearCorrales()

def guardarCorralesEnDB():
    for s in stables:
        try:
            corrales.insert_one(s)
        except Exception as err:
            print('Error al insertar {}\nError: {}'.format(s, err))
        else:
            print('Corral: {} \n Insertado correctamente...'.format(s))

print('EQUIPOS:')

for i, t in enumerate(teams):
    print('{}: {}'.format(i+1,t))

print('CORRALES:')

for i, c in enumerate(stables):
    print('{}: {}'. format(i+1, c))

def exeScript():
    guardarCorralesEnDB()
    guardarEquiposEnDB()

exeScript()