// Puppet-drawn dino-costume kids. Origin = feet centre on ground, facing right (+x). Height ~ 510.
(function(){
const OL='#2a1712';
const SPECIES={
 mosa:{main:'#2f8fa8',dark:'#1d5a72',light:'#6cc6d8',belly:'#d9efe6',claw:'#f3e7c8',eye:'#ffe066',snout:178,jawH:20,teeth:16,tail:'fluke',back:'fin',hood:'mosa',scales:true},
 trex:{main:'#4f9a3c',dark:'#2f6626',light:'#86c95e',belly:'#d8e3a0',claw:'#f6ecd0',eye:'#ffc21a',snout:150,jawH:26,teeth:9,tail:'rex',back:'none',hood:'rex',scales:true},
 anky:{main:'#b58a4a',dark:'#7a5a2c',light:'#d9b678',belly:'#efdcb0',claw:'#f6ecd0',eye:'#ffb000',snout:112,jawH:28,teeth:0,tail:'club',back:'armor',hood:'anky',scales:false},
 drex:{main:'#5b5470',dark:'#332d44',light:'#8a82a3',belly:'#b9b3c9',claw:'#f2ead8',eye:'#ff3b2a',snout:148,jawH:28,teeth:10,tail:'rex',back:'spikes',hood:'drex',scales:true}
};
const SKIN='#f8bf86',SKIN_D='#e3955a',HAIR='#1d1414';
function grad(c,x0,y0,x1,y1,a,b){const g=c.createLinearGradient(x0,y0,x1,y1);g.addColorStop(0,a);g.addColorStop(1,b);return g}
function fillStroke(c,fill,lw=5){c.fillStyle=fill;c.fill();c.lineWidth=lw;c.strokeStyle=OL;c.lineJoin='round';c.lineCap='round';c.stroke()}
function scales(c,s,x0,y0,x1,y1){if(!s.scales)return;c.save();c.clip();c.strokeStyle=s.dark;c.globalAlpha=.35;c.lineWidth=2;
 for(let y=y0;y<y1;y+=17)for(let x=x0+((y/17)%2?9:0);x<x1;x+=18){c.beginPath();c.arc(x,y,8,0.2,Math.PI-0.2);c.stroke()}c.restore()}
function claws(c,s,x,y,dir,n=3,len=14){for(let i=0;i<n;i++){const ox=x+(i-1)*13;c.beginPath();c.moveTo(ox-5,y);c.quadraticCurveTo(ox+dir*4,y+len*.7,ox+dir*8,y+len);c.quadraticCurveTo(ox+4,y+len*.4,ox+5,y);c.closePath();fillStroke(c,s.claw,2.5)}}

function cap(c,len,w0,w1){c.beginPath();c.moveTo(-w0,0);c.bezierCurveTo(-w0-4,len*.4,-w1-3,len*.8,-w1,len);c.arc(0,len,w1,Math.PI,0,true);c.bezierCurveTo(w1+3,len*.8,w0+4,len*.4,w0,0);c.arc(0,0,w0,0,Math.PI,true);c.closePath()}
function leg(c,s,th,sh,back){const R=Math.PI/180,m=back?s.dark:s.main,lt=back?s.dark:s.light;
 c.save();c.rotate(th*R);
 c.save();c.translate(0,72);c.rotate(sh*R);
  cap(c,62,42,38);fillStroke(c,grad(c,-40,0,40,0,lt,m));
  c.save();c.translate(0,70);c.rotate(-(th+sh)*R);
  c.beginPath();c.moveTo(-44,-14);c.bezierCurveTo(-52,14,-36,26,-6,26);c.lineTo(58,26);c.bezierCurveTo(76,26,78,4,56,-6);c.bezierCurveTo(36,-18,10,-22,-44,-14);c.closePath();
  fillStroke(c,grad(c,0,-16,0,26,m,s.dark));c.save();c.translate(58,22);c.rotate(-1.45);claws(c,s,0,0,1,3,16);c.restore();
  c.restore();
 c.restore();
 cap(c,72,48,42);fillStroke(c,grad(c,-48,0,48,0,lt,m));
 c.restore()}
function arm(c,s,up,fo,ext,back){const R=Math.PI/180,m=back?s.dark:s.main,lt=back?s.dark:s.light;
 c.save();c.rotate(up*R);
 c.save();c.translate(0,54+(ext||0));c.rotate(fo*R);
  cap(c,50,24,22);fillStroke(c,grad(c,-24,0,24,0,lt,m));
  if(s.back==='fin'){c.beginPath();c.moveTo(-20,6);c.quadraticCurveTo(-64,30,-44,64);c.quadraticCurveTo(-34,44,-20,44);c.closePath();fillStroke(c,s.dark,3)}
  c.beginPath();c.ellipse(0,66,28,25,0,0,7);fillStroke(c,grad(c,0,42,0,92,m,s.dark));
  c.save();c.translate(0,84);claws(c,s,0,0,0,3,15);c.restore();
 c.restore();
 cap(c,56,28,25);fillStroke(c,grad(c,-28,0,28,0,lt,m));
 c.restore()}
function tail(c,s,rot,len){c.save();c.rotate(rot*Math.PI/180);const L=len||1;
 c.beginPath();c.moveTo(0,-38);c.bezierCurveTo(-80*L,-20,-150*L,40,-215*L,118);c.bezierCurveTo(-200*L,124,-185*L,122,-170*L,114);c.bezierCurveTo(-110*L,70,-60*L,48,0,40);c.closePath();
 fillStroke(c,grad(c,0,-40,0,60,s.light,s.dark));
 if(s.back==='spikes'||s.back==='none'){for(let i=0;i<4;i++){const t=.2+i*.2,x=-215*L*t,y=-38+156*t*t;c.beginPath();c.moveTo(x-12,y+4);c.lineTo(x-4,y-18);c.lineTo(x+8,y+2);c.closePath();fillStroke(c,s.back==='spikes'?'#2a2338':s.dark,2.5)}}
 if(s.tail==='fluke'){c.save();c.translate(-205*L,116);c.rotate(.6);c.beginPath();c.moveTo(0,0);c.bezierCurveTo(-30,-60,-10,-70,10,-58);c.bezierCurveTo(4,-30,6,-14,0,0);c.bezierCurveTo(-40,20,-50,50,-40,62);c.bezierCurveTo(-20,40,-6,20,0,0);fillStroke(c,s.main,4);c.restore()}
 if(s.tail==='club'){c.beginPath();c.ellipse(-210*L,112,40,30,.4,0,7);fillStroke(c,grad(c,-250*L,90,-170*L,140,s.light,s.dark));
  for(const[a,b]of[[-232,92],[-190,100],[-215,140]]){c.beginPath();c.arc(a*L,b,7,0,7);fillStroke(c,s.belly,2)}}
 if(s.back==='armor'){for(let i=0;i<4;i++){const t=.15+i*.19,x=-215*L*t,y=-38+156*t*t;c.beginPath();c.moveTo(x-14,y+6);c.lineTo(x-2,y-20);c.lineTo(x+12,y+4);c.closePath();fillStroke(c,s.belly,2.5)}}
 c.restore()}
function torso(c,s){
 c.beginPath();c.moveTo(-62,0);c.bezierCurveTo(-82,-60,-78,-120,-48,-150);c.bezierCurveTo(-10,-170,40,-168,60,-146);c.bezierCurveTo(84,-110,86,-50,64,0);c.bezierCurveTo(30,22,-30,22,-62,0);c.closePath();
 fillStroke(c,grad(c,60,-150,-60,0,s.light,s.dark));
 c.save();c.beginPath();c.moveTo(-62,0);c.bezierCurveTo(-82,-60,-78,-120,-48,-150);c.bezierCurveTo(-10,-170,40,-168,60,-146);c.bezierCurveTo(84,-110,86,-50,64,0);c.bezierCurveTo(30,22,-30,22,-62,0);
 scales(c,s,-90,-170,90,30);c.restore();
 c.beginPath();c.ellipse(30,-62,34,62,-.08,0,7);c.fillStyle=s.belly;c.globalAlpha=.9;c.fill();c.globalAlpha=1;c.strokeStyle=s.dark;c.lineWidth=2.5;c.stroke();
 for(let y=-110;y<-10;y+=18){c.beginPath();c.moveTo(6,y);c.quadraticCurveTo(30,y+6,56,y);c.strokeStyle=s.dark;c.globalAlpha=.4;c.stroke();c.globalAlpha=1}
 c.beginPath();c.moveTo(18,-160);c.lineTo(22,-10);c.strokeStyle=OL;c.lineWidth=2;c.globalAlpha=.5;c.stroke();c.globalAlpha=1;
 if(s.back==='armor'){for(let i=0;i<5;i++){const y=-140+i*30;c.beginPath();c.moveTo(-70-(i%2)*4,y);c.lineTo(-100,y+10);c.lineTo(-74,y+22);c.closePath();fillStroke(c,s.belly,2.5)}
  for(let i=0;i<4;i++){c.beginPath();c.ellipse(-40+i*10,-150+i*34,14,10,0,0,7);fillStroke(c,s.light,2)}}
 if(s.back==='spikes'){for(let i=0;i<5;i++){const y=-150+i*30;c.beginPath();c.moveTo(-64,y);c.lineTo(-96,y+6);c.lineTo(-70,y+20);c.closePath();fillStroke(c,'#2a2338',2.5)}}
 if(s.back==='fin'){c.beginPath();c.moveTo(-70,-130);c.quadraticCurveTo(-130,-110,-118,-50);c.quadraticCurveTo(-96,-70,-74,-60);c.closePath();fillStroke(c,s.dark,3)}
}
function face(c,s,mood){
 // face circle
 c.beginPath();c.arc(22,0,60,0,7);fillStroke(c,grad(c,22,-60,22,60,SKIN,SKIN_D),4);
 c.beginPath();c.ellipse(-30,8,10,16,0,0,7);fillStroke(c,SKIN_D,3); // ear
 c.fillStyle='#ff8f80';c.globalAlpha=.45;c.beginPath();c.ellipse(-2,22,12,7,0,0,7);c.fill();c.beginPath();c.ellipse(62,22,10,6,0,0,7);c.fill();c.globalAlpha=1;
 // eyes
 for(const[x,w,dir]of[[8,13,1],[50,11,-1]]){c.beginPath();c.ellipse(x,-2,w,13,0,0,7);fillStroke(c,'#fff',3);c.beginPath();c.arc(x+3,1,6.5,0,7);c.fillStyle='#2a1a12';c.fill();c.beginPath();c.arc(x+5,-2,2.2,0,7);c.fillStyle='#fff';c.fill();
  c.beginPath();c.moveTo(x-w-3,-16+dir*-2);c.lineTo(x+w+3,-16+dir*8);c.lineTo(x+w+3,-6+dir*4);c.lineTo(x-w-3,-6-dir*4);c.closePath();c.fillStyle=SKIN;c.fill();
  c.beginPath();c.moveTo(x-w-2,-6-dir*4);c.lineTo(x+w+2,-6+dir*4);c.lineWidth=3.5;c.strokeStyle=OL;c.stroke()}
 // brows
 c.lineWidth=8;c.strokeStyle=HAIR;c.lineCap='round';c.beginPath();c.moveTo(-8,-26);c.lineTo(24,-12);c.moveTo(36,-12);c.lineTo(64,-26);c.stroke();
 // mouth
 if(mood==='ow'){c.beginPath();c.ellipse(34,30,12,8,0,0,7);fillStroke(c,'#8a2a22',3)}
 else{c.beginPath();c.moveTo(12,22);c.quadraticCurveTo(33,13,56,22);c.lineTo(48,48);c.quadraticCurveTo(33,54,20,48);c.closePath();fillStroke(c,'#7a1f1a',3);
  c.save();c.clip();c.fillStyle='#fff';c.fillRect(10,10,50,14);c.beginPath();c.ellipse(34,50,14,7,0,0,7);c.fillStyle='#ff7066';c.fill();c.restore()}
 c.beginPath();c.moveTo(34,6);c.quadraticCurveTo(40,14,33,16);c.strokeStyle=SKIN_D;c.lineWidth=3;c.stroke();
 // hair bangs
 c.beginPath();c.moveTo(-40,-10);c.lineTo(-36,-40);c.lineTo(-20,-26);c.lineTo(-12,-50);c.lineTo(4,-30);c.lineTo(16,-54);c.lineTo(28,-32);c.lineTo(44,-52);c.lineTo(52,-30);c.lineTo(70,-46);c.lineTo(72,-24);c.quadraticCurveTo(60,-62,10,-64);c.quadraticCurveTo(-40,-56,-40,-10);c.closePath();c.fillStyle=HAIR;c.fill();
}
function hood(c,s,jaw,mood){
 const L=s.snout;
 // back of hood
 c.beginPath();c.moveTo(-60,70);c.bezierCurveTo(-110,40,-110,-80,-70,-110);c.bezierCurveTo(-40,-130,20,-130,50,-110);c.lineTo(70,-60);c.bezierCurveTo(100,0,95,60,70,82);c.bezierCurveTo(20,100,-30,95,-60,70);c.closePath();
 fillStroke(c,grad(c,40,-120,-80,80,s.light,s.dark));
 if(s.hood==='anky'){for(const[x,y,r]of[[-96,-40,-2.2],[-100,10,-2.5],[-88,50,-2.8]]){c.save();c.translate(x,y);c.rotate(r);c.beginPath();c.moveTo(-12,0);c.lineTo(0,-34);c.lineTo(12,0);c.closePath();fillStroke(c,s.belly,3);c.restore()}}
 if(s.hood==='drex'){for(let i=0;i<5;i++){const a=-2.9+i*.38;c.save();c.translate(-30+Math.cos(a)*78,-20+Math.sin(a)*90);c.rotate(a+Math.PI/2);c.beginPath();c.moveTo(-10,0);c.lineTo(0,-30-(i%2)*10);c.lineTo(10,0);c.closePath();fillStroke(c,'#2a2338',3);c.restore()}}
 if(s.hood==='mosa'){c.beginPath();c.moveTo(-60,-100);c.quadraticCurveTo(-120,-140,-120,-80);c.quadraticCurveTo(-96,-90,-80,-70);c.closePath();fillStroke(c,s.dark,3)}
 if(s.hood==='rex'){c.beginPath();c.moveTo(-70,-100);c.lineTo(-92,-96);c.lineTo(-80,-80);c.lineTo(-104,-60);c.lineTo(-86,-50);c.stroke()}
 face(c,s,mood);
 // hood rim around face
 c.beginPath();c.arc(22,0,64,-0.15,Math.PI+0.5);c.lineWidth=16;c.strokeStyle=s.main;c.stroke();c.beginPath();c.arc(22,0,72,-0.12,Math.PI+0.48);c.lineWidth=4;c.strokeStyle=OL;c.stroke();
 // upper jaw (pivot -40,-50)
 c.save();c.translate(-40,-52);c.rotate(-jaw*0.6);
 const tip=L,top=-58,jy=s.jawH;
 c.beginPath();c.moveTo(-20,10);c.bezierCurveTo(-30,-40,10,top-20,50,top);c.bezierCurveTo(90,top-4,tip-10,top+20,tip,top+44);
 c.bezierCurveTo(tip+6,top+60,tip-4,jy,tip-24,jy);c.lineTo(40,jy);c.bezierCurveTo(10,jy+4,-8,jy+6,-20,10);c.closePath();
 fillStroke(c,grad(c,40,top-10,40,jy,s.light,s.main));
 c.save();c.clip();scales(c,s,-30,top-30,tip+10,jy+10);c.restore();
 // under-jaw pale
 c.beginPath();c.moveTo(30,jy-8);c.lineTo(tip-26,jy-8);c.quadraticCurveTo(tip-10,jy-10,tip-6,jy-22);c.strokeStyle=s.belly;c.lineWidth=6;c.globalAlpha=.7;c.stroke();c.globalAlpha=1;
 // teeth
 if(s.teeth){const n=s.teeth,x0=28,x1=tip-22;for(let i=0;i<n;i++){const x=x0+(x1-x0)*i/(n-1),h=s.hood==='mosa'?14:(i%2?18:24);c.beginPath();c.moveTo(x-6,jy-2);c.lineTo(x,jy+h);c.lineTo(x+6,jy-2);c.closePath();fillStroke(c,'#fbf6ea',2.2)}
  if(s.hood==='drex'){for(let i=0;i<6;i++){const x=40+i*14;c.beginPath();c.moveTo(x-4,jy-2);c.lineTo(x+1,jy+12);c.lineTo(x+6,jy-2);fillStroke(c,'#e8e0d0',1.8)}}}
 else{c.beginPath();c.moveTo(tip-34,jy);c.quadraticCurveTo(tip-6,jy+6,tip-2,jy-16);c.lineWidth=4;c.strokeStyle=OL;c.stroke()}
 // nostril
 c.beginPath();c.ellipse(tip-18,top+40,6,3.5,.3,0,7);c.fillStyle=OL;c.fill();
 // eye
 const ex=s.hood==='mosa'?70:58,ey=top+22;
 c.beginPath();c.ellipse(ex,ey,s.hood==='anky'?11:15,s.hood==='anky'?10:13,0,0,7);fillStroke(c,s.hood==='drex'?'#ffd0b0':'#fff',3);
 c.beginPath();c.arc(ex+3,ey+1,7,0,7);c.fillStyle=s.eye;c.fill();c.beginPath();c.ellipse(ex+4,ey+1,2.2,6,0,0,7);c.fillStyle='#120a08';c.fill();
 if(s.hood==='drex'){c.save();c.globalCompositeOperation='lighter';c.fillStyle='rgba(255,60,30,.35)';c.beginPath();c.arc(ex+3,ey+1,16,0,7);c.fill();c.restore()}
 // brow ridge
 c.beginPath();c.moveTo(ex-22,ey-14);c.quadraticCurveTo(ex,ey-24,ex+20,ey-6);c.lineWidth=9;c.strokeStyle=s.dark;c.stroke();c.lineWidth=3;c.strokeStyle=OL;c.stroke();
 if(s.hood==='drex'){for(const[dx,h]of[[-14,34],[6,26]]){c.beginPath();c.moveTo(ex+dx-9,ey-16);c.lineTo(ex+dx-14,ey-16-h);c.lineTo(ex+dx+8,ey-18);c.closePath();fillStroke(c,'#2a2338',3)}}
 if(s.hood==='anky'){for(let i=0;i<4;i++){c.beginPath();c.arc(-4+i*24,top-6+Math.abs(i-1.5)*4,9,0,7);fillStroke(c,s.belly,2.5)}}
 if(s.hood==='mosa'){for(let i=0;i<3;i++){c.beginPath();c.moveTo(ex+24+i*16,ey+6);c.lineTo(ex+30+i*16,ey+16);c.lineWidth=2.5;c.strokeStyle=s.dark;c.stroke()}}
 c.restore();
}
const D={by:0,lean:4,head:-2,fu:-35,ff:-105,bu:-20,bf:-110,fe:0,ft:-28,fs:22,bt:26,bs:-6,tail:0,tl:1,jaw:0,mood:'yell'};
function drawPuppet(c,key,p){const s=SPECIES[key];p=Object.assign({},D,p);const R=Math.PI/180;
 c.save();c.translate(0,p.by);
 c.save();c.translate(-48,-150);tail(c,s,p.tail,p.tl);c.restore();
 c.save();c.translate(-30,-168);leg(c,s,p.bt,p.bs,true);c.restore();
 c.save();c.translate(0,-160);c.rotate(p.lean*R);
  c.save();c.translate(-30,-115);arm(c,s,p.bu,p.bf,0,true);c.restore();
 c.restore();
 c.save();c.translate(28,-168);leg(c,s,p.ft,p.fs,false);c.restore();
 c.save();c.translate(0,-160);c.rotate(p.lean*R);
  c.save();c.scale(1.12,.86);torso(c,s);c.restore();
  c.save();c.translate(8,-135);c.rotate(p.head*R);c.scale(1.18,1.18);c.translate(-4,-62);hood(c,s,p.jaw,p.mood);c.restore();
  c.save();c.translate(36,-112);arm(c,s,p.fu,p.ff,p.fe,false);c.restore();
 c.restore();
 c.restore()}
const off=document.createElement('canvas');off.width=780;off.height=780;const oc=off.getContext('2d');
const noise=document.createElement('canvas');noise.width=noise.height=128;{const n=noise.getContext('2d'),d=n.createImageData(128,128);for(let i=0;i<d.data.length;i+=4){const v=Math.random()*255;d.data[i]=d.data[i+1]=d.data[i+2]=v;d.data[i+3]=255}n.putImageData(d,0,0)}
let npat=null;
function render(c,key,p,flash){oc.setTransform(1,0,0,1,0,0);oc.globalCompositeOperation='source-over';oc.globalAlpha=1;oc.clearRect(0,0,780,780);
 oc.translate(390,740);drawPuppet(oc,key,p);oc.setTransform(1,0,0,1,0,0);
 oc.globalCompositeOperation='source-atop';
 const g=oc.createLinearGradient(560,120,240,740);g.addColorStop(0,'rgba(255,240,210,.18)');g.addColorStop(.5,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(40,10,30,.28)');oc.fillStyle=g;oc.fillRect(0,0,780,780);
 if(!npat)npat=oc.createPattern(noise,'repeat');oc.globalAlpha=.07;oc.fillStyle=npat;oc.fillRect(0,0,780,780);oc.globalAlpha=1;
 if(flash){oc.fillStyle='rgba(255,255,255,'+flash+')';oc.fillRect(0,0,780,780)}
 oc.globalCompositeOperation='source-over';
 c.drawImage(off,-390,-740)}
window.PUPPET={draw:drawPuppet,render,SPECIES};
})();
