import { useNavigate, Outlet } from "react-router-dom";
import Button from "@/component/common/form/button";

const CommonLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      {/* HEADER */}
      <header className="w-full h-14 flex items-center gap-2 px-4 border-b bg-white shrink-0">
        <Button onClick={() => navigate("/button")}>Button</Button>
        <Button onClick={() => navigate("/toggle")}>Toggle</Button>
        <Button onClick={() => navigate("/pagination")}>Pagination</Button>
        <Button onClick={() => navigate("/calendar")}>Calendar</Button>
        <Button onClick={() => navigate("/selectbox")}>SelectBox</Button>
        <Button onClick={() => navigate("/inputbox")}>InputBox</Button>
        <Button onClick={() => navigate("/textareabox")}>Textarea</Button>
        <Button onClick={() => navigate("/radiobutton")}>Radio</Button>
        <Button onClick={() => navigate("/checkbox")}>Checkbox</Button>
        <Button onClick={() => navigate("/formmodal")}>FormModal</Button>
        <Button onClick={() => navigate("/modal")}>Modal</Button>
        <Button onClick={() => navigate("/table")}>Table</Button>
        <Button onClick={() => navigate("/alert")}>Alert</Button>
        <Button onClick={() => navigate("/toast")}>Toast</Button>
      </header>

      {/* CONTENT */}
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

export default CommonLayout;
