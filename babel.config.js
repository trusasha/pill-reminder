module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src/'],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.android.js', '.android.tsx', '.ios.js', '.ios.tsx'],
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
