// Beginner Interview

import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from "axios";

interface IUserName {
  first: string;
  last: string;
  title: string;
}

interface IUserPicture {
  thumbnail: string;
}

interface IUserInfo {
  name: IUserName;
  picture: IUserPicture;
}

const fetchRandomData = async (pageNumber: number): Promise<any> => {
  let data;

  try {
    data = await axios.get(`https://randomuser.me/api?page=${pageNumber}`);
  } catch (err) {
    console.error(err);
  }
  return data;
};

const getFullName = (uinf: IUserInfo) => {
  const { name: { title, first, last } } = uinf;
  return `${title} ${first} ${last}`;
};

const Example1 = (): JSX.Element => {
  const [counter, setCounter] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const [userInfo, setUserInfo] = useState<any>([]);
  // const [jsonData, setJsonData] = useState('');

  // const fetchNextUser = useCallback(
  //
  //   () => {
  //     (async() => {
  //       const rand = await fetchRandomData(nextPage);
  //       if (rand.data === undefined) return;
  //
  //       // setJsonData(JSON.stringify(rand.data, null, 2) || 'No user data!');
  //       const newUserInfo = [
  //         ...userInfo,
  //         ...rand.data.results,
  //       ];
  //       setUserInfo(newUserInfo);
  //       setNextPage(rand.data.info.page + 1);
  //     })();
  //   },
  //   [nextPage, userInfo]
  // );

  const fetchNextUser = useRef(() => {});

  fetchNextUser.current = async (): Promise<void> => {
    const rand = await fetchRandomData(nextPage);
    if (rand.data === undefined) return;

    // setJsonData(JSON.stringify(rand.data, null, 2) || 'No user data!');
    const newUserInfo = [
      ...userInfo,
      ...rand.data.results,
    ];
    setUserInfo(newUserInfo);
    setNextPage(rand.data.info.page + 1);
  }

  useEffect(() => {
    // (async() => {
    //
    // })();
    fetchNextUser.current();

  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          { counter }
        </p>

      </header>
      <button onClick={() => setCounter(counter + 1)}>Increase counter</button>
      <button onClick={() => fetchNextUser.current()}>Fetch Next User</button>
      <div>
        {
          userInfo.map((uinf: IUserInfo, idx: number) => (
            <div key={idx}>
              <p>{getFullName(uinf)}</p>
              <img src={uinf.picture.thumbnail} alt={uinf.picture.thumbnail} />
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Example1;
