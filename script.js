var contexto;
var canvas;
var tabuleiro=new Array(9);

window.onload = function(){
    //recebendo canvas
    canvas=document.getElementById("jogo-da-velha");
    contexto = canvas.getContext('2d');

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

function clique(event){
    var rect =canvas.getBoundingClientRect();
    return{
        x : event.clientX - rect.left,
        y : event.clientY - rect.top
    }
}

function movimento(event){
    var mouse = clique(event);
    console.log(mouse);

    //quadro 1
    if((mouse.x <= 160 && mouse.x >= 0) && (mouse.y <= 160 && mouse.y >= 0) && tabuleiro[0] == null){
        console.log('quadro 1');
        tabuleiro[0] = 1;
    }
    //quadro 2
    if((mouse.x <= 320 && mouse.x >= 160) && (mouse.y <= 160 && mouse.y >= 0) && tabuleiro[1] == null){
        console.log('quadro 2');
        tabuleiro[1] = 1;
    }
    //quadro 3
    if((mouse.x <= 480 && mouse.x >= 320) && (mouse.y <= 160 && mouse.y >= 0)&& tabuleiro[2] == null){
        console.log('quadro 3');
        tabuleiro[2] = 1;
    }
    //quadro 4
    if((mouse.x <= 160 && mouse.x >= 0) && (mouse.y <= 320 && mouse.y >= 160)&& tabuleiro[3] == null){
        console.log('quadro 4');
        tabuleiro[3] = 1;
    }
    //quadro 5
    if((mouse.x <= 320 && mouse.x >= 160) && (mouse.y <= 320 && mouse.y >= 160)&& tabuleiro[4] == null){
        console.log('quadro 5');
        tabuleiro[4] = 1;
    }
    //quadro 6
    if((mouse.x <= 480 && mouse.x >= 320) && (mouse.y <= 320 && mouse.y >= 160)&& tabuleiro[5] == null){
        console.log('quadro 6');
        tabuleiro[5] = 1;
    }
    //quadro 7
    if((mouse.x <= 160 && mouse.x >= 0) && (mouse.y <= 480 && mouse.y >= 320)&& tabuleiro[6] == null){
        console.log('quadro 7');
        tabuleiro[6] = 1;
    }
    //quadro 8
    if((mouse.x <= 320 && mouse.x >= 160) && (mouse.y <= 480 && mouse.y >= 320)&& tabuleiro[7] == null){
        console.log('quadro 8');
        tabuleiro[7] = 1;
    }
    //quadro 9
    if((mouse.x <= 480 && mouse.x >= 320) && (mouse.y <= 480 && mouse.y >= 320)&& tabuleiro[8] == null){
        console.log('quadro 9');
        tabuleiro[8] = 1;
    }
}

