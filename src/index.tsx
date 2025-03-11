/* @refresh reload */
import "./styles/tailwind.css";
import { render } from "solid-js/web";
import App from "./App";
import { setupWasmAnalyzerTheme } from "./MonacoTheme";
import { setupWitLanguage } from "./WitLanguage";
import { setupWatLanguage } from "./WatLanguage";
import { Route, Router } from "@solidjs/router";
import { WatPage } from "./pages/Wat";
import { StartupPage } from "./pages/Startup";
import { Metadata } from "./pages/Metadata";
import { SbomPage } from "./pages/Sbom";
import ComponentsPage from "./pages/Components";
import { ImportsPage } from "./pages/Imports";
import { ExportsPage } from "./pages/Exports";
import { WitPage } from "./pages/Wit";
import { DependenciesPage } from "./pages/Dependencies";
import { CustomSectionsPage } from "./pages/CustomSections";
import { EnvPage } from "./pages/Env";

setupWasmAnalyzerTheme();
setupWitLanguage();
setupWatLanguage();

render(
  () => (
    <Router root={App}>
      <Route path="/" component={StartupPage} />
      <Route path="/wat" component={WatPage} />
      <Route path="/sbom" component={SbomPage} />

      <Route path="/metadata" component={Metadata} />

      <Route path="/imports" component={ImportsPage} />
      <Route path="/exports" component={ExportsPage} />

      <Route path="/wit" component={WitPage} />
      <Route path="/components" component={() => <ComponentsPage />} />
      <Route path="/dependencies" component={DependenciesPage} />

      <Route path="/custom-sections" component={CustomSectionsPage} />

      <Route path="/env" component={EnvPage} />
    </Router>
  ),
  document.getElementById("root")!
);
