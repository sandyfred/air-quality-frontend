import { Pollutants } from './pollutants';

export class Favourite {
  constructor(
    public aqi: number,
    public city: string,
    public country: string,
    public state: string,
    public pollutants: Pollutants
  ) {}
}
