const paging = {
  /**
   * @param curPage 현재 보고있는 페이지
   * @param totalCount 전체 데이터 개수
   * @param itemsPerPage 한 페이지에 들어갈 데이터 개수
   * @returns 현재 페이지를 기준으로 가장 가까운 작은 5의 배수,  큰 5의 배수 - 1
   */
  calculateRange: (
    curPage: number,
    totalCount: number,
    itemsPerPage: number
  ): number[] => {
    const start = Math.floor(curPage / 5) * 5 + 1;
    // 최대 다섯칸
    const end = Math.min(start + 4, Math.floor(totalCount / itemsPerPage) + 1);
    return [start, end];
  },

  /**
   *
   * @param start 페이지네이션 시작 번호
   * @param end 페이지네이션 끝 번호
   * @returns 페이지네이션 배열
   */
  getPaginationArray: (start: number, end: number): number[] => {
    const arr = Array.from(
      { length: Math.min(end - start + 1, 5) },
      (_, idx) => start + idx
    );
    return arr;
  },
};

export { paging };
