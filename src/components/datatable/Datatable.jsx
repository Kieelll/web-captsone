import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { userColumns, userRows } from '../../datatablesource';
import { Link } from 'react-router-dom';
import UserModal from '../UserModal/UserModal';
import './datatable.scss';

const Datatable = () => {
  const [data, setData] = useState(userRows);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [formData, setFormData] = useState({
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    category: 'Basic User',
    locationName: '',
    area: '',
    barangay: '',
    street: '',
    latitude: '',
    longitude: ''
  });

  const handleEdit = (row) => {
    setFormData(row);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setFormData({
      id: null,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      category: 'Basic User',
      locationName: '',
      area: '',
      barangay: '',
      street: '',
      latitude: '',
      longitude: ''
    });
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (modalMode === 'edit') {
      setData(prev => prev.map(item => (item.id === formData.id ? formData : item)));
    } else {
      setData(prev => [...prev, { ...formData, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => (
        <div className="cellAction">
          <button className="editButton" onClick={() => handleEdit(params.row)}>Edit</button>
          <button className="deleteButton" onClick={() => handleDelete(params.row.id)}>Delete</button>
        </div>
      )
    }
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        User Table
        <button className="link" onClick={handleAdd}>Add New</button>
      </div>
      <div className="tableWrapper">
        <DataGrid
          className="datagrid"
          rows={data}
          columns={userColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      </div>

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        mode={modalMode}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
};

export default Datatable;
