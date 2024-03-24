import { RouteProp } from '@react-navigation/native';
import SCREENS from '../screens';

export type ScreenParams = {
  [SCREENS.TABS]: undefined;
  [SCREENS.MEDICATION_DETAILS]: undefined;
  [SCREENS.MEDICATION_LIST]: undefined;
  [SCREENS.MEDICATION_NOTICES]: undefined;
  [SCREENS.MEDICATION_ADD]: undefined;
};

export type RouteParams<T extends keyof ScreenParams> = RouteProp<ScreenParams, T>;

// util type (not intended to be used anywhere else, except being declared here)
// checks if the keys of ScreenParams are matching the declared Screens
// should not allow to declare params for non-existing screens
export type _ensure_screen_params_match_screens = (typeof SCREENS)[keyof ScreenParams];
