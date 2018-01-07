$ = n => D.querySelector(n);
$$ = n => D.querySelectorAll(n);
E = n => D.createElement(n);
V = n => D.createTextNode(n);
A = (p, n) => p.appendChild(n);
B = v => URL.createObjectURL(new Blob([v], {type: 'image/svg+xml'}));

K = (n,v) => n.classList.add(v);
J = (n,v) => n.classList.remove(v);
W = n => n.className = '';

N = (n,a,c,i) => { for(i in a)n[i]=a[i]; K(n,c); return n };
I = (s,v) => N(E('img'),{src:s,width:v,height:v});
L = console.log;

C = n => n.innerHTML = '';

O = v => JSON.parse(v);
P = v => JSON.stringify(v);

L(new Date);

b = B(Z(e.b()));
c = B(Z(e.c()));
k = B(Z(e.p()));
g = B(Z(e.g()));
f = B(Z(e.f()));
t = B(Z(e.t()));

A(l=E('style'), V(S(Z(e.k())))).type = 'text/css';
A(D.head, l);

// font from https://www.dafont.com/nandaka-western.font

X = (n,u) => '.'+n+'{background:url('+u+')}';
A(l=E('style'), V('@font-face{font-family:F;src:url('+t+')}.F{font-family:F}'+X('p',k)+X('b',b)+X('f',f)+X('g',g)+X('c',c))).type = 'text/css';
A(D.head, l);

// chromium can't handle svg favicon :(
//A(D.head, N(E('link'),{rel:'icon',href:g}));
// draw it on canvas instead
X=N(E('img'),{src:g,onload:_=>{
	r=N(E('canvas'),{height:64,width:64});
	r.getContext('2d').drawImage(X, 0, 0, 64, 64);
	A(D.head, N(E('link'),{rel:'icon',href:r.toDataURL()}));
}});



G = {};


F = (x,y) => G.f[G.s * y + x];
Q = (x,y,v) => G.f[G.s * y + x] = v;


RR = i => G.G || !G.f[i] || G.f[i] == 3 - U;


RM = (i,n,s) =>
	(n<-1  && i>=s) || // N
	(n>1   && i<s*s-s) || // S
	(n==-1 && i%s!=0) || // W
	(n==1  && (i+1)%s!=0); // E
RS = (i,n) => {
	while(RM(i,n,G.s)) {
		i += n;
		if(G.F[i] > 1) {
			G.k[i] = 0;
			return;
		}
	}
};

// use function instead arrow to have this pointing to image
Of = (i,n) => function(e) {
	G.M.push([i, i+n]);
	G.f[i] = 0;
	G.f[i+n] = 4;
	R();
	e.preventDefault();
};
Og = (i,n) => function(e) {
	G.W += 1;
	TA();
	G.S.push([i, n]);
	G.f[i] = 4;
	R();
	e.preventDefault();
};

R = (v,n,i,j,s) => {
	n = $$('.m > div');
	for(i=0; i<n.length; ++i) {
		v = n[i];
		C(v);
		A(v, N(E('div'),{},'b'));

		W(v);
		j=G.f[i];
		K(v, j==1 ? 'c' : j==2+U || j==4 ? 'p' : 'e');

		if(G.A) return; // if waiting
		if(G.f[i] == 2 + U) {
			s=G.s;
			ii = G.G ? g : f;
			OO = G.G ? Og : Of;
			if(i>=s && RR(i-s))
				A(v, N(I(ii,32),{onclick:OO(i, -s)},'N'));
			if(i<s*s-s && RR(i+s))
				A(v, N(I(ii,32),{onclick:OO(i, s)},'S'));
			if(i%s!=0 && RR(i-1))
				A(v, N(I(ii,32),{onclick:OO(i, -1)},'W'));
			if((i+1)%s!=0 && RR(i+1))
				A(v, N(I(ii,32),{onclick:OO(i, +1)},'E'));
		}
	}
};

Y = n => ~~(Math.random() * n);

TC = _ => G.W < G.w;
TA = _ => {
	aa.textContent = TC() ? 'Shoot... ('+(G.w-G.W)+')' : 'End Turn';
};

$M = v => {
	d.send(P(v));
	M(v);
};

