import Loader from 'components/Loader';
import React, { useEffect, useState, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useFetchOneCause } from 'redux/Cause/hooks';
import { getCause } from 'redux/Cause/selectors';
import {
  CausePageHeader,
  CauseName,
  CoalitionName,
  CauseImage,
  CausePageSubHeaderContainer,
  StyledTab,
} from './CausePage.style';
import { FormattedMessage } from 'react-intl';
import { colorPalette } from 'stylesheet';
import { Tabs } from '@material-ui/core';

interface CausePageNavParams {
  causeId: string;
}

const CausePage: React.FunctionComponent = () => {
  const { causeId } = useParams<CausePageNavParams>();
  const { loading, fetchCause } = useFetchOneCause(causeId);
  const cause = useSelector(getCause(causeId));
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  useEffect(() => {
    fetchCause();
  }, [fetchCause]);

  const onActiveTabIndexChange = (_: ChangeEvent<{}>, value: number) => {
    setActiveTabIndex(value);
  };

  const renderTabPanel = () => {
    switch (activeTabIndex) {
      case 0:
        return <div>coucou</div>;
      default:
        return null;
    }
  };

  if (loading && cause === undefined) {
    return <Loader />;
  }

  if (cause === undefined) {
    return null;
  }

  return (
    <>
      <CausePageHeader>
        <CauseImage backgroundImage={cause.image_url} />
        <CausePageSubHeaderContainer>
          <CoalitionName>{cause.coalition.name}</CoalitionName>
          <CauseName>{cause.name}</CauseName>
        </CausePageSubHeaderContainer>
      </CausePageHeader>
      <Tabs
        value={activeTabIndex}
        onChange={onActiveTabIndexChange}
        TabIndicatorProps={{
          style: {
            backgroundColor: colorPalette.mintGreen,
          },
        }}
      >
        <StyledTab label={<FormattedMessage id="cause.about" />} />
        <StyledTab label={<FormattedMessage id="cause.events" />} />
        <StyledTab label={<FormattedMessage id="cause.discussions" />} />
      </Tabs>
      {renderTabPanel()}
    </>
  );
};

export default CausePage;
