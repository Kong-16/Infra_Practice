import ReactMarkdown from 'react-markdown';
import { PluggableList } from 'react-markdown/lib/react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import useGuide from '../hooks/useGuide';

const Guide = () => {
  const guide = useGuide();
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw] as PluggableList}
      className="min-w-[800px]"
    >
      {guide}
    </ReactMarkdown>
  );
};

export default Guide;