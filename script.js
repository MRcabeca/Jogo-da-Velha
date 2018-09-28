

var contexto;
var canvas;
var tabuleiro=new Array(9);

// tabuleiro se comporta assim
    // 0|1|2
    // 3|4|5
    // 6|7|8

var valor = 2;
var placarX;
var placarY;
var pX=0;
var pY=0;
var vez = 1;
var jogNum = 3;
var aviso= 0;
var init = null;
var dificuldade;

window.onload =function(){
    //recebendo canvas
    canvas=document.getElementById("jogo-da-velha");
    contexto = canvas.getContext('2d');
    placarX = document.getElementById("placarX");
    placarY = document.getElementById("placarY");
    dificuldade = document.getElementById("dificuldade");

    
    desenhaCampo();
}

function ativacao(ativo,inativo){
    var ativo = document.getElementById(ativo);
    var inativo = document.getElementById(inativo);

    ativo.classList.add("ativo");
    inativo.classList.remove("ativo")
}   

function resetar(num){
    //
    if(init == 1){
        valor = 1;
    }else{
        valor = 0;
    }
    aviso = 0;
    for(var i = 0;i < 9;i ++){
        tabuleiro[i] = null;
    }

    desenhaCampo();
}

function resetarTudo(){
    resetar();
    placarX.innerHTML = 0;
    placarY.innerHTML = 0;
    pX=0;
    pY=0;
}
function alteraDificuldade(){

    resetar();
    placarX.innerHTML = 0;
    placarY.innerHTML = 0;
    pX=0;
    pY=0;
}
function desenhaCampo(){
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
    contexto.fillStyle ='#003300';
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

function comeco(inicial,id,contrario){
    if(inicial == 0){
        valor = 0;
        init = 0;
    }else{
        valor = 1;
         init = 1;
    }
    placarX.innerHTML = 0;
    placarY.innerHTML = 0;
    pX=0;
    pY=0;
    ativacao(id,contrario);
}

function jogadores(n,id,contrario){
    if(n == 1){
        jogNum = 1;
        dificuldade.style.visibility = "visible";
    }else{
        jogNum = 2;
        dificuldade.style.visibility = "hidden";
    }
    placarX.innerHTML = 0;
    placarY.innerHTML = 0;
    pX=0;
    pY=0;
    ativacao(id,contrario);
}

function proximo(numero,quadro,modX,modY){
    if(numero == 0 && jogNum != 3 && tabuleiro[quadro] == null){
        tabuleiro[quadro] = numero;
        valor = 1;
        if(vez == 1 && jogNum == 1 && aviso != 1){
            vez = 2;
            vitoria();
            oponente();
        }
        bola(modX,modY);
    }
    else if(numero == 1 && jogNum != 3 && tabuleiro[quadro] == null){
        X(modX,modY);
        tabuleiro[quadro] = numero;
        valor = 0;
        if(vez == 1 && jogNum == 1 && aviso != 1){
            vez = 2;
            vitoria();
            oponente();
        }
        X(modX,modY);  
    }else if (numero == 2 && jogNum != 3){
        alert("Escolha ser X ou O antes de iniciar o jogo");
    }
    else if (jogNum == 3){
        alert("Indique o número de jogadores");
    }
}

function movimento(event){
    var mouse = clique(event);
    //quadro 0
    if((mouse.x <= 160 && mouse.x >= 0) && (mouse.y <= 160 && mouse.y >= 0)){
        proximo(valor,0,1,1);
    }
    //quadro 1
    if((mouse.x <= 320 && mouse.x >= 160) && (mouse.y <= 160 && mouse.y >= 0)){
        proximo(valor,1,3,1);
    }
    //quadro 2
    if((mouse.x <= 480 && mouse.x >= 320) && (mouse.y <= 160 && mouse.y >= 0)){
        proximo(valor,2,5,1);
    }
    //quadro 3
    if((mouse.x <= 160 && mouse.x >= 0) && (mouse.y <= 320 && mouse.y >= 160)){
        proximo(valor,3,1,3);
    }
    //quadro 4
    if((mouse.x <= 320 && mouse.x >= 160) && (mouse.y <= 320 && mouse.y >= 160)){
        proximo(valor,4,3,3);
    }
    //quadro 5
    if((mouse.x <= 480 && mouse.x >= 320) && (mouse.y <= 320 && mouse.y >= 160)){
        proximo(valor,5,5,3);
    }
    //quadro 6
    if((mouse.x <= 160 && mouse.x >= 0) && (mouse.y <= 480 && mouse.y >= 320)){
        proximo(valor,6,1,5);
    }
    //quadro 7
    if((mouse.x <= 320 && mouse.x >= 160) && (mouse.y <= 480 && mouse.y >= 320)){
        proximo(valor,7,3,5);
    }
    //quadro 8
    if((mouse.x <= 480 && mouse.x >= 320) && (mouse.y <= 480 && mouse.y >= 320)){
        proximo(valor,8,5,5);
        
    }
    vez = 1;
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
    
    for(var i = 0;i < 9;i ++){
        tabuleiro[i] = 3;
    }

    contexto.beginPath();

    contexto.moveTo(x1,y1);
    contexto.lineTo(x2,y2);
    
    contexto.lineWidth=8;
    contexto.strokeStyle="black"

    contexto.stroke();

    contexto.lineWidth= 10;
    contexto.strokeStyle='rgb(242, 242, 242)';
}

function vitoria(){
    //vitoria do O na primeira linha
    if(aviso == 1){
        return 0;
    }
    if(tabuleiro[0]==0 && tabuleiro[1]==0 && tabuleiro[2]==0){
        desenhalinha(10,80,470,80);
        setTimeout(function(){ resetar(valor);}, 1500);
        pY++;
        placarY.innerHTML=pY;
        aviso = 1;
    }
    //vitoria do O na segunda linha
    else if(tabuleiro[3]==0 && tabuleiro[4]==0 && tabuleiro[5]==0){
        desenhalinha(10,240,470,240);
        setTimeout(function(){ resetar(valor);}, 1500);
        pY++;
        placarY.innerHTML=pY;
        aviso = 1;
    }
    //vitoria do O na terceira linha
    else if(tabuleiro[6]==0 && tabuleiro[7]==0 && tabuleiro[8]==0){
        desenhalinha(10,400,470,400);
        setTimeout(function(){ resetar(valor);}, 1500);
        pY++;
        placarY.innerHTML=pY;
        aviso = 1;
    }
    //vitoria do O na primeira coluna
    else if(tabuleiro[0]==0 && tabuleiro[3]==0 && tabuleiro[6]==0){
        desenhalinha(80,10,80,470);
        setTimeout(function(){ resetar(valor);}, 1500);
        pY++;
        placarY.innerHTML=pY;
        aviso = 1;
    }
    //vitoria do O na segunda coluna
    else if(tabuleiro[1]==0 && tabuleiro[4]==0 && tabuleiro[7]==0){
        desenhalinha(240,10,240,470);
        setTimeout(function(){ resetar(valor);}, 1500);
        pY++;
        placarY.innerHTML=pY;
        aviso = 1;
    }
    //vitoria do O na terceira coluna
    else if(tabuleiro[2]==0 && tabuleiro[5]==0 && tabuleiro[8]==0){
        desenhalinha(400,10,400,470);
        setTimeout(function(){ resetar(valor);}, 1500);
        pY++;
        placarY.innerHTML=pY;
        aviso = 1;
    }
    //vitoria do O na diagonal principal
    else if(tabuleiro[0]==0 && tabuleiro[4]==0 && tabuleiro[8]==0){
        desenhalinha(10,10,470,470);
        setTimeout(function(){ resetar(valor);}, 1500);
        pY++;
        placarY.innerHTML=pY;
        aviso = 1;
    }
    //vitoria do O na diagonal secundária
    else if(tabuleiro[2]==0 && tabuleiro[4]==0 && tabuleiro[6]==0){
        desenhalinha(470,10,10,470);
        setTimeout(function(){ resetar(valor);}, 1500);
        pY++;
        placarY.innerHTML=pY;
        aviso = 1;
    }

    //vitoria do X na primeira linha
    else if(tabuleiro[0]==1 && tabuleiro[1]==1 && tabuleiro[2]==1){
        desenhalinha(10,80,470,80);
        setTimeout(function(){ resetar(valor);}, 1500);
        pX++;
        placarX.innerHTML=pX;
        aviso = 1;
    }
    //vitoria do X na segunda linha
    else if(tabuleiro[3]==1 && tabuleiro[4]==1 && tabuleiro[5]==1){
        desenhalinha(10,240,470,240);
        setTimeout(function(){ resetar(valor);}, 1500);
        pX++;
        placarX.innerHTML=pX;
        aviso = 1;
    }
    //vitoria do X na terceira linha
    else if(tabuleiro[6]==1 && tabuleiro[7]==1 && tabuleiro[8]==1){
        desenhalinha(10,400,470,400);
        setTimeout(function(){ resetar(valor);}, 1500);
        pX++;
        placarX.innerHTML=pX;
        aviso = 1;
    }
    //vitoria do X na primeira coluna
    else if(tabuleiro[0]==1 && tabuleiro[3]==1 && tabuleiro[6]==1){
        desenhalinha(80,10,80,470);
        setTimeout(function(){ resetar(valor);}, 1500);
        pX++;
        placarX.innerHTML=pX;
        aviso = 1;
    }
    //vitoria do X na segunda coluna
    else if(tabuleiro[1]==1 && tabuleiro[4]==1 && tabuleiro[7]==1){
        desenhalinha(240,10,240,470);
        setTimeout(function(){ resetar(valor);}, 1500);
        pX++;
        placarX.innerHTML=pX;
        aviso = 1;
    }
    //vitoria do X na terceira coluna
    else if(tabuleiro[2]==1 && tabuleiro[5]==1 && tabuleiro[8]==1){
        desenhalinha(400,10,400,470);
        setTimeout(function(){ resetar(valor);}, 1500);
        pX++;
        placarX.innerHTML=pX;
        aviso = 1;
    }
    //vitoria do X na diagonal principal
    else if(tabuleiro[0]==1 && tabuleiro[4]==1 && tabuleiro[8]==1){
        desenhalinha(10,10,470,470);
        setTimeout(function(){ resetar(valor);}, 1500);
        pX++;
        placarX.innerHTML=pX;
        aviso = 1;
    }
    //vitoria do X na diagonal secundária
    else if(tabuleiro[2]==1 && tabuleiro[4]==1 && tabuleiro[6]==1){
        desenhalinha(470,10,10,470);
        setTimeout(function(){ resetar(valor);}, 1500);
        pX++;
        placarX.innerHTML=pX;
        aviso = 1;
    }
    //empate
    else if(tabuleiro[0] != null && tabuleiro[1] != null && tabuleiro[2] != null
        && tabuleiro[3] != null && tabuleiro[4] != null && tabuleiro[5] != null
        && tabuleiro[6] != null && tabuleiro[7] != null && tabuleiro[8] != null){
            setTimeout(function(){ resetar(valor);}, 1500);
            aviso = 1;
        }
}


//inteligencia do oponente com 1p

function oponente(){
    var pontoJogar;
    var jogou = false;
    //jogadas de vitórias scriptada para tornar IA competitiva primariamente vencendo e bloqueando vitórias
    // vitória na primeira linha
        if((tabuleiro[0] != null && tabuleiro[1] != null) && 
        (tabuleiro[0] == tabuleiro[1]) && (tabuleiro[0] != init && tabuleiro[2] == null)){
            proximo(valor,2,5,1);
        }
        else if((tabuleiro[1] != null && tabuleiro[2] != null) && 
        (tabuleiro[1] == tabuleiro[2]) && (tabuleiro[1] != init && tabuleiro[0] == null)){
            proximo(valor,0,1,1);
        }
        else if((tabuleiro[0] != null && tabuleiro[2] != null) 
        && (tabuleiro[0] == tabuleiro[2]) && (tabuleiro[0] != init && tabuleiro[1]==null)){
            proximo(valor,1,3,1)
        }
        // //vitória na segunda linha
        else if((tabuleiro[3] != null && tabuleiro[4] != null) 
        && (tabuleiro[3] == tabuleiro[4]) && tabuleiro[3] != init && tabuleiro[5] == null){
            proximo(valor,5,5,3);
        }
        else if((tabuleiro[4] != null && tabuleiro[5] != null) 
        && (tabuleiro[4] == tabuleiro[5]) && tabuleiro[4] != init && tabuleiro[3] == null){
            proximo(valor,3,1,3);
        }
        else if((tabuleiro[3] != null && tabuleiro[5] != null) 
        && (tabuleiro[3] == tabuleiro[5]) && tabuleiro[3] != init && tabuleiro[4] == null){
            proximo(valor,4,3,3);
        }
        // //vitória na terceira linha
        else if((tabuleiro[6] != null && tabuleiro[7] != null) 
        && (tabuleiro[6] == tabuleiro[7]) && tabuleiro[6] != init && tabuleiro[8] == null){
            proximo(valor,8,5,5);
        }
        else if((tabuleiro[7] != null && tabuleiro[8] != null) 
        && (tabuleiro[7] == tabuleiro[8]) && tabuleiro[7] != init && tabuleiro[3] == null){
            proximo(valor,6,1,5);
        }
        else if((tabuleiro[6] != null && tabuleiro[8] != null) 
        && (tabuleiro[6] == tabuleiro[8]) && tabuleiro[6] != init && tabuleiro[7] == null){
            proximo(valor,7,3,5);
        }
        // //vitória na primeira coluna
        else if((tabuleiro[0] != null && tabuleiro[3] != null) 
        && (tabuleiro[0] == tabuleiro[3]) && (tabuleiro[0] != init && tabuleiro[6] == null)){
            proximo(valor,6,1,5);
        }
        else if((tabuleiro[3] != null && tabuleiro[6] != null) 
        && (tabuleiro[3] == tabuleiro[6]) && tabuleiro[6] != init && tabuleiro[0] == null){
            proximo(valor,0,1,1);
        }
        else if((tabuleiro[0] != null && tabuleiro[6] != null) 
        && (tabuleiro[0] == tabuleiro[6]) && tabuleiro[0] != init && tabuleiro[3] == null){
            proximo(valor,3,1,3);
        }
        // //vitória na segunda coluna
        else if((tabuleiro[1] != null && tabuleiro[4] != null) 
        && (tabuleiro[1] == tabuleiro[4]) && tabuleiro[4] != init && tabuleiro[7] == null){
            proximo(valor,7,3,5);
        }
        else if((tabuleiro[4] != null && tabuleiro[7] != null) 
        && (tabuleiro[4] == tabuleiro[7]) && tabuleiro[7] != init  && tabuleiro[1]==null){
            proximo(valor,1,3,1);
        }
        else if((tabuleiro[1] != null && tabuleiro[7] != null) 
        && (tabuleiro[1] == tabuleiro[7]) && tabuleiro[1] != init && tabuleiro[4] == null){
            proximo(valor,4,3,3);
        }
        // //vitória na terceira coluna
        else if((tabuleiro[2] != null && tabuleiro[5] != null) 
        && (tabuleiro[2] == tabuleiro[5]) && tabuleiro[5] != init && tabuleiro[8] == null){
            proximo(valor,8,5,5);
        }
        else if((tabuleiro[5] != null && tabuleiro[8] != null) 
        && (tabuleiro[5] == tabuleiro[8]) && tabuleiro[8] != init && tabuleiro[2] == null){
            proximo(valor,2,5,1);
        }
        else if((tabuleiro[2] != null && tabuleiro[8] != null) 
        && (tabuleiro[2] == tabuleiro[8]) && tabuleiro[8] != init && tabuleiro[5] == null){
            proximo(valor,5,5,3);
        }
        // // vitoria na diagonal principal
        else if((tabuleiro[0]!= null && tabuleiro[8]!= null)&& (tabuleiro[0]==tabuleiro[8])
        && (tabuleiro[8] != init && tabuleiro[4] == null)){
            proximo(valor,4,3,3);
        }
        else if((tabuleiro[0]!= null && tabuleiro[4]!= null)&& (tabuleiro[0]==tabuleiro[4])
        && (tabuleiro[4] != init && tabuleiro[8] == null)){
            proximo(valor,8,5,5);
        }
        else if((tabuleiro[4]!= null && tabuleiro[8]!= null)&& (tabuleiro[4]==tabuleiro[8])
        && (tabuleiro[8] != init && tabuleiro[0] == null)){
            proximo(valor,0,1,1);
        }
        // // vitoria na diagonal secundaria
        else if((tabuleiro[2]!= null && tabuleiro[6]!= null)&& (tabuleiro[2]==tabuleiro[6])
        && (tabuleiro[2] != init && tabuleiro[4] == null)){
            proximo(valor,4,3,3);
        }
        else if((tabuleiro[2]!= null && tabuleiro[4]!= null)&& (tabuleiro[2]==tabuleiro[4])
        && (tabuleiro[4] != init && tabuleiro[6] == null)){
            proximo(valor,6,1,5);
        }
        else if((tabuleiro[4]!= null && tabuleiro[6]!= null)&& (tabuleiro[4]==tabuleiro[6])
        && (tabuleiro[4] != init && tabuleiro[2] == null)){
            proximo(valor,2,5,1);
        }

        //com semantica muito proxima da vitória,os bloqueios precisam ser colocado depois pois é 
        //prioritário vencer

        // //bloqueio de vitória na primeira linha
        else if((tabuleiro[0] != null && tabuleiro[1] != null) && 
        (tabuleiro[0] == tabuleiro[1]) && (tabuleiro[0] == init && tabuleiro[2] == null)){
            proximo(valor,2,5,1);
        }
        else if((tabuleiro[1] != null && tabuleiro[2] != null) && 
        (tabuleiro[1] == tabuleiro[2]) && (tabuleiro[1] == init && tabuleiro[0] == null)){
            proximo(valor,0,1,1);
        }
        else if((tabuleiro[0] != null && tabuleiro[2] != null) 
        && (tabuleiro[0] == tabuleiro[2]) && (tabuleiro[0] == init && tabuleiro[1]==null)){
            proximo(valor,1,3,1)
        }
        // //bloqueio de vitória na segunda linha
        else if((tabuleiro[3] != null && tabuleiro[4] != null) 
        && (tabuleiro[3] == tabuleiro[4]) && tabuleiro[3] == init && tabuleiro[5] == null){
            proximo(valor,5,5,3);
        }
        else if((tabuleiro[4] != null && tabuleiro[5] != null) 
        && (tabuleiro[4] == tabuleiro[5]) && tabuleiro[4] == init && tabuleiro[3] == null){
            proximo(valor,3,1,3);
        }
        else if((tabuleiro[3] != null && tabuleiro[5] != null) 
        && (tabuleiro[3] == tabuleiro[5]) && tabuleiro[3] == init && tabuleiro[4] == null){
            proximo(valor,4,3,3);
        }
        // //bloqueio de vitória na terceira linha
        else if((tabuleiro[6] != null && tabuleiro[7] != null) 
        && (tabuleiro[6] == tabuleiro[7]) && tabuleiro[6] == init && tabuleiro[8] == null){
            proximo(valor,8,5,5);
        }
        else if((tabuleiro[7] != null && tabuleiro[8] != null) 
        && (tabuleiro[7] == tabuleiro[8]) && tabuleiro[7] == init && tabuleiro[3] == null){
            proximo(valor,6,1,5);
        }
        else if((tabuleiro[6] != null && tabuleiro[8] != null) 
        && (tabuleiro[6] == tabuleiro[8]) && tabuleiro[6] == init && tabuleiro[7] == null){
            proximo(valor,7,3,5);
        }
        // //bloqueio de vitória na primeira coluna
        else if((tabuleiro[0] != null && tabuleiro[3] != null) 
        && (tabuleiro[0] == tabuleiro[3]) && (tabuleiro[0] == init && tabuleiro[6] == null)){
            proximo(valor,6,1,5);
        }
        else if((tabuleiro[3] != null && tabuleiro[6] != null) 
        && (tabuleiro[3] == tabuleiro[6]) && tabuleiro[6] == init && tabuleiro[0] == null){
            proximo(valor,0,1,1);
        }
        else if((tabuleiro[0] != null && tabuleiro[6] != null) 
        && (tabuleiro[0] == tabuleiro[6]) && tabuleiro[0] == init && tabuleiro[3] == null){
            proximo(valor,3,1,3);
        }
        // //bloqueio de vitória na segunda coluna
        else if((tabuleiro[1] != null && tabuleiro[4] != null) 
        && (tabuleiro[1] == tabuleiro[4]) && tabuleiro[4] == init && tabuleiro[7] == null){
            proximo(valor,7,3,5);
        }
        else if((tabuleiro[4] != null && tabuleiro[7] != null) 
        && (tabuleiro[4] == tabuleiro[7]) && tabuleiro[7] == init  && tabuleiro[1]==null){
            proximo(valor,1,3,1);
        }
        else if((tabuleiro[1] != null && tabuleiro[7] != null) 
        && (tabuleiro[1] == tabuleiro[7]) && tabuleiro[1] == init && tabuleiro[4] == null){
            proximo(valor,4,3,3);
        }
        // //bloqueio de vitória na terceira coluna
        else if((tabuleiro[2] != null && tabuleiro[5] != null) 
        && (tabuleiro[2] == tabuleiro[5]) && tabuleiro[5] == init && tabuleiro[8] == null){
            proximo(valor,8,5,5);
        }
        else if((tabuleiro[5] != null && tabuleiro[8] != null) 
        && (tabuleiro[5] == tabuleiro[8]) && tabuleiro[8] == init && tabuleiro[2] == null){
            proximo(valor,2,5,1);
        }
        else if((tabuleiro[2] != null && tabuleiro[8] != null) 
        && (tabuleiro[2] == tabuleiro[8]) && tabuleiro[8] == init && tabuleiro[5] == null){
            proximo(valor,5,5,3);
        }
        // //bloqueio de  vitoria na diagonal principal
        else if((tabuleiro[0]!= null && tabuleiro[8]!= null)&& (tabuleiro[0]==tabuleiro[8])
        && (tabuleiro[8] == init && tabuleiro[4] == null)){
            proximo(valor,4,3,3);
        }
        else if((tabuleiro[0]!= null && tabuleiro[4]!= null)&& (tabuleiro[0]==tabuleiro[4])
        && (tabuleiro[4] == init && tabuleiro[8] == null)){
            proximo(valor,8,5,5);
        }
        else if((tabuleiro[4]!= null && tabuleiro[8]!= null)&& (tabuleiro[4]==tabuleiro[8])
        && (tabuleiro[8] == init && tabuleiro[0] == null)){
            proximo(valor,0,1,1);
        }
        // // bloqueio de vitoria na diagonal secundaria
        else if((tabuleiro[2]!= null && tabuleiro[6]!= null)&& (tabuleiro[2]==tabuleiro[6])
        && (tabuleiro[2] == init && tabuleiro[4] == null)){
            proximo(valor,4,3,3);
        }
        else if((tabuleiro[2]!= null && tabuleiro[4]!= null)&& (tabuleiro[2]==tabuleiro[4])
        && (tabuleiro[4] == init && tabuleiro[6] == null)){
            proximo(valor,6,1,5);
        }
        else if((tabuleiro[4]!= null && tabuleiro[6]!= null)&& (tabuleiro[4]==tabuleiro[6])
        && (tabuleiro[4] == init && tabuleiro[2] == null)){
            proximo(valor,2,5,1);
        }
        //a maior prioridade é que se o oponente comçar em um canto é necessário por no meio(somente no
        //impossivel)
        else if((tabuleiro[0] != null || tabuleiro[2] != null || tabuleiro[6] != null
            || tabuleiro[8] != null) && tabuleiro[4] == null && dificuldade.innerHTML ==1){
                proximo(valor,4,3,3);
            }
        //em condições normais o computador tentará preencher os cantos(essas são jogado aleatórias
        // com diferentes niveis de prioridades)
        else if((tabuleiro[0] == null || tabuleiro[2] == null || tabuleiro[6] == null
            || tabuleiro[8] == null)){
            do{
                pontoJogar = Math.round(Math.random() * (4 - 1) + 1);
                if(pontoJogar == 1 && tabuleiro[0] ==null){
                    proximo(valor,0,1,1);
                    jogou=true;
                }else if(pontoJogar == 2 && tabuleiro[2] ==null){
                    proximo(valor,2,5,1);
                    jogou=true;
                }else if(pontoJogar == 3 && tabuleiro[6] ==null){
                    proximo(valor,6,1,5);
                    jogou=true;
                }else if(pontoJogar == 4 && tabuleiro[8] ==null){
                    proximo(valor,8,5,5);
                    jogou=true;
                }
            }while(jogou!=true);
        }
        else if(tabuleiro[4] == null){
            proximo(valor,4,3,3);
        }
        else if((tabuleiro[1] == null || tabuleiro[3] == null || tabuleiro[5] == null
            || tabuleiro[7] == null)){
            do{
                pontoJogar = Math.round(Math.random() * (4 - 1) + 1);
                if(pontoJogar == 1 && tabuleiro[1] ==null){
                        proximo(valor,1,3,1);
                    jogou=true;
                }else if(pontoJogar == 2 && tabuleiro[3] ==null){
                        proximo(valor,3,1,3);
                    jogou=true;
                }else if(pontoJogar == 3 && tabuleiro[5] ==null){
                        proximo(valor,5,5,3);
                    jogou=true;
                }else if(pontoJogar == 4 && tabuleiro[7] ==null){
                        proximo(valor,7,3,5);
                    jogou=true;
                }
            }while(jogou!=true);
        }

    }
