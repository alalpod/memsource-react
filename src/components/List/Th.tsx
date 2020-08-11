import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { RootReducer } from '../../reducers';

import { handleSortChange } from '../../actions/list';
import { Project } from '../../types';

interface ThProps {
  header: keyof Project,
  label: string,
}

const Th = (props:ThProps) => {
  const { header, label } = props;
  const dispatch = useDispatch();

  const handleSortClick = (event:React.MouseEvent) => {
    event.preventDefault();
    dispatch(handleSortChange(header));
  }

  const sort = useSelector((state:RootReducer) => state.list.sort, shallowEqual);

  return (
    <TableCell
      key={header}
      sortDirection={sort.key === header ? sort.direction : false}
    >
      <TableSortLabel
        active={sort.key === header}
        direction={sort.key === header ? sort.direction : 'asc'}
        onClick={handleSortClick}
      >
        {label}
      </TableSortLabel>
    </TableCell>
  )
}

export default Th;
