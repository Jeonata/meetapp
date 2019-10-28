import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container,
  MeetupImage,
  Bottom,
  Title,
  Info,
  Box,
  Text,
  Subscribe,
  TextMeetup,
  BoxMeetup,
} from './styles';

export default function MeetupBox({ onSubscribe, data, list, onCancel }) {
  const userId = useSelector(state => state.user.profile.id);

  const dateParsed = useMemo(() => {
    return format(parseISO(data.date), "dd 'de' MMMM', às 'HH:mm'h'", {
      locale: pt,
    });
  }, [data.date]);

  return (
    <Container past={data.past}>
      <MeetupImage
        source={{
          uri: data.image
            ? data.image.url
            : `https://api.adorable.io/avatar/50/${data.image.id}`,
        }}
      />
      <Bottom>
        <Title>{data.title}</Title>
        <Info>
          <Box>
            <Icon name="event" size={14} color="#999999" />
            <Text>{dateParsed}</Text>
          </Box>
          <Box>
            <Icon name="place" size={14} color="#999999" />
            <Text>{data.localization}</Text>
          </Box>
          <Box>
            <Icon name="person" size={14} color="#999999" />
            <Text>Organizador: {data.provider.name}</Text>
          </Box>
        </Info>
      </Bottom>
      {!list &&
        !data.subscribers.map(d => d === userId)[0] &&
        !data.past &&
        (data.subscribed ? (
          <BoxMeetup>
            <TextMeetup>Inscrito</TextMeetup>
          </BoxMeetup>
        ) : (
          true &&
          (userId !== data.provider.id ? (
            <Subscribe onPress={onSubscribe}>Realizar inscrição</Subscribe>
          ) : (
            <BoxMeetup>
              <TextMeetup>Seu meetup</TextMeetup>
            </BoxMeetup>
          ))
        ))}

      {!list && data.subscribers.map(d => d === userId)[0] && (
        <BoxMeetup>
          <TextMeetup>Inscrito</TextMeetup>
        </BoxMeetup>
      )}

      {list &&
        (!data.canceled ? (
          <Subscribe onPress={onCancel}>Cancelar inscrição</Subscribe>
        ) : (
          <BoxMeetup>
            <TextMeetup>Inscrição cancelada</TextMeetup>
          </BoxMeetup>
        ))}
    </Container>
  );
}

MeetupBox.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onSubscribe: PropTypes.func,
  list: PropTypes.bool,
  onCancel: PropTypes.func,
};

MeetupBox.defaultProps = {
  data: {},
  onSubscribe: () => {},
  list: false,
  onCancel: () => {},
};
