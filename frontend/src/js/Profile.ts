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