import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "../Common/ScrollToTop";
import Login from "../Admin/Auth/Login";
import UserLogin from "../User/Auth/Login";
import WithoutLay from "../Admin/WithoutLayout/WithoutLay";
import Layout from "../Admin/Layout/Layout";
import UserLayout from "../User/Layout/Layout";
import AddCourse from "../Admin/Dashboard/AddCourse";
import AllCourse from "../Admin/Dashboard/AllCourse";
import Users from "../Admin/Dashboard/Users";
import UpdateCourse from "../Admin/Dashboard/UpdateCourse";
import AddBlog from "../Admin/Dashboard/AddBlog";
import AllBlogs from "../Admin/Dashboard/AllBlogs";
import EditBlog from "../Admin/Dashboard/EditBlog";
import WithOutLayout from "../User/WithoutLayout/WithOutLayout";
import Register from "../User/Auth/Register";
import ForgotPassword from "../User/Auth/ForgotPassword";
import HomePage from "../User/Screens/HomePage";
import Courses from "../User/Courses/Courses";
import SingleCourse from "../User/Courses/SingleCourse";
import Blogs from "../User/Blog/Blogs";
import BlogDetails from "../User/Blog/BlogDetails";
import WriteBlog from "../User/Blog/WriteBlog";
import About from "../User/Screens/About";
import Contact from "../User/Screens/Contact";
import Certificate from "../User/Screens/Certificate";
import UserDashboard from "../User/Courses/UserDashboard";
import ErrorPage from "../User/Screens/ErrorPage";

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path="/admin"
          element={
            <WithoutLay>
              <Login />
            </WithoutLay>
          }
        />
        <Route
          path="/admin/add-course"
          element={
            <Layout>
              <AddCourse />
            </Layout>
          }
        />
        <Route
          path="/admin/all-course"
          element={
            <Layout>
              <AllCourse />
            </Layout>
          }
        />
        <Route
          path="/admin/edit-course/:id"
          element={
            <Layout>
              <UpdateCourse />
            </Layout>
          }
        />
        <Route
          path="/admin/users"
          element={
            <Layout>
              <Users />
            </Layout>
          }
        />
        <Route
          path="/admin/add-blog"
          element={
            <Layout>
              <AddBlog />
            </Layout>
          }
        />
        <Route
          path="/admin/all-blogs"
          element={
            <Layout>
              <AllBlogs />
            </Layout>
          }
        />
        <Route
          path="/admin/edit-blog/:id"
          element={
            <Layout>
              <EditBlog />
            </Layout>
          }
        />

        {/* user routes */}
        <Route
          path="/register"
          element={
            <WithOutLayout>
              <Register/>
            </WithOutLayout>
          }
        />
         <Route
          path="/login"
          element={
            <WithOutLayout>
              <UserLogin/>
            </WithOutLayout>
          }
        />
         <Route
          path="/forgot-password"
          element={
            <WithOutLayout>
              <ForgotPassword/>
            </WithOutLayout>
          }
        />
        <Route
          path="/"
          element={
            <UserLayout>
              <HomePage/>
            </UserLayout>
          }
        />
          <Route
          path="/courses"
          element={
            <UserLayout>
              <Courses/>
            </UserLayout>
          }
        />
        <Route
          path="/blogs"
          element={
            <UserLayout>
              <Blogs/>
            </UserLayout>
          }
        />
        <Route
          path="/blogs/write"
          element={
            <UserLayout>
              <WriteBlog/>
            </UserLayout>
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <UserLayout>
              <BlogDetails/>
            </UserLayout>
          }
        />
         <Route
          path="/about"
          element={
            <UserLayout>
              <About/>
            </UserLayout>
          }
        />
          <Route
          path="/contact"
          element={
            <UserLayout>
              <Contact/>
            </UserLayout>
          }
        />
             <Route
          path="/certificate"
          element={
            <UserLayout>
              <Certificate/>
            </UserLayout>
          }
        />
          <Route
          path="/dashboard"
          element={
            <UserLayout>
              <UserDashboard/>
            </UserLayout>
          }
        />
           <Route
          path="/courses/:id"
          element={
            <UserLayout>
              <SingleCourse/>
            </UserLayout>
          }
        />
        <Route
          path="/*"
          element={
              <ErrorPage/>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
