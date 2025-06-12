import React, { useState } from 'react';
import { IonChip, IonLabel } from '@ionic/react';

type MultiToggleButtonGroupProps = {
  options: string[];
  selected: string[];
  onChange: (option: string) => void; // ✅ 하나씩 넘김
};

const MultiToggleButtonGroup: React.FC<MultiToggleButtonGroupProps> = ({
  options,
  selected,
  onChange,
}) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      {options.map((option) => (
        <IonChip
          key={option}
          outline={!selected.includes(option)}
          color={selected.includes(option) ? 'success' : 'white'}
          onClick={() => onChange(option)}
        >
          <IonLabel>{option}</IonLabel>
        </IonChip>
      ))}
    </div>
  );
};


export default MultiToggleButtonGroup;
