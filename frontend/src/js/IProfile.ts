import { IStep } from "./IStep";

// Profile class from webservice
export interface IProfile {
    id?: number;
    firstName : string;
    lastName : string;
    birthday : Date;
    steps?: IStep[];    
    weight: number;
    height: number;
}