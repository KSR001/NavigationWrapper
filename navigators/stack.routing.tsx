import { createStackNavigator } from "@react-navigation/stack";
import { RouteConfig, ParamListBase, NavigationState, EventMapBase } from "@react-navigation/native"
import * as React from "react";

export type NavigationRouteConfig = RouteConfig<ParamListBase, keyof ParamListBase, NavigationState, any, EventMapBase>;

export class StackRouting {
  _RouteConfiguration: Array<NavigationRouteConfig>;

  constructor() {
    this._RouteConfiguration = [];
  }

  addStackRoute(item: any) {
    this._RouteConfiguration.push(item);
  }

  _getStackConfiguration() {
    return this._RouteConfiguration;
  }

  createStackComponent(initialRouteName?: string, screenOptions?: any, keyboardHandlingEnabled?: boolean, mode?: any, headerMode?: any) {
    const Stack = createStackNavigator();
    return (
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={screenOptions}
        keyboardHandlingEnabled={keyboardHandlingEnabled}
        mode={mode}
        headerMode={headerMode}
      >
        {this._RouteConfiguration.map((route, index) => (
            route.component ? <Stack.Screen key={index} name={route.name} component={route.component} options = {route.options} initialParams = {route.initialParams} listeners = {route.listeners}/> 
            : route.getComponent ? <Stack.Screen key={index} name={route.name} getComponent={route.getComponent} options = {route.options} initialParams = {route.initialParams} listeners = {route.listeners}/> 
            : route.children ? <Stack.Screen key={index} name={route.name} children={route.children} options = {route.options} initialParams = {route.initialParams} listeners = {route.listeners}/> 
            : {}
          ))
          }
      </Stack.Navigator>
    )
  }
}