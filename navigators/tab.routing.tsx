import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RouteConfig, ParamListBase, NavigationState, EventMapBase } from "@react-navigation/native"
import * as React from "react";

export type NavigationRouteConfig = RouteConfig<ParamListBase, keyof ParamListBase, NavigationState, any, EventMapBase>;

export class TabRouting {
  _RouteConfiguration: Array<NavigationRouteConfig>;

  constructor() {
    this._RouteConfiguration = [];
  }

  addTabRoute(item: any) {
    this._RouteConfiguration.push(item);
  }

  _getTabConfiguration() {
    return this._RouteConfiguration;
  }

  createTabComponent(initialRouteName?: string, screenOptions?: any, backBehavior?: any, lazy?: boolean, sceneContainerStyle?: any, tabBar?: any) {
    const Tab = createBottomTabNavigator();
    return (
      <Tab.Navigator
        initialRouteName={initialRouteName}
        screenOptions={screenOptions}
        backBehavior={backBehavior}
        lazy={lazy}
        sceneContainerStyle={sceneContainerStyle}
        tabBar={tabBar}
      >
        {this._RouteConfiguration.map((route, index) => (
            route.component ? <Tab.Screen key={index} name={route.name} component={route.component} options = {route.options} initialParams = {route.initialParams} listeners = {route.listeners}/> 
            : route.getComponent ? <Tab.Screen key={index} name={route.name} getComponent={route.getComponent} options = {route.options} initialParams = {route.initialParams} listeners = {route.listeners}/> 
            : route.children ? <Tab.Screen key={index} name={route.name} children={route.children} options = {route.options} initialParams = {route.initialParams} listeners = {route.listeners}/> 
            : {}
          ))
          }
      </Tab.Navigator>
    )
  }
}