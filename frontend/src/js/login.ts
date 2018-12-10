import axios, { AxiosResponse, AxiosError} from "../../node_modules/axios/index";
import { IProfile } from "./IProfile";

export class Login {
    public loggedInProfile: IProfile;

    /**
     *
     */
    constructor() {
    }

    Authenticate(uri: string, username: string, password: string): Promise<boolean> {
        
        let promise = axios.get<IProfile>(uri + "/username/" + username)
        .then((response) => {
            console.log(response);

            if(response.status == 200) {
                let profileData: IProfile = <IProfile> response.data;

                // Validate username and password
                // Password is hardcoded
                if(username.toLowerCase() == (profileData.firstName).toLowerCase()
                   && password ==  "test1234") {
                    this.loggedInProfile = profileData;
                    return true;
                }
                else {
                    return false;
                }
            }
            
            return false;
        })
        .catch((error) => {
            console.log(error);
            return false;
        });

        return promise;
    }
}