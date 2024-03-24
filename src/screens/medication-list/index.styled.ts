import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

const Styled = {
  Container: styled(SafeAreaView)`
    background-color: ${({ theme }) => theme.colors.white};
  `,
};

export default Styled;
