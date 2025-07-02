import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import MovieDetail from '../screens/MovieDetail';
import ArtistDetail from '../screens/ArtistDetail';
import Favorites from '../screens/Favorites';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, StyleSheet, Platform, Text } from 'react-native';

export type RootStackParamList = {
  MainTabs: undefined;
  MovieDetail: { movieId: number };
  ArtistDetail: { artistId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const TabBarBackground = () => (
  <View style={styles.tabBarBg} />
);

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: styles.tabBar,
      tabBarBackground: TabBarBackground,
    }}
  >
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={styles.tabIconContainer}>
            <Icon name="home" size={26} color={focused ? '#7B61FF' : '#888'} style={styles.tabIcon} />
            <Text style={[styles.tabLabel, { color: focused ? '#7B61FF' : '#888' }]}>Home</Text>
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Favorites"
      component={Favorites}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={styles.tabIconContainer}>
            <Icon name="heart" size={26} color={focused ? '#7B61FF' : '#888'} style={styles.tabIcon} />
            <Text style={[styles.tabLabel, { color: focused ? '#7B61FF' : '#888' }]}>Favorite</Text>
          </View>
        ),
      }}
    />
  </Tab.Navigator>
);

const AppNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MainTabs" component={MainTabs} />
    <Stack.Screen name="MovieDetail" component={MovieDetail} />
    <Stack.Screen name="ArtistDetail" component={ArtistDetail} />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 70,
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderTopColor: '#7B61FF',
    borderLeftColor: '#7B61FF',
    borderRightColor: '#7B61FF',
    shadowColor: '#7B61FF',
    shadowOpacity: 4,
    shadowRadius: 15,
    elevation: 12,
    overflow: 'hidden',
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
  },
  tabIcon: {
    marginTop: 20,
  },
  tabLabel: {
    fontSize: 14,
    marginTop: 2,
    fontWeight: '600',
    width: 60,
    textAlign: 'center',
  },
});

export default AppNavigator;
