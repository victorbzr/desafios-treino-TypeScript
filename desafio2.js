"use strict";
// Como podemos melhorar o esse código usando TS? 
/*
let pessoa1 = {};
pessoa1.nome = "maria";
pessoa1.idade = 29;
pessoa1.profissao = "atriz"

let pessoa2 = {}
pessoa2.nome = "roberto";
pessoa2.idade = 19;
pessoa2.profissao = "Padeiro";

let pessoa3 = {
    nome: "laura",
    idade: "32",
    profissao: "Atriz"
};

let pessoa4 = {
    nome = "carlos",
    idade = 19,
    profissao = "padeiro"
}*/
var Trabalho;
(function (Trabalho) {
    Trabalho[Trabalho["atriz"] = 0] = "atriz";
    Trabalho[Trabalho["padeiro"] = 1] = "padeiro";
})(Trabalho || (Trabalho = {}));
let pessoa1 = {
    nome: "maria",
    idade: 29,
    profissao: Trabalho.atriz
};
let pessoa2 = {
    nome: "roberto",
    idade: 19,
    profissao: Trabalho.padeiro
};
let pessoa3 = {
    nome: "laura",
    idade: "32",
    profissao: Trabalho.atriz
};
let pessoa4 = {
    nome: "carlos",
    idade: 19,
    profissao: Trabalho.padeiro
};
