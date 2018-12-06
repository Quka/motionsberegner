import axios, { AxiosResponse, AxiosError} from "../../../node_modules/axios/index";
import { IProfile } from "../IProfile";

export class ProfilePage {
    /**
     *
     */
    constructor() {
        
    }

    getPage(parentHtml: HTMLElement): HTMLElement {
        // Empty the parent html page
        parentHtml.innerHTML = "";

        // Declare new html elements
        let title: HTMLElement = <HTMLElement> document.createElement("h1");
            title.innerHTML = "Profil";
        
        let subTitle: HTMLElement = <HTMLElement> document.createElement("h2");
            subTitle.innerHTML = "Brugeroplysninger";
        
        let editProfileBtn: HTMLElement = <HTMLElement> document.createElement("button");
            editProfileBtn.innerHTML = "Edit";
            editProfileBtn.className = "btn";
            editProfileBtn.id = "editProfileBtn";
        
        let profileInfo: HTMLElement = <HTMLElement> document.createElement("div");
            profileInfo.innerHTML = "empty as default";
            profileInfo.id = "profile-info";
            
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

        // Add eventlistenter to the added btn above
        editProfileBtn.addEventListener('click', () => {
            parentHtml.appendChild(this.getEditProfileBox());
        });

        parentHtml.appendChild(title);
        parentHtml.appendChild(subTitle);
        parentHtml.appendChild(editProfileBtn);
        parentHtml.appendChild(profileInfo);

        return parentHtml;
    }

    getEditProfileBox(): HTMLDivElement {
        let divRes: HTMLDivElement = document.createElement("div");
        divRes.className = "profileEditBox";
        let html: string = "";

        html += "<label><p>Firstname:   </p><input type='text' name='editFirstname' id='editFirstname'></label>";
        html += "<label><p>Lastname:    </p><input type='text' name='editLastname' id='editLastname'></label>";
        html += "<label><p>Birth date:  </p><input type='text' name='editBirthdate' id='editBirthdate' placeholder='2000-06-05T00:00:00'></label>";
        html += "<label><p>Weight:      </p><input type='text' name='editWeight' id='editWeight'></label>";
        html += "<label><p>Height:      </p><input type='text' name='editHeight' id='editHeight'></label>";
        html += "<button id='saveProfileBtn'>Save profile</button>";
        html += "<button id='closeProfilBtn'>Close</button>";

        /*
        // Add eventlistenter to the added btn above
        let saveProfileBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("saveProfileBtn");
        saveProfileBtn.addEventListener('click', () => {
            pProfile.updateProfile(uri, 1);
        });
        */

        divRes.innerHTML = html;

        return divRes;
    }

    updateProfile(uri: string, id: number): void {
        let firstNameVal: string = (<HTMLInputElement> document.getElementById("editFirstname")).value;
        let lastNameVal: string = (<HTMLInputElement> document.getElementById("editLastname")).value;
        let birthdayVal: Date = new Date( ((<HTMLInputElement> document.getElementById("editBirthdate")).value) );
        let weightVal: number = Number((<HTMLInputElement> document.getElementById("editWeight")).value);
        let heightVal: number = Number((<HTMLInputElement> document.getElementById("editHeight")).value);

        let p: IProfile = <IProfile> {
            firstName: firstNameVal,
            lastName: lastNameVal,
            birthday: birthdayVal,
            weight: weightVal,
            height: heightVal
        }

        console.log(p);

        axios.put<IProfile>(uri + id, p)
        .then(function(response: AxiosResponse<IProfile>): void {
            if(response.status == 200) {
                console.log(response.data);
                let pRes: IProfile = response.data;
            }
        })
        .catch(function(error){
            console.log(error);
        });
    }
}