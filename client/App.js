import { useEffect, useState } from "react";
import { Routes } from "react-router-dom";
import routes from "./routes/routes";
import { Box } from "@chakra-ui/react";
import Loading from "./components/loading";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1400);
  }, [isLoading]);

  return (
    <>{isLoading ? <Loading /> : <Routes>{routes.map((val) => val)}</Routes>}</>
  );
}

export default App;
