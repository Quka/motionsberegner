import axios, { AxiosResponse, AxiosError} from "../../node_modules/axios/index";
import { IProfile } from "./IProfile";

let uri : string = "https://motionsberegnerrestservice20181203104407.azurewebsites.net/api/profile";
let lastPage = "";
let element: HTMLDivElement = <HTMLDivElement>document.getElementById("content");

let btn1: HTMLButtonElement = <HTMLButtonElement>document.getElementById("loginButton"); // LOGIN PAGE
btn1.addEventListener('click', removeToProfil);

let btn2: HTMLButtonElement = <HTMLButtonElement>document.getElementById("opretButton"); // OPRET PAGE
btn2.addEventListener('click', removeToOpret);

//let backButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("backButton") //BACK TO HOMEPAGE
//backButton.addEventListener('click', backToHomePage);

// GET PROFILE BY ID
let ProfileById: HTMLDivElement = <HTMLDivElement> document.getElementById("ProfileById") 
let btn3: HTMLButtonElement = <HTMLButtonElement> document.getElementById("getButton");
btn3.addEventListener('click', getProfileById)

// GET ALL PROFILES
let AllProfiles : HTMLDivElement = <HTMLDivElement> document.getElementById("AllProfiles") 
let btn4: HTMLButtonElement = <HTMLButtonElement> document.getElementById("getAllButton")
btn4.addEventListener('click', getAllProfiles)

//let CreateProfile : HTMLDivElement = <HTMLDivElement> document.getElementById("CreateProfile") 
let btn5: HTMLButtonElement = <HTMLButtonElement> document.getElementById("CreateProfileButton")
btn5.addEventListener('click', createProfile)


//let resultOfNewProfile : HTMLDivElement = <HTMLDivElement> document.getElementById("")



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

function getProfileById(): void {
       let id : HTMLInputElement = document.getElementById("idToGet") as HTMLInputElement;
       let result  = uri + id.value;
        
       axios.get<IProfile>(result).then(function(response)
    {
        console.log(response);
        ProfileById.innerHTML =  response.data.firstName + "   " + response.data.lastName + "   "  + response.data.birthday;
    })
}

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

    
// function deleteProfile(): void {
//         let id : HTMLInputElement = document.getElementById("deleteId") as HTMLInputElement;
//         let result = uri + id.value;

//     axios.delete(result);
//     }

        