// page to show the records that we saved

import { useEffect, useState } from 'react';

function fmt(ts) {
    if (!ts) return '';
    const d = new Date(ts); 
    const pad = (n) => String(n).padStart(2, '0');
    const y = d.getFullYear();
    const m = pad(d.getMonth() + 1);
    const day = pad(d.getDate());
    const hh = pad(d.getHours());
    const mm = pad(d.getMinutes());
    return `${y}-${m}-${day} ${hh}:${mm}`;
}

export default function Previous() {
    const [items, setItems] = useState([]);
    const [err, setErr] = useState('');
    const api = import.meta.env.VITE_API_BASE || 'http://localhost:8080';

    useEffect(() => {
        async function load(){
            try{
                const res = await fetch(`${api}/previous-trees`);
                const data = await res.json();
                setItems(Array.isArray(data) ? data : []);
            }catch(_){ setErr('request failed'); }
        }
        load();
    }, [api]);

    return (
        <div style={{display:'grid', gap:16}}>
            <h1 className="h1">Previous Trees</h1>
            {err && <div className="mono" style={{color:'#ffb199'}}>error: {err}</div>}

            <div style={{display:'grid', gap:14}}>
                {items.map(x => (
                    <div key={x.id} className="card" style={{display:'grid', gap:8}}>
                        <div>
                            <span className="label mono">input</span>
                            <div className="mono">{x.numbersInput}</div>
                        </div>
                        <div className="label mono">created</div>
                        <div className="mono">{fmt(x.createdAt)}</div>
                        <details>
                            <summary className="mono">tree json</summary>
                            <pre className="mono" style={{marginTop:8}}>{x.treeJson}</pre>
                        </details>
                    </div>
                ))}
            </div>
        </div>
    );
}

