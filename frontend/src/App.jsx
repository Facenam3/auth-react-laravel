import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.jsx";

import { UserContextProvider } from "./store/contexts/UserContext.jsx";
import { AuthContextProvider } from "./store/contexts/AuthContext.jsx";
import { ProjectContext } from "./store/contexts/ProjectContext.jsx";


function App() {

  return (
    <UserContextProvider>
      <AuthContextProvider>
        <ProjectContext>
           <RouterProvider router={router} />
        </ProjectContext>       
      </AuthContextProvider>
    </UserContextProvider>
  )
}

export default App;