M = v => {
	//L(v);

	// chat message
	if(v.t == 0) {
		A(m, V((v.u==U?'me':'they')+': '+v.m+'\n'));
	}
	// init
	if(v.t == 1) {
		s.s = v.s;
		s.k = v.k;
		s.c = v.c;
		s.w = v.w;

		// 0 - empty | 1 - cactus | 2 - client | 3 - server | 4 - tmp
		G.f = [];
		G.w = v.w;
		
		G.G = 0;

		l = G.s = v.s;
		for(i=0; i<l*l; ++i) {
			A(n, N(E('div'),{},'e'));
			//A(n, N(E('div'),{title:i},'e')); // TEST
			G.f[i] = 0;
		}
		with(n.style)width=height=(l*64+66)+'px';
		R();
	
		if(U) {
			// randomize positions of players and obstacles
			for(i=0; i<v.k; ++i){
				while(G.f[j=Y(l*l)]);
				G.f[j] = 3;
			}
			for(i=0; i<v.k; ++i){
				while(G.f[j=Y(l*l)]);
				G.f[j] = 2;
			}
			for(i=0; i<v.c; ++i){
				while(G.f[j=Y(l*l)]);
				G.f[j] = 1;
			}

			G.F = G.f.slice();

			$M({t:2,f:G.F,b:[]});
		}
	}
	// set
	if(v.t == 2) {
		G.f=v.f.slice();

		G.M = [];
		G.S = [];
		G.A = G.a = G.G = 0;

		G.N = [[], []];
		G.T = [[], []];

		R();

		C(o);


		l = G.f.filter(i=>i==2+U).length;
		if(G.w > l)G.w = l;

		e0 = G.f.indexOf(2)<0;
		e1 = G.f.indexOf(3)<0;;
		eu = G.f.indexOf(2+U)<0;;
		if(e0 || e1) {
			em = e0 && e1 ? 'No Winner' :
				eu  ? 'You Lost' :
				'You Won!';
			A(l=E('p'), V(em));
			K(l,'F');
			A(o, l);
			l.onclick=e=>ST();
			G.A=1;
			R();
			return;
		}


		A(l=E('p'), V('End Move'));
		K(l,'F');
		A(o, l);

		l.onclick = e => {
			// reset tmp to c/s
			for(a in G.M) {
				G.f[G.M[a][1]] = 2 + U;
			}
			G.G = 1;
			G.W = 0;

			$M({t:3,u:U,m:G.M});

			C(o);
			A(aa=E('p'), V('End Turn'));
			K(aa,'F');
			A(o, aa);
			TA();

			aa.onclick = e => {
				if(TC()) {
					return;
				}
				C(o);
				A(a=E('p'), V('Wait...'));
				K(a,'F');
				A(o, a);
				G.G = 0;
				G.A = 1;
				R();
				$M({t:4,u:U,s:G.S});
			};

			R();
		};
	}
	// move
	if(v.t == 3) {
		G.N[v.u].push(v.m);
	}
	// fire
	if(v.t == 4) {
		G.T[v.u].push(v.s);
		++G.a;
		if(G.a>1 && U) {
			j = [];

			// move first player
			l=G.N[0][0];
			for(a in l) {
				G.F[l[a][0]] = 0;
				G.F[l[a][1]] = 2;
				j.push(-1); // move
			}

			// move second player - check for collisions
			l=G.N[1][0];
			for(a in l) j.push(-1); // move
			for(a in l) {
				//L(a, l[a]);
				G.F[l[a][0]] = 0;
				i = l[a][1];
				if(G.F[i] == 2) {
					G.F[i] = 0;
					j.push(i); // Fire here
				} else {
					G.F[i] = 3;
				}
			}

			G.k = G.F.slice();

			// fire weapons
			l=G.T[0][0].concat(G.T[1][0]);
			for(a in l) {
				i = l[a];
				if(G.F[i[0]]) {
					j.push(i[0]);
					RS(i[0], i[1]);
				}
			}


			// dispatch move/fire events
			G.F = G.k.slice();
			G.t = _ => {
				if(j.length) {
					$M({t:5,b:j.shift()});
					setTimeout(G.t, 1000);
				} else {
					$M({t:2,f:G.k,b:j});
				}
			};
			setTimeout(G.t, 1000);
		}
	}
	// move/fire
	if(v.t == 5) {
		nn = $$('.m > div');
		if(v.b < 0) {
			J(n,'F');
			void n.offsetWidth;
			K(n,'F');
			kick3();
		} else {
			K(nn[v.b], 'B');
			shoot();
		}
	}
};

H= (i,a) =>{
	A(h, a=E('input'));
	A(i=E('p'), V('chat'));
	K(i,'F');
	A(h, i);

	a.onkeypress=e=>{
		if(e.keyCode==13)i.click()
	};
	i.onclick=e=>{
		$M({t:0,m:a.value,u:U});
		a.value='';
	};
};

