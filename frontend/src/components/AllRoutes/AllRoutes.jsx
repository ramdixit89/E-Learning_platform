import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "../Common/ScrollToTop";

// Layouts - static imports
import WithoutLay from "../Admin/WithoutLayout/WithoutLay";
import Layout from "../Admin/Layout/Layout";
import UserLayout from "../User/Layout/Layout";
import WithOutLayout from "../User/WithoutLayout/WithOutLayout";
import ErrorPage from "../User/Screens/ErrorPage";

// Lazy-loaded Admin pages
const Login = lazy(() => import("../Admin/Auth/Login"));
const AdminDashboard = lazy(() => import("../Admin/Dashboard/AdminDashboard"));
const AddCourse = lazy(() => import("../Admin/Dashboard/AddCourse"));
const AllCourse = lazy(() => import("../Admin/Dashboard/AllCourse"));
const Users = lazy(() => import("../Admin/Dashboard/Users"));
const UpdateCourse = lazy(() => import("../Admin/Dashboard/UpdateCourse"));
const AddBlog = lazy(() => import("../Admin/Dashboard/AddBlog"));
const AllBlogs = lazy(() => import("../Admin/Dashboard/AllBlogs"));
const EditBlog = lazy(() => import("../Admin/Dashboard/EditBlog"));

// Lazy-loaded User pages
const UserLogin = lazy(() => import("../User/Auth/Login"));
const Register = lazy(() => import("../User/Auth/Register"));
const ForgotPassword = lazy(() => import("../User/Auth/ForgotPassword"));
const HomePage = lazy(() => import("../User/Screens/HomePage"));
const Courses = lazy(() => import("../User/Courses/Courses"));
const SingleCourse = lazy(() => import("../User/Courses/SingleCourse"));
const Blogs = lazy(() => import("../User/Blog/Blogs"));
const BlogDetails = lazy(() => import("../User/Blog/BlogDetails"));
const WriteBlog = lazy(() => import("../User/Blog/WriteBlog"));
const About = lazy(() => import("../User/Screens/About"));
const Contact = lazy(() => import("../User/Screens/Contact"));
const Certificate = lazy(() => import("../User/Screens/Certificate"));
const UserDashboard = lazy(() => import("../User/Courses/UserDashboard"));

const FallbackLoader = () => (
  <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<FallbackLoader />}>
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
            path="/admin/dashboard"
            element={
              <Layout>
                <AdminDashboard />
              </Layout>
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
            element={<ErrorPage/>}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AllRoutes;
