import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { MainPage } from "pages";
import { MainLayout } from "./layouts";

const Router = () => (
  <BrowserRouter>
    <MainLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/chats" />} />
        <Route path="/chats" element={<MainPage />} />
        <Route path="*" element={<Navigate to="/chats" />} />
      </Routes>
    </MainLayout>
  </BrowserRouter>
);

export default Router;
