
  import { createRoot } from "react-dom/client";
  import { BrowserRouter } from "react-router";
  import AppRouter from "./AppRouter.tsx";
  import { GeoBlock } from "./components/GeoBlock.tsx";
  import "./styles/index.css";

  createRoot(document.getElementById("root")!).render(
    <GeoBlock>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </GeoBlock>
  );
