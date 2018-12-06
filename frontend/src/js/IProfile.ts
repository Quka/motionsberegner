import { IStep } from "./IStep";

// Profile class from webservice
export interface IProfile {
    firstName : string;
    lastName : string;
    birthday : Date;
    steps : IStep[];
    height: number;
    weight: number;
}