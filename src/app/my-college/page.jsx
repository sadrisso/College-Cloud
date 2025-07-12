import useAuth from '@/hooks/useAuth';
import axios from 'axios';
import React from 'react'

export const metadata = {
  title: "Admission",
};

const getAdmission = async () => {
  try {
    const res = await axios.get(`http://localhost:5000/admissions`);
    return res.data;
  } catch (error) {
    console.error("Axios error:", error.response?.data || error.message);
    throw error;
  }
};

export default async function MyCollegePage() {
  const admission = await getAdmission()
  console.log("Admission -->", admission)

  return (
    <div>
      My College
    </div>
  )
}
