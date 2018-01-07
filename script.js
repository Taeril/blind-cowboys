D = document;
q = 65536;
S = v => new TextDecoder('utf-8').decode(v);
Z = n => m.buffer.slice(q, n+q);

fetch('index.html').then(r =>
	r.arrayBuffer()
).then(b =>
	WebAssembly.instantiate(b.slice(+D.title), {})
).then(r => {
	e = r.instance.exports;
	m=e.memory;
		
	eval(S(Z(e.s())))
});

