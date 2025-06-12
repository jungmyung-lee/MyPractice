import { IonRouterOutlet, IonTabs } from "@ionic/react"
import  TabBar  from "./beta_app/TabBar"
import { Redirect, Route } from "react-router-dom"
import Home from "./pages/Home"
import MyVehicle1 from "./pages/MyVehicle1"
import Option from "./pages/Option"
import Status from "./pages/Status"

const Tabs:React.FC = () => {
    return (
        <IonTabs>
  <IonRouterOutlet>
    <Route exact path="/tabs/home">
      <Home />
    </Route>
    <Route exact path="/tabs/myvehicle1">
      <MyVehicle1 />
    </Route>
    <Route exact path="/tabs/status">
      <Status />
    </Route>
    <Route exact path="/tabs/option">
      <Option />
    </Route>
    <Route exact path="/tabs">
      <Redirect to="/tabs/home" />
    </Route>
  </IonRouterOutlet>
  <TabBar />
</IonTabs>
    )
}

export default Tabs;