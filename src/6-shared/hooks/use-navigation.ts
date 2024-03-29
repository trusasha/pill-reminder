import { NavigationHelpers, useNavigation } from '@react-navigation/native';
import { ScreenParams } from '6-shared/constants';

/**
 * Custom hook useNavigate to abstract the navigation logic.
 */
const useNavigate = () => {
  const { navigate } = useNavigation<NavigationHelpers<ScreenParams>>();

  return navigate;
};

export default useNavigate;
