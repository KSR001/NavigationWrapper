import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

export class RootNavigator {

    createRootNavigatorComponent(navigationRef: any, isReadyRef: any, component : JSX.Element) {
        return (<NavigationContainer ref={navigationRef} onReady={() => {
            isReadyRef.current = true;
          }}>
            {component}
        </NavigationContainer>);
    }
}