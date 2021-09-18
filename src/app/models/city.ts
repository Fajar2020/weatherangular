import { Coord } from "./coord";

export class City {
    City(){}
    id?: number=0;
    name?: string="";
    state?: string="";
    country?: string="";
    coord?: Coord= new Coord();
}