s = localStorage;

//ZZ = 0; // for RTCPeerConnection version
ST = _ => {
	C(D.body);

	A(D.body, kc=E('div'));

	A(ho=E('h1'), V(D.title = 'Blind Cowboys'));
	K(ho, 'F');
	A(D.body, ho);

	KC = {}; // do you know Konami Code?
	KC.s=KC.t=KC.k=[]._;
	with(KC)
	D.addEventListener('keydown', e => {
		s = (s||'')+e.keyCode;
		if(e.target!=D.body)return;
		//L(s);
		if(k) {
			if(e.keyCode == 65)kick();
			if(e.keyCode == 83)snare();
			if(e.keyCode == 68)hihat();
			if(e.keyCode == 70)shoot();
		}
		if(s == '38384040373937396665') {
			L('Yay!');
			s = '';
			k = !k;

			C(kc);
			if(k) {
				A(l=E('span'), V('kick (=A=)'));
				A(kc, l);
				K(l, 'F');
				l.onclick=e=>kick();

				A(l=E('span'), V('snare (=S=)'));
				A(kc, l);
				K(l, 'F');
				l.onclick=e=>snare();

				A(l=E('span'), V('hi-hat (=D=)'));
				A(kc, l);
				K(l, 'F');
				l.onclick=e=>hihat();

				A(l=E('span'), V('shoot (=F=)'));
				A(kc, l);
				K(l, 'F');
				l.onclick=e=>shoot();
			}
		}
		t && clearTimeout(t);
		t = setTimeout(_ => s = '', 500);
	});

	A(D.body, n=E('div')); // n | .m - main game area
	K(n, 'm');

	A(D.body, l=E('div')); // .n - settings
	K(l, 'n');


	A(l, o=E('div')); // o | next move/turn button

	A(l, h=E('div')); // h | settings
	A(l, m=E('pre')); // m | chat messages


////////////////////////////////////////////////////////////////////////////////

	/* // RTCPeerConnection version

	// WebRTC based on
	// https://github.com/owebio/serverless-webrtc-chat

	//p = new RTCPeerConnection(null);

	// TURN
	// apt-get install turnserver
	//p = new RTCPeerConnection({ iceServers: [{ urls: 'turn:127.0.0.1', username: 'webrtc', credential: 'turnpassword' }] });
	//p = new RTCPeerConnection({ iceServers: [{ urls: 'turn:127.0.0.1', username: 'U', credential: 'P' }] });

	// STUN
	// https://github.com/jselbie/stunserver
	// ./stunserver --mode basic --primaryinterface 127.0.0.1
	//p = new RTCPeerConnection({ iceServers: [{ urls: 'stun:127.0.0.1'}] });


	// {"urls":"stun:127.0.0.1"}
	// #eyJ1cmxzIjoic3R1bjoxMjcuMC4wLjEifQ==
	US = _ => {
		C(h);
		//H();
		A(h, N(E('span'),{title:'size of plaing field (square NxN)'},'i'));
		A(h, z=N(E('input'),{value:s.s||8}));
		A(h, E('br'));
		A(h, N(E('img'),{src:k,title:'number of cowboys on each side'},'i'));
		A(h, x=N(E('input'),{value:s.k||3}));
		A(h, E('br'));
		A(h, N(E('img'),{src:c,title:'number of obstacles on field'},'i'));
		A(h, y=N(E('input'),{value:s.c||4}));
		A(h, E('br'));
		A(h, N(E('img'),{src:g,title:'require to shoot N times per round'},'i'));
		A(h, w=N(E('input'),{value:s.w||1}));
		A(h, E('br'));
		A(j=E('p'), V('OK'));
		K(j, 'F');
		A(h, j);

		A(h, E('br'));
		H();

		j.onclick=e=>{
			$M({t:1,s:+z.value,k:+x.value,c:+y.value,w:+w.value});
			C(h);
			H();
		};

	};
	if(ZZ) {
		if(U) {
			US();
		} else {
			C(h);
			H();
		}
		return;
	}

	l = location.hash;
	p = new RTCPeerConnection(l&&l[1] ? { iceServers: [O(atob(l.substr(1)))] } : null);
	ZZ = 1;


	A(l=E('p'), V('Start'));
	K(l, 'F');
	A(h, l);
	l.onclick=e=>{
		U=1;
		C(h);
		A(h, x=E('textarea'));
		A(i=E('p'), V('OK'));
		K(i, 'F');
		A(h, i);
		A(j=E('p'), V('export'));
		K(j, 'F');
		A(h, j);

		j.onclick=e=>s.a = x.value;

		//p = new RTCPeerConnection(null);
		p.oniceconnectionstatechange = e => {
			L('status',p.iceConnectionState);
			if(p.iceConnectionState == 'connected') {
				US();
			};
		};
		p.onicecandidate = e => {
			if(e.candidate) return;
			x.value = P(p.localDescription);
		};

		d = p.createDataChannel('D');
		p.createOffer().then(e=>p.setLocalDescription(e));
		d.onmessage = e => M(O(e.data||{}));

		i.onclick=e=>{
			C(h);
			A(h, x=E('textarea'));
			A(i=E('p'), V('OK'));
			K(i, 'F');
			A(h, i);
			A(j=E('p'), V('import'));
			K(j, 'F');
			A(h, j);
			
			j.onclick=e=>x.value = s.j;

			i.onclick=e=>p.setRemoteDescription(new RTCSessionDescription(O(x.value)));
		};
	};

	A(l=E('p'), V('Join'));
	K(l, 'F');
	A(h, l);
	l.onclick=e=>{
		U=0;
		C(h);
		A(h, x=E('textarea'));
		A(j=E('p'), V('import'));
		K(j, 'F');
		A(h, j);
		A(h, E('br'));
		A(i=E('p'), V('Make'));
		K(i, 'F');
		A(h, i);

		j.onclick=e=>x.value = s.a;

		i.onclick = e => {
			p.setRemoteDescription(new RTCSessionDescription(O(x.value)));
			p.createAnswer(a=>p.setLocalDescription(a),_=>L('E'),{optional:[{RtpDataChannels:true}]});
		};

		A(h, E('br'));
		A(h, y=E('textarea'));
		A(j=E('p'), V('export'));
		A(h, N(j,{},'F'));
		A(i=E('p'), V('OK'));

		j.onclick=e=>s.j = y.value;

		//p = new RTCPeerConnection(null);
		p.ondatachannel  = e => {
			d=e.channel;
			d.onmessage = e => M(O(e.data||{}));
		};
		p.onicecandidate = e => {
			if(e.candidate) return;
			y.value = P(p.localDescription);
		};

		p.oniceconnectionstatechange = e => {
			L('status',p.iceConnectionState);
			if(p.iceConnectionState == 'connected') {
				C(h);
				H();
			};
		};

	};

	// */

////////////////////////////////////////////////////////////////////////////////

	//* // windows version

	l = location.hash;
	if(l) {
		// window
		d = {};
		
		if(l=='#s') {
			U=1;
			d.send = v => opener.M1(v);

			C(h);
			A(h, N(E('span'),{},'i'));
			A(h, z=N(E('input'),{value:s.s||8}));
			A(h, E('br'));
			A(h, N(E('img'),{src:k},'i'));
			A(h, x=N(E('input'),{value:s.k||3}));
			A(h, E('br'));
			A(h, N(E('img'),{src:c},'i'));
			A(h, y=N(E('input'),{value:s.c||4}));
			A(h, E('br'));
			A(h, N(E('img'),{src:g},'i'));
			A(h, w=N(E('input'),{value:s.w||1}));
			A(h, E('br'));
			A(j=E('p'), V('OK'));
			K(j, 'F');
			A(h, j);

			A(h, E('br'));
			H();

			j.onclick=e=>{
				$M({t:1,s:+z.value,k:+x.value,c:+y.value,w:+w.value});
				C(h);
				H();
			};
		} else {
			U=0;
			d.send = v => opener.M0(v);

			C(h);
			H();
		}
	} else {
		// dispatcher

		M0 = v => ws.M(O(v));
		M1 = v => wc.M(O(v));
		
		A(l=E('p'), V('Start'));
		K(l, 'F');
		A(h, l);
		l.onclick=e=>{
			ws = open('index.html#s');
		};

		A(l=E('p'), V('Join'));
		K(l, 'F');
		A(h, l);
		l.onclick=e=>{
			wc = open('index.html#c');
		};
	}
	// */
};
ST();


