(()=>{
    'use strict'
    /// element deceleration //////
    const myCanvas = document.getElementById('myCanvas');
    const sliderWidth = document.getElementById('sliderWidth');
    const reset = document.getElementById('reset');
    const sliderCanvasWidth = document.getElementById('sliderCanvasWidth');
    const sliderCanvasHeight = document.getElementById('sliderCanvasHeight');
    const dummy = document.getElementById('dummy');
    const colorPicker = document.getElementById('colorPicker');
    const borderRadius = document.getElementById('borderRadius');
    const eraser = document.getElementById('eraser');
    const stampsContainer = document.getElementById('stampsContainer');
    const palletContainer = document.getElementById('palletContainer');
    const opacity = document.getElementById('opacity');


    ////set the Properties of the canvas size sliders
    sliderCanvasWidth.setAttribute('max', document.getElementById('paint').offsetWidth -10);
    sliderCanvasHeight.setAttribute('max', document.getElementById('paint').offsetHeight - 10);
    sliderCanvasWidth.setAttribute('value', 500);
    sliderCanvasHeight.setAttribute('value', 500);

    ///// declaring a new div, drawing and changing parameters
    let myDiv ={
        width: 20,
        height: 20, 
        backgroundColor: '#000',
        borderRadius: 100,
        drewFlag: false,
        backgroundImage: null,
        opacity: 0,
        

        drewOnCanvas : (e) =>{        
            let xPlace = event.pageX;
            let yPlace = event.pageY;
            e.stopPropagation();
            
            if (event.type == 'mousedown'){
                this.drewFlag = true;
            }
            if(event.type == 'mouseup'){
                this.drewFlag = false;
            }
            
            if(this.drewFlag == true){
                let newDiv = document.createElement('div');
                newDiv.addEventListener('click', function(){
                    this.stopPropagation()
                }); 
                newDiv.setAttribute('class' , 'newDiv');
                newDiv.style.left = xPlace - myCanvas.offsetLeft + 'px';
                newDiv.style.top = yPlace - myCanvas.offsetTop + 'px';
                newDiv.style.width = this.width + 'px';
                newDiv.style.height = this.height + 'px';
                newDiv.style.backgroundColor = this.backgroundColor; 
                newDiv.style.borderRadius = borderRadius.value + 'px';
                newDiv.style.opacity = opacity.value * 0.01;
                if (menu.stampNow != null){
                    newDiv.style.backgroundColor = 'transparent'; 
                    newDiv.style.backgroundImage = `url("../images/${menu.stamps[menu.stampNow]}.png")`;
                }
                myCanvas.append(newDiv);
            }
        },

        changeParameters : () =>{ 
            this[event.target.name] = event.target.value;
            if (event.target.name == 'backgroundColor'){
                menu.stampNow = null;
                dummy.style.backgroundImage = '';
                if(event.target.value == '#ffffff'){
                    dummy.style.backgroundImage = 'url(../images/erase.png)';
                    
                }
                dummy.style[event.target.name] = event.target.value;
            }
            if (event.target.name == 'backgroundImage'){
                dummy.style.backgroundImage = event.target.style.backgroundImage;
                dummy.style.backgroundColor = 'transparent';
            }
            if (event.target.name == 'opacity'){
                dummy.style[event.target.name] = event.target.value * 0.01
            }
            else{
                dummy.style[event.target.name] = event.target.value + 'px';
            }
        },
    }

    ///// creating some menu elements
    let menu = {
        stamps: ['star', 'heart', 'kiss', 'code' , 'horse' , 'pinguin', 'robot', 'stamp', 'js' ],
        stampNow: null,
        counter : 0,

        createStampButtons: () =>{
            for (let i in menu.stamps){
                stampsContainer.append(document.createElement('button'));
                stampsContainer.getElementsByTagName('button')[i].style.backgroundImage = `url(../images/${menu.stamps[i]}.png)`;
                stampsContainer.getElementsByTagName('button')[i].setAttribute('name' , 'backgroundImage');
                stampsContainer.getElementsByTagName('button')[i].addEventListener('click', function(e){
                    myDiv.changeParameters(e);
                    menu.stampNow = i;        
                })
            }
        },
        createColorPallet:()=>{
            let colors = {};
            for (let i = 0; i<1000; i++){
                if (i % 10 == 0) {
                    colors[i] = [parseInt(Math.random()*255),parseInt(Math.random()*255),parseInt(Math.random()*255)];
                    palletContainer.append(document.createElement('button'));
                    palletContainer.getElementsByTagName('button')[menu.counter].style.backgroundColor = `rgb(${colors[i].toString()})`;
                    palletContainer.getElementsByTagName('button')[menu.counter].setAttribute('value', `rgb(${colors[i].toString()})`);
                    palletContainer.getElementsByTagName('button')[menu.counter].setAttribute('name', `backgroundColor`);
                    palletContainer.getElementsByTagName('button')[menu.counter].addEventListener('click', function(e){
                        myDiv.changeParameters();
                    })
                    menu.counter ++
                }
            }
            
        },
    }

    ///// changing canvas properties
    let canvas= {
        width:500,
        height:500,
        createAndChangeCanvas: () =>{
            myCanvas.style.width = sliderCanvasWidth.value + 'px';
            myCanvas.style.height = sliderCanvasHeight.value + 'px';
        },
    }


    menu.createStampButtons()
    menu.createColorPallet()






    ///// event listeners////////////////
    myCanvas.addEventListener('mousedown',function(e){
        myDiv.drewOnCanvas(e);
    });
    myCanvas.addEventListener('mousemove', function(e){
        myDiv.drewOnCanvas(e);
    });
    myCanvas.addEventListener('mouseup', function(e){
        myDiv.drewOnCanvas(e);
    });

    sliderWidth.addEventListener('change', myDiv.changeParameters);
    sliderHeight.addEventListener('change', myDiv.changeParameters);
    colorPicker.addEventListener('change', myDiv.changeParameters);
    borderRadius.addEventListener('change', myDiv.changeParameters);
    opacity.addEventListener('change', myDiv.changeParameters);
    eraser.addEventListener('click', myDiv.changeParameters);

    sliderCanvasWidth.addEventListener('change', canvas.createAndChangeCanvas);
    sliderCanvasHeight.addEventListener('change', canvas.createAndChangeCanvas);

    ///// clear canvas 
    reset.addEventListener('click', function(){
        myCanvas.innerHTML =''
    })
})()