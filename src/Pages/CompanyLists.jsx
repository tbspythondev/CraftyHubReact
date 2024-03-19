import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { addCompany, deleteCompany, fetchCompanyLists, updateCompany } from '../features/company/companyAPI';
import { useDispatch, useSelector } from 'react-redux';
import { fetchField, getModules } from '../features/fields/fieldsAPI';
import { toast } from 'react-toastify';
import { MdDeleteOutline } from 'react-icons/md';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { fetchContactLists } from '../features/contact/contactAPI';

const CompanyLists = () => {
  const dispatch = useDispatch();
  const dismissAddModal = useRef();
  const dismissEditModal = useRef();
  const companyList = useSelector((state) => state?.company?.companyList);
  const fieldsList = useSelector((state) => state?.fields?.fieldsList);
  const moduleList = useSelector((state) => state.fields.modulesList);
  const [companyData, setCompanyData] = useState({});
  const [editedCompany, setEditedCompany] = useState({
    uuid: null,
    fields: {},
  });

  useEffect(() => {
    dispatch(getModules());
    dispatch(fetchCompanyLists());
  }, [dispatch]);

  useEffect(() => {
    const companyModule = moduleList?.data?.find((data) => data.name === 'Company');
    if (companyModule) {
      const companyModuleId = companyModule.id;
      dispatch(fetchField(companyModuleId));
    }
  }, [moduleList, dispatch]);

  const handleChange = (e) => {
    setCompanyData({
      ...companyData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (Object.keys(companyData).length === 0) {
      toast.error('Please fill out at least one field');
      return;
    }

    const payload = fieldsList?.data?.fields?.reduce((acc, field) => {
      const fieldName = field.name;
      const fieldValue = companyData[fieldName] || '';
      return { ...acc, [fieldName]: fieldValue };
    }, {});

    try {
      await dispatch(addCompany(payload));
      await dispatch(fetchCompanyLists());
      document.querySelectorAll('.modal-body input').forEach((input) => {
        input.value = '';
      });
      setCompanyData({});
      dismissAddModal.current.click();
      toast.success('Company added successfully');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong');
    }
  };

  const handleOpenEditModal = (uuid) => {
    const companyToEdit = companyList?.data.find((company) => company.uuid === uuid);
    const fields = {};
    companyToEdit.details.forEach((detail) => {
      fields[detail.field_name] = detail.field_value;
    });
    const fieldsType = fieldsList.data.fields.reduce((acc, curr) => {
      acc[curr.name] = curr.data_type;
      return acc;
    }, {});
    setEditedCompany({
      uuid: uuid,
      fields: fields,
      fieldsType: fieldsType,
    });
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditedCompany((prevState) => ({
      ...prevState,
      fields: {
        ...prevState.fields,
        [name]: value,
      },
    }));
  };

  const handleSaveEdit = async () => {
    try {
      await dispatch(updateCompany(editedCompany?.uuid, editedCompany?.fields));
      await dispatch(fetchCompanyLists());

      dismissEditModal.current.click();
      toast.success('Company update successfully');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong');
    }
  };

  const handleDeleteCompany = async (companyID) => {
    try {
      await dispatch(deleteCompany(companyID));
      await dispatch(fetchCompanyLists());
      toast.success('Company Delete successfully');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong');
    }
  };

  return (
    <>
      <div className='container custom-form-wrapper d-flex justify-content-center'>
        <form action='#' className='custom-form contact-form'>
          <h2 className='title opensans-bold color-theme-tangaroa'>Company</h2>
          <p className='description opensans-regular'>Feel free to contact us if you need any assistance, any help or another question.</p>
          <div className='d-flex align-items-center justify-content-end mb-3'>
            <button className='btn btn-success opensans-regular' type='button'>
              <Link to={'/company-fields'} className='text-white text-decoration-none'>
                Customize fields
              </Link>
            </button>
            <button className='btn btn-success opensans-regular ms-3' type='button' data-bs-toggle='modal' data-bs-target='#addCompanyModal'>
              Add Company
            </button>
            {/* Add a modal start  */}
            <div className='modal fade' id='addCompanyModal' tabIndex='-1' aria-labelledby='addModalLabel' aria-hidden='true'>
              <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h5 className='modal-title opensans-regular' id='addModalLabel'>
                      Add Company
                    </h5>
                    <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                  </div>
                  <div className='modal-body'>
                    {fieldsList?.data?.fields?.map((data, index) => (
                      <div key={index}>
                        <label>{data?.name}</label>
                        <input
                          type={data?.data_type}
                          className='form-control mb-3'
                          placeholder={data?.name}
                          name={data?.name}
                          value={companyData[data?.name] || ''}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    ))}
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
          </div>
          <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  {fieldsList?.data?.fields.map((detail, idx) => (
                    <th scope='col' key={idx}>
                      {detail.name}
                    </th>
                  ))}
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {companyList?.data?.map((data, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    {data.details.map((detail, idx) => (
                      <td key={idx}>{detail.field_value}</td>
                    ))}
                    <td>
                      <div className='specialDiv text-right'>
                        <button className='btn btn-sm p-0 me-3 border-0' type='button'>
                          <MdOutlineModeEditOutline
                            className=''
                            style={{ fontSize: '20px' }}
                            data-bs-toggle='modal'
                            data-bs-target='#editCompanyModal'
                            onClick={() => handleOpenEditModal(data.uuid)}
                          />
                        </button>
                        <button className='btn btn-sm p-0 border-0' type='button' onClick={() => handleDeleteCompany(data?.uuid)}>
                          <MdDeleteOutline style={{ fontSize: '20px' }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Edit a modal start  */}
          <div className='modal fade' id='editCompanyModal' tabIndex='-1' aria-labelledby='editModalLabel' aria-hidden='true'>
            <div className='modal-dialog modal-dialog-centered'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title opensans-regular' id='editModalLabel'>
                    Edit Company
                  </h5>
                  <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                </div>
                <div className='modal-body'>
                  {/* {Object.entries(editedCompany.fields).map(([fieldName, fieldValue], index) => (
                    <div key={index}>
                      <label>{fieldName}</label>
                      <input type='text' className='form-control mb-3' name={fieldName} value={fieldValue} onChange={handleEditInputChange} />
                    </div>
                  ))} */}

                  {Object.entries(editedCompany.fields).map(([fieldName, fieldValue], index) => (
                    <div key={index}>
                      <label>{fieldName}</label>
                      <input type={editedCompany.fieldsType[fieldName]} className='form-control mb-3' name={fieldName} value={fieldValue} onChange={handleEditInputChange} />
                    </div>
                  ))}
                </div>
                <div className='modal-footer'>
                  <button type='button' className='btn btn-secondary' data-bs-dismiss='modal' ref={dismissEditModal}>
                    Close
                  </button>
                  <button type='button' className='btn btn-primary' onClick={handleSaveEdit}>
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

export default CompanyLists;
