import React, { useState } from 'react';

const PickupForm = () => {
  const [formData, setFormData] = useState({
    lane: '',
    date: '',
    time: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission
    console.log(formData);
  };

  return (
    <div>
      <h2>Create Pickup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="lane">Lane:</label>
          <select id="lane" value={formData.lane} onChange={handleChange}>
            <option value="">Select Lane</option>
            <option value="Lane A">Lane A</option>
            <option value="Lane B">Lane B</option>
            <option value="Lane C">Lane C</option>
          </select>
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" value={formData.date} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="time">Time:</label>
          <input type="time" id="time" value={formData.time} onChange={handleChange} />
        </div>
        <button type="submit">Create Pickup</button>
      </form>
    </div>
  );
};

export default PickupForm;
