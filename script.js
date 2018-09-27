

var contexto;
var canvas;
var tabuleiro=new Array(9);
var valor = 2;
var placarX;
var placarY;
var placar=0;

window.onload = function(){
    //recebendo canvas
    canvas=document.getElementById("jogo-da-velha");
    contexto = canvas.getContext('2d');
    placarX =document.getElementById("placarX");
    placarY =document.getElementById("placarY");
    //iniciando o path
    contexto.beginPath();
    //primeira linha horizontal
    contexto.moveTo(160,0);
    contexto.lineTo(160,480);
    //segunda linha horizontal
    contexto.moveTo(320,0);
    contexto.lineTo(320,480);
    //primeira linha vertical
    contexto.moveTo(0,160);
    contexto.lineTo(480,160);
    //segunda linha vertical
    contexto.moveTo(0,320);
    contexto.lineTo(480,320);
    //definindo a grossura da linha e cor
    contexto.lineWidth= 10;
    contexto.strokeStyle='rgb(242, 242, 242)';
    //definindo a cor de fundo
    contexto.fillStyle ='rgb(0, 102, 0)';
    //desenhando o fundo do canvas
    contexto.fillRect(0,0,canvas.width,canvas.height);
    //desenha as linha do canvas
    contexto.stroke();
}

function resetar(){
    valor= 2;

    for(var i = 0;i < 9;i ++){
        tabuleiro[i] = null;
    }

    contexto.beginPath();
    //primeira linha horizontal
    contexto.moveTo(160,0);
    contexto.lineTo(160,480);
    //segunda linha horizontal
    contexto.moveTo(320,0);
    contexto.lineTo(320,480);
    //primeira linha vertical
    contexto.moveTo(0,160);
    contexto.lineTo(480,160);
    //segunda linha vertical
    contexto.moveTo(0,320);
    contexto.lineTo(480,320);
    //definindo a grossura da linha e cor
    contexto.lineWidth= 10;
    contexto.strokeStyle='rgb(242, 242, 242)';
    //definindo a cor de fundo
    contexto.fillStyle ='rgb(0, 102, 0)';
    //desenhando o fundo do canvas
    contexto.fillRect(0,0,canvas.width,canvas.height);
    //desenha as linha do canvas
    contexto.stroke();
}

function clique(event){
    var rect =canvas.getBoundingClientRect();
    return{
        x : event.clientX - rect.left,
        y : event.clientY - rect.top
    }
}

function comeco(inicial){
    if(inicial == 0){
        valor = 0;
    }else{
        valor = 1;
    }

}

function proximo(numero,quadro,modX,modY){
    if(numero == 0){
        bola(modX,modY);
        tabuleiro[quadro] = 0;
        valor = 1;
    }
    else if(numero == 1){
        X(modX,modY);
        tabuleiro[quadro] = 1;
        valor = 0;
        
    }else{
        alert("Escolha ser X ou O antes de iniciar o jogo");
    }
}

function movimento(event){
    var mouse = clique(event);
    console.log(mouse);
    //quadro 1
    if((mouse.x <= 160 && mouse.x >= 0) && (mouse.y <= 160 && mouse.y >= 0) && tabuleiro[0] == null){
        console.log('quadro 1');
        proximo(valor,0,1,1);
    }
    //quadro 2
    if((mouse.x <= 320 && mouse.x >= 160) && (mouse.y <= 160 && mouse.y >= 0) && tabuleiro[1] == null){
        console.log('quadro 2');
        proximo(valor,1,3,1);
    }
    //quadro 3
    if((mouse.x <= 480 && mouse.x >= 320) && (mouse.y <= 160 && mouse.y >= 0)&& tabuleiro[2] == null){
        console.log('quadro 3');
        proximo(valor,2,5,1);
    }
    //quadro 4
    if((mouse.x <= 160 && mouse.x >= 0) && (mouse.y <= 320 && mouse.y >= 160)&& tabuleiro[3] == null){
        console.log('quadro 4');
        proximo(valor,3,1,3);
    }
    //quadro 5
    if((mouse.x <= 320 && mouse.x >= 160) && (mouse.y <= 320 && mouse.y >= 160)&& tabuleiro[4] == null){
        console.log('quadro 5');
        proximo(valor,4,3,3);
    }
    //quadro 6
    if((mouse.x <= 480 && mouse.x >= 320) && (mouse.y <= 320 && mouse.y >= 160)&& tabuleiro[5] == null){
        console.log('quadro 6');
        proximo(valor,5,5,3);
    }
    //quadro 7
    if((mouse.x <= 160 && mouse.x >= 0) && (mouse.y <= 480 && mouse.y >= 320)&& tabuleiro[6] == null){
        console.log('quadro 7');
        proximo(valor,6,1,5);
    }
    //quadro 8
    if((mouse.x <= 320 && mouse.x >= 160) && (mouse.y <= 480 && mouse.y >= 320)&& tabuleiro[7] == null){
        console.log('quadro 8');
        proximo(valor,7,3,5);
        
    }
    //quadro 9
    if((mouse.x <= 480 && mouse.x >= 320) && (mouse.y <= 480 && mouse.y >= 320)&& tabuleiro[8] == null){
        console.log('quadro 9');
        proximo(valor,8,5,5);
        
    }
    vitoria();
}

