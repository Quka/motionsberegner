import axios, { AxiosResponse, AxiosError} from "../../node_modules/axios/index";
import { IProfile } from "./IProfile";

let uri : string = "https://motionsberegnerrestservice20181203104407.azurewebsites.net/api/profile/";

let element: HTMLDivElement = <HTMLDivElement>document.getElementById("content");

    //LOGIN PAGE
let btn1: HTMLButtonElement = <HTMLButtonElement>document.getElementById("loginButton"); 
btn1.addEventListener('click', removeToProfil);

    //OPRET PAGE
let btn2: HTMLButtonElement = <HTMLButtonElement>document.getElementById("opretButton"); 
btn2.addEventListener('click', removeToOpret);

//let backButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("backButton") //BACK TO HOMEPAGE
//backButton.addEventListener('click', backToHomePage);

/*****************************************************************************************************/

    //GET PROFILE BY ID
let btn3: HTMLButtonElement = <HTMLButtonElement> document.getElementById("getButton");
btn3.addEventListener('click', getProfileById);

/*****************************************************************************************************/
    //GET ALL PROFILES
// let AllProfiles : HTMLDivElement = <HTMLDivElement> document.getElementById("AllProfiles") 
// let btn4: HTMLButtonElement = <HTMLButtonElement> document.getElementById("getAllButton")
// btn4.addEventListener('click', getAllProfiles)

//let CreateProfile : HTMLDivElement = <HTMLDivElement> document.getElementById("CreateProfile") 
// let btn5: HTMLButtonElement = <HTMLButtonElement> document.getElementById("CreateProfileButton")
// btn5.addEventListener('click', createProfile)

/*****************************************************************************************************/

function homepage(): void 
{
    //HOME PAGE
    "<input id=input placeholder='Indtast brugernavn her'><br>"
    "<input id=input placeholder='Indtast kodeord her'>"
    "<button id=loginButton>Login</button>"
    "<button id=opretButton>Opret profil</button>"
}

/*****************************************************************************************************/

function profilePage(): string {
    let html;
    
    html = "<h2>Profil</h2> ";
    html += "<h6>Brugeroplysninger</h6><br>";
    html += 
    "<h7 id='navn'>Navn</h7><br><br>" + 
        "<div id='name'></div><br>" +

    "<h7>Efternavn</h7><br><br>" + 
        "<div id='lastname'></div><br>" +

    "<h7>Fødselsdato</h7><br><br>" + 
        "<div id='birthday'></div><br>" +

    "<h7>Vægt</h7><br><br>" + 
    // Indsæt database data her

    "<h7>Højde</h7><br><br>" + 
    // Indsæt database data her

    "<h7>Antal skridt</h7><br><br>";

    return html;
}

/*****************************************************************************************************/

function page2(): string {
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
    
    return html;
}

/*****************************************************************************************************/

function removeToProfil() : void {
    // Removes an element from the document
    var element = document.getElementById("content");
    element.innerHTML = profilePage();
}

/*****************************************************************************************************/

function removeToOpret() : void {
    // Removes an element from the document
    var element = document.getElementById("content");
    element.innerHTML = page2();
}

/*****************************************************************************************************/


// function backToHomePage(): void {
//     // Removes an element from the document
//     //var element = document.getElementById("content");
//     if(lastPage = "profilePage") {
//         profilePage();
//     }
//     else if(lastPage = "page2") {
//         page2();
//     }
//     else if(lastPage = "homepage") {
//         homepage();
//     }
// }

/*****************************************************************************************************/

    /*GET ONE PROFILE*/
function getProfileById(): void {  
    let id : HTMLInputElement = document.getElementById("idToGet") as HTMLInputElement;
    let result  = uri + id.value;

    axios.get<IProfile>(result).then(function(response)
    {
        //Removes an element from the document
        var element = document.getElementById("content");
        element.innerHTML = profilePage();
        let ProfileFName = document.getElementById("name"); 
        ProfileFName.innerHTML = response.data.firstName;

        let ProfileLName = document.getElementById("lastname"); 
        ProfileLName.innerHTML = response.data.lastName;

        let ProfileBday = document.getElementById("birthday"); 
        ProfileBday.innerHTML = String (response.data.birthday);
        
    
    })
    
}

/*****************************************************************************************************/

    /*GET ALL PROFILES*/
// function getAllProfiles():void {
//     let res: string = "<ul>";

//     axios.get<IProfile[]>(uri).then(function(response: AxiosResponse<IProfile[]>):void
//     {
//         response.data.forEach((profile : IProfile) => {
//             //console.log(profile);
//             res += "<li>"+ "ID:"+ " "  + "   " + "First name:" + " " + profile.firstName + "   " + "Last name:" + " " + profile.lastName + "   " +  "Birthday:" + " " + profile.birthday.toString() + "</li>";
//         });
//     })
//     .then(function(response)
//     {
//         res += "</ul>";
//         AllProfiles.innerHTML = res;
//     });

// }

/*****************************************************************************************************/

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

/*****************************************************************************************************/

function deleteProfile(): void {
        let id : HTMLInputElement = document.getElementById("deleteId") as HTMLInputElement;
        let result = uri + id.value;

    axios.delete(result);
    }

        