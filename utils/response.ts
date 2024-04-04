import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';

/**
 * [Function] 응답 예외 처리를 위한 함수
 * @param err 에러 객체
 */
export function responseException(err: Error) {
  let message: string;
  let statusCode: number;
  console.log(err);
  // 메시지 및 상태 코드 설정
  if (err.name === 'ValidationException') {
    message = `Validation failed: ${err.message}`;
    statusCode = HttpStatus.BAD_REQUEST;
  } else if (err.name === 'NotFoundException') {
    message = err.message;
    statusCode = HttpStatus.NOT_FOUND;
  } else {
    console.log(err);
    message = 'Internal server error';
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  }
  // 예외 처리
  throw new HttpException(message, statusCode);
}

/**
 * [Function] 존재하지 않는 리소스 조회에 대한 응답 함수
 * @param dataType 리소스 유형
 */
export function responseNotFound(dataType?: string) {
  // 메시지 생성
  const message: string = dataType
    ? `Not found resource: datatype is ${dataType}`
    : 'Not found';
  // 예외 처리
  throw new NotFoundException(message);
}
