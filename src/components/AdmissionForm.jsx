"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const AdmissionForm = ({ collegeId }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    candidateName: "",
    subject: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = new FormData();
    submissionData.append("collegeId", collegeId);
    submissionData.append("candidateName", formData.candidateName);
    submissionData.append("subject", formData.subject);
    submissionData.append("email", formData.email);
    submissionData.append("phone", formData.phone);
    submissionData.append("address", formData.address);
    submissionData.append("dob", formData.dob);
    submissionData.append("image", formData.image);

    try {
      const res = await axios.post(
        "http://localhost:5000/admissions",
        submissionData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        toast.success("Admission submitted successfully!");
        router.push("/my-college")
        // optionally reset form
      } else {
        toast.error("Failed to submit. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow space-y-5 text-gray-500"
      encType="multipart/form-data"
    >
      <div>
        <label className="block font-medium">Candidate Name</label>
        <input
          type="text"
          name="candidateName"
          value={formData.candidateName}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-medium">Subject</label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-medium">Phone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-medium">Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          rows={3}
          className="w-full border rounded px-3 py-2"
        ></textarea>
      </div>

      <div>
        <label className="block font-medium">Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-medium">Upload Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Submit Admission
      </button>
    </form>
  );
};

export default AdmissionForm;
