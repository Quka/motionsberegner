import axios, { AxiosResponse, AxiosError} from "../../node_modules/axios/index";
import { IProfile } from "./IProfile";

export class Login {
    
    
    private _lastLogin : IProfile;
    public get lastLogin() : IProfile {
        return this._lastLogin;
    }
    public set lastLogin(v : IProfile) {
        this._lastLogin = v;
    }
    
    
    /**
     *
     */
    constructor() {
        
    }

    Authenticate(uri: string, username: string, password: string): boolean {
        this.loadProfile(uri, username);



        return false;
    }

    private loadProfile(uri: string, name: string): void {
        axios.get<IProfile>(uri + "/username/" + name)
        .then(function(response) {
            console.log(response);
            this.lastLogin = response.data;
        });
    }
}