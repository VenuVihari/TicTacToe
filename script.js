let cp='X';
let active=true;
function afterclick(box){
    if(active && !box.textContent){
        box.textContent=cp;
        box.classList.add('marked');
        if(winner(cp)){
            document.getElementById("announce").innerHTML=cp+" wins!"
            active=false;
        }
        else if(draw()){
            document.getElementById("announce").innerHTML="Game is draw!"
            
        }
        else{
            if(cp==='X'){
                cp='O';
            }
            else{
                cp='X';
            }
        }
    }

}
function winner(p){
    let box=document.getElementsByClassName('box');
    let combs=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for(let com of combs){
        let [a,b,c]=com;
        if(box[a].textContent===p&&box[b].textContent===p&&box[c].textContent==p){
            return true;
        }
    }
    return false;
}
function draw(){
    let boxes = document.getElementsByClassName("box");
    for (let box of boxes) {
        if (box.textContent === '') {
            return false;
        }
    }
    return true;
}
function reset(){
    let boxes = document.getElementsByClassName('box');
    for(const box of boxes){
        box.textContent = '';
        box.classList.remove("marked");
    }
    cp = 'X';
    let cont = document.getElementById('announce');
    cont.innerHTML = '';
    active=true;
}
