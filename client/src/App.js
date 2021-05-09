import TextEditor from "./TextEditor"
import Drive from "./Drive"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import { v4 as uuidV4 } from "uuid"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Drive />
          {/* <Redirect to={`/documents/${uuidV4()}`} /> */}
        </Route>
        <Route path="/documents/:id">
          <TextEditor />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
