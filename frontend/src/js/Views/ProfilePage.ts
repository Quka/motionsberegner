import axios, { AxiosResponse, AxiosError} from "../../../node_modules/axios/index";
import { IProfile } from "../IProfile";

export class ProfilePage {
    /**
     *
     */
    constructor() {
        
    }

    getPage(): string {
        let html: string = "";

        html += "<h2>Profil</h2> ";
        html += "<h6>Brugeroplysninger</h6><br>";
        html += "<button id='editProfileBtn' class='btn'>Edit</button><br>";
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

        return html;
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