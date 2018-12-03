import axios, { AxiosResponse, AxiosError} from "../../node_modules/axios/index";

import { Profile } from "./Profile";

let p = new Profile("Rasmus");
console.log(p.showName());

let lastPage = "";
let element: HTMLDivElement = <HTMLDivElement>document.getElementById("content");
let btn1: HTMLButtonElement = <HTMLButtonElement>document.getElementById("loginButton");
let btn2: HTMLButtonElement = <HTMLButtonElement>document.getElementById("opretButton");
let backButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("backButton")
btn1.addEventListener('click', removeToProfil);
btn2.addEventListener('click', removeToOpret);
backButton.addEventListener('click', backToHomePage);


function homepage(): void 
{
    lastPage = "homepage";
    //HOME PAGE
    "<input id=input placeholder='Indtast brugernavn her'><br>"
    "<input id=input placeholder='Indtast kodeord her'>"
    "<button id=loginButton>Login</button>"
    "<button id=opretButton>Opret profil</button>"
}

function page1(): void {
    lastPage = "page1";
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
    "<h7>Antal skridt</h7><br><br>" +


    "<button id='backButton'>Tilbage</button>"+


    "<div id='userResult'></div>";
    interface IProfile {
        firstName : string;
        lastName : string;
        age : number;
        
       }
    let resultOfProfile : HTMLDivElement = <HTMLDivElement> document.getElementById("userResult")
    function getProfile(): void {
        let uri : string = "http://motionsberegner.database.windows.net/profile" 
        let result  = uri 
        axios.get<IProfile>(result)
           .then(function(response){
            resultOfProfile.innerHTML =  response.data.firstName + "   " + response.data.lastName + "   "  + response.data.age;
          })
        
        }
    getProfile();


    element.innerHTML = html;  
}

function page2(): void {
    lastPage = "page2";
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
    "<input id=input placeholder='Indtast højde her'><br><br>"+

    "   <button id=opretButton>Gem og opret profil</button>";
    
    element.innerHTML = html;
}



function removeToProfil() : void {
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

function backToHomePage(): void {
    // Removes an element from the document
    //var element = document.getElementById("content");
    if(lastPage = "page1") {
        page1();
    }
    else if(lastPage = "page2") {
        page2();
    }
    else if(lastPage = "homepage") {
        homepage();
    }
}