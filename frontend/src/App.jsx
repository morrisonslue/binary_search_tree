import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import EnterNumbers from './pages/EnterNumbers.jsx';
import Previous from './pages/Previous.jsx';

export default function App() {
    return (
        <BrowserRouter>
            <div style={{ padding: '1rem' }}>
                <nav style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    <Link to="/enter-numbers">Enter Numbers</Link>
                    <Link to="/previous">Previous Trees</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<Navigate to="/enter-numbers" replace />} />
                    <Route path="/enter-numbers" element={<EnterNumbers />} />
                    <Route path="/previous" element={<Previous />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}
