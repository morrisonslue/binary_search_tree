// indented text tree

export default function TreeView({ root }) {
    if (!root) return <div className="mono label">empty</div>;

    function draw(n, depth, lines) {
        if (!n) return;
        lines.push(`${'  '.repeat(depth)}${n.value}`);
        draw(n.left, depth + 1, lines);
        draw(n.right, depth + 1, lines);
    }

    const lines = [];
    draw(root, 0, lines);
    return <pre className="mono">{lines.join('\n')}</pre>;
}
