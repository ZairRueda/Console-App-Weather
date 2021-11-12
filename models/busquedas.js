const fs = require('fs');

const axios = require('axios');

/* Clase ProtoBusqueda 

class Busqueda{

    historial = ['Mexico', 'Madrid'];

    construcor() {
        // TO DO: leer DB si existe
    }

    async ciudad(lugar = '') {
        // peticion http
    }
}

*/

class Busquedas {
    
    historial = [];

    // Archivo donde  guardamos la base de datos
    dbPath = './db/database.json';

    constructor() {
        this.leerDB();
    }

    get historialCapitalizado() {
        return this.historial.map( lugar => {

            let palabras = lugar.split(' ');
            
            // Le damos la primera letra en mayuscula y le sumamos el restro de la palabra
            palabras = palabras.map( p => {
                // console.log(p.substring(1));
                return p[0].toUpperCase() + p.substring(1)} );
            
            return palabras.join(' ')

        })
    }


    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsWeather() {
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    }

    async ciudad( lugar = '' ) {

        try {
            // Petición http
            const intance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                // Con Axios a la hora mandar una peticion los parametros adicionales, se agregan en la
                // propiedad params
                params: this.paramsMapbox
            });

            const resp = await intance.get();
            // Retornar un objeto de manera implicita ({ Objeto })
            return resp.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
            }));
            
        } catch (error) {
            // Retornar un elemento basio en caso de una error
            return [];
        }
    }


    async climaLugar( lat, lon ) {

        try {
            
            // Peticion usando axios
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                // Hemos destructurado nuestra peticion para que poder agregar valores extra
                params: { ...this.paramsWeather, lat, lon }
            })

            // la promesa que esperamos y el tipo de peticion
            const resp = await instance.get();
            const { weather, main } = resp.data;

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }

        } catch (error) {
            console.log(error);
        }

    }


    agregarHistorial( lugar = '' ) {

        // Prevenir duplicados
        if( this.historial.includes( lugar.toLocaleLowerCase() ) ){
            return;
        }

        // Para solo tener 6 elementos en el historial que traemos a la pantalla
        this.historial = this.historial.splice(0,5);

        this.historial.unshift( lugar.toLocaleLowerCase() );

        // Grabar en DB
        this.guardarDB();
    }

    guardarDB() {

        // Por si tenemos que agregar mas propiedades,creamos un objeto de referencia
        const payload = {
            historial: this.historial
        };

        fs.writeFileSync( this.dbPath, JSON.stringify( payload ) );

    }

    leerDB() {

        // El archivo existe?
        if( !fs.existsSync( this.dbPath ) ) return;
        
        const info = fs.readFileSync( this.dbPath, { encoding: 'utf-8' });
        const data = JSON.parse( info );

        this.historial = data.historial;


    }

}

/* Recoradorio
Cuando solo se tiene que exportar una sola clase o fuincion
esta sera la sintaxis o forma de exportar
*/
module.exports = Busquedas;