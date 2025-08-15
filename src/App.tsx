import { BrowserRouter } from 'react-router';
import Layout from './components/templates/LayoutTemplate';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.DEV ? '/' : '/MusicQuiz/'}>
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
