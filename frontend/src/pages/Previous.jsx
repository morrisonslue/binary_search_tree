// page to show the records that we saved


import { useEffect, useState } from 'react';


export default function Previous() {
    const [items, setItems] = useState([]);
    const [err, setErr] = useState('');
    const api = import.meta.env.VITE_API_BASE || 'http://localhost:8080';

    useEffect(() => {
        async function load() {
            try {
                const res = await fetch(`${api}/previous-trees`);
                const data = await res.json();
                setItems(Array.isArray(data) ? data : []);
            } catch (_) {
                setErr('request failed');
            }
        }
        load();
    }, [api]);

    return (
        <div>
            <h1>Previous Trees</h1>
            {err && <p>{err}</p>}

            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1rem' }}>
                {items.map((x) => (
                    <li key={x.id} style={{ border: '1px solid #ddd', padding: '0.75rem' }}>
                        <div><b>input:</b> {x.numbersInput}</div>
                        <div><b>created:</b> {x.createdAt}</div>
                        <details style={{ marginTop: '0.5rem' }}>
                            <summary>tree json</summary>
                            <pre style={{ whiteSpace: 'pre-wrap' }}>{x.treeJson}</pre>
                        </details>
                    </li>
                ))}
            </ul>
        </div>
    );
}
