import React, {useEffect, useCallback, useMemo, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
  ListRenderItem,
  RefreshControl,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {RootStackParamList} from '../../navigation/AppNavigator';
import {AppDispatch, RootState} from '../../redux/store';
import {useTheme} from '../../hooks/useTheme';
import {favoritesStyles} from './favorites.style';
import {RecipeCard} from '../../components/RecipeCard/RecipeCard';
import {Heart, RefreshCw} from 'lucide-react-native';
import {
  fetchFavorites,
  removeFromFavorites,
  setFavorites,
} from '../../redux/slice/favoriteSlice';
import {firebaseService} from '../../service/firebaseService';
import {uiText} from '../../utils/uiText';

type Props = NativeStackScreenProps<RootStackParamList, 'Main'>;

interface FavoriteItem {
  mealId: string;
  mealData: {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strArea: string;
    strCategory: string;
  };
  addedAt: any;
}

// Static separator component
const ItemSeparator = () => <View style={favoritesStyles.separator} />;

const FavoritesScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {colors} = useTheme();
  const {favorites, status, error, removeStatus} = useSelector(
    (state: RootState) => state.favorites,
  );

  // Ref to store unsubscribe function
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Subscribe to real-time updates
    unsubscribeRef.current = firebaseService.subscribeFavorites(
      (list: any[]) => {
        dispatch(setFavorites(list));
      },
    );

    return () => {
      unsubscribeRef.current?.();
    };
  }, [dispatch]);

  // Handlers
  const handleRefresh = useCallback(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  const handleMealPress = useCallback(
    (id: string) => {
      navigation.navigate('Details', {id});
    },
    [navigation],
  );

  const handleRemoveFavorite = useCallback(
    (mealId: string) => {
      dispatch(removeFromFavorites(mealId));
    },
    [dispatch],
  );

  const handleRetry = useCallback(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  // Render functions
  const renderFavorite: ListRenderItem<FavoriteItem> = useCallback(
    ({item}) => (
      <View style={favoritesStyles.cardContainer}>
        <RecipeCard
          id={item.mealData.idMeal}
          name={item.mealData.strMeal}
          thumbnail={item.mealData.strMealThumb}
          area={item.mealData.strArea || ''}
          category={item.mealData.strCategory || ''}
          onPress={() => handleMealPress(item.mealData.idMeal)}
        />
        <Pressable
          style={[
            favoritesStyles.removeButton,
            {backgroundColor: colors.error},
          ]}
          onPress={() => handleRemoveFavorite(item.mealId)}
          disabled={removeStatus === 'loading'}>
          {removeStatus === 'loading' ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={favoritesStyles.removeButtonText}>
              {uiText.favorites.remove}
            </Text>
          )}
        </Pressable>
      </View>
    ),
    [colors.error, handleMealPress, handleRemoveFavorite, removeStatus],
  );

  const renderLoading = useCallback(
    () => (
      <View style={favoritesStyles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text
          style={[favoritesStyles.centerText, {color: colors.textSecondary}]}>
          {uiText.favorites.loading}
        </Text>
      </View>
    ),
    [colors.primary, colors.textSecondary],
  );

  const renderError = useCallback(
    () => (
      <View style={favoritesStyles.centerContainer}>
        <Text style={[favoritesStyles.errorText, {color: colors.error}]}>
          {error || uiText.favorites.error}
        </Text>
        <Pressable
          style={[
            favoritesStyles.retryButton,
            {backgroundColor: colors.primary},
          ]}
          onPress={handleRetry}>
          <RefreshCw size={20} color="white" />
          <Text style={favoritesStyles.retryButtonText}>
            {uiText.favorites.retry}
          </Text>
        </Pressable>
      </View>
    ),
    [colors.error, colors.primary, error, handleRetry],
  );

  const renderEmpty = useCallback(
    () => (
      <View style={favoritesStyles.centerContainer}>
        <Heart size={64} color={colors.textTertiary} />
        <Text style={[favoritesStyles.emptyTitle, {color: colors.textPrimary}]}>
          {uiText.favorites.empty.title}
        </Text>
        <Text
          style={[
            favoritesStyles.emptySubtitle,
            {color: colors.textSecondary},
          ]}>
          {uiText.favorites.empty.subtitle}
        </Text>
      </View>
    ),
    [colors.textPrimary, colors.textSecondary, colors.textTertiary],
  );

  const renderHeader = useCallback(
    () => (
      <View style={favoritesStyles.header}>
        <Text
          style={[favoritesStyles.headerTitle, {color: colors.textPrimary}]}>
          {uiText.favorites.title}
        </Text>
        <Text
          style={[
            favoritesStyles.headerSubtitle,
            {color: colors.textSecondary},
          ]}>
          {favorites.length}{' '}
          {favorites.length === 1
            ? uiText.favorites.subtitle.single
            : uiText.favorites.subtitle.plural}
        </Text>
      </View>
    ),
    [colors.textPrimary, colors.textSecondary, favorites.length],
  );

  // Memoized values
  const keyExtractor = useCallback((item: FavoriteItem) => item.mealId, []);

  const refreshControl = useMemo(
    () => (
      <RefreshControl
        refreshing={status === 'loading'}
        onRefresh={handleRefresh}
        colors={[colors.primary]}
        tintColor={colors.primary}
      />
    ),
    [status, handleRefresh, colors.primary],
  );

  const containerStyle = useMemo(
    () => [favoritesStyles.container, {backgroundColor: colors.background}],
    [colors.background],
  );

  // Main render logic
  const renderContent = useCallback(() => {
    if (status === 'loading' && favorites.length === 0) {
      return renderLoading();
    }
    if (status === 'failed') {
      return renderError();
    }
    if (favorites.length === 0) {
      return renderEmpty();
    }
    return (
      <FlatList
        data={favorites}
        keyExtractor={keyExtractor}
        renderItem={renderFavorite}
        ListHeaderComponent={renderHeader}
        refreshControl={refreshControl}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        maxToRenderPerBatch={8}
        updateCellsBatchingPeriod={50}
        windowSize={10}
        initialNumToRender={6}
        contentContainerStyle={favoritesStyles.listContainer}
        ItemSeparatorComponent={ItemSeparator}
      />
    );
  }, [
    status,
    favorites,
    renderLoading,
    renderError,
    renderEmpty,
    keyExtractor,
    renderFavorite,
    renderHeader,
    refreshControl,
  ]);

  return <SafeAreaView style={containerStyle}>{renderContent()}</SafeAreaView>;
};

export default FavoritesScreen;
