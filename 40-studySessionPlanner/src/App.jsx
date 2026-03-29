import SessionForm from "./components/SessionForm";
import SessionList from "./components/SessionList";

const App = () => {
  return (
    <div className="min-h-screen w-full text-white bg-gray-800">
      <div className="p-4 sm:p-6 lg:p-10 w-full h-full flex flex-col gap-6 sm:gap-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl text-center text-white font-bold">
          STUDY SESSION PLANNER
        </h1>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 h-full">
          {/* Form Section */}
          <div className="w-full lg:w-[30%]">
            <SessionForm />
          </div>

          {/* List Section */}
          <div className="bg-gray-900 w-full lg:w-[70%] h-100 sm:h-125 lg:h-145 rounded-xl px-4 pb-4 border">
            <SessionList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
