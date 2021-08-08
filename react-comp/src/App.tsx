import React, { ReactElement, ReactNode } from "react";

import "./App.css";

// Conventional props
function Heading({ title }: { title: string }) {
  return <h1>{title}</h1>;
}

function HeadingWithContent({
  children
}: {
  children: ReactNode;
}): ReactElement | null {
  return <h1>{children}</h1>;
}

function Dialog({
  header,
  children
}: {
  header?: () => ReactNode;
  children: () => ReactNode;
}): ReactElement | null {
  return (
    <div>
      {header && (
        <div>
          <strong>{header?.()}</strong>
        </div>
      )}
      {children()}
    </div>
  );
}

// defaultProps
const defaultContainerProps = {
  heading: <strong>My Heading</strong>
};

type ContainerProps = { children: ReactNode } & typeof defaultContainerProps;

function Container({ heading, children }: ContainerProps): ReactElement | null {
  return (
    <div>
      <h1>{heading}</h1>
      {children}
    </div>
  );
}
Container.defaultProps = defaultContainerProps;

// Functional props
function TextWithNumber({
  header,
  children
}: {
  header?: (num: number) => ReactNode;
  children: (num: number) => ReactNode;
}): ReactElement | null {
  const [state, stateSet] = React.useState<number>(1);

  return (
    <div>
      <h2>{header && header?.(state)}</h2>
      <div>{children(state)}</div>
      <div>
        <button onClick={() => stateSet(state + 1)}>Add</button>
      </div>
    </div>
  );
}

// List
function List<ListItem>({
  items,
  render
}: {
  items: ListItem[];
  render: (item: ListItem) => ReactNode;
}): ReactElement | null {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{render(item)}</li>
      ))}
    </ul>
  );
}

// const List = <ListItem>({ items, render }: {items: ListItem[]; render: (item: ListItem) => ReactNode;})

// Class component
class MyHeader extends React.Component<{
  title: ReactNode;
}> {
  render() {
    return <h1>{this.props.title}</h1>;
  }
}

// TypeScript interfaces
export interface Name {
  english: string;
  japanese: string;
  chinese: string;
  french: string;
}

export interface Base {
  HP: number;
  Attack: number;
  Defense: number;
  "Sp. Attack": number;
  "Sp. Defense": number;
  Speed: number;
}

export interface Pokemon {
  id: number;
  name: Name;
  type: string[];
  base: Base;
}

const App = (): ReactElement | null => {
  const [pokemon, pokemonSet] = React.useState<Pokemon[] | null>(null);

  React.useEffect(() => {
    fetch("/pokemon.json")
      .then(resp => resp.json())
      .then((data: Pokemon[]) => pokemonSet(data));
  }, [pokemon]);

  return (
    <div>
      <Heading title="Hello"></Heading>
      <HeadingWithContent>
        <strong>Hi</strong>
      </HeadingWithContent>
      <Dialog header={() => <span>This is the header</span>}>
        {() => "This would be the content"}
      </Dialog>
      <Container>FooBar</Container>
      <TextWithNumber header={(num: number) => <span>Header {num}</span>}>
        {(num: number) => <div>Num for today: {num}</div>}
      </TextWithNumber>
      <List
        items={["ads", "assd", "wrgergwe"]}
        render={(item: string) => <div>{item.toLowerCase()}</div>}
      ></List>
      {pokemon && (
        <List
          items={pokemon}
          render={(item: Pokemon) => <p>{item.name.english}</p>}
        ></List>
      )}
      <MyHeader title="vasdfads" />
    </div>
  );
};

export default App;
