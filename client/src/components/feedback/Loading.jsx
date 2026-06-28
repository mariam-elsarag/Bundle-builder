import Spinner from "./Spinner";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-40 bg-white  flex items-center justify-center min-h-dvh w-full">
      <Spinner size="lg" />
    </div>
  );
};

export default Loading;
