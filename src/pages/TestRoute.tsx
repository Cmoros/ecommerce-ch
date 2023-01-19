import React from "react";
import { Route, Routes } from "react-router-dom";

const TestRoute = () => {
  return (
    <div>
      TestRoute
      <Routes>
        <Route path="/prueba" element={<p>Prueba</p>} />
      </Routes>
    </div>
  );
};

export default TestRoute;
