import axios, { AxiosResponse, AxiosError} from "../../node_modules/axios/index";

import { Profile } from "./Profile";

let p = new Profile("Hakan");

console.log(p.showName());