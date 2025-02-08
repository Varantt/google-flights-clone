import "./App.scss";
import { useAppContext } from "@/context/AppContext";
import { Header } from "@/components/Header/Header";
import headerImage from "../public/svg/flights_nc_4.svg";
import darkHeaderImage from "../public/svg/flights_nc_dark_theme_4.svg";

function App() {
  const { title } = useAppContext();

  return (
    <main id="app" className="max-width">
      <Header title={title} lightImage = {headerImage} darkImage=  {darkHeaderImage} />
    </main>
  );
}

export default App;
