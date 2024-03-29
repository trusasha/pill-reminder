import { CardCounter, MedicationCardEntity } from '5-entites';
import React, { FC } from 'react';

const MedicationCard: FC<
  Pick<
    Entities.Medication,
    'id' | 'name' | 'description' | 'currentCount' | 'destinationCount' | 'createdAt' | 'initialCount'
  >
> = ({ id, name, description, currentCount, initialCount, destinationCount, createdAt }) => {
  return (
    <MedicationCardEntity
      id={id}
      name={name}
      description={description}
      createdAt={createdAt}
      footerComponent={
        <CardCounter
          initialCount={initialCount}
          currentCount={currentCount}
          id={id}
          destinationCount={destinationCount}
        />
      }
    />
  );
};

export default MedicationCard;
