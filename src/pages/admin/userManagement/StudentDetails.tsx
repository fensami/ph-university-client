import React from "react";
import { useParams } from "react-router-dom";

const StudentDetails = () => {
  const { studentId } = useParams();
  console.log(studentId);

  return (
    <div>
      <h1>This is students components details {studentId}</h1>
    </div>
  );
};

export default StudentDetails;
