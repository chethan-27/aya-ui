import { Navbar } from './components';
import ApplicationRoutes from './routes/routes';


function App() {
    return (
        <div className='hide-scrollbar'>
            <Navbar />
            <ApplicationRoutes />
        </div>
    );
}


export default App;