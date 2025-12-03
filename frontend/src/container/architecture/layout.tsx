import { Outlet } from "react-router-dom";

const ArchitectureLayout = () => {
  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <main className="flex flex-1 flex-col h-full">
        <section className="flex-1 px-4 py-5 h-full">
          <div className="w-full h-full overflow-y-auto">
            <Outlet />
          </div>
        </section>
      </main>
    </div>
  );
};

export default ArchitectureLayout;
