import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import useGuideList from './useGuideList';
import MarkDownGuide from './MarkDownGuide';

const AccordionGuide = () => {
  const guideList = useGuideList();

  return (
    <Accordion.Root
      type="multiple"
      // className="w-full rounded border p-2 border-gray-200 divide-y divide-gray-200"
      className="w-full p-2"
    >
      {guideList.map((value: Guide, i) => (
        <Accordion.Item key={i} value={`item-${i}`} className="overflow-hidden">
          <Accordion.Header>
            <Accordion.Trigger
              className={clsx(
                'accordion-trigger flex w-full box-border border-b border-black items-center justify-between p-4 m-0 my-2 text-left font-medium text-gray-800'
                // 'flex w-full box-border border-b border-theme-color-500 items-center justify-between p-4 m-0 my-2 text-left font-medium text-theme-color-600'
                // 'hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-indigo-200'
              )}
            >
              {value.title}
              <ChevronDown
                className="h-5 w-5 accordion-chevron"
                aria-hidden
              />
            </Accordion.Trigger>
          </Accordion.Header>
          {/* <Accordion.Content className="px-4 pb-4 pt-2 text-sm text-gray-600 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"> */}
          <Accordion.Content>
            <MarkDownGuide mdText={value.content} />
            <div className='flex justify-center'>
            <Accordion.Trigger
              className={clsx(
                'flex box-border items-center justify-center p-4 m-0 my-2 h-12 border-0 text-center font-medium text-gray-800'
              )}
            >
              접기
            </Accordion.Trigger></div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
    // </div>
  );
};

export default AccordionGuide;
