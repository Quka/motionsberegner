import axios, { AxiosResponse, AxiosError} from "../../node_modules/axios/index";
import { IProfile } from "./IProfile";

// URL to our online webservice
let uri : string = "https://motionsberegnerrestservice20181203104407.azurewebsites.net/api/profile";

// Content is used to fill the html page
let element: HTMLDivElement = <HTMLDivElement>document.getElementById("content");

// Move to login page button
let btn1: HTMLButtonElement = <HTMLButtonElement>document.getElementById("loginButton"); // LOGIN PAGE
btn1.addEventListener('click', removeToProfil);

// Move to create profile page button
let btn2: HTMLButtonElement = <HTMLButtonElement>document.getElementById("opretButton"); // OPRET PAGE
btn2.addEventListener('click', removeToOpret);

//let backButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("backButton") //BACK TO HOMEPAGE
//backButton.addEventListener('click', backToHomePage);

// Get profile by id button
let ProfileById: HTMLDivElement = <HTMLDivElement> document.getElementById("ProfileById") 
let btn3: HTMLButtonElement = <HTMLButtonElement> document.getElementById("getButton");
btn3.addEventListener('click', getProfileById)

// Get all profiles button
let AllProfiles : HTMLDivElement = <HTMLDivElement> document.getElementById("AllProfiles") 
let btn4: HTMLButtonElement = <HTMLButtonElement> document.getElementById("getAllButton")
btn4.addEventListener('click', getAllProfiles)

// Create profile button
//let CreateProfile : HTMLDivElement = <HTMLDivElement> document.getElementById("CreateProfile") 
let btn5: HTMLButtonElement = <HTMLButtonElement> document.getElementById("CreateProfileButton")
btn5.addEventListener('click', createProfile)

// Delete profile button
let btn6: HTMLButtonElement = <HTMLButtonElement> document.getElementById("deleteButton")
btn6.addEventListener('click', deleteProfile)

let lastPage = "";

//let resultOfNewProfile : HTMLDivElement = <HTMLDivElement> document.getElementById("")

// Main page
function homepage(): void 
{
    lastPage = "homepage";
    //HOME PAGE
    "<input id=input placeholder='Indtast brugernavn her'><br>"
    "<input id=input placeholder='Indtast kodeord her'>"
    "<button id=loginButton>Login</button>"
    "<button id=opretButton>Opret profil</button>"
}

// Profile page
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
}

// Create new profile page
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

// Go to profile page
function removeToProfil() : void {
    // Removes an element from the document
    var element = document.getElementById("content");
    element.innerHTML = "";
    page1();
}

// Move to create profile function
function removeToOpret() : void {
    // Removes an element from the document
    var element = document.getElementById("content");
    element.innerHTML = "";
    page2();
}

// Back button
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

// Get profile by id function
function getProfileById(): void {
       let id : HTMLInputElement = document.getElementById("idToGet") as HTMLInputElement;
       let result  = uri + id.value;
        
       axios.get<IProfile>(result).then(function(response)
    {
        console.log(response);
        ProfileById.innerHTML =  response.data.firstName + "   " + response.data.lastName + "   "  + response.data.birthday;
    })
}

// Get all profiles function
function getAllProfiles():void {
    let res: string = "<ul>";

    axios.get<IProfile[]>(uri).then(function(response: AxiosResponse<IProfile[]>):void
    {
        response.data.forEach((profile : IProfile) => {
            //console.log(profile);
            res += "<li>"+ "ID:"+ " "  + "   " + "First name:" + " " + profile.firstName + "   " + "Last name:" + " " + profile.lastName + "   " +  "Birthday:" + " " + profile.birthday.toString() + "</li>";
        });
    })
    .then(function(response)
    {
        res += "</ul>";
        AllProfiles.innerHTML = res;
    });
}

// Create profile function
function createProfile(): void {
        let firstName : HTMLInputElement = <HTMLInputElement> document.getElementById("firstName");
        let lastName : HTMLInputElement = <HTMLInputElement> document.getElementById("lastName");
        let birthday : HTMLInputElement = <HTMLInputElement> document.getElementById("birthday");

        let myFirstname:string = firstName.value;
        let myLastame:string = lastName.value;
        let myBirthday:Number = Number (birthday.value);
        //let result : IProfile = {firstName: firstName.value , lastName : lastName.value, birthday : birthday.valueAsDate};
        
        axios.post<IProfile[]> (uri, {firstname:myFirstname, lastname:myLastame, birthDay:myBirthday})
        .then((Response:AxiosResponse) => {
            console.log(Response);
        })
        .catch((error:AxiosError) => {
            console.log(error);
        })
}
    
// Delete function
function deleteProfile(): void {
    let id : HTMLInputElement = document.getElementById("idToDelete") as HTMLInputElement;
    let result = uri + id.value;
    axios.delete(result);
}


// BMI calculator
function calculateBMI(weight: number, height: number):void {   
    const bmi = Math.round(weight / Math.pow((height/100), 2)); 
 
    const BMI: HTMLDivElement = <HTMLDivElement> document.getElementById("bmi");
    BMI.innerText = "BMI: " + bmi.toString();
}  
calculateBMI(this.Profile.weight, this.Profile.height);