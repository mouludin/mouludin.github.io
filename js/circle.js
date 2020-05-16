class Circle{
    constructor(){
        if(window.innerWidth > window.innerHeight){
            this.x = (width / 2) + random(-height/2, height/2)
            this.y = (height / 2) + random(-height/2,height/2)
            this.tr = random(-0.01,0.01)
        }else{
            this.x = (width / 2) + random(-width/2, width/2)
            this.y = (height / 2) + random(-width/2,width/2)
            this.tr = random(-0.04,0.04)
        }
        this.weight = 64
    }
    show(i){
        image(i,this.x,this.y,this.weight)
    }

    rotation(){
        let formula = new Matrix()
        if(this.tr == 360){ this.tr = 0 }
        formula.setMatrix([
            [Math.cos(this.tr) * (this.x - width/2) + -Math.sin(this.tr) * (this.y - height/2)],
            [Math.sin(this.tr) * (this.x - width/2) + Math.cos(this.tr) * (this.y - height/2)]
        ])
        
        let central_point = new Matrix()
        central_point.setMatrix([
            [width/2],
            [height/2]
        ])

        formula.add(central_point)
        this.x = formula.data[0][0]
        this.y = formula.data[1][0]
        // console.log(formula.data)
        // this.tr += 0.000000001
    }
}