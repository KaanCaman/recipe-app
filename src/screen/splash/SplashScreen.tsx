import React, {useEffect} from 'react';
import {View, Image, Text} from 'react-native';
import {splashStyles} from './splash.style';
import {useDispatch} from 'react-redux';
import {initializeTheme} from '../../redux/slice/settingsSlice';
import {uiText} from '../../utils/uiText';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/AppNavigator';
import {AppDispatch} from '../../redux/store';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(initializeTheme());
    const timeout = setTimeout(() => navigation.replace('Main'), 2000);
    return () => clearTimeout(timeout);
  }, [dispatch, navigation]);

  return (
    <View style={splashStyles.container}>
      <Image
        source={require('../../assets/logo/recipe-app-logo.png')}
        style={splashStyles.logo}
      />
      <Text style={splashStyles.splashText}>{uiText.appName}</Text>
    </View>
  );
};

export default SplashScreen;
