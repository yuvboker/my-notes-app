import React from "react";
import { BrowserRouter, Route} from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import UserNotes from "./UserNotes";
import Register from "./Register";

function App(){
    return <div>
        <Header/>
        <BrowserRouter>
            <div>
                <Route exact path="/" component={Home}/>
                <Route exact path="/register" component={Register}/>
                <Route path="/:username/notes" component={UserNotes}/>
                <Route path="/google/:googleId/notes" component={UserNotes}/>
            </div>
        </BrowserRouter>
    </div>
}

export default App;