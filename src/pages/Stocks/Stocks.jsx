import React from 'react';
import './stocks.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import StocksWidgets from '../../components/StocksWidgets/StocksWidgets';
import { TourProvider, useTour } from '@reactour/tour';

const StocksContent = () => {
  const { setIsOpen, setCurrentStep } = useTour();

  return (
    <div className="stocks">
      <Sidebar />
      <div className="stocksPage">
        {/* Pass trigger to Navbar if needed */}
        <Navbar onTutorialClick={() => {
          setCurrentStep(0);
          setIsOpen(true);
        }} />

        <div className="stocksContent">
          <StocksWidgets />
        </div>
      </div>
    </div>
  );
};

const steps = [
  {
    selector: '.stocksContainer',
    content: 'This section displays your stock information dashboard.',
  },
  {
    selector: '.addStockButton',
    content: 'Click here to add a new stock card.',
  },
  {
    selector: '.stockCard',
    content: 'Each card represents a different stock item you’re managing.',
  },
  {
    selector: '.updateButton',
    content: 'After making changes to the stock, click this button to update it.',
  },
];

const Stocks = () => {
  return (
    <TourProvider
      steps={steps}
      styles={() => ({
        maskWrapper: { zIndex: 9999 },
        popover: (base) => ({
          ...base,
          backgroundColor: '#e8f5e9',
          color: '#1b5e20',
          borderRadius: '10px',
          padding: '20px',
        }),
        badge: (base) => ({
          ...base,
          backgroundColor: '#66bb6a',
        }),
        close: (base) => ({
          ...base,
          color: '#1b5e20',
        }),
      })}
      showNavigation
      showBadge
      showCloseButton
    >
      <StocksContent />
    </TourProvider>
  );
};

export default Stocks;
