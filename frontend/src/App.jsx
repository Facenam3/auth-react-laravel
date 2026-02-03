import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.jsx";

import { UserContextProvider } from "./store/contexts/UserContext.jsx";
import { AuthContextProvider } from "./store/contexts/AuthContext.jsx";
import { ProjectContextProvider } from "./store/contexts/ProjectContext.jsx";


function App() {

  return (
    <UserContextProvider>
      <AuthContextProvider>
        <ProjectContextProvider>
           <RouterProvider router={router} />
        </ProjectContextProvider>       
      </AuthContextProvider>
    </UserContextProvider>
  )
}

export default App;
