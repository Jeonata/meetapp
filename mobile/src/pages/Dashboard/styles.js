import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingLeft: 30, paddingRight: 30 },
})``;

export const SelectDate = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 30px 0;
`;

export const TextDate = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  margin: 0 15px;
`;

export const ButtonDate = styled.TouchableOpacity``;
