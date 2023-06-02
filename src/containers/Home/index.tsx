import React, {useEffect} from 'react';

import {Container, Text, commonStyles} from '@components/uikit';

const FuncComponent: React.FC = () => {
  useEffect(() => {}, []);

  return (
    <Container style={commonStyles.container}>
    </Container>
  );
};

export default FuncComponent;
