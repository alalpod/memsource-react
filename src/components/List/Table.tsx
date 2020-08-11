import React from 'react';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Th from './Th';
import { useSelector } from 'react-redux';
import { RootReducer } from '../../reducers';
import config from '../../config';

const ProjectsTable = () => {
  const list = useSelector((state:RootReducer) => state.list.filteredList);

  return (
    <TableContainer className="Table-List">
      <Table>
        <TableHead>
          <TableRow>
            <Th header="id" label="ID" />
            <Th header="name" label="Name" />
            <Th header="sourceLanguage" label="Source Language" />
            <Th header="targetLanguages" label="Target Languages" />
            <Th header="status" label="Status" />
            <Th header="dateCreated" label="Creation Date" />
            <Th header="dateUpdated" label="Modification Date" />
            <Th header="dateDue" label="Due Date" />
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.id}</TableCell>
              <TableCell><Link to={`/edit/${project.id}`}>{project.name}</Link></TableCell>
              <TableCell>{project.sourceLanguage}</TableCell>
              <TableCell>{project.targetLanguages}</TableCell>
              <TableCell>{project.status}</TableCell>
              <TableCell>{project.dateCreated.format(config.dataTimeFormat)}</TableCell>
              <TableCell>{project.dateUpdated.format(config.dataTimeFormat)}</TableCell>
              <TableCell>{project.dateDue.format(config.dataTimeFormat)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProjectsTable;
