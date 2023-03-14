import { ArrowDownSVG } from "@components/SVGIcons/ArrowDownSVG";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Input,
} from "@material-tailwind/react";
import { useState } from "react";

const Icon: IComponent<{ open: boolean }> = ({ open }) => {
  return (
    <ArrowDownSVG
      width={32}
      height={32}
      className={`hover:stroke-black dark:stroke-white dark:hover:stroke-red-300 transition-transform ${
        open ? "rotate-180" : ""
      }`}
      strokeWidth="1.5"
    />
  );
};

export const AdvancedConfigurationComponent: IComponent = () => {
  const [openedAccordion, setOpenedAccordion] = useState(false);
  const handleOpenAccordion = () => {
    setOpenedAccordion((prev) => !prev);
  };
  return (
    <div className="!font-serif mx-4">
      <Accordion
        open={openedAccordion}
        icon={<Icon open={openedAccordion} />}
        nonce={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
      >
        <AccordionHeader
          onClick={() => handleOpenAccordion()}
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          className="dark:text-white border-b !text-2xl !font-normal !font-serif"
        >
          Advanced Configuration
        </AccordionHeader>
        <AccordionBody className="!font-serif text-black dark:text-white">
          <h2 className="text-xl font-normal">Platform fees</h2>
          <p className="text-sm italic dark:text-darkText">
            Get additional fees for all primary sales that happen on this
            contract. (This is useful if you are deploying this contract for a
            3rd party and want to take fees for your service.)
          </p>
          <form className="mt-4 grid grid-cols-4 gap-8">
            <div className="col-span-3">
              <h3 className="text-lg font-normal mb-2">Recipient Address</h3>
              <Input
                size="lg"
                label="Address"
                nonce={undefined}
                onResize={undefined}
                onResizeCapture={undefined}
                required
              />{" "}
            </div>
            <div className="col-span-1">
              <h3 className="text-lg font-normal mb-2">Percentage</h3>
              <Input
                size="lg"
                nonce={undefined}
                onResize={undefined}
                onResizeCapture={undefined}
                defaultValue={0.0}
                label={undefined}
                className="relative overflow-hidden"
                icon={
                  <span className="absolute -top-2 -right-3 h-fit bg-[#E5E5EA] dark:bg-gray-900 py-2 px-4 rounded-r-lg">
                    %
                  </span>
                }
              />
            </div>
          </form>
        </AccordionBody>
      </Accordion>
    </div>
  );
};
