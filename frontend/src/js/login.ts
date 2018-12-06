import axios, { AxiosResponse, AxiosError} from "../../node_modules/axios/index";
import { IProfile } from "./IProfile";

export class Login {
    
    private _Profile : IProfile;
    public get Profile() : IProfile {
        return this._Profile;
    }
    public set Profile(v : IProfile) {
        this._Profile = v;
    }
    
    /**
     *
     */
    constructor() {
        
    }

    Authenticate(username: string, password: string): boolean {
        

        return false;
    }

    loadProfile(): void {
        axios.get<IProfile>(result).then(function(response) {
            
        });
    }
}