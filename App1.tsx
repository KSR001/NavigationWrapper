import { StackRouting, NavigationRouteConfig } from "./navigators/stack.routing";
import { NavigationContainer } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack';
import * as React from 'react';
import { View, Button, Text, Alert, TouchableOpacity } from 'react-native';
import { RootNavigator } from "./navigators/root.navigator";
import { TabRouting } from "./navigators/tab.routing";
import { DrawerRouting } from "./navigators/drawer.routing";
import { NavigationService } from "./service/navigation.service";

let navigationService: NavigationService = NavigationService.Instance;

function HomeScreen({ navigation }: any) {
    
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen </Text>
            <Button title="Go to Notifications" onPress={() => navigationService.Navigate('notification')} />
        </View>
    );
};

function NotificationsScreen({ navigation }: any) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }
        }>
            <Button onPress={() => navigationService.GoBack()} title="Go back home" />
            <Button onPress={() => navigationService.OpenDrawer()} title="Open Drawer"/>
            <Button onPress={() => navigationService.CloseDrawer()} title="Close Drawer"/>
            <Button onPress={() => navigationService.ToggleDrawer()} title="Toggle Drawer"/>
            <Button onPress={() => navigationService.JumpToScreenDrawer('home')} title="Jump to Drawer Home"/>
        </View>
    );
}

function DetailsScreen({ navigation }: any) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
            <Button
                title="Go back"
                onPress={() => navigation.popToTop()}
            />
        </View>
    );
}

function MyTabBar({ state, descriptors, navigation }: any) {
    const focusedOptions = descriptors[state.routes[state.index].key].options;

    if (focusedOptions.tabBarVisible === false) {
        return null;
    }

    return (
        <View style={{ flexDirection: 'row' }}>
            {
                state.routes.map((route : any, index: number) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;
                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };
                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    return (
                        <TouchableOpacity
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={{ flex: 1 }}
                            key={index}
                        >
                            <Text style={{ backgroundColor: isFocused ? '#673ab7' : '#222' }}>
                                {label}
                            </Text>
                        </TouchableOpacity>
                    )
            }
        )}
      </View>
    );
}

export function App() {

    React.useEffect(() => {
        return () => {
          navigationService.GetIsNavigationReadyRef().current = false
        };
      }, []);

    var stackRouting = new StackRouting();
    let route1: NavigationRouteConfig = {
        name: "home", component: HomeScreen, options: {
            headerLeft: (props: any) => (
                <HeaderBackButton
                    {...props}
                    onPress={() => {
                        Alert.alert("Cannot go back");
                    }}
                />)
        }
    };
    let route2: NavigationRouteConfig = { name: "notification", component: NotificationsScreen, options: {} };
    let tabRoute1: NavigationRouteConfig = { name: "home", component: HomeScreen };
    stackRouting.addStackRoute(route1);
    stackRouting.addStackRoute(route2);
    let Stack = stackRouting.createStackComponent("home");

    let rootNavigator = new RootNavigator();

    let tabRouting = new TabRouting();
    tabRouting.addTabRoute(tabRoute1);
    tabRouting.addTabRoute(route2);
    let tabBarComponent = (props: any) => <MyTabBar {...props} />
    let Tab = tabRouting.createTabComponent("home", {}, "none", true, {}, tabBarComponent);

    let drawerRouting = new DrawerRouting();
    drawerRouting.addDrawerRoute(route1);
    drawerRouting.addDrawerRoute(route2);
    let Drawer = drawerRouting.createDrawerComponent("home");
    //let root = 
    return (
        rootNavigator.createRootNavigatorComponent(navigationService.GetNavigationRef(), navigationService.GetIsNavigationReadyRef(), Drawer)
    );
}