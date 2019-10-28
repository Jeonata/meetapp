import React from 'react';

import logo from '~/assets/logo.png';

import { Container, LogoImage } from './styles';

export default function Header() {
  return (
    <Container>
      <LogoImage source={logo} />
    </Container>
  );
}
