/**
 * 에러 메시지 반환 함수. 에러가 발생한 함수 명과 에러 내용을 담아 반환
 * @param functionName 하기 함수를 콜한 함수 명
 * @param error 발생한 에러 
 * @returns 에러 내용과 에러 발생한 함수 정보를 포함한 문자열 
 */
export const createErrorMessage = (functionName : string, error : unknown) => {
  const errorMessage = error instanceof Error ? error.message : error
  return `error in ${functionName} : ${errorMessage} `
}