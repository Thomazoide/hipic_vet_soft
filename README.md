# hipic_vet_soft

*Proyecto realizado para el ramo proyecto de título de la universidad.*

##Resumen del proyecto

El proyecto consiste en la creación de una plataforma web en la que pueden acceder los usuarios del establecimiento CLub Hípico, para manejar los datos de los caballos de cada equipo y prevenir cualquier tipo de inconveniente a la hora de querer inscribir un caballo en una carrera basado en el historial médico de este.

###El sistema cuenta con usuarios basados en roles, de los cuales hay 3:

1. Administrador:
El usuario administrador, a traves de su interfaz de usuario puede añadir-eliminar-modificar otros usuarios, ver los equipos, sus corrales y sus veterinarios integrantes, asi como tambien, ver los exámenes realizados en cada caballo del equipo. Además de esto, puede enviar notificaciones a los equipos.
2. Preparador:
El usuario preparador, a traves de su interfaz de usuario puede añadir usuarios veterinarios a su equipo, añadir caballos, asignarles corral y modificarlos si es necesario. Además puede ver los examenes realizados de cada caballo.
3. Veterinario:
El usuario veterinario a traves de su interfaz de usuario puede ver los caballos del equipo al que este pertenece y añadir exámenes al historial médico de los caballos, asi como también puede crear una ficha veterinaria en caso de que no exista y eliminarla en caso de ser necesario.

###Herramientas utilizadas en la construccion del software

-Backend:
Node.js, express, cors, mongodb
-Frontend:
HTML, CSS, bootstrap, react, axios, rut.js, vite

###Despliegue de la app

El backend de la app se encuentra desplegado en una maquina virtual de EC2 de AWS, mientras que el frontend se encuentra desplegado en vercel.
[Hipic-Vet](https://hipic-vet.vercel.app/)

*Si estás interesado en probar la app más a fondo te invito a escribirme un correo a ttellerias01@outlook.com para brindarte un usuario y contraseña para que pruebes la app.*
