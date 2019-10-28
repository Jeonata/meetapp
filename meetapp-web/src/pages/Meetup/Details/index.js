import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MdEdit, MdDeleteForever, MdEvent, MdPlace } from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';
import { parseISO } from 'date-fns';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import { dateFormat } from '~/utils/index';

import 'react-confirm-alert/src/react-confirm-alert.css';

import history from '~/services/history';
import api from '~/services/api';

import {
  Container,
  BlueButton,
  RedButton,
  Loading,
  Alert,
  Actions,
  Accept,
  Cancel,
} from './styles';

export default function Details() {
  const [loading, setLoading] = useState(true);
  const [meetup, setMeetup] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function loadMeetup() {
      try {
        setLoading(true);

        const response = await api.get(`meetups/list/${id}`);

        response.data.formattedDate = dateFormat(parseISO(response.data.date));
        setMeetup(response.data);
        setLoading(false);
      } catch (error) {
        toast.error(
          'Ocorreu algum problema, recarregue a página e tente novamente'
        );
      }
    }

    loadMeetup();
  }, [id]);

  async function handleClickDelete() {
    try {
      const response = await api.delete(`meetups/${id}`);

      if (response.data === 'Object deleted') {
        history.push('/');
        toast.error('Meetup cancelado com sucesso');
      }
    } catch (err) {
      toast.error(
        'Ocorreu algum problema, recarregue a página e tente novamente'
      );
    }
  }

  function handdleCancel() {
    confirmAlert({
      // eslint-disable-next-line react/prop-types
      customUI: ({ onClose }) => {
        return (
          <Alert className="custom-ui">
            <div>
              <h1>Deseja cancelar esse Meetup?</h1>
              <p>
                Ao cancelar, esse meetup será apagado e não poderá ser
                recuperado.
              </p>
            </div>
            <Actions>
              <Cancel type="button" onClick={onClose}>
                Não
              </Cancel>
              <Accept
                type="button"
                onClick={() => {
                  handleClickDelete();
                  onClose();
                }}
              >
                Sim, desejo apagar
              </Accept>
            </Actions>
          </Alert>
        );
      },
    });
  }

  return (
    <Container>
      <header>
        <strong>{meetup.title}</strong>
        <div>
          <BlueButton
            type="button"
            onClick={() => history.push(`/meetup/${id}`)}
          >
            <MdEdit size={20} color="fff" />
            Editar
          </BlueButton>
          <RedButton type="button" onClick={() => handdleCancel()}>
            <MdDeleteForever size={20} color="fff" />
            Cancelar
          </RedButton>
        </div>
      </header>
      <main>
        {loading ? (
          <Loading loading={loading ? 1 : 0}>
            <FaSpinner size={24} color="fff" />
          </Loading>
        ) : (
          <div>
            <img src={meetup.image.url} alt={meetup.title} />
            <article>{meetup.description}</article>
            <footer>
              <span>
                <MdEvent size={20} color="fff" opacity={0.6} />
                {meetup.formattedDate}
              </span>
              <a
                href={`https://maps.google.com/?q=${meetup.localization}`}
                target="blank"
              >
                <span>
                  <MdPlace size={20} color="fff" opacity={0.6} />
                  {meetup.localization}
                </span>
              </a>
            </footer>
          </div>
        )}
      </main>
    </Container>
  );
}
