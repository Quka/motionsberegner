import axios, { AxiosResponse, AxiosError} from "../../node_modules/axios/index";

import { Profile } from "./Profile";

let p = new Profile("Rasmus");
console.log(p.showName());


let element: HTMLDivElement = <HTMLDivElement>document.getElementById("content");
let btn1: HTMLButtonElement = <HTMLButtonElement>document.getElementById("loginButton");


btn1.addEventListener('click', page1);


function page1(): void {
    let html = "";
    html = "<h2>Profil</h2> ";
    html += "<h3>Brugeroplysnigner</h3>";

    element.innerHTML = html;
    removeElement();
}


function removeElement() : void {
    // Removes an element from the document
    var element = document.getElementById("");
    element.parentNode.removeChild(element);
}








function showAllCustomers():void {
    let uri : string = "http://restcustomerservice2.azurewebsites.net/api/customer"
axios.get<IUser[]>(uri)
.then(function(response: AxiosResponse<IUser[]>):void{

let result : string = "<ol>"
response.data.forEach((user : IUser) => {
    result += "<li>"+ "ID:"+ " " + customer.id + "   " + "First name:" + " " + customer.firstName + "   " + "Last name:" + " " + customer.lastName + "   " +  "Year:" + " " + customer.year.toString() + "</li>"
});
result += "<ol>"
resultOfAllCustomers.innerHTML = result;
}
)
};





function getProfileById(): void {
let uri : string = "http://restcustomerservice2.azurewebsites.net/api/customer/" 
let id : HTMLInputElement = document.getElementById("input") as HTMLInputElement;
let result  = uri + id.value;
axios.get<ICustomer>(result)
   .then(function(response){
    resulstOfSingleCustomer.innerHTML = response.data.id + "   " + response.data.firstName + "   " + response.data.lastName + "   "  + response.data.year;
  })

}


function createNewProfile(): void {
let uri : string = "http://restcustomerservice2.azurewebsites.net/api/customer/";

let id : HTMLInputElement = document.getElementById("id") as HTMLInputElement;
let firstName : HTMLInputElement  = document.getElementById("firstName") as HTMLInputElement;
let lastName : HTMLInputElement = document.getElementById("lastName") as HTMLInputElement;
let year : HTMLInputElement = document.getElementById("year") as HTMLInputElement;
let result : ICustomer = {id : id.valueAsNumber , firstName: firstName.value , lastName : lastName.value, year : year.valueAsNumber};

axios.post<ICustomer>(uri, result)
}

function deleteCustomer(): void {
let uri : string ="http://restcustomerservice2.azurewebsites.net/api/customer/"
let id : HTMLInputElement = document.getElementById("deleteId") as HTMLInputElement;

let result = uri + id.value;
axios.delete(result);