import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { IonTabs } from "@ionic/react";
import Tabs from './Tabs';
import Tabs2 from './Tabs2';
import { ReserveProvider } from "./ReserveContext";

import Reserve1 from "./pages_reserves/Reserve1";
import Reserve2 from "./pages_reserves/Reserve2";
import Reserve3 from "./pages_reserves/Reserve3";
import Reserve4 from "./pages_reserves/Reserve4";
import Reserve5 from './pages_reserves/Reserve5';

import OnSite1 from './pages_onsite/OnSite1';
import OnSite2 from './pages_onsite/OnSite2';
import OnSite3 from './pages_onsite/OnSite3';
import OnSite4 from './pages_onsite/OnSite4';

import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import SignUp2 from './pages/SignUp2';
import SignUp2_2 from './pages/SignUp2_2';
import GarageList from './pages_g/GarageList';
import CompleteSignUp from './pages/CompleteSignUp';
import TabBar from './beta_app/TabBar';
import RegisterMachine from './pages/RegisterMachine';
import Welcome from './pages/Welcome';
import MyVehicle1 from './pages/MyVehicle1';
import MyVehicle2 from './pages/MyVehicle2';
import GarageDetailPage1 from './pages/GarageDetailPage1';
import ThisisBeta from './pages/ThisisBeta';
import QuoteList from './pages/QuoteList';
import QuoteDetail from './pages/QuoteDetail';
import ApprovalPending from './pages/ApprovalPending';
import ApprovalSuccess from './pages/ApprovalSuccess';
import QuoteSentSuccess from './pages/QuoteSentSuccess';
import ScheduleCalendar from './pages/ScheduleCalendar';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import { InitialLoading } from './pages/InitialLoading';



setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <ReserveProvider>
      <IonRouterOutlet>

      <Route exact path="/onsite/step1">
        <OnSite1 />
      </Route>
      <Route exact path="/onsite/step2">
        <OnSite2 />
      </Route>
      <Route exact path="/onsite/step3">
        <OnSite3 />
      </Route>
      <Route exact path="/onsite/step4">
        <OnSite4 />
      </Route>

      <Route exact path="/reserve/step1">
        <Reserve1 />
      </Route>
      <Route exact path="/reserve/step2">
        <Reserve2 />
      </Route>
      <Route exact path="/reserve/step3">
        <Reserve3 />
      </Route>
      <Route exact path="/reserve/step4">
        <Reserve4 />
      </Route>
      <Route exact path="/reserve/step5">
        <Reserve5 />
      </Route>

      <Route path="/tabs" >
        <Tabs />
      </Route>

      <Route path="/tabs2">
        <Tabs2 />
      </Route>

          <Route exact path="/">
            <InitialLoading />
          </Route>
        
      
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/signup2">
          <SignUp2 />
        </Route>
        <Route exact path="/signup2_2">
          <SignUp2_2 />
        </Route>
        <Route exact path="/garagelist"> 
          <GarageList />
        </Route>
        
        <Route exact path="/completesignup"> 
          <CompleteSignUp/>
        </Route>
     
  
        <Route exact path="/registermachine"> 
          <RegisterMachine/>
        </Route>
        <Route exact path="/welcome"> 
          <Welcome/>
        </Route>
        <Route exact path="/myvehicle1"> 
          <MyVehicle1/>
        </Route>
        <Route exact path="/myvehicle2/:machineId"> 
          <MyVehicle2/>
        </Route>
        <Route exact path="/garagedetailpage1/:id"> 
          <GarageDetailPage1/>
        </Route>
        <Route exact path="/thisisBeta"> 
          <ThisisBeta />
        </Route>
        <Route exact path="/approvalpending">
        <ApprovalPending />
        </Route>
        <Route exact path="/approvalsuccess">
        <ApprovalSuccess />
        </Route>
        <Route exact path="/quotesentsuccess">
        <QuoteSentSuccess />
        </Route>
        <Route exact path="/quotelist">
        <QuoteList />
        </Route>
        <Route exact path="/quotedetail/:id">
        <QuoteDetail />
        </Route>
        

        
        

        
        
      </IonRouterOutlet>
      </ReserveProvider>
    </IonReactRouter>
  </IonApp>
);

export default App;
