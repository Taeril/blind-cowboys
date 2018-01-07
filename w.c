
typedef unsigned char u8;
typedef unsigned short u16;
typedef unsigned int u32;

#include "game.js.min.h"
#include "style.css.min.h"
#include "nandaka_western.woff2.min.h"

#include "bang.svg.min.h"
#include "cactus.svg.min.h"
#include "cowboy.svg.min.h"
#include "gun.svg.min.h"
#include "foots.svg.min.h"

void* memset(void *s, int c, u32 n) {
	u8* p = s;
	for(u32 i=0; i < n; ++i) {
		p[i] = c;
	}
	return s;
}

#include "tinflate.c"

#define PROVIDE(F, N) u32 F() {\
	u(N ## _min_deflate, N ## _min_len);\
	return N ## _min_len;\
}

PROVIDE(s, game_js);
PROVIDE(k, style_css);
PROVIDE(t, nandaka_western_woff2);

PROVIDE(b, bang_svg);
PROVIDE(c, cactus_svg);
PROVIDE(p, cowboy_svg);
PROVIDE(g, gun_svg);
PROVIDE(f, foots_svg);

