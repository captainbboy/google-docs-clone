import TextEditor from "./TextEditor"
import Drive from "./Drive"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Drive />
        </Route>
        <Route path="/documents/:id">
          <TextEditor />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
