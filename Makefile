# http://gynvael.coldwind.pl/?id=668

.PHONY: all clean dist

# prevent "Removing intermediate files..."
.SECONDARY:

all: index.html
	@perl -E '$$s = 20480 - -s "index.html"; say $$s < 0 ? "\e[31mERROR: too large by $$s bytes\e[0m": "\e[32mOK: left $$s bytes\e[0m"'

index.html: script.js.min w.wasm
	@echo "\e[33m » $@\e[0m"
	perl -e 'print "<!DOCTYPE html><title>".(54 + -s "script.js.min")."</title><script>"' > index.html
	cat script.js.min >> index.html
	perl -e 'print "</script><!--"' >> index.html
	cat w.wasm >> index.html

# "safe" version
#perl -MJavaScript::Minifier::XS=minify -E '$$/=undef; print minify <>' $< > $@
# "aggressive" version stripping all new lines (minify sometimes leaves them)
#perl -MJavaScript::Minifier::XS=minify -E '$$/=undef; $$_=minify <>; s/\n//g; print' $< > $@
%.js.min: %.js
	@echo "\e[33m » $@\e[0m"
	perl -MJavaScript::Minifier::XS=minify -E '$$/=undef; $$_=minify <>; s/\n//g; print' $< > $@

# "safe" version
#perl -MCSS::Minifier::XS=minify -E '$$/=undef; print minify <>' $< > $@
# "aggressive" version - try to delete empty declarations 
#perl -MCSS::Minifier::XS=minify -E '$$/=undef; $$_=minify <>; s/}[^{]+{}/}/g; print' $< > $@
%.css.min: %.css
	@echo "\e[33m » $@\e[0m"
	perl -MCSS::Minifier::XS=minify -E '$$/=undef; print minify <>' $< > $@

%.svg.min: %.svg
	@echo "\e[33m » $@\e[0m"
	svgo --quiet --multipass -o $@ $<

%.woff2: %.ttf
	@echo "\e[33m » $@\e[0m"
	woff2_compress $<

%.woff2.min: %.woff2
	@echo "\e[33m » $@\e[0m"
	cp $< $@

%.min.deflate: %.min
	@echo "\e[33m » $@\e[0m"
	zopfli --deflate --i2048 $<

%.h: %.deflate
	@echo "\e[33m » $@\e[0m"
	xxd -i $< | sed 's/unsigned/static const unsigned/' > $@
	perl -e '$$n="$@";$$n=~s/\.h//;$$s=-s $$n;$$n=~s/\./_/g;print "static const unsigned int $${n}_len = $$s;"' >> $@

%.wasm: %.c
	@echo "\e[33m » $@\e[0m"
	@test -n "$(EMSDK)" || (echo "\e[31mNeed emdsk!\e[0m"; false)
	clang -Os -emit-llvm --target=wasm32 -S $<
	llc $(basename $@).ll -march=wasm32 -filetype=asm
	s2wasm -s 65536 -i 16777216 $(basename $@).s > $(basename $@).wast
	wasm-as -o $(basename $@)-as.wasm $(basename $@).wast
	wasm-gc $(basename $@)-as.wasm $@

w.wasm: w.c tinflate.c
w.wasm: style.css.min.h game.js.min.h
w.wasm: bang.svg.min.h cactus.svg.min.h cowboy.svg.min.h gun.svg.min.h foots.svg.min.h
w.wasm: nandaka_western.woff2.min.h

clean:
	rm -f index.html *.min *.min.h *.deflate *.wasm *.wast *.s *.ll *.woff2

dist: index.html README.txt Makefile w.c tinflate.c script.js game.js style.css nandaka_western.ttf bang.svg  cactus.svg  cowboy.svg  foots.svg  gun.svg
	tar -Jcf GWGC2017.tar.xz $^

# TOOLS:
#
# perl with modules: 
#    JavaScript::Minifier::XS
#    CSS::Minifier::XS
#
# svgo - npm
#
# zopfli
#
# xxd - part of vim
#
# clang, llc, s2wasm, wasm-as - from emsdk (Emscripten)
#
# wasm-gc - rust: cargo install wasm-gc
#
# woff2_compress - https://github.com/google/woff2
#
# echo, cat, rm, test, tar - shell utilities
#
