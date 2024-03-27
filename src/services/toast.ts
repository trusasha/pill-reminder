import Toast from 'react-native-toast-message';

class ToastService {
  public static showErrorMessage(error: string | Error) {
    if (error instanceof Error) {
      Toast.show({ type: 'error', text1: 'Error', text2: error.message, position: 'bottom' });
    } else if (typeof error === 'string') {
      Toast.show({ type: 'error', text1: 'Error', text2: error, position: 'bottom' });
    } else {
      Toast.show({ type: 'error', text1: 'Error', text2: JSON.stringify(error), position: 'bottom' });
    }
  }
}

export default ToastService;

