/* eslint-disable react/prop-types */
import React, { useState, useEffect, useMemo } from 'react';
import { ActivityIndicator, Alert, DatePickerAndroid } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { subDays, addDays, format } from 'date-fns';

import Icon from 'react-native-vector-icons/MaterialIcons';
import pt from 'date-fns/locale/pt';
import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';

import { Container, List, SelectDate, TextDate, ButtonDate } from './styles';
import MeetupBox from '~/components/MeetupBox';

function Dashboard({ isFocused }) {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [moreToLoad, setMoreToLoad] = useState(false);
  const [loading, setLoading] = useState(true);

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM", { locale: pt }),
    [date]
  );

  useEffect(() => {
    async function loadMeetups() {
      setLoading(true);
      const response = await api.get('meetups', {
        params: {
          date: format(date, 'yyyy-MM-dd'),
          page,
        },
      });

      if (page === 1) {
        setMeetups(response.data);
        setMoreToLoad(true);
        setLoading(false);
      } else if (response.data.length !== 0) {
        setMeetups(meetups.concat(response.data));
        setMoreToLoad(true);
        setLoading(false);
      } else {
        setMoreToLoad(false);
        setLoading(false);
      }
    }

    loadMeetups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, page, isFocused]);

  useEffect(() => {
    if (isFocused) {
      setPage(1);
      setMoreToLoad(false);
    }
  }, [isFocused]);

  async function handleSubscribe(id) {
    try {
      const response = await api.post(`meetups/${id}/subscribe`);

      setMeetups(
        meetups.map(meetup =>
          meetup.id === id
            ? {
                ...meetup,
                subscribed: response.data.id,
              }
            : meetup
        )
      );
    } catch (err) {
      console.tron.log(err);
      Alert.alert(
        'Falha ao se inscrever no meetup',
        'Você não pode se inscrever em dois meetup que ocorrem no mesmo horário.'
      );
    }
  }

  function loadMore() {
    if (moreToLoad) setPage(page + 1);
  }

  function handlePrev() {
    setPage(1);
    setMoreToLoad(true);
    setDate(subDays(date, 1));
  }

  function handleNext() {
    setPage(1);
    setMoreToLoad(true);
    setDate(addDays(date, 1));
  }

  async function handleOpenPicker() {
    const { action, year, month, day } = await DatePickerAndroid.open({
      mode: 'spinner',
      date,
      minDate: date,
    });

    if (action === DatePickerAndroid.dateSetAction) {
      const selectedDate = new Date(year, month, day);

      setDate(selectedDate);
    }
  }

  return (
    <Background>
      <Header />
      <Container>
        <SelectDate>
          <ButtonDate onPress={handlePrev}>
            <Icon name="chevron-left" size={36} color="#fff" />
          </ButtonDate>
          <ButtonDate onPress={handleOpenPicker}>
            <TextDate>{dateFormatted}</TextDate>
          </ButtonDate>
          <ButtonDate onPress={handleNext}>
            <Icon name="keyboard-arrow-right" size={36} color="#fff" />
          </ButtonDate>
        </SelectDate>
        <List
          onEndReachedThreshold={0.2}
          onEndReached={() => loadMore()}
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <MeetupBox
              onSubscribe={() => handleSubscribe(item.id)}
              data={item}
            />
          )}
        />
        {loading && <ActivityIndicator size="large" color="#fff" />}
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);
