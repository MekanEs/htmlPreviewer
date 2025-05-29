import { Suspense } from 'react';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import { Layout } from '../components';
import { EditorPage } from '../pages';
import { Customer } from '../pages/Customer/Customer';
import { Replacer } from '../pages/Replacer/Replacer';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <Suspense fallback={'Loading...'}>
          <Layout />
        </Suspense>
      }
    >
      <Route index element={<EditorPage />} />
      <Route path="rep" element={<Replacer />} />
      <Route path="customer" element={<Customer />} />
    </Route>
  )
);
