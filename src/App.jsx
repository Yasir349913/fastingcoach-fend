import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Home/Navbar';
import Footer from './components/Home/Footer';

import Hero from './components/Home/Hero';
import FAQ from './components/Home/Faq';
import Pricing from './components/Home/Pricing';
import HowItWorks from './components/Home/Howwork';
import Testimonials from './components/Home/Testimonials';
import UserForm from './components/UserForm/UserForm';
import SuccessPayment from './components/SuccessPayment';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Landing page route */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
              <HowItWorks />
              <Pricing />
              <Testimonials />
              <FAQ />
              <Footer />
            </>
          }
        />
        {/* User route */}
        <Route path="/user" element={<UserForm />} />
        {/* Success Payment route */}
        <Route path="/success" element={<SuccessPayment />} />
      </Routes>
    </Router>
  );
};

export default App;
