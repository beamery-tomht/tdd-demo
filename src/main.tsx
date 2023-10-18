import { theme } from "@beamery/lib-ds-theme";
import { DesignSystemProvider } from "@beamery/lib-ds-components";
import ReactDOM from "react-dom/client";
import { TodosProvider } from "./context/todos-provider.tsx";
import { App } from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <DesignSystemProvider appId="tdd-demo" theme={theme}>
    <TodosProvider>
      <App />
    </TodosProvider>
  </DesignSystemProvider>
);
