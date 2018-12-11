import axios, { AxiosResponse, AxiosError} from "../../node_modules/axios/index";
import { IProfile } from "./IProfile";
import { Login } from "./Login";
import { ProfilePage } from "./Views/ProfilePage";
import { CreateProfilePage } from "./Views/CreateProfilePage";


// URL to our online webservice
let uri : string = "https://motionsberegnerrestservice20181203104407.azurewebsites.net/api/profile/";

// Declare global login variable
let login: Login = new Login();

let pProfile: ProfilePage; // Is initialized when user is authenticated (below)
let pCreateProfile: CreateProfilePage = new CreateProfilePage(uri);



// Content is used to fill the html page
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
            pProfile = new ProfilePage(uri, login);

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
let CreateProfilePageButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("createProfilePageButton"); 
CreateProfilePageButton.addEventListener('click', () => {
    changePage(
        pCreateProfile.getPage( element )
    );
});

function changePage(htmlPage: HTMLElement) {
    var contentToChange = document.getElementById("content");
    contentToChange = htmlPage;
}
    
// Delete function
function deleteProfile(): void {
    let id : HTMLInputElement = document.getElementById("idToDelete") as HTMLInputElement;
    let result = uri + id.value;
    axios.delete(result);
}