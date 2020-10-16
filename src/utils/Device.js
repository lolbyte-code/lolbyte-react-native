import {Dimensions} from 'react-native';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';

export const isLandscape = () => {
  const dim = Dimensions.get('window');
  return dim.height < dim.width;
};

export const getSafeAreaWidth = () => {
  if (isLandscape()) {
    return (
      Dimensions.get('window').width -
      (StaticSafeAreaInsets.safeAreaInsetsTop +
        StaticSafeAreaInsets.safeAreaInsetsBottom)
    );
  }
  return Dimensions.get('window').width;
};
