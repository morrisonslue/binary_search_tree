import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import EnterNumbers from './pages/EnterNumbers.jsx';
import Previous from './pages/Previous.jsx';

export default function App() {
    return (
        <BrowserRouter>
            <div className="container">
                <header className="header">
                    <div className="brand">
                        <div className="brand-badge" />
                        <div>
                            <div className="brand-title">Morrison Apps</div>
                            <div className="mono" style={{opacity:.8,fontSize:12}}>simple trees // advanced vibes</div>
                        </div>
                    </div>
                    <nav className="nav mono">
                        <NavLink to="/enter-numbers" className={({isActive})=> isActive?'active':''}>/enter</NavLink>
                        <NavLink to="/previous" className={({isActive})=> isActive?'active':''}>/previous</NavLink>
                    </nav>
                </header>

                <Routes>
                    <Route path="/" element={<Navigate to="/enter-numbers" replace />} />
                    <Route path="/enter-numbers" element={<EnterNumbers />} />
                    <Route path="/previous" element={<Previous />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}
