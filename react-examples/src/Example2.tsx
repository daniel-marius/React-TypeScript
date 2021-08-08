// Intermediate Interview

import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";

enum SortingDirection {
  ASCENDING = "ASCENDING",
  DESCENDING = "DESCENDING",
  UNSORTED = "UNSORTED"
}

interface IUserName {
  first: string;
  last: string;
  title: string;
}

interface IUserInfo {
  name: IUserName;
}

interface ICoordinates {
  latitude: string;
  longitude: string;
}

interface ICoordinatesInfo {
  coordinates: ICoordinatesInfo;
}

interface IStreet {
  name: string;
  number: number;
}

interface IStreetInfo {
  street: IStreet;
}

interface ITimezone {
  description: string;
  offset: string;
}

interface ITimezoneInfo {
  timezone: ITimezone;
}

interface ILocation {
  city: string;
  coordinates: ICoordinates;
  country: string;
  postcode: number;
  state: string;
  street: IStreet;
  timezone: ITimezone;
}

interface ILocationInfo {
  location: ILocation;
}

const fetchData = async (): Promise<any> => {
  let response: any;
  try {
    const resp = await axios.get("https://randomuser.me/api/?results=20");
    response = resp;
  } catch (err) {
    console.error(err);
  }

  return response;
};

const getLocations = (results: any): any => {
  let keys: any[] = [];
  let values: any[] = [];

  results.forEach(({ location }: ILocationInfo) => {
    const objKey = extractObjectKeys(location);

    const { street, coordinates, timezone, ...rest } = location;
    values.push({
      ...rest,
      number: street.number,
      name: street.name,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      description: timezone.description,
      offset: timezone.offset
    });

    keys.push(objKey);
  });

  return [keys, values];
};

const extractObjectKeys = (object: any): string[] => {
  let objectKeys: string[] = [];
  Object.keys(object).forEach((objectKey: string) => {
    const value: any = object[objectKey];
    if (typeof value !== "object") {
      objectKeys.push(objectKey);
    } else {
      objectKeys = [...objectKeys, ...extractObjectKeys(value)];
    }
  });

  return objectKeys;
};

const filteredRows = (rows: any[], filterKey: string): any[] => {
  return rows.filter((row: any) => {
    return Object.values(row).some(s =>
      ("" + s).toLowerCase().includes(filterKey)
    );
  });
};

const sortData = (
  data: any,
  sortKey: string,
  sortingDirection: SortingDirection
): void => {
  data.sort((a: any, b: any) => {
    const relevantValueA: any = a[sortKey];
    const relevantValueB: any = b[sortKey];

    if (
      sortingDirection === SortingDirection.UNSORTED ||
      sortingDirection === SortingDirection.ASCENDING
    ) {
      if (relevantValueA < relevantValueB) return -1;
      if (relevantValueA > relevantValueB) return 1;
      return 0;
    } else {
      if (relevantValueA > relevantValueB) return -1;
      if (relevantValueA < relevantValueB) return 1;
      return 0;
    }
  });
};

const getNextSortingDirection = (
  sortingDirection: SortingDirection
): SortingDirection.DESCENDING | SortingDirection.ASCENDING => {
  if (
    sortingDirection === SortingDirection.UNSORTED ||
    sortingDirection === SortingDirection.ASCENDING
  ) {
    return SortingDirection.DESCENDING;
  }
  return SortingDirection.ASCENDING;
};

const Example2 = (): JSX.Element => {
  const [people, setPeople] = useState([]);
  const [locationsInfo, setLocationsInfo] = useState<any[]>([]);
  const [inputFieldValue, setInputFieldValue] = useState("");
  const [sortingDirections, setSortingDirections] = useState<any>([]);

  const sortColumn = (sortKey: string) => {
    // console.log(sortKey);
    const currentSortingDirection:
      | SortingDirection.UNSORTED
      | SortingDirection.ASCENDING
      | SortingDirection.DESCENDING = sortingDirections[sortKey];
    const newLocationsInfo: any[] = [...locationsInfo];

    // localtionsInfo[1] - The array of values from each table column
    sortData(newLocationsInfo[1], sortKey, currentSortingDirection);
    const nextSortingDirection:
      | SortingDirection.ASCENDING
      | SortingDirection.DESCENDING = getNextSortingDirection(
      currentSortingDirection
    );

    const newSortingDirections: any = { ...sortingDirections };
    newSortingDirections[sortKey] = nextSortingDirection;

    setSortingDirections(newSortingDirections);
    setLocationsInfo(newLocationsInfo);
  };

  useEffect(() => {
    (async () => {
      const { data } = await fetchData();
      const { results } = data;

      if (results === undefined) return;

      setPeople(results);
      setLocationsInfo(getLocations(results));
    })();
  }, []);

  const onSetInputFieldValue = useCallback(
    e => setInputFieldValue(e.target.value),
    [setInputFieldValue]
  );

  const users = useMemo(() => {
    return people;
  }, [people]);

  const locations = useMemo(() => {
    return locationsInfo;
  }, [locationsInfo]);

  const renderTable = (): JSX.Element => {
    if (locations[0] === undefined) {
      return <div>No Data!</div>;
    }
    return (
      <div>
        <table>
          <thead>
            <tr>
              {locations[0][0].map((el: string, idx: number) => (
                <th
                  key={idx}
                  onClick={() => {
                    sortColumn(el);
                  }}
                >
                  {el}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRows(locations[1], inputFieldValue).map(
              (el: any, idx: number) => (
                <tr key={idx}>
                  {locations[0][0].map((header: string, headerIdx: number) => (
                    <td key={headerIdx}>{el[header]}</td>
                  ))}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Example</p>
      </header>
      <input value={inputFieldValue} onChange={onSetInputFieldValue} />
      {renderTable()}
    </div>
  );
};

export default Example2;
