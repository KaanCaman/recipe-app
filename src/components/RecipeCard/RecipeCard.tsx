import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import {recipeCardStyles} from './recipeCard.style';
import {useTheme} from '../../hooks/useTheme';

export type RecipeCardProps = {
  id: string;
  name: string;
  thumbnail: string;
  area: string;
  category: string;
  onPress: () => void;
};

export const RecipeCard: React.FC<RecipeCardProps> = ({
  name,
  thumbnail,
  area,
  category,
  onPress,
}) => {
  const {colors} = useTheme();

  return (
    <Pressable onPress={onPress} style={recipeCardStyles.card}>
      <Image source={{uri: thumbnail}} style={recipeCardStyles.image} />
      <View
        style={[recipeCardStyles.content, {backgroundColor: colors.surface}]}>
        <Text
          style={[recipeCardStyles.name, {color: colors.textPrimary}]}
          numberOfLines={1}>
          {name}
        </Text>
        <View style={recipeCardStyles.infoRow}>
          <Text
            style={[recipeCardStyles.infoText, {color: colors.textSecondary}]}>
            🌍 {area}
          </Text>
          <Text
            style={[recipeCardStyles.infoText, {color: colors.textSecondary}]}>
            {category}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};
