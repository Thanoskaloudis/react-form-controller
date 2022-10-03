import React from 'react';
import { useState, useRef, useEffect } from 'react';
import '../Selection/Selection.scss';
import { IProps } from '../Selection/Selection.model';

export const Selection = (props: IProps) => {
  const [data] = useState(props.selectionData);
  const [label] = useState(props.label);
  const [optionsError, updateOptionsError] = useState('');
  const [selectedItemId, updateSelectedItemId] = useState(0);
  const [errorMessage, updateErrorMessage] = useState('');
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const timesMounted = useRef(0);

  const handleSelection = (event: React.MouseEvent<HTMLButtonElement>,id: number) => {
    event.preventDefault();

    updateSelectedItemId(id);
    props.handleCallback(id);
  };

  useEffect(() => {
    if(errorMessage.length > 0){
      setIsMessageVisible(true);
    } else {
      setIsMessageVisible(false);
    }
    
    if (timesMounted.current >= 4) {
      updateErrorMessage(props.validation);
    } else {
      timesMounted.current +=1;
    }

    updateOptionsError(props.fetchError)
  }, [errorMessage, props.validation, props.selectionData, props.fetchError]);

  let options = props.selectionData.map((option) => (
    <button
      key={option.id}
      id={option.name}
      aria-describedby="options required"
      onClick={(e) => handleSelection(e, option.id)}
      className={`selections--options--button ${selectedItemId === option.id && "selected"}`}
    >
      {option.name}
    </button>
  ));

  return (
    <div aria-labelledby="selections" className="selections">
      <label id="selections" htmlFor="selections" className="selections--label">{label}</label>
      <div className="selections--options">

        {optionsError.length > 0 && optionsError}

        {data && options}

      </div>
      {isMessageVisible ? <span id="options required" className="selections--error"> {errorMessage} </span> : ""}
    </div>
  );
};
