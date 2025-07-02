import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider, useDispatch } from 'react-redux';
import store from './src/store/store';
import { loadFavorites } from './src/store/favorites/favoritesActions';
import Loader from './src/screens/Loader';

const AppContent = () => {
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    dispatch(loadFavorites());
    const timer = setTimeout(() => setShowLoader(false), 2000);
    return () => clearTimeout(timer);
  }, [dispatch]);

  if (showLoader) return <Loader />;

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

const App = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default App;