import AdmissionForm from "@/components/AdmissionForm";
import axios from "axios";
import React from "react";

export const getSingleCollege = async (id) => {
  const res = await axios.get(`http://localhost:5000/colleges/${id}`);
  return res?.data;
};

export default async function AdmissionSubmit({ params }) {
  const { id } = await params;
  const college = await getSingleCollege(id);
  const { name, image } = college;

  console.log(name, image)

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Confirm Admission</h1>
      <AdmissionForm collegeId={id} collegeImage={image} collegeName={name} />
    </div>
  );
}
