import { IonRouterOutlet, IonTabs } from "@ionic/react";
import { Redirect, Route } from "react-router-dom";
import TabBar2 from "./beta_app/TabBar2";

import Home2 from "./pages/Home2";
import MyParts from "./pages/MyParts";
import Status from "./pages/Status";
import Option from "./pages/Option";
import ScheduleCalendar from "./pages/ScheduleCalendar";

const Tabs2: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs2/home">
          <Home2 />
        </Route>
        <Route exact path="/tabs2/myparts">
          <MyParts />
        </Route>
        <Route exact path="/tabs2/status">
          <Status />
        </Route>
        <Route exact path="/tabs2/option">
          <Option />
        </Route>
        <Route exact path="/tabs2/schedulecalendar">
          <ScheduleCalendar />
        </Route>
        <Route exact path="/tabs2">
          <Redirect to="/tabs2/home" />
        </Route>
      </IonRouterOutlet>
      <TabBar2 />
    </IonTabs>
  );
};

export default Tabs2;