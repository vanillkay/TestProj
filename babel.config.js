module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['react-native-reanimated/plugin'],
    [
      'module-resolver',
      {
        alias: {
          '@assets': './assets',
          '@types': './src/types',
          '@hooks': './src/hooks',
          '@store': './src/store',
          '@screens': './src/screens',
          '@helpers': './src/helpers',
          '@constants': './src/constants',
          '@components': './src/components',
        },
      },
    ],
  ],
};
