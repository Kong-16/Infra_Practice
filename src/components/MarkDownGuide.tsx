import ReactMarkdown from 'react-markdown';
import { PluggableList } from 'react-markdown/lib/react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

const MarkDownGuide = ({mdText}:{mdText : string}) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw] as PluggableList}
      skipHtml={true}
    >
      {mdText}
    </ReactMarkdown>
  );
};

export default MarkDownGuide;