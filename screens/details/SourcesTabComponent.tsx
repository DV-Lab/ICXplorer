import { ArrowDownSVG } from "@components/SVGIcons/ArrowDownSVG";
import { LoadingSVG } from "@components/SVGIcons/LoadingSVG";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { useState } from "react";
import { CopyBlock, dracula } from "react-code-blocks";

const Icon: IComponent<{ id: number; open: number }> = ({ id, open }) => {
  return (
    <ArrowDownSVG
      width={32}
      height={32}
      className={`hover:stroke-black dark:stroke-white dark:hover:stroke-red-300 transition-transform ${
        id === open ? "rotate-180" : ""
      }`}
    />
  );
};

export const SourcesTabComponent: IComponent<{
  sources?: ISource[];
}> = ({ sources }) => {
  const noOpenedAccordionIndex = -1;
  const [open, setOpen] = useState(noOpenedAccordionIndex);

  const handleOpen = (value: number) => {
    setOpen(open === value ? noOpenedAccordionIndex : value);
  };
  return sources ? (
    <div className="min-h-[505px]">
      {sources.length > 0 ? (
        sources.map((s, idx) => {
          return (
            <Accordion
              open={open === idx}
              icon={<Icon id={idx} open={open} />}
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
              key={idx}
            >
              <AccordionHeader
                onClick={() => handleOpen(idx)}
                nonce={undefined}
                onResize={undefined}
                onResizeCapture={undefined}
                className="border-b"
              >
                {s.name}
              </AccordionHeader>
              <AccordionBody>
                {" "}
                <div className="font-code font-semibold">
                  <CopyBlock
                    text={JSON.parse(s.code)}
                    language="java"
                    showLineNumbers={true}
                    theme={dracula}
                    wrapLines={true}
                    codeBlock
                  />
                </div>
              </AccordionBody>
            </Accordion>
          );
        })
      ) : (
        <div className="min-h-[505px] flex items-center justify-center">
          No source to display
        </div>
      )}
    </div>
  ) : (
    <div className="min-h-[505px] flex items-center justify-center">
      <LoadingSVG width={72} height={72} className="fill-teal-400" />
    </div>
  );
};
