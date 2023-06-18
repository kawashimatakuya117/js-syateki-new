const box = document.getElementById('box')
const Sbtn = document.getElementById('start_btn')
const Rbtn = document.getElementById('restart_btn')

let x = 0;//的の画像の垂直座標の初期値
let y = 0;//的の画像の水平座標の初期値
let imgNum = 0;
let count = 0; //的を打った回数の初期値
let hitAVG = 0; //命中率
let hit = 0; //ヒットした回数
let i = 10;//制限時間

let imgSrc = new Array("images/keihin0.png","images/keihin1.png","images/keihin2.png","images/keihin3.png","images/keihin4.png",); //景品画像をまとめた配列






    
 
   
                




Sbtn.addEventListener('click', start)
// 的をランダムに表示し、打った回数を数える関数
function randomTarget() {
    count++;
    x = Random(0, 400);
    y = Random(0, 900);
    imgNum = Math.floor( Math.random() * 5 );
    document.getElementById('target').style.top = x + "px";
    document.getElementById('target').style.left = y + "px";
    document.getElementById("target").src=imgSrc[imgNum];
    
}

// 的の画像を動かすための座標をランダムに生成する関数
function Random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}




time(i);//制限時間の表示

// 制限時間を１ずつ引いていく関数
let countDown = function () {
    time(i--);
}

//スタートボタンが押された際の処理をまとめた関数
function start() {
    box.addEventListener('click', () => {
        hitAvg()
    })
    let timer = setInterval(function () {
        countDown();

        if (i < 0) {
            clearInterval(timer);
            result();
            document.getElementById('target').style.display = "none";
            document.getElementById('restart_btn').style.display = "block";
            document.getElementById('returnBtn').style.display = "block";
            restart_btn.addEventListener('click', () => {
                restart();
            });
        }
    }, 1000);
 
    document.getElementById('target').style.display = "block";
    document.getElementById('start_btn').style.display = "none";
}

function restart() {
    document.location.reload();
}


//残り時間を表示する関数
function time(text) {
    let isDisplay = document.getElementById('idDisplay');
    isDisplay.innerHTML = "<p>残り時間：" + text + "</p>";
}

//cssのdisplayの欄をblockにする関数
function onBlock(where) {
    document.getElementById(where).style.display = 'block';
}

//リザルトを表示する関数
function result() {
    onBlock('result');
    score();
    document.getElementById('idDisplay').style.display = "none";
}

//命中率を求める関数
function hitAvg() {
    hit++;
    outHit = hit - count;
    hitAVG = count / (outHit + count);
    console.log('hitAvg()');
    // document.getElementById('point').innerHTML = outHit;
}

//命中率と得点を表示する関数
function score() {
    // document.getElementById('point').innerHTML = "外した数：" + outHit;
    let tokuten = count * 100 * Math.round(hitAVG * 10);
    document.getElementById('result').innerHTML = "<div class = result>" + "<h3>RESULT</h3><div class = score><p>撃った数<br>"+ count +
    "</p><p>命中精度<br>" + Math.round(hitAVG * 100) +"%</p></div><div class = total-score>"+"<p>得点" + "<br>"+ tokuten + "点</p></div></div>";
}