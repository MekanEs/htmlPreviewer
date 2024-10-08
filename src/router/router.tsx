import { Suspense } from 'react';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Layout } from '../components';
import { EditorPage } from '../pages';

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
      <Route index element={<EditorPage />} />
      <Route path='/eee' element={<div>E page</div>} />
    </Route>,
  ),
);
