import { IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";
import { addIcons } from "ionicons";
import homeIcon from "/homeIcon.svg";
import fileIcon from "/fileIcon.svg";
import optionIcon from "/optionIcon.svg"
import truckIcon from "/truckIcon.svg";

addIcons({
    "home-icon": homeIcon,
    "file-icon": fileIcon,
    "option-icon": optionIcon,
    "truck-icon": truckIcon
});

const TabBar:React.FC = () => {
    return (
        <IonTabBar slot="bottom">
          <IonTabButton tab="Home" href="/tabs/home" >
            <IonIcon aria-hidden="true" name="home-icon" />
            <IonLabel>홈</IonLabel>
          </IonTabButton>
          <IonTabButton tab="MyVehicle" href="/tabs/myvehicle1">
            <IonIcon aria-hidden="true" name="truck-icon" />
            <IonLabel>MY 기계</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Status" href="/tabs/status">
            <IonIcon aria-hidden="true" name="file-icon" />
            <IonLabel>현황/내역</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Option" href="/tabs/option">
            <IonIcon aria-hidden="true" name="option-icon" />
            <IonLabel>설정</IonLabel>
          </IonTabButton>
        </IonTabBar>
    );
}


export default TabBar;

