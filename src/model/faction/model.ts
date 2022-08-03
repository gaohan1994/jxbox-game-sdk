class Faction {
  public id: number;
  public name: string;
  public description: string;
  constructor(options) {
    this.id = options.id;
    this.name = options.name;
    this.description = options.description;
  }
}

export { Faction };
