// page to send the numbers to API


import { useState } from 'react';


export default function EnterNumbers() {
    const [numbers, setNumbers] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState('');

    const api = import.meta.env.VITE_API_BASE || 'http://localhost:8080';

    async function onSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setErr('');
        setResult(null);
        try {
            const res = await fetch(`${api}/process-numbers`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ numbers })
            });
            const data = await res.json();
            setResult(data);
        } catch (_) {
            setErr('request failed');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h1>Enter Numbers</h1>
            <form onSubmit={onSubmit} style={{ display: 'grid', gap: '0.5rem', maxWidth: '28rem' }}>
                <label>numbers (comma or space)</label>
                <input
                    value={numbers}
                    onChange={(e) => setNumbers(e.target.value)}
                    placeholder="7,3,9,1,5"
                />
                <button type="submit" disabled={loading}>submit</button>
            </form>

            {err && <p>{err}</p>}

            {result && (
                <div style={{ marginTop: '1rem' }}>
                    <h2>Result</h2>
                    <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}
