'use strict'

class Matrix{
    rows = 0
    cols = 0
    data = []

    constructor(rows = 1,cols = 1){
        this.rows = rows
        this.cols = cols
        for(let i = 0; i < rows;i++){
            this.data[i] = []
            for(let j = 0; j < cols;j++){
                this.data[i][j] = 0
            }
        }
    }

    setMatrix(matrix){
        if(typeof matrix[0] == 'object'){
            this.rows = matrix.length
            this.cols = matrix[0].length
            this.data = matrix
        }else{
            console.error('parameter must be a 2d array. example: [[1,2], [3,4]]')
        }
    }

    map(cb){
        for(let i = 0; i < this.rows;i++){
            for(let j = 0; j < this.cols;j++){
                let val = this.data[i][j]
                this.data[i][j] = cb(val,i,j)
            }
        }
        return this.data
    }

    dot(n){      
        let result = new Matrix(n.rows, n.cols)
        for(let i = 0;i < result.rows;i++){
            for(let j = 0;j < result.cols;j++){
                // Dot product of values in col
                let sum = 0
                for(let k = 0; k < this.cols;k++){
                     sum += this.data[i][k] * n.data[k][j]
                }
                result.data[i][j] = sum
            }
        }
        return result    
    }
    multiply(n){      
        if (n instanceof Matrix) {
            this.map((x,i,j)=> x * n.data[i][j])
            return this.data
        } else {
        // Scalar product
            return this.map(e => e * n);
        }      
    }

    add(n){n instanceof Matrix?this.map((x,i,j) => x + n.data[i][j]):this.map(x => x + n)}

    randomize(a = 0,b = 1){this.map(x => x = a + (Math.random() * (b - a)))}

    toArray(){
        let arr = []
        for(let i = 0; i < this.rows;i++){
            for(let j = 0; j < this.cols;j++){
                arr.push(this.data[i][j])
            }
        }
        return arr
    }

    zeros(){this.map(x => x = 0);return this.data}
    
    ones(){this.map(x => x = 1);return this.data}

    eye(num){
        let {data,rows,cols} = new Matrix(num,num)
        this.data = data
        this.rows = rows
        this.cols = cols
        for(let i = 0;i < this.rows;i++){
            this.data[i][i] = 1
        }
        return this.data
    }

    shape(){return [this.rows,this.cols]}
    static shape = mt => [mt.data.length,mt.data[0].length]


    static fromArray(arr){
        let m = new Matrix(arr.length, 1)
        for(let i = 0; i < arr.length;i++){
            m.data[i][0] = arr[i]
        }
        return m
    }

    static subtract(a, b){
        //return a new Matrix a-b
        let result = new Matrix(a.rows, a.cols)
        typeof b == 'object'
        ?result = a.map((x,i,j)=>x - b.data[i][j])
        :result = a.map((x,i,j)=>x - b)
        return result
    }

    static map(a, cb){
        let result = new Matrix(a.rows,a.cols)
        //Apply a function to every element of matrix
        for(let i = 0; i < a.rows;i++){
            for(let j = 0; j < a.cols;j++){
                let val = a.data[i][j]
                result.data[i][j] = cb(val,i,j)
            }
        }
        return result
    }

    static toArray(mt){
        let arr = []
        if(mt instanceof Matrix){
            for(let i = 0; i < mt.rows;i++){
                for(let j = 0; j < mt.cols;j++){
                    arr.push(mt.data[i][j])
                }
            }
        }else{
            console.error('parameter is not instance of Matrix class')
        }
        return arr
    }

    static randomize(mt,between = [0,1]){
        let difference = between[1] - between[0]
        if(mt instanceof Matrix){
            for(let i = 0; i < mt.rows;i++){
                for(let j = 0; j < mt.cols;j++){
                    mt.data[i][j] = (Math.random() * difference) + between[0]
                }
            }
        }else{
            console.error('parameter is not instance of Matrix class')
        }
        return mt
    }

    static add(mt1,mt2){
        let result = new Matrix(mt1.rows,mt1.cols)
        if(mt1 instanceof Matrix && mt2 instanceof Matrix){
            if(mt1.rows == mt2.rows && mt1.cols == mt2.cols){
                result = mt1.map((x,i,j)=>x + mt2.data[i][j])
            }else{
                console.error('row or col between the two parameters are not the same')
            }
        }else{
            if(typeof mt1 == 'object' && mt1 instanceof Matrix){
                result = mt1.map(x => x + mt2)
            }else{
                console.error('parameter must be a 2d array. example: [[1,2], [3,4]]')
            }
        }
        return result
    }

    static transpose(matrix){
        let [rows,cols] = [matrix.cols,matrix.rows]
        let res = new Matrix(rows,cols)
        for(let row = 0;row < rows;row++){
            for(let col = 0;col < cols;col++){
                res.data[row][col] = matrix.data[col][row]
            }
        }
        return res
    }

    static dot(a,b){
        //Matrix product
        let result
        if(a instanceof Matrix && b instanceof Matrix){
            if(a.cols !== b.rows){
                console.log('Colums of A must match rows of Parameter')
                return undefined
            }
            result = new Matrix(b.rows, b.cols)
            for(let i = 0;i < result.rows;i++){
                for(let j = 0;j < result.cols;j++){
                    // Dot product of values in col
                    let sum = 0
                    for(let k = 0; k < a.cols;k++){
                        sum += a.data[i][k] * b.data[k][j]
                    }
                    result.data[i][j] = sum
                }
            }
        }
        return result
    }

    static multiply(a,b){
        //Matrix product
        let result
        if(a instanceof Matrix && b instanceof Matrix){
            if(a.cols !== b.rows){
                console.log('Colums of A must match rows of Parameter')
                return undefined
            }
            result = new Matrix(a.rows, b.cols)
            result.data = a.map((x,i,j) => x * b.data[i][j])
        }else{
            result = new Matrix(a.rows, a.cols)
            result.data = a.data
            for(let i = 0; i < result.rows;i++){
                for(let j = 0; j < result.cols;j++){
                    result.data[i][j] *= b
                }
            }
        }
        return result
    }
}

