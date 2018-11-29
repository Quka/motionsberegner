import axios, { AxiosResponse, AxiosError} from "../../node_modules/axios/index";

import { Profile } from "./Profile";

let p = new Profile("Rasmus");
console.log(p.showName());


let element: HTMLDivElement = <HTMLDivElement>document.getElementById("content");
let btn1: HTMLButtonElement = <HTMLButtonElement>document.getElementById("loginButton");

btn1.addEventListener('click', removeElement);



function page1(): void {
    let html = "";
    html = "<h2>Profil</h2> ";
    html += "<h3>Brugeroplysnigner</h3>";

    element.innerHTML = html;
    
}


function removeElement() : void {
    // Removes an element from the document
    var element = document.getElementById("content");
    element.innerHTML = "";
    page1();
}