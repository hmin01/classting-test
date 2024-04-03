export interface SchoolKey {
  uuid: string;
}

export interface School extends SchoolKey {
  region: string;
  name: string;
}
