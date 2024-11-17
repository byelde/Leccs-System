import { Routes } from "./routes"
import "./App.css"
import { LoggedUserProvider } from "./shared/contexts"

function App() {

  return (
    <LoggedUserProvider>
      <Routes/>
    </LoggedUserProvider>
  )
}

export default App
