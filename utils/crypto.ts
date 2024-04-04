import { md5 } from 'js-md5';

/**
 * [Function] 입력된 값을 이용한 해시 값 생성 함수
 * @param args 파리미터들
 * @returns 해시값
 */
export function createHash(...args: string[]) {
  const hash = md5.create();
  // 인자 추가
  for (let i = 0; i < args.length; i++) {
    hash.update(args[i]);
  }
  // 해시값 반환
  return hash.hex();
}
