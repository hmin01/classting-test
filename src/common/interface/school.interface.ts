export interface SchoolKey {
  // [Partition key] 지역과 학교 조합으로 만들어진 UUID
  uuid: string;
}

export interface School extends SchoolKey {
  // 지역
  region: string;
  // 학교명
  name: string;
}
