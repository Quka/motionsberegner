import axios, { AxiosResponse, AxiosError} from "../../../node_modules/axios/index";
import { IProfile } from "../IProfile";

export class CreateProfilePage {
    private uri : string;
    /**
     *
     */
    constructor(uri : string) {
        this.uri = uri;
    }

    getPage(parentHtml: HTMLElement): HTMLElement {
        // Empty the parent html page
        parentHtml.innerHTML = "";

        // Declare new html elements
        let title: HTMLElement = <HTMLElement> document.createElement("h1");
            title.innerHTML = "Opret profil";
        
        let subTitle: HTMLElement = <HTMLElement> document.createElement("h2");
            subTitle.innerHTML = "Brugeroplysninger";
        
        let profileInfo: HTMLElement = <HTMLElement> document.createElement("div");
            profileInfo.innerHTML = "empty as default";
            profileInfo.id = "profile-info";

        let profileFirstnameArea: HTMLElement = <HTMLElement> document.createElement("div");
            profileFirstnameArea.innerHTML = "Fornavn: ";
        let profileFirstnameInput: HTMLElement = <HTMLElement> document.createElement("input");
            profileFirstnameInput.id = "createFirstname";
            profileFirstnameArea.appendChild(profileFirstnameInput);

        let profileLastnameArea: HTMLElement = <HTMLElement> document.createElement("div");
            profileLastnameArea.innerHTML = "Efternavn: ";
        let profileLastnameInput: HTMLElement = <HTMLElement> document.createElement("input");
            profileLastnameInput.id = "createLastname";
            profileLastnameArea.appendChild(profileLastnameInput);

        let profileBirthdayArea: HTMLElement = <HTMLElement> document.createElement("div");
            profileBirthdayArea.innerHTML = "Fødselsdato: ";
        let profileBirthdayInput: HTMLElement = <HTMLElement> document.createElement("input");
            profileBirthdayInput.id = "createBirthday";
            profileBirthdayArea.appendChild(profileBirthdayInput);

            profileInfo.appendChild(profileFirstnameArea);
            profileInfo.appendChild(profileLastnameArea);
            profileInfo.appendChild(profileBirthdayArea);
        
        
        let CreateProfileBtn: HTMLElement = <HTMLElement> document.createElement("button");
            CreateProfileBtn.innerHTML = "Create profile";
            CreateProfileBtn.className = "btn";
            CreateProfileBtn.id = "saveCreateProfileBtn";
            
        /*
        html += "<h7>Navn</h7><br><br>" + 
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
        */

        parentHtml.appendChild(title);
        parentHtml.appendChild(subTitle);
        parentHtml.appendChild(profileInfo);
        parentHtml.appendChild(CreateProfileBtn);

        CreateProfileBtn.addEventListener('click', () => {
            this.createProfile(this.uri);
        });

        return parentHtml;
    }

    createProfile(uri:string) : boolean {
        
        let createFirstname: string = (<HTMLInputElement> document.getElementById("createFirstname")).value;
        let createLastName: string = (<HTMLInputElement> document.getElementById("createLastname")).value;
        let createBirthday: Date = new Date( (<HTMLInputElement> document.getElementById("createBirthday")).value );
        let createWeight: number = Number( (<HTMLInputElement> document.getElementById("createWeight")).value );
        let createHeight: number = Number( (<HTMLInputElement> document.getElementById("createHeight")).value );

        let newProfile: IProfile = {
            firstName: createFirstname,
            lastName: createLastName,
            birthday: createBirthday,
            weight: createWeight,
            height: createHeight,
            steps: null
        }

        
        axios.post<IProfile> (uri, newProfile)
        .then((response:AxiosResponse) => {
            console.log(response);
        })
        .catch((error:AxiosError) => {
            console.log(error);
        })

        return false;
    }
}
