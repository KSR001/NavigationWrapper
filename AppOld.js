/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StackRouting } from "./navigators/stack.routing";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function TabNavigation() {
  return (
    <Tab.Navigator>
        <Tab.Screen name="First">
          {() => (
            <Stack.Navigator>
              <Stack.Screen
                name="Settings"
                component={SettingsScreen}
              />
              <Stack.Screen name="Settings2" component={SettingsScreen} />
            </Stack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen name="Second">
          {() => (
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Details" component={DetailsScreen} />
            </Stack.Navigator>
          )}
        </Tab.Screen>
      </Tab.Navigator>
  )
}

//const HomeScreen: () => React$Node = ({ navigation }) => {
function HomeScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Notifications"
        onPress={() => navigation.navigate('notification')}
      />
    </View>
  );
};

const screens = {
  home: HomeScreen,
  notification: NotificationsScreen
}

function App() {
  var stackRouting = new StackRouting();
  stackRouting.addStackRoute(
    {name: "home",component: HomeScreen,options: {}}
  );
  stackRouting.addStackRoute(
    {name: "notification",component: NotificationsScreen,options: {}}
  );
  let Stack = stackRouting.createStackComponent();
  return (
    <NavigationContainer>
      <Stack/>
    </NavigationContainer>
  );
}

function DetailsScreen({navigation}) {
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

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
  </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
