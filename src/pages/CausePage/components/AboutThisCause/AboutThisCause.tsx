import { SeeMore } from 'components/SeeMore/SeeMore';
import React, { FunctionComponent } from 'react';
import { Container, Description } from './AboutThisCause.style';

const AboutThisCause: FunctionComponent<{}> = () => (
  <Container>
    <Description>
      <SeeMore
        text={
          'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.'
        }
      />
    </Description>
  </Container>
);

export default AboutThisCause;
