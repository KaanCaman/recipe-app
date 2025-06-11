import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
  ListRenderItem,
} from 'react-native';
import {AppDispatch, RootState} from '../../redux/store';
import {useTheme} from '../../hooks/useTheme';

import {RecipeCard} from '../../components/RecipeCard/RecipeCard';
import {homeStyles} from './home.style';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/AppNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMealsByFirstLetter} from '../../redux/slice/mealSlice';
import {SafeAreaView} from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootStackParamList, 'Main'>;

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strArea?: string;
  strCategory?: string;
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {colors} = useTheme();
  const meals = useSelector((state: RootState) => state.meals.meals);
  const status = useSelector((state: RootState) => state.meals.status);
  const [selectedLetter, setSelectedLetter] = useState<string>('A');

  useEffect(() => {
    dispatch(fetchMealsByFirstLetter(selectedLetter));
  }, [dispatch, selectedLetter]);

  // Alphabet letter render function
  const renderLetter: ListRenderItem<string> = ({item: letter}) => {
    const isActive = letter === selectedLetter;
    return (
      <Pressable
        onPress={() => setSelectedLetter(letter)}
        style={[
          homeStyles.letterButton,
          {
            backgroundColor: isActive ? colors.primary : colors.surfaceVariant,
          },
        ]}>
        <Text
          style={[
            homeStyles.letterText,
            {
              color: colors.textPrimary,
            },
          ]}>
          {letter}
        </Text>
      </Pressable>
    );
  };

  // Meal card render function
  const renderMeal: ListRenderItem<Meal> = ({item}) => (
    <RecipeCard
      id={item.idMeal}
      name={item.strMeal}
      thumbnail={item.strMealThumb}
      area={item.strArea ?? ''}
      category={item.strCategory ?? ''}
      onPress={() => navigation.navigate('Details', {id: item.idMeal})}
    />
  );

  // Loading component
  const renderLoading = () => (
    <View style={homeStyles.loadingContainer}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );

  return (
    <SafeAreaView
      style={[homeStyles.container, {backgroundColor: colors.background}]}>
      {/* Alphabet Filter */}
      <FlatList
        data={ALPHABET}
        keyExtractor={item => item}
        renderItem={renderLetter}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={homeStyles.alphabetContainer}
        style={homeStyles.alphabetList}
      />

      {/* Meals List */}
      {status === 'loading' ? (
        renderLoading()
      ) : (
        <FlatList
          data={meals}
          keyExtractor={item => item.idMeal}
          renderItem={renderMeal}
          style={homeStyles.mealsList}
          contentContainerStyle={homeStyles.mealsContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
