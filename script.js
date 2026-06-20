function show(id){

document.querySelectorAll(".page")
.forEach(p => p.classList.remove("active"));

document.getElementById(id).classList.add("active");

// START FIREWORKS ONLY ON FINAL PAGE
if(id === "p4"){
  setTimeout(() => {
    setInterval(createFirework, 700);
  }, 500);
}

}

function unlock(){

let v = [...document.querySelectorAll(".code input")]
.map(i => i.value)
.join("");

if(v === "8637"){

document.getElementById("music").play();

show("p2");

setTimeout(()=> show("p3"), 2500);
setTimeout(()=> show("p4"), 6000);

}
else{
alert("Wrong code");
}

}

/* FIREWORKS CODE */
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
constructor(x,y,color){
this.x=x;
this.y=y;
this.color=color;
this.radius=Math.random()*3+1;
this.speedX=(Math.random()-0.5)*6;
this.speedY=(Math.random()-0.5)*6;
this.alpha=1;
}

update(){
this.x+=this.speedX;
this.y+=this.speedY;
this.alpha-=0.02;
}

draw(){
ctx.globalAlpha=this.alpha;
ctx.beginPath();
ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
ctx.fillStyle=this.color;
ctx.fill();
}
}

function createFirework(){
const x=Math.random()*canvas.width;
const y=Math.random()*canvas.height/2;

const colors=["red","yellow","blue","green","purple","orange"];

for(let i=0;i<50;i++){
particles.push(new Particle(
x,y,
colors[Math.floor(Math.random()*colors.length)]
));
}
}

function animate(){

if(document.getElementById("p4").classList.contains("active")){

ctx.globalAlpha=0.2;
ctx.fillStyle="black";
ctx.fillRect(0,0,canvas.width,canvas.height);

particles.forEach((p,i)=>{
p.update();
p.draw();

if(p.alpha<=0){
particles.splice(i,1);
}
});

}

requestAnimationFrame(animate);
}

animate();

/* RESIZE FIX */
window.addEventListener("resize",()=>{
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
});
