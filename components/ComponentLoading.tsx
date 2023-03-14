export const ComponentLoading: IComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row items-center justify-center bg-white p-3 aspect-square rounded-md shadow-lg">
          <div className="w-3 h-3 bg-teal-400 rounded-full animate-pulse mr-2"></div>
          <div
            className="w-3 h-3 bg-teal-400 rounded-full animate-pulse mr-2"
            style={{ animationDelay: "100ms" }}
          ></div>
          <div
            className="w-3 h-3 bg-teal-400 rounded-full animate-pulse delay-700"
            style={{ animationDelay: "200ms" }}
          ></div>
        </div>
      </div>
    </div>
  );
};
