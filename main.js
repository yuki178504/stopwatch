$(document).ready(function() { //jqueryを宣言するためのコード

let time = 0;　//時間が経過した時に使う変数

let mid = 0;　//経過時間の変数を一旦退避させておくための変数

let now;　//スタートボタンを押したときに現在の時間を入れるための変数

let minTime = 0;　//タイマーの分を入れるための変数


let count;

let min = $("#min");

let sec = $("#sec");

let start = $("#start");

let stop = $("#stop");

let reset = $("#reset");


//startボタンを押した時
  start.click(function() {　
	now = new Date();　//スタートボタンを押したときに現在の時刻を取得するメソッドをnowに代入している
	count = setInterval(counter,10);　//経過時間を出す関数をsetIntervalによって繰り返している
	toggle(); //ボタンの切り替え
});

//stopボタンを押した時
  stop.click(function() {
  mid += (new Date() - now)/1000; //midに現在の経過時間を代入する(そうしないとストップを押したときに値が0に戻ってしまう)
  clearInterval(count); //clearIntervalでカウントの処理を停止させる
  toggle();
});

//resetボタンを押した時
reset.click(function() {
  mid = 0; //ストップを押したときに代入していた時間の経過を0に戻すため
  minTime = 0; //分の値を60秒ごとに+1する処理を0に戻すための変数代入
  min.html("0"); //時間の分の表示を0にするための要素
  sec.html("00.00");　//時間の秒の表示を0にするための要素
});
//時間が経過した時
function counter() { //カウンターという関数を作っている
  time = mid + ((new Date() - now)/1000); /*mid=(経過時間を退避させておく変数)+(現在の経過時刻からスタートボタンを押したときの時刻を引いている)
  それを1000で割れば現在の経過時刻になる*/
  //60秒経った時
  if (time>60) { //経過時間が60秒より大きければ
    mid = 0; 
    minTime ++; //分を+1する
    now = new Date(); //初期化したので再代入をする
    time = 0; //経過時間の変数を初期化する
  }
   //秒数が10秒より小さかったら01, 02のようにする
  if(time < 10){
            sec.html("0"+time.toFixed(2)); //小数点以下の桁数を２桁にする
        }else{
            sec.html(time.toFixed(2));
        }
        min.html(minTime); //分の表示
}
  
  
  //ボタンを切り替える
  function toggle() {
    if (!start.prop("disabled")) { //スタートボタンを押したとき
       start.prop("disabled", true); //スタートを押したときにdisabledをつけるのでボタンが無効になる
       stop.prop("disabled", false); //ストップボタンを押したときにdisabledを外すのでボタンが有効になる
       reset.prop("disabled", true); //リセットボタンを押したときにdisabledをつけるのでボタンが無効になる
        }
    else{ //それ以外の時
        start.prop("disabled", false); //スタートボタンが押されていないときにdisabledを外すのでボタンが有効になる
        stop.prop("disabled", true); //ストップボタンを押したときにdisabledをつけるのでボタンが無効になる
        reset.prop("disabled", false); //リセットを押したときにdisabledを外すのでボタンが有効になる
        }
    }
  
});