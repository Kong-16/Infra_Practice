import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { Link, useSearchParams } from 'react-router-dom';
import { paging } from '../utils/paging';

interface Article {
  id: number;
  title: string;
  author: string;
  date: string;
}

// 더미데이터
const articles: Article[] = [
  {
    id: 1,
    title: 'Exploring the Future of AI',
    author: '김창석',
    date: '2024-11-01',
  },
  {
    id: 2,
    title: 'The Rise of Quantum Computing',
    author: 'Bob Smith',
    date: '2024-11-02',
  },
  {
    id: 3,
    title: 'Understanding Climate Change',
    author: 'Carol Lee',
    date: '2024-11-03',
  },
  {
    id: 4,
    title: 'Advancements in Space Exploration',
    author: 'David Kim',
    date: '2024-11-04',
  },
  {
    id: 5,
    title: 'The Evolution of Web Development',
    author: 'Emily Brown',
    date: '2024-11-05',
  },
  {
    id: 6,
    title: 'Cybersecurity in the Modern Era',
    author: 'Frank Wright',
    date: '2024-11-06',
  },
  {
    id: 7,
    title: 'The Art of Digital Marketing',
    author: 'Grace Wilson',
    date: '2024-11-07',
  },
  {
    id: 8,
    title: 'Breaking Barriers with Blockchain',
    author: 'Henry Adams',
    date: '2024-11-08',
  },
  {
    id: 9,
    title: 'The Power of Data Analytics',
    author: 'Ivy Carter',
    date: '2024-11-09',
  },
  {
    id: 10,
    title: 'The Future of Renewable Energy',
    author: 'Jack Daniels Paul Daniels',
    date: '2024-11-10',
  },
];

function Board() {
  const [searchParams, setSearchParams] = useSearchParams();
  // const [curPage, setCurPage] = useState(Number(searchParams.get('page')) || 1);
  const curPage = Number(searchParams.get('page')) || 1;
  const [startPage, endPage] = paging.calculateRange(curPage, 57, 10);

  const movePage = (amount: number) => {
    let nextPage = curPage + amount;

    // 페이지가 1, 마지막 페이지를 못 벗어나도록 조정
    nextPage = Math.max(1, nextPage);
    nextPage = Math.min(endPage, nextPage);

    setSearchParams({ page: nextPage.toString() });
  };

  // useEffect(() => {setSearchParams({ page: nextPage.toString() })}, [curPage]);

  const SearchBarSection = () => (
    <div className="search-container flex justify-end items-end py-2 h-24">
      <SearchBar />
    </div>
  );

  const BoardListSection = () => (
    <div className="board-list-container">
      <BoardTable articles={articles} />
    </div>
  );

  const BoardTable = ({ articles }: { articles: Article[] }) => (
    <table className=" board-table table-fixed border-collapse w-full border-theme-color-300 border-y-2 border-x-0 text-left">
      <thead>
        <tr className="bg-theme-color-100 border-b-2 border-theme-color-200 h-14">
          <th className="board-table-header-number w-1/12 text-center px-4 py-2 text-nowrap">
            번호
          </th>
          <th className="board-table-header-title w-6/12 text-center pl-4 pr-40 py-2">
            제목
          </th>
          <th className="board-table-header-author w-2/12 text-center pl-4 pr-12 py-2 ">
            글쓴이
          </th>
          <th className="board-table-header-date w-2/12 text-center px-4 py-2">
            날짜
          </th>
        </tr>
      </thead>
      <tbody>
        {articles.map((article, index) => (
          <tr
            key={index}
            className={`h-14 border-b border-theme-color-200 ${
              index % 2 === 0 ? 'bg-theme-color-50' : 'bg-white'
            }`}
          >
            <td className="board-table-data-number w-1/12 px-4 py-2 text-center">
              {index + 1}
            </td>
            <td className="board-table-data-title w-6/12 truncate px-4 py-2">
              <Link to={`/detail?id=${article.id}`}>{article.title}</Link>
            </td>
            <td
              className="board-table-data-author w-3/12 truncate px-4 py-2"
              title={article.author}
            >
              {article.author}
            </td>
            <td
              className="board-table-data-date w-2/12 truncate px-4 py-2 text-center"
              title={article.date}
            >
              {article.date}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const PaginationSection = () => (
    <div className="pagination-container">
      <Pagination
        curPage={curPage}
        endPage={endPage}
        setCurPage={movePage}
        pageArr={paging.getPaginationArray(startPage, endPage)}
      />
    </div>
  );

  return (
    <div className="max-w-5xl">
      <SearchBarSection />
      <BoardListSection />
      <PaginationSection />
    </div>
  );
}

export default Board;
