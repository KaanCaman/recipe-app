import React, {useEffect, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {RootStackParamList} from '../../navigation/AppNavigator';
import {AppDispatch, RootState} from '../../redux/store';
import {useTheme} from '../../hooks/useTheme';
import {detailStyles} from './detail.style';
import {Heart, ArrowLeft, Clock, Users} from 'lucide-react-native';
import {
  fetchMealDetail,
  checkFavoriteStatus,
  toggleFavorite,
  clearDetails,
} from '../../redux/slice/detaiSllice';
import {uiText} from '../../utils/uiText';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

interface Ingredient {
  ingredient: string;
  measure: string;
}

interface Instruction {
  step: string;
  index: number;
}

const DetailsScreen: React.FC<Props> = ({navigation, route}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {colors} = useTheme();
  const {id} = route.params;

  // Redux state
  const {meal, status, error, isFavorite, favoriteStatus} = useSelector(
    (state: RootState) => state.details,
  );

  // Fetch data on mount / id change
  useEffect(() => {
    dispatch(clearDetails());
    dispatch(fetchMealDetail(id));
    dispatch(checkFavoriteStatus(id));
  }, [dispatch, id]);

  // Navigation handlers
  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // Favorite toggle
  const handleToggleFavorite = useCallback(() => {
    if (!meal) {
      return;
    }
    const mealData = {
      idMeal: meal.idMeal,
      strMeal: meal.strMeal,
      strMealThumb: meal.strMealThumb,
      strArea: meal.strArea,
      strCategory: meal.strCategory,
    };
    dispatch(toggleFavorite({mealId: id, mealData}));
  }, [dispatch, id, meal]);

  // Retry on error
  const handleRetry = useCallback(() => {
    dispatch(fetchMealDetail(id));
  }, [dispatch, id]);

  // Prepare ingredients list
  const ingredients = useMemo((): Ingredient[] => {
    if (!meal) {
      return [];
    }
    const list: Ingredient[] = [];
    for (let i = 1; i <= 20; i++) {
      const ing = meal[`strIngredient${i}`];
      const meas = meal[`strMeasure${i}`];
      if (ing && ing.trim()) {
        list.push({
          ingredient: ing.trim(),
          measure: meas ? meas.trim() : '',
        });
      }
    }
    return list;
  }, [meal]);

  // Prepare instructions list
  const instructions = useMemo((): Instruction[] => {
    if (!meal?.strInstructions) {
      return [];
    }
    return meal.strInstructions
      .split(/\.\s+/)
      .filter((step: any) => step.trim().length > 0)
      .map((step: any, idx: any) => ({
        step: step.trim().endsWith('.') ? step.trim() : step.trim() + '.',
        index: idx + 1,
      }));
  }, [meal]);

  // Render single ingredient
  const renderIngredient = useCallback(
    ({item}: {item: Ingredient}) => (
      <View style={detailStyles.ingredientItem}>
        <View
          style={[detailStyles.bullet, {backgroundColor: colors.primary}]}
        />
        <Text
          style={[detailStyles.ingredientText, {color: colors.textPrimary}]}>
          {item.measure} {item.ingredient}
        </Text>
      </View>
    ),
    [colors.primary, colors.textPrimary],
  );

  // Render single instruction
  const renderInstruction = useCallback(
    ({item}: {item: Instruction}) => (
      <View style={detailStyles.instructionItem}>
        <View
          style={[detailStyles.stepNumber, {backgroundColor: colors.primary}]}>
          <Text style={detailStyles.stepNumberText}>{item.index}</Text>
        </View>
        <Text
          style={[detailStyles.instructionText, {color: colors.textPrimary}]}>
          {item.step}
        </Text>
      </View>
    ),
    [colors.primary, colors.textPrimary],
  );

  // List header (hero image + meta + ingredients title)
  const renderHeader = useCallback(
    () => (
      <View>
        <Image
          source={{uri: meal?.strMealThumb}}
          style={detailStyles.heroImage}
        />
        <View style={detailStyles.content}>
          <Text style={[detailStyles.title, {color: colors.textPrimary}]}>
            {meal?.strMeal}
          </Text>
          <View style={detailStyles.tagsContainer}>
            <View style={[detailStyles.tag, {backgroundColor: colors.primary}]}>
              <Text style={detailStyles.tagText}>{meal?.strCategory}</Text>
            </View>
            <View
              style={[detailStyles.tag, {backgroundColor: colors.secondary}]}>
              <Text style={detailStyles.tagText}>🌍 {meal?.strArea}</Text>
            </View>
          </View>
          <View style={detailStyles.metaContainer}>
            <View style={detailStyles.metaItem}>
              <Clock size={20} color={colors.textSecondary} />
              <Text
                style={[detailStyles.metaText, {color: colors.textSecondary}]}>
                {uiText.details.meta.cookTime}
              </Text>
            </View>
            <View style={detailStyles.metaItem}>
              <Users size={20} color={colors.textSecondary} />
              <Text
                style={[detailStyles.metaText, {color: colors.textSecondary}]}>
                {uiText.details.meta.servings}
              </Text>
            </View>
          </View>
          <Text
            style={[detailStyles.sectionTitle, {color: colors.textPrimary}]}>
            {uiText.details.ingredients}
          </Text>
        </View>
      </View>
    ),
    [
      meal,
      colors.textPrimary,
      colors.primary,
      colors.secondary,
      colors.textSecondary,
    ],
  );

  // Instructions section header
  const renderInstructionsHeader = useCallback(
    () => (
      <View style={[detailStyles.content, detailStyles.instructionHeader]}>
        <Text style={[detailStyles.sectionTitle, {color: colors.textPrimary}]}>
          {uiText.details.instructions}
        </Text>
      </View>
    ),
    [colors.textPrimary],
  );

  // Footer spacing
  const renderFooter = useCallback(
    () => <View style={detailStyles.bottomSpacing} />,
    [],
  );

  // Styles for containers & buttons
  const containerStyle = useMemo(
    () => [detailStyles.container, {backgroundColor: colors.background}],
    [colors.background],
  );
  const headerStyle = useMemo(
    () => [detailStyles.header, {backgroundColor: colors.background}],
    [colors.background],
  );
  const favoriteButtonStyle = useMemo(
    () => [
      detailStyles.favoriteButton,
      {
        backgroundColor: isFavorite ? colors.primary : colors.surfaceVariant,
      },
    ],
    [isFavorite, colors.primary, colors.surfaceVariant],
  );

  // Loading & error renderers
  const renderLoading = useCallback(
    () => (
      <SafeAreaView style={containerStyle}>
        <View style={detailStyles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text
            style={[detailStyles.loadingText, {color: colors.textSecondary}]}>
            {uiText.details.loading}
          </Text>
        </View>
      </SafeAreaView>
    ),
    [containerStyle, colors.primary, colors.textSecondary],
  );

  const renderError = useCallback(
    () => (
      <SafeAreaView style={containerStyle}>
        <View style={detailStyles.errorContainer}>
          <Text style={[detailStyles.errorText, {color: colors.error}]}>
            {error || uiText.details.error}
          </Text>
          <Pressable
            style={[
              detailStyles.retryButton,
              {backgroundColor: colors.primary},
            ]}
            onPress={handleRetry}>
            <Text style={detailStyles.retryButtonText}>
              {uiText.details.retry}
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    ),
    [containerStyle, error, colors.error, colors.primary, handleRetry],
  );

  // FlatList keyExtractor & renderItem must also be Hooks, so define them here
  const keyExtractor = useCallback((item: any, index: number) => {
    if (item.type === 'ingredient') {
      return `ingredient-${index}`;
    }
    if (item.type === 'instruction') {
      return `instruction-${item.index}`;
    }
    return `header-${index}`;
  }, []);

  const renderItem = useCallback(
    ({item}: {item: any}) => {
      if (item.type === 'ingredient') {
        return renderIngredient({item});
      }
      if (item.type === 'instructions-header') {
        return renderInstructionsHeader();
      }
      if (item.type === 'instruction') {
        return renderInstruction({item});
      }
      return null;
    },
    [renderIngredient, renderInstruction, renderInstructionsHeader],
  );

  // Early returns
  if (status === 'loading') {
    return renderLoading();
  }
  if (status === 'failed' || !meal) {
    return renderError();
  }

  // Combine data for FlatList
  const flatListData = [
    ...ingredients.map(item => ({...item, type: 'ingredient' as const})),
    {type: 'instructions-header' as const},
    ...instructions.map(item => ({...item, type: 'instruction' as const})),
  ];

  return (
    <SafeAreaView style={containerStyle}>
      {/* Header bar with back & favorite */}
      <View style={headerStyle}>
        <Pressable style={detailStyles.backButton} onPress={handleGoBack}>
          <ArrowLeft size={24} color={colors.textPrimary} />
        </Pressable>
        <Pressable
          style={favoriteButtonStyle}
          onPress={handleToggleFavorite}
          disabled={favoriteStatus === 'loading'}>
          {favoriteStatus === 'loading' ? (
            <ActivityIndicator
              size={24}
              color={isFavorite ? 'white' : colors.primary}
            />
          ) : (
            <Heart
              size={24}
              color={isFavorite ? 'white' : colors.textSecondary}
              fill={isFavorite ? 'white' : 'none'}
            />
          )}
        </Pressable>
      </View>

      {/* Recipe content */}
      <FlatList
        data={flatListData}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        windowSize={10}
        initialNumToRender={8}
        contentContainerStyle={detailStyles.flatListContainer}
      />
    </SafeAreaView>
  );
};

export default DetailsScreen;
