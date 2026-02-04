import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.jsx";

import { UserContextProvider } from "./store/contexts/UserContext.jsx";
import { AuthContextProvider } from "./store/contexts/AuthContext.jsx";
import { ProjectContextProvider } from "./store/contexts/ProjectContext.jsx";
import { TaskContextProvider } from "./store/contexts/TaskContext.jsx";


function App() {

  return (
    <UserContextProvider>
      <AuthContextProvider>
        <ProjectContextProvider>
          <TaskContextProvider>
            <RouterProvider router={router} />
          </TaskContextProvider>          
        </ProjectContextProvider>       
      </AuthContextProvider>
    </UserContextProvider>
  )
}

export default App;
