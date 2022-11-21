import "./App.css";
import { TextField, Box, Paper, Button, Collapse } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { Form } from "./Components/Form";
import { DaysList } from "./Components/DaysList";
import { ToastContainer } from "react-toastify";
import { Lista } from "./Components/Lista";
function App() {
  const [days, setDays] = useState([]);

  return (
    <div className="App">
      <Form>
        <DaysList />
      </Form>
      <Lista />
    </div>
  );
}

export default App;
