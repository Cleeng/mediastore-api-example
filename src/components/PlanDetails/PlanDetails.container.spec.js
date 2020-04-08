import { SET_CURRENT_PLAN } from 'redux/planDetails';
import { SHOW_LOADER, HIDE_LOADER } from 'redux/loader';
import { mapStateToProps, mapDispatchToProps } from './PlanDetails.container';

const currentPlanMock = [
  {
    offerId: 'S937144802_UA',
    status: 'active',
    expiresAt: 1582706082,
    nextPaymentPrice: 14.4,
    nextPaymentCurrency: 'EUR',
    paymentGateway: 'adyen',
    paymentMethod: 'mc',
    offerTitle: 'Monthly subscription with 7 days trial',
    period: 'month'
  },
  {
    offerId: 'S249781156_UA',
    status: 'active',
    expiresAt: 1597917717,
    nextPaymentPrice: 45.04,
    nextPaymentCurrency: 'EUR',
    paymentGateway: 'adyen',
    paymentMethod: 'mc',
    offerTitle: '6-Month without trial',
    period: '6months'
  }
];

const loaderMock = {
  isLoading: true
};

describe('<PaymentInfo/>', () => {
  it('should show previously added value', () => {
    const initialState = {
      planDetails: currentPlanMock,
      loader: loaderMock
    };
    expect(mapStateToProps(initialState).planDetails).toEqual(currentPlanMock);
    expect(mapStateToProps(initialState).isLoading).toEqual(
      loaderMock.isLoading
    );
  });
  it('should dispatch SET_CURRENT_PLAN action', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).setCurrentPlan();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: SET_CURRENT_PLAN });
  });
  it('should dispatch SHOW_LOADER action', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).showLoader();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: SHOW_LOADER });
  });
  it('should dispatch HIDE_LOADER action', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).hideLoader();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: HIDE_LOADER });
  });
});