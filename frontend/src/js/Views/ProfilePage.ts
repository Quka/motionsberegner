import axios, { AxiosResponse, AxiosError} from "../../../node_modules/axios/index";
import { IProfile } from "../IProfile";

import { Login } from "../Login";

export class ProfilePage {
    uri: string;
    login: Login;
    /**
     *
     */
    constructor(uri: string, login: Login) {
        this.uri = uri;
        this.login = login;
    }

    getPage(parentHtml: HTMLElement): HTMLElement {
        // Empty the parent html page
        parentHtml.innerHTML = "";
        parentHtml.className = "profile-page";

        // Declare new html elements
        let title: HTMLElement = <HTMLElement> document.createElement("h1");
            title.innerHTML = "Profil";
        
        let subTitle: HTMLElement = <HTMLElement> document.createElement("h2");
            subTitle.innerHTML = "Brugeroplysninger";


        
        let editProfileBtn: HTMLElement = <HTMLElement> document.createElement("button");
            editProfileBtn.innerHTML = "Rediger dine oplysninger";
            editProfileBtn.className = "btn btn-info";
            editProfileBtn.id = "editProfileBtn";

        let deleteProfileBtn: HTMLElement = <HTMLElement> document.createElement("button");
            deleteProfileBtn.innerHTML = "Slet din profil";
            deleteProfileBtn.className = "btn btn-danger";
            deleteProfileBtn.id = "deleteProfileBtn";
        
        /**
         * The user profile information from get
         */
        let profileInfoWrapper: HTMLElement = <HTMLElement> document.createElement("div");
            profileInfoWrapper.id = "profile-info-wrapper";
        
        // User profile INFO
        let profileInfo: HTMLElement = <HTMLElement> document.createElement("div");
            profileInfo.className = "profile-info-content";
        
        let profileInfoName: HTMLElement = <HTMLElement> document.createElement("div");
            profileInfoName.innerHTML = "<span>Navn:</span> " + this.login.loggedInProfile.firstName + " " + this.login.loggedInProfile.lastName;
            profileInfo.appendChild(profileInfoName);

        let profileInfoBirthday: HTMLElement = <HTMLElement> document.createElement("div");
            profileInfoBirthday.innerHTML = "<span>Fødselsdag:</span> " + String( this.login.loggedInProfile.birthday );
            profileInfo.appendChild(profileInfoBirthday);
        
        let profileInfoHeight: HTMLElement = <HTMLElement> document.createElement("div");
            profileInfoHeight.innerHTML = "<span>Højde:</span> " + String( this.login.loggedInProfile.height ) + " cm";
            profileInfo.appendChild(profileInfoHeight);


        let profileInfoWeight: HTMLElement = <HTMLElement> document.createElement("div");
            profileInfoWeight.innerHTML = "<span>Vægt:</span> " + String( this.login.loggedInProfile.weight );
            profileInfo.appendChild(profileInfoWeight);

            // Append all info to the wrapper
            profileInfoWrapper.appendChild(profileInfo);
        
        // User profile STEPS
        let profileInfoStepsTitle: HTMLElement = <HTMLElement> document.createElement("h3");
            profileInfoStepsTitle.innerHTML = "Dine skridt";
            profileInfoWrapper.appendChild(profileInfoStepsTitle);

        let profileInfoSteps: HTMLElement = <HTMLElement> document.createElement("ul");
            this.login.loggedInProfile.steps.forEach(step => {
                let stepEl: HTMLElement = <HTMLElement> document.createElement("li");
                    stepEl.innerHTML = "Antal skridt: " + String(step.steps) + " | Dato: " + String( step.logDate );
                    stepEl.className = "info-step";
                    profileInfoSteps.appendChild(stepEl);
            });
            profileInfoWrapper.appendChild(profileInfoSteps);

        // User profile BMI
        let profileInfoBMITitle: HTMLElement = <HTMLElement> document.createElement("h3");
            profileInfoBMITitle.innerHTML = "Dine BMI oplysninger";
            profileInfoWrapper.appendChild(profileInfoBMITitle);

        let profileInfoBMI: HTMLElement = <HTMLElement> document.createElement("div");
            profileInfoBMI.innerHTML = "Vægt: " + this.login.loggedInProfile.weight + " Højde: " + this.login.loggedInProfile.height + " BMI: " + String( this.calculateBMI(this.login.loggedInProfile.weight, this.login.loggedInProfile.height ) );
            profileInfoWrapper.appendChild(profileInfoBMI);

        // Add eventlistenter to the added btn above
        editProfileBtn.addEventListener('click', () => {
            parentHtml.appendChild(this.getEditProfileBox());
        });
        
        deleteProfileBtn.addEventListener('click', () => {
            //this.deleteProfile(this.uri, Login.loggedInProfile.id);
        });

        parentHtml.appendChild(title);
        parentHtml.appendChild(subTitle);
        parentHtml.appendChild(profileInfoWrapper);
        parentHtml.appendChild(editProfileBtn);
        parentHtml.appendChild(deleteProfileBtn);

        return parentHtml;
    }

