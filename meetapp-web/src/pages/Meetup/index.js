import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { parseISO } from 'date-fns';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { MdAddCircleOutline } from 'react-icons/md';
import * as Yup from 'yup';
import SelectDate from '~/components/SelectDate';

import ImageInput from '~/components/ImageInput';
import { dateFormat } from '~/utils/index';
import { Container, ConfirmButton } from './styles';

import history from '~/services/history';
import api from '~/services/api';

const schema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório'),
  description: Yup.string().required('A descrição é obrigatória'),
  localization: Yup.string().required('A localização é obrigatória'),
  file_id: Yup.number()
    .transform(id => (!id ? undefined : id))
    .required('A imagem é obrigatória'),
  date: Yup.date().when('start', () => {
    return Yup.date()
      .min(new Date(), 'O meetup não pode ocorrer em um horário que já passou')
      .typeError('Data inválida')
      .required('A data é obrigatória');
  }),
});

export default function Meetup() {
  const [meetup, setMeetup] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    async function loadMeetup() {
      const response = await api.get(`meetups/list/${id}`);

      response.data.formattedDate = dateFormat(parseISO(response.data.date));
      setMeetup(response.data);
    }
    if (id !== 'add') {
      loadMeetup();
    }
  }, [id]);

  async function handleSubmit(data) {
    try {
      const { title, description, localization, date, file_id } = data;

      const info = {
        title,
        description,
        localization,
        date,
        file_id,
      };

      await api.post('meetups', info);

      history.push('/');
      toast.success('Meetup criado com sucesso!');
    } catch (err) {
      toast.error('Erro ao criar meetup, confira os dados e tente novamente');
    }
  }

  async function handleUpdate(data) {
    try {
      const { title, description, localization, date, file_id } = data;

      const info = {
        title,
        description,
        localization,
        date,
        file_id,
      };

      await api.put(`meetups/${id}`, info);

      history.push(`/meetup/${id}/details`);
      toast.success('Meetup atualizado com sucesso!');
    } catch (err) {
      toast.error('Erro ao atualizar meetup, confira os dados');
    }
  }

  return (
    <Container>
      <Form
        schema={schema}
        initialData={meetup}
        onSubmit={id !== 'add' ? handleUpdate : handleSubmit}
      >
        <ImageInput name="file_id" />
        <Input name="title" placeholder="Título do Meetup" />
        <Input multiline name="description" placeholder="Descrição completa" />
        <SelectDate name="date" />

        <Input name="localization" placeholder="Localização" />

        <ConfirmButton type="submit">
          <MdAddCircleOutline size={20} color="#fff" />
          Salvar meetup
        </ConfirmButton>
      </Form>
    </Container>
  );
}
