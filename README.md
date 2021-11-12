# Aplicación de Clima

Iniciar los modulos de node 

> npm i

## Notas || Documentacion de la aplicacion

### Sobre Package.json
    * Este Archvo no solo nos sirve para guardar la info de los paquetes instalados 
    * Tambien nos ayuda a crear scripts de inicializacion, en este caso para iniciar la app:
    ~~~
    
    "scripts": {
            "start": "node index.js"
        } 
    
    ~~~
    
#### Paquetes

1. inquirer
    * Nos permite crear una interfas amena e interactiva en la consola<br>
    * Podemos crear listas, confirmaciones, etc. Y manejarlo mediante la flechas

2. colors 
    * Este paquete nos sirve para colorear el texto que se muestra en pantalla

3. axios
    * Es una libreria para peticiones de APIs que trabaja en base a promesas

4. dotenv
    * Neserario para poder leer archivos .env donde guardamos variables de entorno
    que estan guardadas como string estas se llaman por medio del comando 
    process.env.NOMBRE_VARIABLE
    * *Nota* usualmente el .env original no se sube ya que solo usadas solo en produccion
    * Es regular hacer un example.env donde se ponen solo los nombre para saber que 
    es lo que tenemos que agregar

#### MapBox 

* Es un servicio de ubicacion que cuenta con una API de direcciones [mapbox](https://www.mapbox.com/)

#### OpenWeather 

* Api de clima [openweather](https://openweathermap.org/)
