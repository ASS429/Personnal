import { BrowserRouter, Route, Routes } from "react-router-dom";
import ThemeProvider from "./components/ThemeProvider.tsx";
import Index from "./pages/Index.tsx";
import CV from "./pages/CV.tsx";
import NotFound from "./pages/NotFound.tsx";

const App = () => (
  <ThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/cv" element={<CV />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
