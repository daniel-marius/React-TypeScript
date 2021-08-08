import { useState, useEffect, useMemo } from "react";

export interface IBeverage {
  name: string;
  producerName: string;
  beverageName: string;
  beverageColor: string;
  beverageStyle: string;
  producerLocation: string;
  abv: number;
  ibu: number;
  logo: string;
  level: number;
}

function useFetchData<Payload>(
  url: string
): {
  data: Payload | null;
  done: boolean;
} {
  const [data, dataSet] = useState<Payload | null>(null);
  const [done, doneSet] = useState(false);

  useEffect(() => {
    fetch(url)
      .then((resp: Response) => resp.json())
      .then((d: Payload) => {
        dataSet(d);
        doneSet(true);
      });
  }, [url]);

  return {
    data,
    done
  };
}

const CustomHookComponent = (): JSX.Element | null => {
  const { data, done } = useFetchData<IBeverage[]>("./hv-taplist.json");
  const portLandTaps: IBeverage[] = useMemo(
    () => (data || []).filter(bev => bev.producerLocation.includes("Portland")),
    [data]
  );

  return (
    <div>
      {done && <img src={data![0].logo} alt="Beverage logo" />}
      {portLandTaps.length && (
        <img src={portLandTaps![1].logo} alt="Beverage logo" />
      )}
    </div>
  );
};

export default CustomHookComponent;
