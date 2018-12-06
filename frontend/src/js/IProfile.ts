import { IStep } from "./IStep";

export interface IProfile {
    firstName : string;
    lastName : string;
    birthday : Date;
    steps : IStep[];
}