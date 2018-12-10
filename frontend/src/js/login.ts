import axios, { AxiosResponse, AxiosError} from "../../node_modules/axios/index";
import { IProfile } from "./IProfile";

export class Login {
    public static loggedInProfile: IProfile;

    /**
     *
     */
    constructor() {
    }

    Authenticate(uri: string, username: string, password: string): Promise<boolean> {
        
        let promise = axios.get<IProfile>(uri + "/username/" + username)
        .then((response) => {
            //console.log(response);

            if(response.status == 200) {
                Login.loggedInProfile = <IProfile> response.data;

                return true;
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