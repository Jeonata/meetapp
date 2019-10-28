import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
  margin-bottom: 20px;
  border-radius: 4px;
  background: #fff;
  min-height: 345px;

  opacity: ${props => (props.past ? 0.8 : 1)};
`;

export const Bottom = styled.View`
  display: flex;
  align-items: flex-start;
  padding: 0 18px;
`;

export const MeetupImage = styled.Image`
  width: 100%;
  height: 150px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 20px 0 11px;
`;

export const Info = styled.View``;

export const Box = styled.View`
  margin-bottom: 10px;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Text = styled.Text`
  font-size: 13px;
  color: #999;
  margin-left: 5px;
`;

export const Subscribe = styled(Button)`
  margin: 5px 20px 20px;
  font-size: 16px;
  background: #f94d6a;
  height: 40px;
`;

export const TextMeetup = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
`;

export const BoxMeetup = styled.View`
  margin: 5px 20px 20px;

  opacity: 0.8;
  border-radius: 4px;
  background: #f94d6a;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;
`;
