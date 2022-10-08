  /* 
  厳格モード use strict
  今回から、 'use strict'; という見慣れないコードが出てきました。
  'use strict'; は、宣言後の記述ミスをエラーとして表示してくれる機能を呼び出すための記述です。
  日本語では「厳格モードを使う」という意味です。安全に開発するために、今後は厳格モードを使っていきましょう。
 */

  /* 
   const →　定数（後から変更できない！！変数として）
    
   今回は、 let ではなく const（コンスト）という変数宣言を利用しています。
   const で宣言された変数は、一度代入すると再代入できません（変数の値を後から変更できません）。これを定数といいます。
   const は「定数、一定」という意味の英単語 constant に由来します。

   let と const の使い分けはどのようにしていけばよいでしょうか？
   JavaScript の開発では、次の指針で変数宣言の方法を決めるのがよいでしょう。

   [定石]
    1. まずは const の使用を検討します。
    2. 変数の値を変更する必要がある場合のみ、let を使用します。
   なお、特別な理由がない限り、var は使用しないようにしましょう。
  */

'use strict';
const userNameInput       = document.getElementById('user-name');
const assessmentButton    = document.getElementById('assessment');
const resultDivided       = document.getElementById('result-area');
const tweetDivided        = document.getElementById('tweet-area');


userNameInput.onkeydown = event => {
  if(event.key === 'Enter'){
    assessmentButton.onclick();
  }
}


assessmentButton.onclick  = () => {
  const userName = userNameInput.value;//getElementByIdで持ってきた'user-Nama'の入力値（value）を変数として使います。
  if (userName.length === 0){
    //名前が空の時は処理を終了する (＝ 名前の長さが０の時 ==>　「userNeme === 0」)
    return;
  }


  
 

  //TODO 診断結果表示エリアの作成
  resultDivided.innerText = "";//下記解説参照
  const header = document.createElement('h3');
  header.innerText = '診断結果';
  resultDivided.appendChild(header);

  const paragraph =document.createElement('p');
  const result = assessment(userName);
  paragraph.innerText = result;
  resultDivided.appendChild(paragraph);

  /*
  //表示を消す
  removeALlChildren(resultDivided);
 */

  //TODO ツイートエリアの作成
  tweetDivided.innerText = '';
  const anchor =document.createElement('a');
  const hrefValue =
    'https://twitter.com/intent/tweet?button_hashtag=' +
    encodeURIComponent('あなたのいいところ') +
    '&ref_src=twsrc%5Etfw';
  anchor.setAttribute('href', hrefValue);
  anchor.setAttribute('class', 'twitter-hashtag-button');
  anchor.setAttribute('data-text', result);
  anchor.innerText = 'Tweet #あなたのいいところ';
  tweetDivided.appendChild(anchor);

  // widgets.js の設定
   const script = document.createElement('script');
   script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
   tweetDivided.appendChild(script);
};

  //attribute は「属性」
  
     /**
      *  ※解説※  
      * / 診断結果表示エリアの作成
                resultDivided.innerText = '';
                const header = document.createElement('h3');
         先ほども登場した innerText プロパティを用いて、診断結果表示エリアの内側の文字列を空文字列に変更します。

      *    このあなたのいいところ診断は、診断ボタンを 2 回以上押した場合、どんどん見出しと診断結果の段落が追加されてしまうことに気付いたでしょうか。
           試しに名前を入力後、何度も「診断する」ボタンを押してみましょう。
           この問題に対応するため、診断ボタンが押されたら一度、診断結果の div 要素の子どもの要素を全て削除する処理を入れてみましょう。

           つまりこの処理は、診断結果表示エリアの子どもの要素を全削除する、という動作をします。
         以上で連続して診断するボタンを押しても、見出しと診断結果が増えなくなりました。
 */



const answers = [
'{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
'{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
'{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
'{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
'{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
'{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
'{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
'{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
'{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
'{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
'{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
'{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
'{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
'{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
'{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
'{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
'{userName}のいいところは優しさです。あなたの優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
];



/** JSdoc
 * 名前から診断結果を返す関数です 
 * @param {string} userName 名前 
 * @returns{string} 診断結果 
 */

 /**
  * 「入力が同じ名前なら同じ診断結果を出力する」処理を考えてみましょう。
     ここでは、名前の文字列の 1 文字が実は「ただの整数である」という事実をうまく利用します。
     これはデジタル技術全般に通じるのですが、 プログラム上で現れるデータは、 2 進数の整数値でもあります。

      Chrome のデベロッパーツールの Console にて

       'A'.charCodeAt(0);
      と入力すると

       65
       と表示されるのではないでしょうか。
      これは、文字列を配列とみなして添え字が 0 番目の値（つまり最初の文字の A）を整数値とすると、そのコード番号は 65 であることを表しています。

   以上の仕組みをつかって
   名前の全ての文字のコード番号の整数値を足す
   足した結果を、診断結果のパターンの数で割った余りを取得する
   余りを診断結果の配列の添え字として、診断結果の文字列を取得するという処理にしてみましょう。このような、ソフトウェアの動きを決める処理のことをロジックと呼びます。
  */

function assessment(userName){
   //全文字のコード番号を取得してそれを足し合わせて合計値を求める
   let sumOfChartCode = 0;
   for (let i = 0; i < userName.length; i++) {
    sumOfChartCode = sumOfChartCode + userName.charCodeAt(i);
   }

   // 文字のコード番号の合計を回答の数で割って添字の数値を求める
   const index = sumOfChartCode % answers.length;
   let result = answers[index]; //返す診断結果の回答は　answers配列からindex番目の答えですよ。
   result = result.replaceAll('{userName}',userName);
   return result;

}

/**
 * 指定したhtml要素の子要素を全て削除する関数です
 * @param {HTMLelement} element 
 */
function removeALlChildren(element){
  while(element.firstChild){
    element.removeChild(element.firstChild);
  }

}

//テストコード　※ 以下無視
console.assert(
    assessment('太郎') ===
    '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );
console.assert(
  assessment('太郎')=== assessment('太郎'),
  '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません'
);
  