function bola(modX,modY){

    contexto.beginPath();

    contexto.arc(80*(modX),80*(modY),45,0*Math.PI,2*Math.PI);

    contexto.stroke();
}

function X(modX,modY){

    contexto.beginPath();

    contexto.moveTo((Math.ceil(modX/2)*160)-120,(Math.ceil(modY/2)*160)-120);
    contexto.lineTo((Math.ceil(modX/2)*160)-40,(Math.ceil(modY/2)*160)-40);

    contexto.moveTo((Math.ceil(modX/2)*160)-120,(Math.ceil(modY/2)*160)-40);
    contexto.lineTo((Math.ceil(modX/2)*160)-40,(Math.ceil(modY/2)*160)-120);

    contexto.stroke();

}

function desenhalinha(x1,y1,x2,y2){

    contexto.beginPath();

    contexto.moveTo(x1,y1);
    contexto.lineTo(x2,y2);

    console.log('estoy aqui queriendote')
    contexto.stroke();
}

function vitoria(){
    //vitoria do O na primeira linha
    if(tabuleiro[0]==0 && tabuleiro[1]==0 && tabuleiro[2]==0){
        desenhalinha(10,80,470,80);


    }
    //vitoria do O na segunda linha
    if(tabuleiro[3]==0 && tabuleiro[4]==0 && tabuleiro[5]==0){
        desenhalinha(10,240,470,240);
    }
    //vitoria do O na terceira linha
    if(tabuleiro[6]==0 && tabuleiro[7]==0 && tabuleiro[8]==0){
        desenhalinha(10,400,470,400);
    }
    //vitoria do O na primeira coluna
    if(tabuleiro[0]==0 && tabuleiro[3]==0 && tabuleiro[6]==0){
        desenhalinha(80,10,80,470);
    }
    //vitoria do O na segunda coluna
    if(tabuleiro[1]==0 && tabuleiro[4]==0 && tabuleiro[7]==0){
        desenhalinha(240,10,240,470);
    }
    //vitoria do O na terceira coluna
    if(tabuleiro[2]==0 && tabuleiro[5]==0 && tabuleiro[8]==0){
        desenhalinha(400,10,400,470);
    }
    //vitoria do O na diagonal principal
    if(tabuleiro[0]==0 && tabuleiro[4]==0 && tabuleiro[8]==0){
        desenhalinha(10,10,470,470);
    }
    //vitoria do O na diagonal secundária
    if(tabuleiro[2]==0 && tabuleiro[4]==0 && tabuleiro[6]==0){
        desenhalinha(470,10,10,470);
    }

    //vitoria do X na primeira linha
    if(tabuleiro[0]==1 && tabuleiro[1]==1 && tabuleiro[2]==1){
        desenhalinha(10,80,470,80);
    }
    //vitoria do X na segunda linha
    if(tabuleiro[3]==1 && tabuleiro[4]==1 && tabuleiro[5]==1){
        desenhalinha(10,240,470,240);
    }
    //vitoria do X na terceira linha
    if(tabuleiro[6]==1 && tabuleiro[7]==1 && tabuleiro[8]==1){
        desenhalinha(10,400,470,400);
    }
    //vitoria do X na primeira coluna
    if(tabuleiro[0]==1 && tabuleiro[3]==1 && tabuleiro[6]==1){
        desenhalinha(80,10,80,470);
    }
    //vitoria do X na segunda coluna
    if(tabuleiro[1]==1 && tabuleiro[4]==1 && tabuleiro[7]==1){
        desenhalinha(240,10,240,470);
    }
    //vitoria do X na terceira coluna
    if(tabuleiro[2]==1 && tabuleiro[5]==1 && tabuleiro[8]==1){
        desenhalinha(400,10,400,470);
    }
    //vitoria do X na diagonal principal
    if(tabuleiro[0]==1 && tabuleiro[4]==1 && tabuleiro[8]==1){
        desenhalinha(10,10,470,470);
    }
    //vitoria do X na diagonal secundária
    if(tabuleiro[2]==1 && tabuleiro[4]==1 && tabuleiro[6]==1){
        desenhalinha(470,10,10,470);
    }
}