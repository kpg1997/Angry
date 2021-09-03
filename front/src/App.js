import './App.css';

// import Userinput from './containers/Userinput';
import Exchange from './containers/Exchange';

import Main from './pages/Main'
import Registerpage from './pages/Register';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import {useCookies} from 'react-cookie'
import { useDispatch } from 'react-redux';
import { login_token } from './modules/user';
import { useEffect } from 'react';
// import LatestBlocks from './components/LatestBlocks';
import BlockPage from './pages/Block';
// import Transactions from './components/Transactions';
import Users from './pages/Users'
import Yamaexplorer from './pages/Yamaexplorer';
import Txpage from './pages/Txpage';
import Txpage2 from './pages/Txpage2';
import ExchangePage from './pages/ExchangePage'
function App() {
    const dispatch = useDispatch()
    const [cookies, setCookie, removeCookie] = useCookies(['Angry_auth']);
    let token = cookies.Angry_auth
    // console.log(token, '응애 나 애기 토큰')

   
    useEffect(() => {
        if(token){
            let body = {
                token : token
            }
            dispatch(login_token(body))
        }
    }, [])
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route exact={true} path="/" component={Main} />

                    <Route path="/register" component={Registerpage} />
                    <Route path="/exchange" component={ExchangePage} />



                    <Route path="/block/:hash" component={BlockPage} />


                    <Route path="/users" component={Users}/>

                    <Route path="/yamainfo" component={Yamaexplorer}/>
                    
                    <Route path="/tx/:txid" component={Txpage}/>
                    <Route path="/txundefind" component={Txpage2} />
                    {/* Not Found */}
                    <Route component={() => <Redirect to="/" />} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
