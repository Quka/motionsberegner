import axios, { AxiosResponse, AxiosError} from "../../node_modules/axios/index";
import { IProfile } from "./IProfile";
import { Login } from "./Login";
import { ProfilePage } from "./Views/ProfilePage";

let login: Login = new Login();
let pProfile: ProfilePage = new ProfilePage();
let userProfile: IProfile;

// URL to our online webservice
let uri : string = "https://motionsberegnerrestservice20181203104407.azurewebsites.net/api/profile/";


// Content is used to fill the html page
let lastPage: string = "";
let element: HTMLDivElement = <HTMLDivElement>document.getElementById("content");

/**
 * = = = = = = = = = = = = = = = = = = = = = = = = 
 * PROFILE PAGE EVENTS
 * = = = = = = = = = = = = = = = = = = = = = = = = 
 */
// When btn is pressed, call changepage function on index
// which gets passed an html page, it then sets the new page
let loginBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("loginButton");
loginBtn.addEventListener('click', () => {

    /**
     * Login user when pressing login button
     */
    let loginUsername: string = (<HTMLInputElement>document.getElementById("loginUsername")).value;
    let loginPassword: string = (<HTMLInputElement>document.getElementById("loginPassword")).value;
    
    login.Authenticate(uri, loginUsername, loginPassword);

    // Change the page
    changePage(pProfile.getPage());

    // Add eventlistenter to the added btn above
    let editProfileBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("editProfileBtn");
    editProfileBtn.addEventListener('click', () => {
        element.appendChild(pProfile.getEditProfileBox());

        // Add eventlistenter to the added btn above
        let saveProfileBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("saveProfileBtn");
        saveProfileBtn.addEventListener('click', () => {
            pProfile.updateProfile(uri, 1);
        });
    });
});


    // HOMEPAGE TO CREATE PROFILE PAGE
//let CreateProfilePage : HTMLDivElement = <HTMLDivElement> document.getElementById("CreateProfilePage") 
let btn2: HTMLButtonElement = <HTMLButtonElement>document.getElementById("CreateProfilePageButton"); 
btn2.addEventListener('click', removeToOpret);

    // GET PROFILE BY ID BUTTON
let ProfileById: HTMLDivElement = <HTMLDivElement> document.getElementById("ProfileById") 
let btn3: HTMLButtonElement = <HTMLButtonElement> document.getElementById("getButton");
btn3.addEventListener('click', getProfileById);


    //GET ALL PROFILES BUTTON
let AllProfiles : HTMLDivElement = <HTMLDivElement> document.getElementById("AllProfiles") 
let btn4: HTMLButtonElement = <HTMLButtonElement> document.getElementById("getAllButton")
btn4.addEventListener('click', getAllProfiles)

    // CREATE PROFILE BUTTON 
let btn5: HTMLButtonElement = <HTMLButtonElement> document.getElementById("CreateProfileButton")
btn5.addEventListener('click', createProfile);

    // DELETE PROFILE BUTTON
let btn6: HTMLButtonElement = <HTMLButtonElement> document.getElementById("deleteButton")
btn6.addEventListener('click', deleteProfile);

function changePage(htmlPage: string) {
    var contentToChange = document.getElementById("content");
    contentToChange.innerHTML = htmlPage;
}

function homepage(): void 
{
    //HOME PAGE
    "<input id=input placeholder='Indtast brugernavn her'><br>"
    "<input id=input placeholder='Indtast kodeord her'>"
    "<button id=loginButton>Login</button>"
    "<button id=createButton>Opret profil</button>"
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
    "<div id='weight'></div><br>" +
    // Indsæt database data her

    "<h7>Højde</h7><br><br>" + 
    "<div id='height'></div><br>" +
    // Indsæt database data her

    "<h7>Antal skridt</h7><br><br>";

    return html;
}

/*****************************************************************************************************/

function opretProfilPage(): string {
    let html = "";
    html = "<h2>Opret profil</h2> ";
    html +="<h6>Brugeroplysninger</h6><br>";
    html += 
    "<h7>Navn</h7><br>" + 
        "<input type=input id=firstName placeholder='Fornavn'><br><br>" +
    "<h7>Efternavn</h7><br>" + 
        "<input type=input id=firstName placeholder='Fornavn'><br><br>" +
    "<h7>Fødselsdato</h7><br>" + 
    "<input type=input id=firstName placeholder='Fornavn'><br><br>" +
    "<h7>Vægt</h7><br>" + 
    "<input type=input id=firstName placeholder='Fornavn'><br><br>" +
    "<h7>Højde</h7><br>" + 
    "<input type=input id=firstName placeholder='Fornavn'><br><br>" +

    "<button id=createProfileButton> Gem og opret profil </button>";

    return html;
}

// Go to profile page
function removeToProfil() : void {
    // Removes an element from the document
    var element = document.getElementById("content");
    element.innerHTML = profilePage();
}

/*****************************************************************************************************/

function removeToOpret() : void {
    // Removes an element from the document
    var element = document.getElementById("content");
    element.innerHTML = opretProfilPage();
}

/*****************************************************************************************************/


// function backToHomePage(): void {
//     // Removes an element from the document
//     //var element = document.getElementById("content");
//     if(lastPage = "profilePage") {
//         profilePage();
//     }
//     else if(lastPage = "opretProfilPage") {
//         opretProfilPage();
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

        let ProfileWeight = document.getElementById("weight");
        ProfileWeight.innerHTML = String (response.data.weight);

        let ProfileHeight = document.getElementById("height");
        ProfileHeight.innerHTML = String (response.data.height);

       
        
        // response.data.steps.forEach( steps => {
        //     html += steps.steps 
        // });
    
    })
}

/*
function createNewProfile(): void {
        let firstName : HTMLInputElement  = document.getElementById("firstName") as HTMLInputElement;
        let lastName : HTMLInputElement = document.getElementById("lastName") as HTMLInputElement;
        let birthday : HTMLInputElement = document.getElementById("birthday") as HTMLInputElement;
        let weight : HTMLInputElement = document.getElementById("weight") as HTMLInputElement;
        let height : HTMLInputElement = document.getElementById("height") as HTMLInputElement;
        let result : IProfile;
    
}

/*****************************************************************************************************/

    /*GET ALL PROFILES*/
function getAllProfiles():void {
    let res: string = "<ul>";

    axios.get<IProfile[]>(uri).then(function(response: AxiosResponse<IProfile[]>):void
    {
        response.data.forEach((profile : IProfile) => {
            //console.log(profile);
            res += "<li>"+ "ID:"+ " "  + "   " + "First name:" + " " + profile.firstName + "   " + "Last name:" + " " + profile.lastName + "   " +  "Birthday:" + " " + profile.birthday.toString() + " " + "Weight:" + " " + profile.weight + " " + "Height:" + " " + profile.height + "</li>";
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
        let weight : HTMLInputElement = <HTMLInputElement> document.getElementById("weight")
        let height : HTMLInputElement = <HTMLInputElement> document.getElementById("Højde")

        let myFirstname:string = firstName.value;
        let myLastame:string = lastName.value;
        let myBirthday:Number = Number (birthday.value);
        let myWeight:Number = Number (weight.value);
        let myHeight:Number = Number (height.value);


        //let result : IProfile = {firstName: firstName.value , lastName : lastName.value, birthday : birthday.valueAsDate};
        
        axios.post<IProfile[]> (uri, {firstname:myFirstname, lastname:myLastame, birthDay:myBirthday, weight:myWeight, height:myHeight})
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
calculateBMI(80, 180);
