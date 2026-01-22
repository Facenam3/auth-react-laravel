import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.jsx";

import { UserContextProvider } from "./store/contexts/UserContext.jsx";
import { AuthContextProvider } from "./store/contexts/AuthContext.jsx";


function App() {

  return (
    <UserContextProvider>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </UserContextProvider>
  )
}

export default App;
