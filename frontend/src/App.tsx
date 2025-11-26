import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import ButtonPage from "./container/common/button";
import TogglePage from "./container/common/toggle";
import PaginationPage from "./container/common/pagination";
import DatepickerPage from "./container/common/datepicker";
import SelectBoxPage from "./container/common/selectBox";
import InputBoxPage from "./container/common/inputBox";
import TextareaBoxPage from "./container/common/textareaBox";
import RadioButtonPage from "./container/common/radioButton";
import CheckboxPage from "./container/common/checkbox";
import FormModalPage from "./container/common/formModal";
import ModalPage from "./container/common/modal";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/button" element={<ButtonPage />} />
            <Route path="/toggle" element={<TogglePage />} />
            <Route path="/pagination" element={<PaginationPage />} />
            <Route path="/datepicker" element={<DatepickerPage />} />
            <Route path="/selectbox" element={<SelectBoxPage />} />
            <Route path="/inputbox" element={<InputBoxPage />} />
            <Route path="/textareabox" element={<TextareaBoxPage />} />
            <Route path="/radiobutton" element={<RadioButtonPage />} />
            <Route path="/checkbox" element={<CheckboxPage />} />
            <Route path="/formmodal" element={<FormModalPage />} />
            <Route path="/modal" element={<ModalPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
