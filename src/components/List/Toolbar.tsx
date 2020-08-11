import React from 'react';
import { TextField, Button } from "@material-ui/core"
import { useDispatch, useSelector } from 'react-redux';
import { handleFilterChange } from '../../actions/list';
import { RootReducer } from '../../reducers';
import { Link } from 'react-router-dom';

const Toolbar = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector((state:RootReducer) => state.list.filter);

  const onFilterChange = (event:React.ChangeEvent) => {
    event.preventDefault();
    const value = (event.target as HTMLInputElement).value;
    dispatch(handleFilterChange(value));
  }

  return (
    <div className="Toolbar">
      <TextField
        onChange={onFilterChange}
        placeholder="Type to filter..."
        value={filterValue}
        variant="outlined"
      />

      <Button component={Link} to="/new" variant="contained" color="primary">
        Create new project
      </Button>
    </div>
  )
}

export default Toolbar;