// Audio

// kick, snare, hihat based on
// https://sonoport.github.io/synthesising-sounds-webaudio.html
// https://codepen.io/aqilahmisuary/pen/BjdxEE

// shoot based on
// http://webaudioapi.com/samples/procedural/
// http://webaudio.prototyping.bbc.co.uk/gunfire/


AC = new AudioContext;

AT = _ => AC.currentTime;
Ac = (a, b) => a.connect(b);
AD = _ => AC.destination;
AG = _ => AC.createGain();
AO = _ => AC.createOscillator();
AE = (n,a,b) => n.exponentialRampToValueAtTime(a, b);

shoot = (r,l,b,d,n, f, e,t,m, g) => {
	with(AC)r=sampleRate,l=5*r,b=createBuffer(1,l,r),d=b.getChannelData(0);

	while(--l) {
		d[l] = ((Math.random() * 2) - 1);
	}

	n = AC.createBufferSource();
	with(n)start(loop=!!(buffer=b));

	f = AC.createBiquadFilter();
	f.Q.value = 1;
	f.frequency.value = 800;

	e = AG();
	e.gain.value = 0;

	t=AT();
	m='linearRampToValueAtTime';
	with(e)
		gain[m](0,t),
		gain[m](1,t+0.001),
		gain[m](0.3,t+0.101),
		gain[m](0,t+0.5);


	Ac(n,e);
	Ac(e,f);

	g = AG();
	g.gain.value = 5;
	Ac(f,g);

	Ac(g,AD());
};

