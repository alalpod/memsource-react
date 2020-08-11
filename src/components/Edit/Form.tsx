import React, { useEffect } from 'react';
import { Paper, TextField, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { RootReducer } from '../../reducers';
import { Moment } from 'moment';

import { handleFormChange, initNewProject, createNewProject, fetchExistingProject, editExistingProject } from '../../actions/form';
import { prepareDataForSubmit } from '../../utils/projects';

import statuses from '../../constants/statuses';
import { Link, useHistory } from 'react-router-dom';

interface FormComponentProps {
  id?: string,
}

const FormComponent = (props:FormComponentProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.id) {
      dispatch(fetchExistingProject(props.id));
    } else {
      dispatch(initNewProject());
    }
  }, [dispatch, props.id]);

  const form = useSelector((state: RootReducer) => state.form, shallowEqual);
  const { name, sourceLanguage, targetLanguages, status, dateDue } = form;

  const history = useHistory();
  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (props.id) {
      // @ts-ignore
      dispatch(editExistingProject(prepareDataForSubmit(form), props.id)).then(() => {
        history.push('/');
      })
    } else {
      // @ts-ignore
      dispatch(createNewProject(prepareDataForSubmit(form))).then(() => {
        history.push('/');
      })
    }
  }

  const onFormElementChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    dispatch(handleFormChange(event.target.name, event.target.value));
  }

  const onSelectChange = (event: React.ChangeEvent<{}>, value: { [key: string]: string } | null) => {
    event.preventDefault();
    dispatch(handleFormChange('status', value));
  }

  const onDateChange = (value: Moment | null) => {
    dispatch(handleFormChange('dateDue', value));
  }

  return (
    <div className="Project-Form-Page">
      <Paper elevation={3}>
        <form onSubmit={onFormSubmit}>

          <div className="Form-Row">
            <TextField autoFocus variant="outlined" onChange={onFormElementChange} label="Name" value={name} name="name" />
          </div>
          <div className="Form-Row">
            <TextField variant="outlined" onChange={onFormElementChange} label="Source Language" value={sourceLanguage} name="sourceLanguage" />
          </div>
          <div className="Form-Row">
            <TextField variant="outlined" onChange={onFormElementChange} label="Target Language(s)" value={targetLanguages} name="targetLanguages" />
          </div>
          <div className="Form-Row">
            <Autocomplete
              options={statuses}
              getOptionLabel={(option) => option.label}
              onChange={onSelectChange}
              value={status}
              disabled={!props.id}
              renderInput={(params) => <TextField {...params} label="Status" variant="outlined" />}
            />
          </div>
          <div className="Form-Row">
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <DateTimePicker
                autoOk
                ampm={false}
                value={dateDue}
                onChange={onDateChange}
                label="Due Date"
                inputVariant="outlined"
              />
            </MuiPickersUtilsProvider>
          </div>
          <div className="Buttons-Row">
            <Button type="submit" variant="contained" color="primary">Submit</Button>
            <Button component={Link} to="/" variant="contained" color="secondary">
              Back to overview
          </Button>
          </div>
        </form>
      </Paper>
    </div>
  )
}

export default FormComponent;