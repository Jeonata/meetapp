/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';

import { Container, List } from './styles';
import MeetupBox from '~/components/MeetupBox';

function Subscription({ isFocused }) {
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMeetups() {
      setLoading(true);
      const response = await api.get('subscriptions');
      setMeetups(response.data);
      setLoading(false);
    }

    loadMeetups();
  }, [isFocused]);

  async function handleCancel(id) {
    try {
      await api.delete(`subscription/${id}`);

      setMeetups(
        meetups.map(meetup =>
          meetup.id === id
            ? {
                ...meetup,
                canceled: true,
              }
            : meetup
        )
      );
    } catch (err) {
      console.tron.log(err);
    }
  }

  return (
    <Background>
      <Header />
      <Container>
        {console.tron.log(meetups)}
        <List
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <MeetupBox
              onCancel={() => handleCancel(item.id)}
              data={item}
              list
            />
          )}
        />
        {loading && <ActivityIndicator size="large" color="#fff" />}
      </Container>
    </Background>
  );
}

Subscription.navigationOptions = {
  tabBarLabel: 'Inscrições',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Subscription);
