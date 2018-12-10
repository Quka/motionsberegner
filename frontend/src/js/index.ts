import axios, { AxiosResponse, AxiosError} from "../../node_modules/axios/index";
import { IProfile } from "./IProfile";
import { Login } from "./Login";
import { ProfilePage } from "./Views/ProfilePage";
import { CreateProfilePage } from "./Views/CreateProfilePage";


// URL to our online webservice
let uri : string = "https://motionsberegnerrestservice20181203104407.azurewebsites.net/api/profile/";

let login: Login = new Login();
let pProfile: ProfilePage = new ProfilePage();
let pCreateProfile: CreateProfilePage = new CreateProfilePage(uri);



// Content is used to fill the html page
let lastPage: string = "";
let element: HTMLElement = document.getElementById("content") as HTMLElement;

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
    
    login.Authenticate(uri, loginUsername, loginPassword)
    .then((response) => {
        if(response) {
            changePage(
                pProfile.getPage( element )
            );
        }
        else {
            let errDiv: HTMLDivElement = <HTMLDivElement> document.createElement("div");
            errDiv.innerHTML = "Error: Couldn't log in";
            errDiv.className = "error-popup";
            element.appendChild(errDiv);
        }
    })
    .catch((error) => {
        console.log(error);
    });
});
 

    // HOMEPAGE TO CREATE PROFILE PAGE
//let CreateProfilePage : HTMLDivElement = <HTMLDivElement> document.getElementById("CreateProfilePage") 
let CreateProfilePageButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("CreateProfilePageButton"); 
CreateProfilePageButton.addEventListener('click', () => {
    changePage(
        pCreateProfile.getPage( element )
    );
});

    // GET PROFILE BY ID BUTTON
/* let ProfileById: HTMLDivElement = <HTMLDivElement> document.getElementById("ProfileById") 
let btn3: HTMLButtonElement = <HTMLButtonElement> document.getElementById("getButton");
btn3.addEventListener('click', getProfileById);*/


    //GET ALL PROFILES BUTTON
/*let AllProfiles : HTMLDivElement = <HTMLDivElement> document.getElementById("AllProfiles") 
let btn4: HTMLButtonElement = <HTMLButtonElement> document.getElementById("getAllButton")
btn4.addEventListener('click', getAllProfiles)*/

    // DELETE PROFILE BUTTON
/*let btn6: HTMLButtonElement = <HTMLButtonElement> document.getElementById("deleteButton")
btn6.addEventListener('click', deleteProfile);*/

function changePage(htmlPage: HTMLElement) {
    var contentToChange = document.getElementById("content");
    contentToChange = htmlPage;
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

/*GET ONE PROFILE*/
function getProfileById(): void {  
    let id : HTMLInputElement = document.getElementById("idToGet") as HTMLInputElement;
    let result  = uri + id.value;

    axios.get<IProfile>(result).then(function(response)
    {
        //Removes an element from the document
        var element = document.getElementById("content");
        //element.innerHTML = profilePage();
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


/*****************************************************************************************************/

/*GET ALL PROFILES*/
/*
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
*/
    
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
