import { Suspense } from 'react';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Layout } from '../components';
import { EditorPage } from '../pages';
import { Login } from '../components/Login/Login';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={
        <Suspense fallback={'Loading...'}>
          <Layout />
        </Suspense>
      }
    >

      <Route index element={<Login />} />
      <Route path='editor' element={<EditorPage />} />
      <Route path='/eee' element={<div>E page</div>} />
    </Route>,
  ),
);
