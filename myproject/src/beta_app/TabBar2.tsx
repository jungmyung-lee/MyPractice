import React from "react";
import { IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";
import homeIcon from "/homeIcon.svg";
import optionIcon from "/optionIcon.svg"
import spannerIcon from "/spannerIcon.svg"
import componentsIcon from "/componentsIcon.svg"
import { addIcons } from "ionicons";

addIcons({
    "home-icon": homeIcon,
    "spanner-icon": spannerIcon,
    "option-icon": optionIcon,
    "components-icon": componentsIcon
});

const TabBar2: React.FC = () => {
  return (
    <IonTabBar slot="bottom">
      <IonTabButton tab="home" href="/tabs2/home">
        <IonIcon aria-hidden="true" name="home-icon" />
        <IonLabel>홈</IonLabel>
      </IonTabButton>

      <IonTabButton tab="myparts" href="/tabs2/myparts">
        <IonIcon aria-hidden="true" name="components-icon" />
        <IonLabel>MY 기계</IonLabel>
      </IonTabButton>

      <IonTabButton tab="status" href="/tabs2/schedulecalendar">
        <IonIcon aria-hidden="true" name="spanner-icon" />
        <IonLabel>정비 관리</IonLabel>
      </IonTabButton>

      <IonTabButton tab="settings" href="/tabs2/option">
        <IonIcon aria-hidden="true" name="option-icon" />
        <IonLabel>설정</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
};

export default TabBar2;