    getEditProfileBox(): HTMLDivElement {
        let divRes: HTMLDivElement = document.createElement("div");
        divRes.className = "profileEditBox";

        // User profile INFO
        let profileInfo: HTMLElement = <HTMLElement> document.createElement("div");
            profileInfo.className = "profile-info-edit";
        
        let profileInfoFirstname: HTMLElement = <HTMLElement> document.createElement("label");
            profileInfoFirstname.innerHTML = "<p>Fornavn: </p> ";
        let profileInfoFirstnameInput: HTMLInputElement = <HTMLInputElement> document.createElement("input");
            profileInfoFirstnameInput.type = "text";
            profileInfoFirstnameInput.name = "editFirstname";
            profileInfoFirstnameInput.id = "editFirstname";
            profileInfoFirstnameInput.value = this.login.loggedInProfile.firstName;
            
            profileInfoFirstname.appendChild(profileInfoFirstnameInput);
            profileInfo.appendChild(profileInfoFirstname);

        let profileInfoLastname: HTMLElement = <HTMLElement> document.createElement("label");
            profileInfoLastname.innerHTML = "<p>Efternavn: </p> ";
        let profileInfoLastnameInput: HTMLInputElement = <HTMLInputElement> document.createElement("input");
            profileInfoLastnameInput.type = "text";
            profileInfoLastnameInput.name = "editLastname";
            profileInfoLastnameInput.id = "editLastname";
            profileInfoLastnameInput.value = this.login.loggedInProfile.lastName;
            
            profileInfoLastname.appendChild(profileInfoLastnameInput);
            profileInfo.appendChild(profileInfoLastname);
        
        let profileInfoBirthday: HTMLElement = <HTMLElement> document.createElement("label");
            profileInfoBirthday.innerHTML = "<p>Fødselsdag: </p> ";
        let profileInfoBirthdayInput: HTMLInputElement = <HTMLInputElement> document.createElement("input");
            profileInfoBirthdayInput.type = "text";
            profileInfoBirthdayInput.name = "editBirthdate";
            profileInfoBirthdayInput.id = "editBirthdate";
            profileInfoBirthdayInput.value = String( this.login.loggedInProfile.birthday );
            
            profileInfoBirthday.appendChild(profileInfoBirthdayInput);
            profileInfo.appendChild(profileInfoBirthday);
        
        let profileInfoWeight: HTMLElement = <HTMLElement> document.createElement("label");
            profileInfoWeight.innerHTML = "<p>Vægt: </p> ";
        let profileInfoWeightInput: HTMLInputElement = <HTMLInputElement> document.createElement("input");
            profileInfoWeightInput.type = "number";
            profileInfoWeightInput.name = "editWeight";
            profileInfoWeightInput.id = "editWeight";
            profileInfoWeightInput.valueAsNumber = this.login.loggedInProfile.weight;
            
            profileInfoWeight.appendChild(profileInfoWeightInput);
            profileInfo.appendChild(profileInfoWeight);
        
        let profileInfoHeight: HTMLElement = <HTMLElement> document.createElement("label");
            profileInfoHeight.innerHTML = "<p>Højde: </p> ";
        let profileInfoHeightInput: HTMLInputElement = <HTMLInputElement> document.createElement("input");
            profileInfoHeightInput.type = "text";
            profileInfoHeightInput.name = "editHeight";
            profileInfoHeightInput.id = "editHeight";
            profileInfoHeightInput.value = String( this.login.loggedInProfile.height );
            
            profileInfoHeight.appendChild(profileInfoHeightInput);
            profileInfo.appendChild(profileInfoHeight);

        let profileSaveBtn: HTMLInputElement = <HTMLInputElement> document.createElement("button");
            profileSaveBtn.id = "saveProfileBtn";
            profileSaveBtn.className = "btn btn-success";
            profileSaveBtn.innerHTML = "Save profile";
            profileInfo.appendChild(profileSaveBtn);

            profileSaveBtn.addEventListener('click', () => {
                this.updateProfile(this.uri, this.login.loggedInProfile.id)
                .then((response) => {
                    console.log(response);
                })
                .catch((err) => {
                    console.log(err);
                });
            });
        
        let profileCloseBtn: HTMLInputElement = <HTMLInputElement> document.createElement("button");
            profileCloseBtn.id = "CloseProfileBtn";
            profileCloseBtn.className = "btn btn-secondary";
            profileCloseBtn.innerHTML = "Close profile";
            profileInfo.appendChild(profileCloseBtn);

            profileCloseBtn.addEventListener('click', () => {
                // close the div
            });

        divRes.appendChild(profileInfo);
        
        return divRes;
    }

    updateProfile(uri: string, id: number): Promise<boolean> {
        let firstNameVal: string = (<HTMLInputElement> document.getElementById("editFirstname")).value;
        let lastNameVal: string = (<HTMLInputElement> document.getElementById("editLastname")).value;
        let birthdayVal: Date = new Date( ((<HTMLInputElement> document.getElementById("editBirthdate")).value) );
        let weightVal: number = Number((<HTMLInputElement> document.getElementById("editWeight")).value);
        let heightVal: number = Number((<HTMLInputElement> document.getElementById("editHeight")).value);

        let p: IProfile = <IProfile> {
            id: id,
            firstName: firstNameVal,
            lastName: lastNameVal,
            birthday: birthdayVal,
            weight: weightVal,
            height: heightVal
        }

        console.log(p);

        let promise = axios.put<IProfile>(uri + id, p)
        .then(function(response: AxiosResponse<IProfile>) {
            if(response.status == 200) {
                console.log(response.data);
                let pRes: IProfile = response.data;

                return true;
            }
        })
        .catch(function(error){
            console.log(error);
            return false;
        });

        return promise;
    }

    deleteProfile(uri: string, id:number): void {
        axios.delete(uri + id);
    }

    // BMI calculator
    calculateBMI(weight: number, height: number): number {   
        let bmi = Math.round(weight / Math.pow((height/100), 2));
        return bmi;
    }
}