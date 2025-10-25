import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Loans from './pages/Loans';
import Members from './pages/Members';
import YieldPool from './pages/YieldPool';
import MyAccount from './pages/MyAccount';

function App() {
  return (
    <Routes>
      {/* Landing page without layout */}
      <Route path="/" element={<Landing />} />

      {/* App routes with layout */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/loans" element={<Loans />} />
        <Route path="/members" element={<Members />} />
        <Route path="/yield" element={<YieldPool />} />
        <Route path="/account" element={<MyAccount />} />
      </Route>
    </Routes>
  );
}

export default App;
