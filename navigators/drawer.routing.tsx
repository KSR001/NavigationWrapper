import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerNavigationConfig, DrawerContentOptions } from "@react-navigation/drawer/src/types";
import { RouteConfig, ParamListBase, NavigationState, EventMapBase } from "@react-navigation/native";
import * as React from "react";

export type NavigationRouteConfig = RouteConfig<ParamListBase, keyof ParamListBase, NavigationState, any, EventMapBase>;
export type NavigationDrawerConfig = DrawerNavigationConfig;
export type NavigationDrawerContentOptions = DrawerContentOptions;
export class DrawerRouting {
  _RouteConfiguration: Array<NavigationRouteConfig>;

  constructor() {
    this._RouteConfiguration = [];
  }

  addDrawerRoute(item: any) {
    this._RouteConfiguration.push(item);
  }

  _getDrawerConfiguration() {
    return this._RouteConfiguration;
  }

  createDrawerComponent(initialRouteName?: string, screenOptions?: any, backBehavior?: any, drawerConfig?: NavigationDrawerConfig) {
    const Drawer = createDrawerNavigator();
    return (
      <Drawer.Navigator
        initialRouteName={initialRouteName}
        screenOptions={screenOptions}
        backBehavior={backBehavior}
        lazy={drawerConfig ? drawerConfig.lazy : undefined }
        sceneContainerStyle={drawerConfig ? drawerConfig.sceneContainerStyle : {}}
        drawerStyle={drawerConfig ? drawerConfig.drawerStyle : {}}
        drawerContent={drawerConfig ? drawerConfig.drawerContent : undefined}
      >
        {this._RouteConfiguration.map((route, index) => (
            route.component ? <Drawer.Screen key={index} name={route.name} component={route.component} options = {route.options} initialParams = {route.initialParams} listeners = {route.listeners}/> 
            : route.getComponent ? <Drawer.Screen key={index} name={route.name} getComponent={route.getComponent} options = {route.options} initialParams = {route.initialParams} listeners = {route.listeners}/> 
            : route.children ? <Drawer.Screen key={index} name={route.name} children={route.children} options = {route.options} initialParams = {route.initialParams} listeners = {route.listeners}/> 
            : {}
          ))
          }
      </Drawer.Navigator>
    )
  }
}