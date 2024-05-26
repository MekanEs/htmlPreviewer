import { FC } from 'react';
import { RegErrorDesc } from '../../constants';
import styles from './List.module.scss';
interface langListProps {
  className?: string;
  regMatches: Record<string, number>;
  hasDesc?: boolean;
}

export const ListView: FC<langListProps> = ({ regMatches, hasDesc = false }) => {
  return <div>list</div>;
};
