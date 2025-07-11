import AdmissionForm from "@/components/AdmissionForm";
import React from "react";

export default async function AdmissionSubmit({ params }) {
  const { id } = params;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Confirm Admission</h1>
      <AdmissionForm collegeId={id} />
    </div>
  );
}
