export class Profile {
    
    private _name : string;
    public get name() : string {
        return this._name;
    }
    public set name(v : string) {
        this._name = v;
    }
    
    constructor(name: string) {
        this.name = name;
    }
    
    showName(): string {
        return this.name;
    }
}

interface IProfile {
 firstName : string;
 lastName : string;
 age : number;
 
}

let resultOfProfile : HTMLDivElement = <HTMLDivElement> document.getElementById("userResult")

function getProfile(): void {
let uri : string = "http://motionsberegner.database.windows.net/profile" 
let result  = uri 
axios.get<IProfile>(result)
   .then(function(response){
    resultOfProfile.innerHTML =  response.data.firstName + "   " + response.data.lastName + "   "  + response.data.age;
  })

}


function createNewCustomer(): void {
let uri : string = "http://motionsberegner.database.windows.net";

let id : HTMLInputElement = document.getElementById("id") as HTMLInputElement;
let firstName : HTMLInputElement  = document.getElementById("firstName") as HTMLInputElement;
let lastName : HTMLInputElement = document.getElementById("lastName") as HTMLInputElement;
let age : HTMLInputElement = document.getElementById("year") as HTMLInputElement;
let result : ICustomer = {id : id.valueAsNumber , firstName: firstName.value , lastName : lastName.value, year : year.valueAsNumber};

axios.post<ICustomer>(uri, result)
}

function deleteCustomer(): void {
let uri : string ="http://motionsberegner.database.windows.net"
let id : HTMLInputElement = document.getElementById("deleteId") as HTMLInputElement;

let result = uri + id.value;
axios.delete(result);
}
