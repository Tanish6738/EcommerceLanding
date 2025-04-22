import Layout from './components/Layout'
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ValueProps from './components/ValueProps';
import FeaturedProducts from './components/FeaturedProducts';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import EmailSignup from './components/EmailSignup';

const App = () => {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <ValueProps />
      <FeaturedProducts />
      <HowItWorks />
      <Testimonials />
      <EmailSignup />
    </Layout>
  );
}

export default App