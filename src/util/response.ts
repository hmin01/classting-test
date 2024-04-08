// Exception
import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';

/**
 * [Function] 응답 예외 처리를 위한 함수
 * @param err 에러 객체
 */
export function responseException(err: any) {
  // 에러 상태 코드가 정해진 경우
  if (err.status !== undefined) {
    throw err;
  } else if (err.name === 'ValidationException') {
    throw new BadRequestException();
  } else {
    throw new InternalServerErrorException();
  }
}

/**
 * [Function] 존재하지 않는 리소스 조회에 대한 응답 함수
 * @param dataType 리소스 유형
 */
export function responseNotFound(message?: string) {
  throw new NotFoundException(message);
}

/**
 * [Function] Bad request 응답 함수
 */
export function responseBadRequest(message: string) {
  throw new BadRequestException(message);
}
