export const CopyToClipboard: IComponent<{
  text: string;
}> = ({ children, text }) => {
  return (
    <button
      className="w-full"
      onClick={() => navigator.clipboard.writeText(text)}
    >
      {children}
    </button>
  );
};
