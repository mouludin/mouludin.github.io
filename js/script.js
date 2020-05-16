let circle = []
let img = []

function preload(){
    for(let i = 0;i < 5;i++){
        img.push(loadImage(`../img/my_knowledge${i}.png`))
    }
}
function setup(){
    createCanvas(window.innerWidth,window.innerHeight)
    for(let i = 0;i < 5;i++){
        circle.push(new Circle())
    }
}
console.log('asd')
function draw(){
    background(255)
    for(let i = 0;i < circle.length;i++){
        circle[i].show(img[i])
        circle[i].rotation()
    }
}
