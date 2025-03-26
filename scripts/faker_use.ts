import { faker } from '@faker-js/faker';

function generateUsers(quantity: number): MongoUser[] {
    const userList: MongoUser[] = []; 

    for (let i = 0; i<quantity; i++) {  
        const user: MongoUser = {
            id: i+1,
            nom: faker.person.lastName(),
        }

        userList.push(user);
    }
    return userList;
}

console.log(generateUsers(100));
