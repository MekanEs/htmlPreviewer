import { FC } from 'react';

const UtmList: FC<{ list: string[]; name: string }> = ({ list, name }) => {
  return (
    <div
      style={{
        margin: '10px',
        border: 'solid 1px',
        borderColor: list.length > 1 ? '#fc8989bf' : '#89fc8dbf',
        borderRadius: '10px',
        padding: '10px',
        height: 'fit-content',
        minWidth: '100%',
      }}
    >
      <h3>{name}</h3>
      <ul
        style={{
          margin: '10px',
          border: 'solid 1px',
          borderColor: list.length > 1 ? '#fc8989bf' : '#89fc8dbf',
          borderRadius: '10px',
          padding: '10px',
          height: 'fit-content',
          minWidth: '80%',
        }}
      >
        {list.map((el) => (
          <li
            onClick={() => {
              navigator.clipboard.writeText(el);
            }}
            style={{
              listStyle: 'none',
              display: 'flex',
              gap: '10px',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            key={el}
          >
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default UtmList;
