import { StyleSheet, ViewStyle } from 'react-native';

const spacings = {
  xxs: 2,
  xs: 4,
  s: 8,
  m: 16,
  xm: 18,
  l: 24,
  xl: 32,
  xxl: 40,
  xxxl: 48,
} as const;

type SpacingStyles =
  | 'marginBottom'
  | 'marginTop'
  | 'marginRight'
  | 'marginLeft'
  | 'marginHorizontal'
  | 'marginVertical'
  | 'paddingBottom'
  | 'paddingTop'
  | 'paddingRight'
  | 'paddingLeft'
  | 'paddingHorizontal'
  | 'paddingVertical';
type SpacingKeys = keyof typeof spacings;

const createSpacingStyles = (style: SpacingStyles) =>
  (Object.keys(spacings) as SpacingKeys[]).reduce((acc, spacingKey) => {
    acc[spacingKey] = {
      [style]: spacings[spacingKey],
    };

    return acc;
  }, {} as Record<SpacingKeys, ViewStyle>);

const SpacingStyles = {
  mb: StyleSheet.create(createSpacingStyles('marginBottom')),
  mt: StyleSheet.create(createSpacingStyles('marginTop')),
  mr: StyleSheet.create(createSpacingStyles('marginRight')),
  ml: StyleSheet.create(createSpacingStyles('marginLeft')),
  mh: StyleSheet.create(createSpacingStyles('marginHorizontal')),
  mv: StyleSheet.create(createSpacingStyles('marginVertical')),
  pb: StyleSheet.create(createSpacingStyles('paddingBottom')),
  pt: StyleSheet.create(createSpacingStyles('paddingTop')),
  pr: StyleSheet.create(createSpacingStyles('paddingRight')),
  pl: StyleSheet.create(createSpacingStyles('paddingLeft')),
  ph: StyleSheet.create(createSpacingStyles('paddingHorizontal')),
  pv: StyleSheet.create(createSpacingStyles('paddingVertical')),
};

export { spacings, SpacingStyles };
