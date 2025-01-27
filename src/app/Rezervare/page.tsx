"use client";
import React, { useState } from 'react';

const Rezervare = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    numPeople: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const apiUrl = 'https://example.com/api/reservation';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Reservation successful!');
        setFormData({ name: '', email: '', date: '', time: '', numPeople: '' }); // Reset form
      } else {
        alert('Failed to make reservation.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while making the reservation.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto m-10 p-6 bg-white shadow-md rounded-md dark:bg-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Rezervare de sală</h1>
      <p className="mb-6 text-center text-gray-700 dark:text-gray-300">
        Completaţi formularul de mai jos.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">Nume:</label>
          <input
            type="text"
            id="nume"
            name="nume"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="Prenume" className="block text-sm font-medium">Prenume:</label>
          <input
            type="text"
            id="prenume"
            name="prenume"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium">Dată:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="time" className="block text-sm font-medium">Durată:</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="numPeople" className="block text-sm font-medium">Nmăr de persoane:</label>
          <input
            type="number"
            id="numPeople"
            name="numPeople"
            value={formData.numPeople}
            onChange={handleInputChange}
            required
            min="1"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Trimiteţi cererea
        </button>
      </form>
    </div>
  );
};

export default Rezervare;
