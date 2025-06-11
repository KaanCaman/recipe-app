import React, {useEffect, useState, useCallback, useMemo} from 'react';
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

const alphabetKeyExtractor = (item: string) => item;
const mealKeyExtractor = (item: Meal) => item.idMeal;

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {colors} = useTheme();
  const meals = useSelector((state: RootState) => state.meals.meals);
  const status = useSelector((state: RootState) => state.meals.status);
  const [selectedLetter, setSelectedLetter] = useState<string>('A');

  useEffect(() => {
    dispatch(fetchMealsByFirstLetter(selectedLetter));
  }, [dispatch, selectedLetter]);

  const handleLetterPress = useCallback((letter: string) => {
    setSelectedLetter(letter);
  }, []);

  const handleMealPress = useCallback(
    (id: string) => {
      navigation.navigate('Details', {id});
    },
    [navigation],
  );

  const getLetterButtonStyle = useCallback(
    (isActive: boolean) => [
      homeStyles.letterButton,
      {
        backgroundColor: isActive ? colors.primary : colors.surfaceVariant,
      },
    ],
    [colors.primary, colors.surfaceVariant],
  );

  const renderLetter: ListRenderItem<string> = useCallback(
    ({item: letter}) => {
      const isActive = letter === selectedLetter;
      return (
        <Pressable
          onPress={() => handleLetterPress(letter)}
          style={getLetterButtonStyle(isActive)}>
          <Text style={{color: colors.textPrimary}}>{letter}</Text>
        </Pressable>
      );
    },
    [selectedLetter, handleLetterPress, getLetterButtonStyle, colors],
  );

  const renderMeal: ListRenderItem<Meal> = useCallback(
    ({item}) => (
      <RecipeCard
        id={item.idMeal}
        name={item.strMeal}
        thumbnail={item.strMealThumb}
        area={item.strArea ?? ''}
        category={item.strCategory ?? ''}
        onPress={() => handleMealPress(item.idMeal)}
      />
    ),
    [handleMealPress],
  );

  const renderLoading = useCallback(
    () => (
      <View style={homeStyles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    ),
    [colors.primary],
  );

  const containerStyle = useMemo(
    () => [homeStyles.container, {backgroundColor: colors.background}],
    [colors.background],
  );

  return (
    <SafeAreaView style={containerStyle}>
      {/* Alphabet Filter */}
      <FlatList
        data={ALPHABET}
        keyExtractor={alphabetKeyExtractor}
        renderItem={renderLetter}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={homeStyles.alphabetList}
        contentContainerStyle={homeStyles.alphabetContainer}
      />

      {/* Meals List */}
      {status === 'loading' ? (
        renderLoading()
      ) : (
        <FlatList
          data={meals}
          keyExtractor={mealKeyExtractor}
          renderItem={renderMeal}
          style={homeStyles.mealsList}
          contentContainerStyle={homeStyles.mealsContainer}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          maxToRenderPerBatch={8}
          updateCellsBatchingPeriod={50}
          windowSize={10}
          initialNumToRender={6}
        />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
