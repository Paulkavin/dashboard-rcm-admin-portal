import { BrowserRouter } from "react-router";

import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./pages/login/AuthContext";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;