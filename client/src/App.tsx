import { FC } from "react";
import Navbar from "./components/Navbar";
import Migrator from "./components/Migrator";

const App: FC = () => {
  return (
    <main>
      <Navbar />
      <Migrator />
    </main>
  );
};

export default App;
