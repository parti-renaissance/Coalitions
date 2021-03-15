import React, { FunctionComponent } from 'react';
import { Container, SubContainer, TopImage, StyledInputDescription } from './CreateCause.style';
import InputSection from './components/InputSection';
import { useIntl } from 'react-intl';
import InputField from 'components/InputField';

const CreateCause: FunctionComponent = () => {
  const intl = useIntl();
  return (
    <Container>
      <SubContainer>
        <TopImage src="/images/createCause.jpg" />
        <InputSection
          title={intl.formatMessage({ id: 'create_cause.title.title' })}
          tips={intl.formatMessage({ id: 'create_cause.title.tips' })}
        >
          <InputField
            placeholder={intl.formatMessage({ id: 'create_cause.title.placeholder' })}
            type="text"
            name="title"
          />
        </InputSection>
        <InputSection
          title={intl.formatMessage({ id: 'create_cause.description.title' })}
          tips={intl.formatMessage({ id: 'create_cause.description.tips' })}
        >
          <InputField
            placeholder={intl.formatMessage({
              id: 'create_cause.description.descriptionTitlePlaceholder',
            })}
            type="text"
            name="descriptionTitlePlaceholder"
          />
          <StyledInputDescription
            placeholder={intl.formatMessage({
              id: 'create_cause.description.descriptionPlaceholder',
            })}
            type="text"
            name="descriptionPlaceholder"
            multiline
            rows={5}
          />
        </InputSection>
      </SubContainer>
    </Container>
  );
};

export default CreateCause;