kick = (o,O,g,G,z) => {
    o = AO();
    O = AO();
    g = AG();
    G = AG();

    o.type = "triangle";
    O.type = "sine";

    g.gain.setValueAtTime(1, AT());
    AE(g.gain, 0.001, AT() + 0.5);

    G.gain.setValueAtTime(1, AT());
    AE(G.gain, 0.001, AT() + 0.5);

    o.frequency.setValueAtTime(120, AT());
    AE(o.frequency, 0.001, AT() + 0.5);

    O.frequency.setValueAtTime(50, AT());
    AE(O.frequency, 0.001, AT() + 0.5);

	z = AG();
	z.gain.value = 1;

    Ac(o,g);
    Ac(O,G);
    Ac(G,z);
    Ac(g,z);
    Ac(g,AD());
    Ac(G,AD());


    o.start(AT());
    O.start(AT());

    o.stop(AT() + 0.5);
    O.stop(AT() + 0.5);

};

snare = (o,g,f,z,n,b,d,F) => {
    o = AO();
    g = AG();
	f = AG();
	z = AG();
    z.gain.value = 0;
    f.gain.setValueAtTime(1, AT());
    AE(f.gain, 0.01, AT() + 0.2);

    o.type = "triangle";
    o.frequency.value = 100;
    g.gain.value = 0;

    g.gain.setValueAtTime(0, AT());
    AE(g.gain, 0.01, AT() + 0.1);

    Ac(o,g);
    Ac(g,z);

    z.gain.value = 1;

    o.start(AT());
    o.stop(AT() + 0.2);

    n = AC.createBufferSource();
    b = AC.createBuffer(1, 4096, AC.sampleRate);
    d = b.getChannelData(0);

    F = AC.createBiquadFilter();
    F.type = "highpass";
    F.frequency.setValueAtTime(100, AT());
    F.frequency.linearRampToValueAtTime(1000, AT() + 0.2);


    for (var i = 0; i < 4096; i++) {
        d[i] = Math.random();
    }
    n.buffer = b;
    n.loop = true;
    Ac(n,F);
    Ac(F,f);
    Ac(f,z);
    n.start(AT());
    n.stop(AT() + 0.2);

	Ac(z,AD());
};

hihat = (g,z,R,o,b,h) => {
	z = AG();
    z.gain.value = 1;

    g = AG();
    R = [2, 3, 4.16, 5.43, 6.79, 8.21];

    b = AC.createBiquadFilter();
    b.type = "bandpass";
    b.frequency.value = 10000;

    h = AC.createBiquadFilter();
    h.type = "highpass";
    h.frequency.value = 7000;

	R.forEach(r => {
        o = AO();
        o.type = "square";
        o.frequency.value = 40 * r;
        Ac(o,b);

        o.start(AT());
        o.stop(AT() + 0.05);
        
    });

    g.gain.setValueAtTime(1, AT());
    AE(g.gain, 0.01, AT() + 0.05);
    
    Ac(b,h);
    Ac(h,g);
    Ac(g,z);
    
	Ac(z,AD());
};

var kick3 = _ => {
	setTimeout(kick, 0);
	setTimeout(kick, 160);
	setTimeout(kick, 320);
};

