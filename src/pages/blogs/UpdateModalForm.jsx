import React, { useState } from 'react'
import './UpdateModalForm.scss'

const UpdateModalForm = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    imageUrl: '',
    qno: '',
    ques: '',
    ans: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const postData = {
      imageUrl: formData.imageUrl,
      qno: formData.qno,
      ques: formData.ques,
      ans: formData.ans
    }

    console.log(JSON.stringify(postData));

    try {
      const response = await fetch(`${process.env.REACT_APP_CNAPP_DATA_SERVICE_BASE_URL}/data/update-gk`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)
      })

      if (response.ok) {
        console.log('GK Updated!')
        closeModal()
        window.location.reload()
      } else {
        console.log('Error updating gk post!')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      console.log('Error submitting form!')
    }
  }

  return (
    <div className="update-gk-modal-overlay">
      <div className="update-gk-modal-container">
        <h2 className="update-gk-card-modal-heading">Update GK Card</h2>
        <form onSubmit={handleSubmit} className="update-gk-modal-form">
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="qno">GK Question No:</label>
          <input
            type="text"
            id="qno"
            name="qno"
            value={formData.qno}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="ques">GK Question:</label>
          <textarea
            id="ques"
            name="ques"
            value={formData.ques}
            onChange={handleInputChange}
            required
          ></textarea>

          <label htmlFor="ans">Answer:</label>
          <input
            type="text"
            id="ans"
            name="ans"
            value={formData.ans}
            onChange={handleInputChange}
            required
          />

          <button type="submit" className="update-gk-submit-btn">Update</button>
        </form>
        <button className="update-gk-close-btn" onClick={closeModal}>Close</button>
      </div>
    </div>
  )
}

export default UpdateModalForm
