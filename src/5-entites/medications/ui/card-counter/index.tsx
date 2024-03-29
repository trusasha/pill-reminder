import React, { FC, useState } from 'react';
import { CountInput, ProgressBar, ToastService } from '6-shared';
import { medicationsStorage } from '5-entites';

interface Props {
  id: string;
  currentCount: number;
  initialCount: number;
  destinationCount: number;
}

const CardCounter: FC<Props> = ({ id, currentCount, initialCount, destinationCount }) => {
  const [count, setCount] = useState(currentCount);

  return (
    <ProgressBar initialValue={initialCount} currentValue={count} targetValue={destinationCount}>
      <CountInput
        count={count}
        setCount={value => {
          setCount(state => {
            if (state > value) {
              if (value < initialCount) {
                return state;
              }

              medicationsStorage.decrementMedication({ id }).catch(ToastService.showErrorMessage);
            } else {
              if (state === destinationCount) {
                return state;
              }

              medicationsStorage.incrementMedication({ id }).catch(ToastService.showErrorMessage);
            }

            return value;
          });
        }}
      />
    </ProgressBar>
  );
};

export default CardCounter;
