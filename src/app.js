import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import Application from './application.js'
import AdminDashboard from './adminDashboard'
function App(){
    return(
        <BrowserRouter>
            <div>
                    <h1>User Job Application</h1>



                    <Route path='/' component={Application} exact={true}/>
                    <Route path='/admin' component={ AdminDashboard} />
                   
            </div>
        </BrowserRouter>
    )
}
export default App