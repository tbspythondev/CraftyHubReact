import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { addField, deleteField, fetchField, getModules, updateField } from '../../features/fields/fieldsAPI';
import { Link } from 'react-router-dom';

const CompanyForm = () => {
  const [moduleValue, setModuleValue] = useState({
    name: '',
    data_type: 'Text',
  });
  const [editFieldId, setEditFieldId] = useState(null);
  const [companyID, setCompanyId] = useState('');

  const [editFieldData, setEditFieldData] = useState({
    name: '',
    data_type: 'Text',
  });
  const dismissAddModal = useRef();
  const dismissEditModal = useRef();

  const { name, data_type } = moduleValue;

  const dispatch = useDispatch();
  const fieldsList = useSelector((state) => state.fields.fieldsList);
  const moduleList = useSelector((state) => state.fields.modulesList);
  console.log('moduleList: ', moduleList);
  const error = useSelector((state) => state.fields);
  console.log('error: ', error);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getModules());
    };

    fetchData();
  }, [dispatch]);
  useEffect(() => {
    const companyModule = moduleList?.data?.find((data) => data.name === 'Company');
    if (companyModule) {
      const companyModuleId = companyModule.id;
      setCompanyId(companyModule.id);
      dispatch(fetchField(companyModuleId));
    }
  }, [moduleList, dispatch]);

  const handleChange = (e) => {
    setModuleValue({ ...moduleValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (name == '') {
      toast.error('Please fill out at least one field');
      return;
    }
    try {
      const payload = {
        module: companyID,
        name: name,
        data_type: data_type,
      };
      // @ts-ignore
      await dispatch(addField(payload));
      await dispatch(fetchField(companyID));

      setModuleValue({
        name: '',
        data_type: 'Text',
      });
      dismissAddModal.current.click();

      if (!error.error) {
        toast.success('Field added successfully');
      } else {
        toast.error(error.error);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong');
    }
  };

  const handleEditClick = (id) => {
    const fieldToEdit = fieldsList?.data?.fields.find((data) => data.id === id);
    if (fieldToEdit) {
      setEditFieldId(id);
      setEditFieldData({
        name: fieldToEdit.name,
        data_type: fieldToEdit.data_type,
      });
    }
  };

  const handleEditChange = (e) => {
    setEditFieldData({ ...editFieldData, [e.target.name]: e.target.value });
  };

  const handleEditChanges = async () => {
    const payload = {
      name: editFieldData.name,
      data_type: editFieldData.data_type,
    };

    try {
      await dispatch(updateField(editFieldId, payload));
      await dispatch(fetchField(companyID));
      dismissEditModal.current.click();
      setEditFieldData({
        name: '',
        data_type: 'Text',
      });
      setEditFieldId(null);
      toast.success('Field updated successfully');
    } catch (error) {
      console.error('Error in handleEditChanges:', error);
      toast.error('Something went wrong');
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await dispatch(deleteField(id));
      await dispatch(fetchField(companyID));

      toast.success('Field deleted successfully');
    } catch (error) {
      console.error('Error in handleDeleteClick:', error);
      toast.error('Something went wrong');
    }
  };

  return (
    <>
      <div className='custom-form-wrapper d-flex justify-content-center'>
        <form action='#' className='custom-form contact-form'>
          <button className='btn border-none back-button opensans-regular position-absolute'>
            <Link to={'/'} className=''>
              <FaArrowLeftLong width={16} height={16} />
            </Link>
          </button>
          <h2 className='title opensans-bold color-theme-tangaroa'>Company Fields</h2>
          <p className='description opensans-regular'>Feel free to contact us if you need any assistance, any help or another question.</p>
          <div className='d-flex align-items-center justify-content-end mb-3'>
            <button className='btn btn-success opensans-regular' data-bs-toggle='modal' data-bs-target='#addModal'>
              Add fields
            </button>
          </div>

          {/* Add a modal start  */}
          <div className='modal fade' id='addModal' tabIndex='-1' aria-labelledby='addModalLabel' aria-hidden='true'>
            <div className='modal-dialog modal-dialog-centered'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title opensans-regular' id='addModalLabel'>
                    Add Field
                  </h5>
                  <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                </div>
                <div className='modal-body'>
                  <label>Field Name</label>
                  <input type='text' className='form-control mb-3' placeholder='Field Name' name='name' value={name} onChange={handleChange} required />

                  <label>Data Type</label>
                  <select className='form-select mb-3' name='data_type' value={data_type} onChange={handleChange}>
                    <option value='Text'>Text</option>
                    <option value='Number'>Number</option>
                    <option value='Date'>Date</option>
                    <option value='Email'>Email</option>
                  </select>
                </div>
                <div className='modal-footer'>
                  <button type='button' className='btn btn-secondary' data-bs-dismiss='modal' ref={dismissAddModal}>
                    Close
                  </button>
                  <button type='button' className='btn btn-primary' onClick={handleSubmit}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Add a modal end  */}
          {fieldsList?.data?.fields?.map((data, index) => (
            <div className='d-flex align-items-center justify-content-center mb-3' key={index}>
              <input type={data?.data_type} className='form-control rounded border-white form-input' id='name' placeholder={data?.name} />

              <div className='d-flex align-items-center justify-content-center ms-3'>
                {/* <button className='btn btn-warning mx-3' data-bs-toggle='modal' data-bs-target='#editModal' onClick={() => handleEditClick(data?.id)}>
                  Edit
                </button> */}
                <button className='btn btn-danger' onClick={() => handleDeleteClick(data?.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}

          {/* Edit a modal start  */}
          <div className='modal fade' id='editModal' tabIndex='-1' aria-labelledby='editModalLabel' aria-hidden='true'>
            <div className='modal-dialog modal-dialog-centered'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title' id='editModalLabel'>
                    Edit Field
                  </h5>
                  <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                </div>
                <div className='modal-body'>
                  <label>Field Name</label>
                  <input type='text' className='form-control mb-3' placeholder='Field Name' name='name' value={editFieldData.name} onChange={handleEditChange} required />

                  <label>Data Type</label>
                  <select className='form-select mb-3' name='data_type' value={editFieldData.data_type} onChange={handleEditChange}>
                    <option value='Text'>Text</option>
                    <option value='Number'>Number</option>
                    <option value='Date'>Date</option>
                    <option value='Email'>Email</option>
                  </select>
                </div>

                <div className='modal-footer'>
                  <button type='button' className='btn btn-secondary' data-bs-dismiss='modal' ref={dismissEditModal}>
                    Close
                  </button>
                  <button type='button' className='btn btn-primary' onClick={handleEditChanges}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Edit a modal end  */}
        </form>
      </div>
    </>
  );
};

export default CompanyForm;
