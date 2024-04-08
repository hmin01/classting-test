export interface NewsKey {
  // [Partition key] 학교 ID
  school: string;
  // [Sort key] 생성 시간 (Timestamp)
  createdAt: number;
}

export interface NewsContent {
  // 내용
  content: string;
  // 수정 시간 (Timestamp)
  editedAt?: number;
}

export interface News extends NewsContent, NewsKey {}

export interface NewsRange {
  // 조회를 위한 시작 시간 (Timestamp)
  start: number;
  // 조회를 위한 종료 시간 (Timestamp)
  end?: number;
}
