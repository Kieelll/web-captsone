import React, { useState } from 'react';
import { userRows, userColumns } from '../../LocationTableData';
import { DataGrid } from '@mui/x-data-grid';
import LocationModal from '../LocationModal/LocationModal';
import './LocationTable.scss';

const LocationTable = () => {
  const [data, setData] = useState(userRows);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [formData, setFormData] = useState({
    id: null,
    locationID: '',
    locationName: '',
    barangay: '',
    street: '',
    latitude: '',
    longitude: ''
  });

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleEdit = (row) => {
    setFormData(row);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setFormData({
      id: null,
      locationID: '',
      locationName: '',
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
      setData(prev =>
        prev.map(item => (item.id === formData.id ? formData : item))
      );
    } else {
      setData(prev => [...prev, { ...formData, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 180,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <button className="editButton" onClick={() => handleEdit(params.row)}>Edit</button>
            <button className="deleteButton" onClick={() => handleDelete(params.row.id)}>Delete</button>
          </div>
        );
      }
    }
  ];

  return (
    <div className="locationTable">
      <div className="dataLocationTable">
        Location Table
        <button className="link" onClick={handleAdd}>Add New</button>
      </div>
      <div className="locationWrapper">
        <DataGrid
          className="datagrid"
          rows={data}
          columns={userColumns.concat(actionColumn)}
          pageSize={7}
          rowsPerPageOptions={[7]}
          checkboxSelection
        />
      </div>

      <LocationModal
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

export default LocationTable;
