import { LoadingSVG } from "@components/SVGIcons/LoadingSVG";
import { TextMarkdownComponent } from "@components/TextMarkdownComponent";
import { cx } from "@utils/tools";
import { useState } from "react";

import { interactTable, leftSidebar, tabBodyStyles } from "./styles";

export const EventsTabComponent: IComponent<{
  events?: IEvent[];
}> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(
    events && events.length > 0 ? events[0] : null
  );

  return events ? (
    <div className={cx(interactTable)}>
      <div className={cx(leftSidebar)}>
        {events?.length > 0 ? (
          <ul>
            {events.map((e, idx) => (
              <li
                key={idx}
                className={`h-full dark:text-darkText text-lg cursor-pointer hover:underline hover:underline-offset-2 !font-serif font-semibold ${
                  selectedEvent !== null && e.name === selectedEvent.name
                    ? "text-black dark:!text-white"
                    : ""
                }`}
                onClick={() => setSelectedEvent(e)}
              >
                {e.name.toLowerCase()}
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-10 mx-4 text-xl font-normal">
            No event to display
          </div>
        )}
      </div>
      {selectedEvent && (
        <div className={cx(tabBodyStyles)}>
          <>
            <div className="pt-4 pb-6 border-b border-gray-300 !font-serif">
              <div className="flex items-center gap-2">
                <span className="text-black dark:text-white font-base text-3xl mr-1">
                  {selectedEvent.name.charAt(0).toUpperCase() +
                    selectedEvent.name.slice(1)}
                </span>{" "}
                <span className="text-2xl">({selectedEvent.name})</span>
              </div>
              {selectedEvent.description && (
                <TextMarkdownComponent text={selectedEvent.description} />
              )}
            </div>
            {selectedEvent.inputs.length > 0 && (
              <>
                <h1 className="mt-4 text-black dark:text-white text-2xl">
                  Inputs
                </h1>
                <div className="flex flex-col items-center text-center text-lg py-4">
                  <table className="w-[75%]">
                    <thead>
                      <tr>
                        <th>NAME</th>
                        <th>TYPE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedEvent.inputs.map(({ name, type }, idx) => (
                        <tr key={idx}>
                          <td className="p-3 border-t border-slate-300">
                            {name}
                          </td>
                          <td className="p-3 border-t border-slate-300">
                            {type}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </>
        </div>
      )}
    </div>
  ) : (
    <div>
      <LoadingSVG width={120} height={120} className="fill-teal-400" />
    </div>
  );
};
