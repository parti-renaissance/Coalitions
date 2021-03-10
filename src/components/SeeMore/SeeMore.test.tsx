import { mount } from 'enzyme';
import React from 'react';
import { SeeMore } from './SeeMore';
import { TestProvider } from 'services/test/TestProvider';
import * as isMobile from 'services/mobile/mobile';

describe('<SeeMore />', () => {
  it('should display all text if length is inferior to limit', () => {
    const wrapper = mount(
      <TestProvider>
        <SeeMore text={'this is the text for the test'} />
      </TestProvider>,
    );
    expect(wrapper.text()).toEqual('this is the text for the test');
    expect(wrapper.find('SeeMoreButton')).toEqual({});
  });

  it('should limit to 400 characters for mobile', () => {
    jest.spyOn(isMobile, 'getIsMobile').mockReturnValue(true);
    const wrapper = mount(
      <TestProvider>
        <SeeMore
          text={
            'Lorem ipsum dolor sit amet, pro ex denique pertinax. Ad probatus percipitur vix. Cu vide dolore sea. Mel nihil tibique singulis in. Eu nam error zril laboramus, per ne amet volumus aliquando. Id has essent tritani. At tempor feugait est, id quaeque ceteros mea. Ne nec regione nostrud, timeam constituam appellantur an pro. Ad quod oblique persequeris quo. Eos commodo appareat assentior te. Ad per porro intellegam. No qui vide reque delicatissimi. Soluta regione splendide ad est, id vim consul cetero.'
          }
        />
      </TestProvider>,
    );
    // Length: 400 + 16 chars for the trad key: general.see-more
    expect(wrapper.text()).toHaveLength(416);
    expect(wrapper.text()).toContain('general.see-more');
    expect(wrapper.find('SeeMoreButton')).toBeTruthy();
  });

  it('should not limit to 400 characters for desktop', () => {
    jest.spyOn(isMobile, 'getIsMobile').mockReturnValue(false);
    const wrapper = mount(
      <TestProvider>
        <SeeMore
          text={
            'Lorem ipsum dolor sit amet, pro ex denique pertinax. Ad probatus percipitur vix. Cu vide dolore sea. Mel nihil tibique singulis in. Eu nam error zril laboramus, per ne amet volumus aliquando. Id has essent tritani. At tempor feugait est, id quaeque ceteros mea. Ne nec regione nostrud, timeam constituam appellantur an pro. Ad quod oblique persequeris quo. Eos commodo appareat assentior te. Ad per porro intellegam. No qui vide reque delicatissimi. Soluta regione splendide ad est, id vim consul cetero.'
          }
        />
      </TestProvider>,
    );
    expect(wrapper.text()).toHaveLength(504);
    expect(wrapper.find('SeeMoreButton')).toEqual({});
  });

  it('should not limit to 1200 characters for desktop', () => {
    jest.spyOn(isMobile, 'getIsMobile').mockReturnValue(false);
    const wrapper = mount(
      <TestProvider>
        <SeeMore
          text={
            'Lorem ipsum dolor sit amet, pro ex denique pertinax. Ad probatus percipitur vix. Cu vide dolore sea. Mel nihil tibique singulis in. Eu nam error zril laboramus, per ne amet volumus aliquando. Id has essent tritani. At tempor feugait est, id quaeque ceteros mea. Ne nec regione nostrud, timeam constituam appellantur an pro. Ad quod oblique persequeris quo. Eos commodo appareat assentior te. Ad per porro intellegam. No qui vide reque delicatissimi. Soluta regione splendide ad est, id vim consul cetero.Lorem ipsum dolor sit amet, pro ex denique pertinax. Ad probatus percipitur vix. Cu vide dolore sea. Mel nihil tibique singulis in. Eu nam error zril laboramus, per ne amet volumus aliquando. Id has essent tritani. At tempor feugait est, id quaeque ceteros mea. Ne nec regione nostrud, timeam constituam appellantur an pro. Ad quod oblique persequeris quo. Eos commodo appareat assentior te. Ad per porro intellegam. No qui vide reque delicatissimi. Soluta regione splendide ad est, id vim consul cetero.Lorem ipsum dolor sit amet, pro ex denique pertinax. Ad probatus percipitur vix. Cu vide dolore sea. Mel nihil tibique singulis in. Eu nam error zril laboramus, per ne amet volumus aliquando. Id has essent tritani. At tempor feugait est, id quaeque ceteros mea. Ne nec regione nostrud, timeam constituam appellantur an pro. Ad quod oblique persequeris quo. Eos commodo appareat assentior te. Ad per porro intellegam. No qui vide reque delicatissimi. Soluta regione splendide ad est, id vim consul cetero.'
          }
        />
      </TestProvider>,
    );
    // Length: 1200 + 16 chars for the trad key: general.see-more
    expect(wrapper.text()).toHaveLength(1216);
    expect(wrapper.text()).toContain('general.see-more');
    expect(wrapper.find('SeeMoreButton')).toBeTruthy();
  });
});
