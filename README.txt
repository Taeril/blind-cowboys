
Blind Cowboys is entry to Gynvael's Winter GameDev Challenge 2017
http://gynvael.coldwind.pl/?id=668

Resources

WebAssembly uses tinflate library by Joergen Ibsen
https://bitbucket.org/jibsen/tinf

Game uses Nandaka Western font by Goma Shin
https://www.dafont.com/nandaka-western.font

Ugliness of images is due to my lack of skill with Inkscape :)


Synthetising kick, snare and hi-hat sounds is based on:
https://sonoport.github.io/synthesising-sounds-webaudio.html
https://codepen.io/aqilahmisuary/pen/BjdxEE

How to make shoot sound I got from:
http://webaudioapi.com/samples/procedural/
http://webaudio.prototyping.bbc.co.uk/gunfire/


How to play

There are two players. As game grew around idea of WebRTC we can call
them client and server. But WebRTC stuff - based on example from
https://github.com/owebio/serverless-webrtc-chat - turned out not to
work offline. Therefore I made version using window.open where one
window act like message broker and gameplay take place in windows
spawn by it.
Due to it's origin some things may look a little out of place.

At start client waits for server who have few settings tweak:
1. Size of field - game take place on square of specified size
2. Number of cowboys - how many characters each player control
3. Number of obstacles on field
4. Required number of times each player have to shoot per round

Each round have three phases:
1. Move - each cowboy can take one step to up, down, left or right
2. Fire - then cowboys can or must fire their guns
3. View - after both players end their turn they see/hear number of
          all moves in round followed by flashes and bangs for each
		  shoot in round.
		  If cowboys stepped on same place they are startled and 
		  unconditionally shoot eliminating both of them.

Game ends when one side eliminated all opponents.


btw. do you know Konami Code?

