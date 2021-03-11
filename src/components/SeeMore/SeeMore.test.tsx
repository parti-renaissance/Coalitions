import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { SeeMore } from './SeeMore';
import { TestProvider } from 'services/test/TestProvider';
import * as isMobile from 'services/mobile/mobile';

const fullText =
  'Lorem ipsum dolor sit amet, pro ex denique pertinax. Ad probatus percipitur vix. Cu vide dolore sea. Mel nihil tibique singulis in. Eu nam error zril laboramus, per ne amet volumus aliquando. Id has essent tritani. At tempor feugait est, id quaeque ceteros mea. Ne nec regione nostrud, timeam constituam appellantur an pro. Ad quod oblique persequeris quo. Eos commodo appareat assentior te. Ad per porro intellegam. No qui vide reque delicatissimi. Soluta regione splendide ad est, id vim consul cetero.Lorem ipsum dolor sit amet, pro ex denique pertinax. Ad probatus percipitur vix. Cu vide dolore sea. Mel nihil tibique singulis in. Eu nam error zril laboramus, per ne amet volumus aliquando. Id has essent tritani. At tempor feugait est, id quaeque ceteros mea. Ne nec regione nostrud, timeam constituam appellantur an pro. Ad quod oblique persequeris quo. Eos commodo appareat assentior te. Ad per porro intellegam. No qui vide reque delicatissimi. Soluta regione splendide ad est, id vim consul cetero.Lorem ipsum dolor sit amet, pro ex denique pertinax. Ad probatus percipitur vix. Cu vide dolore sea. Mel nihil tibique singulis in. Eu nam error zril laboramus, per ne amet volumus aliquando. Id has essent tritani. At tempor feugait est, id quaeque ceteros mea. Ne nec regione nostrud, timeam constituam appellantur an pro. Ad quod oblique persequeris quo. Eos commodo appareat assentior te. Ad per porro intellegam. No qui vide reque delicatissimi. Soluta regione splendide ad est, id vim consul cetero.';

describe('<SeeMore />', () => {
  it('should display all text if length is inferior to limit', () => {
    const { container } = render(
      <TestProvider>
        <SeeMore text={'this is the text for the test'} />
      </TestProvider>,
    );
    screen.getByText('this is the text for the test');
    expect(screen.queryByText(/general.see-more/)).toBeNull();
  });

  it('should limit to 400 characters for mobile', () => {
    jest.spyOn(isMobile, 'getIsMobile').mockReturnValue(true);
    render(
      <TestProvider>
        <SeeMore text={fullText} />
      </TestProvider>,
    );
    screen.getByText(/general.see-more/);
    screen.getByText(fullText.substring(0, 400));
    expect(screen.queryByText(fullText)).toBeNull();
  });

  it('should display everything on mobile once clicked', async () => {
    jest.spyOn(isMobile, 'getIsMobile').mockReturnValue(true);
    render(
      <TestProvider>
        <SeeMore text={fullText} />
      </TestProvider>,
    );
    const button = screen.getByText(/general.see-more/);
    fireEvent.click(button);
    await waitFor(() => {
      screen.getByText(fullText);
      expect(screen.queryByText(/general.see-more/)).toBeNull();
    });
  });

  /* it('should not limit to 1200 characters for desktop', () => {
    jest.spyOn(isMobile, 'getIsMobile').mockReturnValue(false);
    const { container } = mount(
      <TestProvider>
        <SeeMore text={} />
      </TestProvider>,
    );
    // Length: 1200 + 16 chars for the trad key: general.see-more
    expect(wrapper.text()).toHaveLength(1216);
    expect(wrapper.text()).toContain('general.see-more');
    expect(wrapper.find('SeeMoreButton')).toBeTruthy();
  }); */
});
