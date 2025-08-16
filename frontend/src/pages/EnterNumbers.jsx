// page to send the numbers to API

import { useState } from 'react';

export default function EnterNumbers() {
    const [numbers, setNumbers] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState('');
    const api = import.meta.env.VITE_API_BASE || 'http://localhost:8080';

    async function onSubmit(e){
        e.preventDefault();
        setLoading(true); setErr(''); setResult(null);
        try{
            const res = await fetch(`${api}/process-numbers`, {
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({ numbers })
            });
            const data = await res.json();
            setResult(data);
        }catch(_){ setErr('request failed'); }
        finally{ setLoading(false); }
    }

    return (
        <div style={{display:'grid', gap:16}}>
            <h1 className="h1">Enter Numbers</h1>
            <div className="card" style={{display:'grid', gap:12, maxWidth:560}}>
                <label className="label mono">numbers (sep by comma or space)</label>
                <input className="input" value={numbers} onChange={e=>setNumbers(e.target.value)} placeholder="7,3,9,1,5" />
                <button className="btn mono" disabled={loading} onClick={onSubmit}>{loading?'working…':'submit'}</button>
                {err && <div className="mono" style={{color:'#ffb199'}}>error: {err}</div>}
            </div>

            {result && (
                <div className="card" style={{display:'grid', gap:10}}>
                    <h2 className="h2">Result</h2>
                    <div className="label mono">record</div>
                    <pre className="mono">{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}
