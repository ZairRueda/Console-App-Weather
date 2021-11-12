require('dotenv').config()


const { leerInput, inquirerMenu, pausa, listarLugares } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

 
/* Bucle

const main = async() => {

    const busquedas = new Busquedas();
    let opt;

    do{

        opt = await inquiererMenu()
        console.log({opt})

        switch ( opt ) {
            case 1:
                // Mostrar mensaje

                // Buscar los lugares

                // Seleccionar el lugar

                // Clima

                // Resultados
            break
        }

        if ( opt !== 0 ) await pausa()
    } while (opt !== 0)
}
*/

// Funcion principal asincrona
const main = async() => {

    const busquedas = new Busquedas();
    let opt;

    do{

        opt = await inquirerMenu();
        
        switch( opt ) {

            case 1:
                // Mostrar mensaje
                const termino = await leerInput('Ciudad: ');
                
                // Buscar los lugares
                const lugares = await busquedas.ciudad( termino );
                
                // Seleccionar el lugar
                const id = await listarLugares(lugares);
                // Por si no hay lugares 
                // continue : no mandara los codigos de abajo es como 
                // dijera saltata hasta otra iteracion
                if ( id === '0' ) continue;

                // Retorna el objeto que contiene el lugar, la latitud y Longitud
                const lugarSel = lugares.find( l => l.id === id );

                // Guardar en DB
                busquedas.agregarHistorial( lugarSel.nombre );

                // Clima
                const clima = await busquedas.climaLugar( lugarSel.lat, lugarSel.lng );

                // Mostrar resultados
                console.clear();
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:', lugarSel.nombre.green );
                console.log('Lat:', lugarSel.lat );
                console.log('Lng:', lugarSel.lng );
                console.log('Temperatura:', clima.temp );
                console.log('Mínima:', clima.min );
                console.log('Máxima:', clima.max );
                console.log('Como está el clima:',  clima.desc.green );

            break;


            case 2:
                 busquedas.historialCapitalizado.forEach( (lugar, i) =>  {
                     const idx = `${ i + 1 }.`.green;
                     console.log( `${ idx } ${ lugar } ` );
                 })

            break;

        }



        if ( opt !== 0 ) await pausa();

    } while ( opt !== 0 )



}



main();