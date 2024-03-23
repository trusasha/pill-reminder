import { View } from 'react-native';
import styled from 'styled-components/native';

const Styled = {
  Container: styled(View)`
    background-color: ${({ theme }) => theme.colors.white};
    align-items: center;
    justify-content: center;
    flex: 1;
  `,
};

export default Styled;
