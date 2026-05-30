import Adoption from "./components/Adoption";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Roots from "./pages/Root";
import Home from "./pages/Home";
import Appointment from "./pages/Appointment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Roots />}>
          <Route index element={<Home />} />
          <Route path="agendamento" element={<Appointment />} />
          <Route path="adocao" element={<Adoption />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
