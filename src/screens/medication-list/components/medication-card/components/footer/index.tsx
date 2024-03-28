import React, { FC, useState } from 'react';
import CountInput from 'components/count-input';
import storage from 'services/storage';
import ToastService from 'services/toast';
import ProgressBar from '../progress-bar';

interface Props {
  id: string;
  currentCount: number;
  destinationCount: number;
}

const Footer: FC<Props> = ({ id, currentCount, destinationCount }) => {
  const [count, setCount] = useState(currentCount);

  return (
    <ProgressBar currentValue={count} targetValue={destinationCount}>
      <CountInput
        count={count}
        setCount={value => {
          setCount(state => {
            if (state > value) {
              storage.decrementMedication({ id }).catch(ToastService.showErrorMessage);
            } else {
              if (state === destinationCount) {
                return state;
              }

              storage.incrementMedication({ id }).catch(ToastService.showErrorMessage);
            }

            return value;
          });
        }}
      />
    </ProgressBar>
  );
};

export default Footer;
