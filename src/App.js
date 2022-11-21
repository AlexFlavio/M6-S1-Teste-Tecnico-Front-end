import "./App.css";
import { Form } from "./Components/Form";
import { DaysList } from "./Components/DaysList";
import { Lista } from "./Components/Lista";
function App() {

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
