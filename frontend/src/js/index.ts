import axios, { AxiosResponse, AxiosError} from "../../node_modules/axios/index";

import { Profile } from "./Profile";

let p = new Profile("Rasmus");
console.log(p.showName());


let element: HTMLDivElement = <HTMLDivElement>document.getElementById("content");
let btn1: HTMLButtonElement = <HTMLButtonElement>document.getElementById("loginButton");
let btn2: HTMLButtonElement = <HTMLButtonElement>document.getElementById("opretButton");

btn1.addEventListener('click', removeToLogin);
btn2.addEventListener('click', removeToOpret);



function page1(): void {
    let html = "";
    html = "<h2>Profil</h2> ";
    html += "<h6>Brugeroplysninger</h6><br>";
    html += 
    "<h7>Navn</h7><br><br>" + 
    // Indsæt database data her
    "<h7>Efternavn</h7><br><br>" + 
    // Indsæt database data her
    "<h7>Fødselsdato</h7><br><br>" + 
    // Indsæt database data her
    "<h7>Vægt</h7><br><br>" + 
    // Indsæt database data her
    "<h7>Højde</h7><br><br>" + 
    // Indsæt database data her
    "<h7>Antal skridt</h7><br><br>";

    
    element.innerHTML = html;  
}

function page2(): void {
    let html = "";
    html = "<h2>Opret profil</h2> ";
    html += "<h6>Brugeroplysninger</h6><br>";
    html += 
    "<h7>Navn</h7><br>" + 
    "<input id=input placeholder='Indtast fornavn her'><br><br>" +
    "<h7>Efternavn</h7><br>" + 
    "<input id=input placeholder='Indtast efternavn her'><br><br>" +
    "<h7>Fødselsdato</h7><br>" + 
    "<input id=input placeholder='Indtast fødselsdato her'><br><br>" +
    "<h7>Vægt</h7><br>" + 
    "<input id=input placeholder='Indtast vægt her'><br><br>" +
    "<h7>Højde</h7><br>" + 
    "<input id=input placeholder='Indtast højde her'><br><br>";
    
    
    element.innerHTML = html;

    
}


function removeToLogin() : void {
    // Removes an element from the document
    var element = document.getElementById("content");
    element.innerHTML = "";
    page1();
}

function removeToOpret() : void {
    // Removes an element from the document
    var element = document.getElementById("content");
    element.innerHTML = "";
    page2();
}