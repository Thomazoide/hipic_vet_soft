from pymongo import MongoClient
from datetime import date, timedelta
import random as r

dc = MongoClient("mongodb+srv://Thomazoide:Thom1232!@mastercluster.hasjpif.mongodb.net/Club_Hipico")

club_hipico = dc["Club_Hipico"]

corrales = club_hipico['corrales']

caballos = club_hipico['caballos']

def lArchivo():
    with open('nentrada.txt', 'r', encoding='UTF-8') as f:
        for linea in f.readlines():
            yield linea.split('\n')[0].split(',')

def openFile():
    with open('caballos.txt', 'r', encoding='UTF-8') as f:
        for linea in f.readlines():
            yield linea.split('\n')[0]

data = list(map(lambda x: [x[0], x[1]], list(lArchivo())))

jts = data[0:24]

props = data[25:48]

print('--------------------USUARIOS---------------------\n',jts,'\n-----------------------------PROPIETARIOS------------------------\n', props)

ncaballos = list(openFile())

def crearJinetes():
    jins = []
    for x in range(0, 24):
        plantilla={
            'nombre': data[x][1],
            'rut': data[x][0],
            'salario': str(r.randrange(600000, 1000000))+' clp',
            'estatura': str(r.randrange(135, 172)+(r.randrange(0,100)*0.01))+' cm',
            'cant_victorias': '',
            'carreras_corridas': '20',
            'ratio_victorias': '',
            'cod_corral': ''
        }
        jins.append(plantilla)
    return jins

def crearCaballos():
    horses = []
    for x in range(0, 24):
        ini = date.today().replace(day=1, month=1).toordinal()
        end = date.today().toordinal()
        fechaR = date.fromordinal(r.randint(ini, end))
        plantilla = {
            'nombre': ncaballos[x],
            'peso': str(r.randrange(700, 1235)+(r.randrange(0, 100)*0.01))+' Kg',
            'propietario': '',
            'cant_victorias': '',
            'carreras_corridas': '',
            'ratio_victorias': '',
            'codigo_caballo': '',
            'codigo_equipo': '',
        }
        horses.append(plantilla)
    return horses

def crearCorrales():
    stables = []
    for x in range(0, 6):
        plantilla = {
            'codigo_equipo': str(r.randrange(5486, 8632)),
            'capacidad_caballos': '8',
            'victorias': '',
            'carreras_corridas': '20',
            'ratio_victorias': ''
        }
        stables.append(plantilla)
    return stables

#def asignarCorrales():
    
    horses = crearCaballos()
    stables = crearCorrales()
    cont = 0
    vics = 0
    valor_maximo = 20
    while(cont<4):
        
        cod = stables[0]['cod_corral']
        if valor_maximo == 0: cv = 0
        else: cv = r.randrange(0,2)
        ratio = (cv/20)*100
        valor_maximo -= cv
        horses[cont]['cod_corral'] = cod
        horses[cont]['cant_victorias'] = str(cv)
        horses[cont]['ratio_victorias'] = str(ratio)+' %'
        vics += cv
        cont += 1
        
    stables[0]['victorias'] = str(vics)
    stables[0]['ratio_victorias'] = str((vics/20)*100)+' %'
    vics = 0
    while(cont > 3 and cont < 8):
        cod = stables[1]['cod_corral']
        if valor_maximo == 0: cv = 0
        else: cv = r.randrange(0,3)
        ratio = (cv/20)*100
        valor_maximo -= cv
        horses[cont]['cod_corral'] = cod
        horses[cont]['cant_victorias'] = str(cv)
        horses[cont]['ratio_victorias'] = str(ratio)+' %'
        vics += cv
        cont += 1
        
    stables[1]['victorias'] = str(vics)
    stables[1]['ratio_victorias'] = str((vics/20)*100)+' %'
    vics = 0
    while(cont > 7 and cont < 12):
        cod = stables[2]['cod_corral']
        if valor_maximo == 0: cv = 0
        else: cv = r.randrange(0,2)
        ratio = (cv/20)*100
        valor_maximo -= cv
        horses[cont]['cod_corral'] = cod
        horses[cont]['cant_victorias'] = str(cv)
        horses[cont]['ratio_victorias'] = str(ratio)+' %'
        vics += cv
        cont += 1
        
    stables[2]['victorias'] = str(vics)
    stables[2]['ratio_victorias'] = str((vics/20)*100)+' %'
    vics = 0
    while(cont > 11 and cont < 16):
        cod = stables[3]['cod_corral']
        if valor_maximo == 0: cv = 0
        else:cv = r.randrange(0,3)
        ratio = (cv/20)*100
        valor_maximo -= cv
        riders[cont]['cod_corral'] = cod
        riders[cont]['cant_victorias'] = str(cv)
        riders[cont]['ratio_victorias'] = str(ratio)+' %'
        horses[cont]['cod_corral'] = cod
        horses[cont]['cant_victorias'] = str(cv)
        horses[cont]['ratio_victorias'] = str(ratio)+' %'
        vics += cv
        cont += 1
        
    stables[3]['victorias'] = str(vics)
    stables[3]['ratio_victorias'] = str((vics/20)*100)+' %'
    vics = 0
    while(cont > 15 and cont < 20):
        cod = stables[4]['cod_corral']
        if valor_maximo == 0: cv = 0
        else: cv = r.randrange(0,4)
        ratio = (cv/20)*100
        valor_maximo -= cv
        riders[cont]['cod_corral'] = cod
        riders[cont]['cant_victorias'] = str(cv)
        riders[cont]['ratio_victorias'] = str(ratio)+' %'
        horses[cont]['cod_corral'] = cod
        horses[cont]['cant_victorias'] = str(cv)
        horses[cont]['ratio_victorias'] = str(ratio)+' %'
        vics += cv
        cont += 1
        
    stables[4]['victorias'] = str(vics)
    stables[4]['ratio_victorias'] = str((vics/20)*100)+' %'
    vics = 0
    while(cont > 19 and cont <= 23):
        cod = stables[5]['cod_corral']
        if (valor_maximo == 0 or valor_maximo < 0): cv = 0
        else: cv = r.randrange(0, valor_maximo)
        ratio = (cv/20)*100
        valor_maximo -= cv
        riders[cont]['cod_corral'] = cod
        riders[cont]['cant_victorias'] = str(cv)
        riders[cont]['ratio_victorias'] = str(ratio)+' %'
        horses[cont]['cod_corral'] = cod
        horses[cont]['cant_victorias'] = str(cv)
        horses[cont]['ratio_victorias'] = str(ratio)
        vics += cv
        cont+=1
    cv = str(valor_maximo)
    cod = stables[5]['cod_corral']
    riders[23]
    vics += int(cv)
    stables[5]['victorias'] = str(vics)
    stables[5]['ratio_victorias'] = str((vics/20)*100)+' %'
    
    for indice in range(len(stables)):
        ratio = float(stables[indice]['ratio_victorias'].split(' ')[0])
        if ratio == 0: ratio = 1
        else: ratio = ratio
        stables[indice]['balance_mensual'] = str( r.randrange(10000000, 60000000) * ratio  )
    return [stables, riders, horses]

#def guardarDatos():
    info = asignarCorrales()
    for jinete in info[1]:
        jinetes.insert_one(jinete)
    for corral in info[0]:
        corrales.insert_one(corral)
    for caballo in info[2]:
        caballos.insert_one(caballo)
