import { faker } from '@faker-js/faker';

function generateCOLLEC_01(nbr) {
let list_COLLEC :any[] = []; 
let i=0;
    for (i=0 ; i<nbr; i++) {  
        const COLLEC_01 = {
            id: i+1,
            nom: faker.person.lastName(),
        }
        list_COLLEC.push (COLLEC_01);
    }
    return list_COLLEC;
}

console.log(generateCOLLEC_01(100));
