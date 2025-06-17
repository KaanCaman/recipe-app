import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  Text,
  Keyboard,
  ListRenderItem,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {AppDispatch, RootState} from '../../redux/store';
import {useTheme} from '../../hooks/useTheme';
import {fetchMealsByName, clearMeals} from '../../redux/slice/mealSlice';
import {RecipeCard} from '../../components/RecipeCard/RecipeCard';
import {searchStyles} from './search.style';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/AppNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {uiText} from '../../utils/uiText';
import {SafeAreaView} from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootStackParamList, 'Main'>;

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strArea?: string;
  strCategory?: string;
}

const SearchScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {colors} = useTheme();
  const [query, setQuery] = useState('');
  const meals = useSelector((state: RootState) => state.meals.meals);
  const status = useSelector((state: RootState) => state.meals.status);

  // Clear meals when component mounts
  useEffect(() => {
    dispatch(clearMeals());
  }, [dispatch]);

  // Debounce search requests
  useEffect(() => {
    if (query.length === 0) {
      dispatch(clearMeals());
      return;
    }

    const timeout = setTimeout(() => {
      if (query.length >= 3) {
        dispatch(fetchMealsByName(query));
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [query, dispatch]);

  const renderMeal: ListRenderItem<Meal> = useCallback(
    ({item}) => (
      <RecipeCard
        id={item.idMeal}
        name={item.strMeal}
        thumbnail={item.strMealThumb}
        area={item.strArea ?? ''}
        category={item.strCategory ?? ''}
        onPress={() => navigation.navigate('Details', {id: item.idMeal})}
      />
    ),
    [navigation],
  );

  const renderLoading = useCallback(
    () => (
      <View style={searchStyles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    ),
    [colors.primary],
  );

  const renderInitialState = useCallback(
    () => (
      <View style={searchStyles.emptyContainer}>
        <Text style={[searchStyles.emptyText, {color: colors.textSecondary}]}>
          {uiText.search.startSearching}
        </Text>
      </View>
    ),
    [colors.textSecondary],
  );

  const renderEmptyResults = useCallback(
    () => (
      <View style={searchStyles.emptyContainer}>
        <Text style={[searchStyles.emptyText, {color: colors.textSecondary}]}>
          {uiText.search.noResults} "{query}"
        </Text>
      </View>
    ),
    [colors.textSecondary, query],
  );

  const renderMinCharactersWarning = useCallback(
    () => (
      <View style={searchStyles.emptyContainer}>
        <Text style={[searchStyles.emptyText, {color: colors.textTertiary}]}>
          {uiText.search.minCharacters}
        </Text>
      </View>
    ),
    [colors.textTertiary],
  );

  const inputContainerStyle = useMemo(
    () => [
      searchStyles.inputContainer,
      {
        borderColor: colors.border,
        backgroundColor: colors.surfaceVariant,
      },
    ],
    [colors.border, colors.surfaceVariant],
  );

  const inputStyle = useMemo(
    () => [searchStyles.input, {color: colors.textPrimary}],
    [colors.textPrimary],
  );

  const renderContent = useCallback(() => {
    // Loading state
    if (status === 'loading') {
      return renderLoading();
    }

    // No query entered
    if (query.length === 0) {
      return renderInitialState();
    }

    // Query too short
    if (query.length < 3) {
      return renderMinCharactersWarning();
    }

    // No results found
    if (meals.length === 0) {
      return renderEmptyResults();
    }

    // Show results
    return (
      <FlatList
        data={meals}
        keyExtractor={item => item.idMeal}
        renderItem={renderMeal}
        style={searchStyles.list}
        contentContainerStyle={searchStyles.listContainer}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        getItemLayout={undefined}
      />
    );
  }, [
    status,
    query.length,
    renderLoading,
    renderInitialState,
    renderMinCharactersWarning,
    renderEmptyResults,
    renderMeal,
    meals,
  ]);

  const handleSubmitEditing = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  const handleTextChange = useCallback((text: string) => {
    setQuery(text);
  }, []);

  return (
    <SafeAreaView
      style={[searchStyles.container, {backgroundColor: colors.background}]}>
      <KeyboardAvoidingView
        style={searchStyles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
        {/* Search Input */}
        <View style={inputContainerStyle}>
          <TextInput
            style={inputStyle}
            placeholder={uiText.search.placeholder}
            placeholderTextColor={colors.textTertiary}
            value={query}
            onChangeText={handleTextChange}
            returnKeyType="search"
            onSubmitEditing={handleSubmitEditing}
            autoCorrect={false}
            autoCapitalize="none"
          />
        </View>

        {/* Content */}
        <View style={searchStyles.contentContainer}>{renderContent()}</View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SearchScreen;
