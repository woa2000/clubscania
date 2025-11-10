import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primaryBlue};
  justify-content: flex-end;
`;

export const LogoContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-top: 60px;
`;

export const Logo = styled.Image`
  width: 250px;
  height: 100px;
`;

export const FormContainer = styled.View`
  background-color: #F5F5F5;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding: 40px 30px;
  min-height: 60%;
`;

export const InputContainer = styled.View`
  margin-bottom: 20px;
`;

export const InputLabel = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto700};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primaryBlue};
  margin-bottom: 8px;
`;

export const Input = styled.TextInput`
  background-color: #FFFFFF;
  border-radius: 10px;
  padding: 16px;
  font-family: ${({ theme }) => theme.fonts.roboto300};
  font-size: 14px;
  color: #999;
`;

export const PasswordContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #FFFFFF;
  border-radius: 10px;
`;

export const PasswordInput = styled.TextInput`
  flex: 1;
  padding: 16px;
  font-family: ${({ theme }) => theme.fonts.roboto300};
  font-size: 14px;
  color: #999;
`;

export const PasswordToggle = styled.TouchableOpacity`
  padding: 16px;
`;

export const PasswordToggleText = styled.Text`
  font-size: 20px;
`;

export const ButtonEntrar = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primaryRed};
  border-radius: 30px;
  padding: 18px;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 15px;
`;

export const ButtonEntrarText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.montserrat700};
  font-size: 16px;
  color: #FFFFFF;
  letter-spacing: 1px;
`;

export const ButtonRegistrar = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primaryBlue};
  border-radius: 30px;
  padding: 18px;
  align-items: center;
  margin-bottom: 20px;
`;

export const ButtonRegistrarText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.montserrat700};
  font-size: 16px;
  color: #FFFFFF;
  letter-spacing: 1px;
`;

export const ForgotPasswordButton = styled.TouchableOpacity`
  align-items: center;
  padding: 10px;
`;

export const ForgotPasswordText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto500};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primaryBlue};
  text-decoration: underline;
`;

export const CheckboxContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
`;

export const Checkbox = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.primaryBlue};
  margin-right: 10px;
  align-items: center;
  justify-content: center;
`;

export const CheckboxInner = styled.View`
  width: 14px;
  height: 14px;
  border-radius: 7px;
  background-color: ${({ theme }) => theme.colors.primaryBlue};
`;

export const CheckboxText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto300};
  font-size: 12px;
  color: #666;
  flex: 1;
`;

export const CheckboxLink = styled.Text`
  color: ${({ theme }) => theme.colors.primaryBlue};
  text-decoration: underline;
`;

export const ButtonVoltar = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primaryBlue};
  border-radius: 30px;
  padding: 18px;
  align-items: center;
`;

export const ButtonVoltarText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.montserrat700};
  font-size: 16px;
  color: #FFFFFF;
  letter-spacing: 1px;
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
  keyboardShouldPersistTaps: 'handled',
})`
  flex: 1;
`;
