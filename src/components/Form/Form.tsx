import React from 'react';
import { useState, useEffect } from 'react';
import { Selection } from '../Selection/Selection';
import { Messages, IUser } from '../Form/Form.model';
import { ISelectionData } from '../Selection/Selection.model';
import './Form.scss';
import axios from "axios";

export const Form = () => {
  const [selectedOption, updateselectedOption] = useState(0);
  const [selectionData, updateseSelectionData] = useState<ISelectionData[]>([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [postMessage, setPostMessage] = useState('');

  const handleSelectedOption = (selectedOption: number) => {
    updateselectedOption(selectedOption);
  };

  const validation = (): string => {
    if (selectedOption !== 0) {
      return '';
    } else {
      return Messages.OptionRequired;
    }
  };

  const handleTitleInput = (value: string) => {
    setTitle(value);
  }

  const handleBodyInput = (value: string) => {
    setBody(value);
  }

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    validation();
    if((title.length === 0 || body.length ===  0) && validation.length === 0) {
      setError(true);
    } else {
      const postData = {
        "title": title,
        "body": body,
        "userId": selectedOption
      }
  
      try {
        await axios.post("https://jsonplaceholder.typicode.com/posts", postData);
        setPostMessage(Messages.PostSuccess)
      } catch (error) {
        setPostMessage(Messages.PostFail);
      }
    }
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        const users: IUser[] = createRandomArray(response.data, 4);

        setSelctionData(users)
        setFetchError("");
      } catch (error) {
        setFetchError(Messages.FetchFail);
      }
    };

    fetchUsers();
  }, []);

  const setSelctionData = (users: IUser[]) => {
    const tempData = users.map(({id,name}) => ({
      name: name,
      id: id
    }));

    updateseSelectionData(tempData);
  }

  const createRandomArray = (arr: IUser[], num: number) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
  
    return shuffled.slice(0, num);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <Selection
          label="Please Select the user"
          validation={validation}
          handleCallback = {handleSelectedOption}
          selectionData={selectionData}
          fetchError={fetchError}
        />
        <div role="form group" className="form--group">
          <label htmlFor="title" className="form--group--label">Title</label>
          <input 
          type="text"
          autoComplete="title"
          onChange={(e) => handleTitleInput(e.target.value)} 
          className="form--group--field" 
          placeholder="Some title" 
          id="title"
          name="title"
          aria-describedby="required text"
          />
          {error && title.length <=0 ? 
          <span id="required text" className="form--group--error" >This field is required.</span> : ""}
        </div>
        <div role="form group" className="form--group">
          <label htmlFor="body" className="form--group--label">Body</label>
          <input 
          type="text" 
          autoComplete="body"
          onChange={(e) => handleBodyInput(e.target.value)} 
          className="form--group--field" 
          placeholder="Some body" 
          id="body"
          name="body"
          aria-describedby="required text"
          />
          {error && body.length <=0 ? 
          <span id="required text" className="form--group--error" >This field is required.</span> : ""}
        </div>
        <input className="form--submit" aria-describedby="submit message" type="submit" value="Submit"/>
        {postMessage.length > 0 ? 
        <span 
          id="submit message"
          className={postMessage.includes("failed") ? `form--group--error` : `form--group--success`}
          >{postMessage}</span> : 
        ""}
      </form>
    </div>
  );
};
