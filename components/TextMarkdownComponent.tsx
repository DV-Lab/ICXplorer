export const TextMarkdownComponent: IComponent<{
  text: string;
  mark?: string;
}> = ({ text }) => {
  if (text.includes("`")) {
    const splitText = text?.split(/[``]/);
    return (
      <p className="mt-4 text-lg">
        {splitText[0]}
        <span className="mx-2 bg-gray-400 dark:bg-gray-700 dark:text-gray-400 p-1 rounded-lg text-base italic text-black font-normal">
          {splitText[1]}
        </span>
        {splitText[2]}
      </p>
    );
  }
  return <p className="mt-4 text-lg">{text}</p>;
};
