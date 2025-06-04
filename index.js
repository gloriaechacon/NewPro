/*const args = process.argv.slice(2);

if(args[0] === 'GET'){
    console.log(`Toma un dato`)
} else if(args[0] === 'POST'){
    console.log(`Recibimos ${args[1]} satisfactoriamente`)
} else if(args[0] === 'PUT'){
    console.log(`Modificamos el item con id: ${args[1]} satistactoriamente`)
} else if (args[0] === 'DELETE'){
    console.log(`El item cn el id: ${args[1]} se eliminó con exito`);
}
    */
import * as rickandmorty from 'rickmortyapi'

//Version async y await
async function taskAsync(){
    try{
        const response = await rickandmorty.getCharacters();
        if(response && response.data && response.data.results.length){
            return response;
        }else{
            throw new Error('Task abort');
        }
    }catch(error){
        throw new Error('Task abort');
    }
}

//Version con Promesas
function taskAsyncV2() {
     return new Promise((resolve, reject) => {
        rickandmorty.getCharacters()
            .then((response) => {
                if (response && response.data && response.data.results.length) {
                    resolve(response.data.results.slice(0, 5)); // devolvemos solo los primeros 5
                } else {
                    reject(new Error('Task abort'));
                }
            })
            .catch(() => {
                reject(new Error('Task abort'));
            });
    });
}

const args = process.argv.slice(2);

if(args[0] === 'GET'){
    taskAsync()
    .then((result)=>{
        const characters = result.data.results.slice(0, 5); // los primeros 5
            characters.forEach((character, index) => {
                console.log(`${index + 1}. ${character.name}`);
            });
    } )
            .catch(( error) => console.log(error))
            .finally(() => console.log('End of the task'));

    taskAsyncV2()
        .then((firstFiveCharacters) => {
            console.log(firstFiveCharacters); // arrray completo
        })
        .catch((error) => console.log(error.message))
        .finally(() => console.log('End of the task'));
}
