import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { addCompany, deleteCompany, fetchCompanyLists } from '../features/company/companyAPI';
import { useDispatch, useSelector } from 'react-redux';
import { fetchField, getModules } from '../features/fields/fieldsAPI';
import { toast } from 'react-toastify';
import { MdDeleteOutline } from 'react-icons/md';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { addContact, deleteContact, fetchContactLists, updateContact } from '../features/contact/contactAPI';

const ContactLists = () => {
  const dispatch = useDispatch();
  const dismissAddModal = useRef();
  const dismissEditModal = useRef();
  const contactList = useSelector((state) => state?.contact?.contactList);
  const companyList = useSelector((state) => state?.company?.companyList);
  const fieldsList = useSelector((state) => state?.fields?.fieldsList);
  const moduleList = useSelector((state) => state.fields.modulesList);

  const [contactData, setContactData] = useState({});
  const [selectedCompany, setSelectedCompany] = useState('');
  const [editedCompany, setEditedCompany] = useState({
    uuid: null,
    fields: {},
  });

  useEffect(() => {
    dispatch(getModules());
    dispatch(fetchContactLists());
    dispatch(fetchCompanyLists());
  }, [dispatch]);

  useEffect(() => {
    const contactModule = moduleList?.data?.find((data) => data.name === 'Contact');
    if (contactModule) {
      const contactID = contactModule.id;
      dispatch(fetchField(contactID));
    }
  }, [moduleList, dispatch]);

  const handleChange = (e) => {
    setContactData({
      ...contactData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (contactData && selectedCompany) {
      try {
        const updatedContactData = { ...contactData, company: selectedCompany };

        await dispatch(addContact(updatedContactData));
        await dispatch(fetchContactLists());
        document.querySelectorAll('.modal-body input').forEach((input) => {
          input.value = '';
        });
        setContactData({});
        setSelectedCompany('');
        dismissAddModal.current.click();
        toast.success('Contact data created successfully');
      } catch (error) {
        console.error('Error:', error);
        toast.error('Something went wrong');
      }
    } else {
      toast.error('Please fill out all required fields');
    }
  };

  const handleOpenEditModal = async (uuid) => {
    const contactDetails = contactList.data.find((contact) => contact.uuid === uuid);
    const fieldsType = fieldsList.data.fields.reduce((acc, curr) => {
      acc[curr.name] = curr.data_type;
      return acc;
    }, {});

    const fields = {};
    contactDetails.contact_details.forEach((detail) => {
      fields[detail.field_name] = detail.field_value;
    });

    setEditedCompany({
      uuid: uuid,
      company: contactDetails.company.uuid,
      fields: fields,
      fieldsType: fieldsType,
    });
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'company') {
      setEditedCompany((prevState) => ({
        ...prevState,
        company: value,
      }));
    } else {
      setEditedCompany((prevState) => ({
        ...prevState,
        fields: {
          ...prevState.fields,
          [name]: value,
        },
      }));
    }
  };

  const handleSaveEdit = async () => {
    try {
      const updatedContactData = { ...editedCompany?.fields, company: editedCompany?.company };

      await dispatch(updateContact(editedCompany?.uuid, updatedContactData));
      await dispatch(fetchContactLists());
      dismissEditModal.current.click();
      toast.success('Contact update successfully');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong');
    }
  };

  const handleDeleteContact = async (contactID) => {
    try {
      await dispatch(deleteContact(contactID));
      await dispatch(fetchContactLists());
      toast.success('Contact data deleted successfully');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong');
    }
  };

  return (
    <>
      <div className='container custom-form-wrapper d-flex justify-content-center'>
        <form action='#' className='custom-form contact-form'>
          <h2 className='title opensans-bold color-theme-tangaroa'>Contact</h2>
          <p className='description opensans-regular'>Feel free to contact us if you need any assistance, any help or another question.</p>
          <div className='d-flex align-items-center justify-content-end mb-3'>
            <button className='btn btn-success opensans-regular' type='button'>
              <Link to={'/contact-fields'} className='text-white text-decoration-none'>
                Customize fields
              </Link>
            </button>
            <button className='btn btn-success opensans-regular ms-3' type='button' data-bs-toggle='modal' data-bs-target='#addContactModal'>
              Add Contact
            </button>
            {/* Add a modal start  */}
            <div className='modal fade' id='addContactModal' tabIndex='-1' aria-labelledby='addModalLabel' aria-hidden='true'>
              <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h5 className='modal-title opensans-regular' id='addModalLabel'>
                      Add Contact
                    </h5>
                    <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                  </div>
                  <div className='modal-body'>
                    <label>Company</label>
                    <select className='form-select mb-3' name='company' value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)}>
                      <option value='' disabled hidden>
                        Select
                      </option>
                      {companyList?.data?.map((data) => (
                        <option key={data.uuid} value={data.uuid}>
                          {data.details[0].field_value}
                        </option>
                      ))}
                    </select>
                    {fieldsList?.data?.fields?.map((data, index) => (
                      <div key={index}>
                        <label>{data?.name}</label>
                        <input type={data?.data_type} className='form-control mb-3' placeholder={data?.name} name={data?.name} onChange={handleChange} />
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
                  <th scope='col'>Company</th>
                  {fieldsList?.data?.fields.map((detail, idx) => (
                    <th scope='col' key={idx}>
                      {detail.name}
                    </th>
                  ))}
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {contactList?.data?.map((data, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.company?.details[0].field_value}</td>
                    {data.contact_details.map((detail, idx) => (
                      <td key={idx}>{detail.field_value}</td>
                    ))}
                    <td>
                      <div className='specialDiv text-right'>
                        <button className='btn btn-sm p-0 me-3 border-0' type='button' data-bs-toggle='modal' data-bs-target='#editContactModal'>
                          <MdOutlineModeEditOutline className='' style={{ fontSize: '20px' }} onClick={() => handleOpenEditModal(data.uuid)} />
                        </button>
                        <button className='btn btn-sm p-0 border-0' type='button' onClick={() => handleDeleteContact(data?.uuid)}>
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
          <div className='modal fade' id='editContactModal' tabIndex='-1' aria-labelledby='editModalLabel' aria-hidden='true'>
            <div className='modal-dialog modal-dialog-centered'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title opensans-regular' id='editModalLabel'>
                    Edit Contact
                  </h5>
                  <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                </div>
                <div className='modal-body'>
                  <label>Company</label>
                  <select className='form-select mb-3' name='company' value={editedCompany.company} onChange={handleEditInputChange}>
                    <option value='' disabled hidden>
                      Select
                    </option>
                    {companyList?.data?.map((data) => (
                      <option key={data.uuid} value={data.uuid}>
                        {data.details[0].field_value}
                      </option>
                    ))}
                  </select>
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

export default ContactLists;
