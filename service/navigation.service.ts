import * as React from 'react';
import { CommonActions, DrawerActions, StackActions } from '@react-navigation/native';

var NavigationServiceInstance: NavigationService; //Singleton instance
export class NavigationService {
  private static _navigatorReference: any;
  private static _isNavigationReadyReference: any;

  private constructor() { }

  public static get Instance(): NavigationService {
    if (!NavigationServiceInstance) NavigationServiceInstance = new NavigationService();
    this._navigatorReference = React.createRef();
    this._isNavigationReadyReference = React.createRef();
    return NavigationServiceInstance;
  }

  public GetNavigationRef(): any {
    return NavigationService._navigatorReference;
  }

  public GetIsNavigationReadyRef(): any {
    return NavigationService._isNavigationReadyReference;
  }

  private _checkNavigatorValidity() {
    if(!NavigationService._isNavigationReadyReference.current) throw new Error("App has not mounted yet");
  }

  public Navigate(name: string, params?: any): void {
    this._checkNavigatorValidity();
    if(NavigationService._navigatorReference.current)
      NavigationService._navigatorReference.current.navigate(name, params);
  }

  /*
  params.Source to specify source of navigation. 
  params.Target to specify target of navigation
  */
  public GoBack(params?: any): void {
    this._checkNavigatorValidity();
    if(NavigationService._navigatorReference.current)
      NavigationService._navigatorReference.current.dispatch({
        ...CommonActions.goBack(),
        source: params ? params.Source : undefined,
        target: params ? params.Target : undefined,
      });
    
  }

  public OpenDrawer(): void {
    this._checkNavigatorValidity();
    if(NavigationService._navigatorReference.current)
      NavigationService._navigatorReference.current.dispatch(DrawerActions.openDrawer());    
  }

  public CloseDrawer(): void {
    this._checkNavigatorValidity();
    if(NavigationService._navigatorReference.current)
      NavigationService._navigatorReference.current.dispatch(DrawerActions.closeDrawer()); 
  }

  public ToggleDrawer(): void {
    this._checkNavigatorValidity();
    if(NavigationService._navigatorReference.current)
      NavigationService._navigatorReference.current.dispatch(DrawerActions.toggleDrawer()); 
  }

  public JumpToScreenDrawer(name: string, params?: any): void {
    this._checkNavigatorValidity();
    if(NavigationService._navigatorReference.current)
      NavigationService._navigatorReference.current.dispatch(DrawerActions.jumpTo(name, params)); 
  }

  public Replace(name: string, params?: any): void {
    this._checkNavigatorValidity();
    if(NavigationService._navigatorReference.current)
      NavigationService._navigatorReference.current.dispatch(StackActions.replace(name, params)); 
      // Possible with source and target too.
  }

  public Push(name: string, params?: any): void {
    this._checkNavigatorValidity();
    if(NavigationService._navigatorReference.current)
      NavigationService._navigatorReference.current.dispatch(StackActions.push(name, params)); 
  }

  public Pop(n: number = 1): void {
    this._checkNavigatorValidity();
    if(NavigationService._navigatorReference.current)
      NavigationService._navigatorReference.current.dispatch(StackActions.pop(n)); 
  }

  public PopToTop(): void {
    this._checkNavigatorValidity();
    if(NavigationService._navigatorReference.current)
      NavigationService._navigatorReference.current.dispatch(StackActions.popToTop()); 
  }
}
