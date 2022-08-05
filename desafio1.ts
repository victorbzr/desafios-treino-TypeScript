// Como podemos rodar isso em um arquivo .ts sem causar erros? 
/*let employee = {};
employee.code = 10;
employee.name = "John";*/

// Resposta 1:

const employee1 = {
    code: 10,
    name: "John"
}

// Resposta 2:

const employee2: {code: number, name: string} = {
    code: 10,
    name: "John"
}

// Resposta 3:

interface Iemployee{
    name: string,
    code: number
}
const employee3 : Iemployee = {
    code: 10,
    name: "John"
}

//Resposta 4:

const employee4 = {} as Iemployee
employee4.code = 10;
employee4.name = "John";