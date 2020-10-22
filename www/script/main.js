//メニュー画面のスクリプト
const btn = document.querySelector('.btn-menu');
const nav = document.querySelector('nav');

btn.addEventListener('click', () => {
  nav.classList.toggle('open-menu')
});

//入力内容のクリア
function clearinput() {
  document.scanresult.Destinationpubkey.value = "";
  document.scanresult.Amount.value = "";
}

/*mainのQRスキャナファンクション*/
function scanBarcode1() {
  cordova.plugins.barcodeScanner.scan(
    function (result) {
      if (result.text == "") {
        return;
      }
      var a = confirm("Get Destination Publickey!\n" + "\n" + result.text + "\n");
      if (a == true) {
        localStorage.setItem('data', result.text);
        location.href = './sendinfo.html';
      }
      else {
        return;
      }
    },
    function (error) {
      alert("Scanning failed: " + error);
    },
    {
      preferFrontCamera: true, // iOS and Android
      showFlipCameraButton: true, // iOS and Android
      showTorchButton: true, // iOS and Android
      torchOn: true, // Android, launch with the torch switched on (if available)
      saveHistory: true, // Android, save scan history (default false)
      prompt: "Place a barcode inside the scan area", // Android
      resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
      formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
      orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
      disableAnimations: true, // iOS
      disableSuccessBeep: false // iOS and Android
    }

  );
}
/*sendpageのQRスキャナファンクション*/
function scanBarcode2() {
  cordova.plugins.barcodeScanner.scan(
    function (result) {
      if (result.text == "") {
        return;
      }
      var b = confirm("Get Destination Publickey!\n" + "\n" + result.text + "\n");
      if (b == true) {
        document.scanresult.Destinationpubkey.value = result.text;
      }
      else {
        return;
      }
    },
    function (error) {
      alert("Scanning failed: " + error);
    },
    {
      preferFrontCamera: true, // iOS and Android
      showFlipCameraButton: true, // iOS and Android
      showTorchButton: true, // iOS and Android
      torchOn: true, // Android, launch with the torch switched on (if available)
      saveHistory: true, // Android, save scan history (default false)
      prompt: "Place a barcode inside the scan area", // Android
      resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
      formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
      orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
      disableAnimations: true, // iOS
      disableSuccessBeep: false // iOS and Android
    }

  );
}
//QRによるアドレス登録
function scanBarcode3() {
  cordova.plugins.barcodeScanner.scan(
    function (result) {
      var name = prompt("Get Registration Publickey!\n" + "\n" + result.text + "\n\n" + "Please enter registration name\n");
      if (name) {
        var regist1 = confirm("Entered PublicKey\n\n" + result.text + "\n\n" + "Entered Name\n\n" + name);
        var pubkey = result.text;
        if (regist1 == true) {
          addtable(name, pubkey)
          alert("指定の情報で登録しました！");
        }
        else {
          alert("登録せずに終了します");
        }
      }
      else if (name == "") {
        name = "No name";
        var pubkey = result.text;
        var regist2 = confirm("Entered PublicKey\n\n" + result.text + "\n\n" + "Entered Name\n\n" + name);
        if (regist2 == true) {
          addtable(name, pubkey)
          alert("指定の情報で登録しました！");
        }
        else {
          alert("登録せずに終了します");
        }
      }
      else {
        alert("登録せずに終了します");
      }

    },
    function (error) {
      alert("Scanning failed: " + error);
    },
    {
      preferFrontCamera: true, // iOS and Android
      showFlipCameraButton: true, // iOS and Android
      showTorchButton: true, // iOS and Android
      torchOn: true, // Android, launch with the torch switched on (if available)
      saveHistory: true, // Android, save scan history (default false)
      prompt: "Place a barcode inside the scan area", // Android
      resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
      formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
      orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
      disableAnimations: true, // iOS
      disableSuccessBeep: false // iOS and Android
    }

  );
}
//クリップボードによるアドレスの登録
function register() {
  var conf = confirm("クリップボードに登録する相手の\nパブリックキー は保存しましたか？\n");
  if (conf == true) {
    //PublicKeyの入力
    var pubkey = prompt("Please Paste PublicKey\n");
    if (pubkey) {
      //登録名の入力
      var name = prompt("Please type registration name\n", '');
      if (name == null) {
        alert("登録せずに終了します");
        return;
      }
      else if (name == '') {
        name = "No name";
        var regist3 = confirm("Entered PublicKey\n\n" + pubkey + "\n\n" + "Entered Name\n\n" + name);
        if (regist3 == true) {
          addtable(name, pubkey);
          alert("指定の情報で登録しました！");
        }
        else {
          alert("登録せずに終了します");
        }
      }
      else {
        var regist4 = confirm("Entered PublicKey\n\n" + pubkey + "\n\n" + "Entered Name\n\n" + name);
        if (regist4 == true) {
          addtable(name, pubkey);
          alert("指定の情報で登録しました！");
        }
        else {
          alert("登録せずに終了します");
        }
      }
    }
    else {
      alert("相手のパブリックキーをクリップボードからペーストしなおしてくださいください！");
      return;
    }
  }
  else {
    alert("相手のパブリックキーをクリップボードに保存し再実行してください！");
    return;
  }
}
//パブリックキーからのQR生成
function generateQR() {
  var el = document.getElementById('qrcode');
  var options = {
    text: localStorage.getItem('publickey'),
    width: 140,
    height: 140,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  };
  new QRCode(el, options);
}
//QR拡大表示
function lergeQR() {
  var el = document.getElementById('lergeqr');
  var options = {
    text: localStorage.getItem('publickey'),
    width: 270,
    height: 270,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  };
  new QRCode(el, options);
}
//about ChaCha
function chachacoin() {
  alert("About\tChaChaMobileVer1.0\n" + "\n"
    + "Technology:\nMiyabi BrockChain(by Bitflyer)\n\n"
    + "Frontend Program Language:\nHTML,CSS,javascript(jquery)\n\n"
    + "Backend Program Language:\nc#(ASP.NETCORE),HTML,CSS,\njavascript(jquery)\n\n"
    + "Developper:\n@yanchal_crypto(Twitter)\n\n"
    + "ConsensusAlgorithm  :BFK2\n\n"
    + "Processing performance:\n4000 case/Sec\n\n"
    + "About ChaChaCoin\n\n"
    + "          Infomal Hinatazaka Token");
}

//Contactdevelopper
function contact() {
  var cont = confirm("公式に質問を行いますか？\n\n" + "質問する場合はOKを押してください!\n（twitterにアクセスします）");
  if (cont == true) {
    const url = 'https://twitter.com/ChaChaWalletJP'
    window.open(url, '_blank');
  }
  else {
    return;
  }
}
//access blogpage
function manual() {
  var responce = confirm("ユーザーマニュアルに移動しますか？\n\n" + "移動する場合はOKを押してください!\n（blogにアクセスします）");
  if (responce == true) {
    const url = 'https://chal-convenience-info.net/chachamobile/'
    window.open(url, '_blank');
  }
  else {
    return;
  }
}
//table値を入力
function addtable(name, pubkey) {
  var key = localStorage.getItem('key');
  if (key > 0) {
  }
  else if (key == null) {
    key = 0;
  }
  let table = document.getElementById('listtable');
  let newRow = table.insertRow();

  key++;
  let newCell = newRow.insertCell();
  let newText = document.createTextNode(key);
  newCell.appendChild(newText);

  newCell = newRow.insertCell();
  newText = document.createTextNode(name);
  newCell.appendChild(newText);

  newCell = newRow.insertCell();
  newText = document.createTextNode(pubkey);
  newCell.appendChild(newText);

  var datalist = {
    num: key,
    name1: name,
    pubkey1: pubkey
  };
  localStorage.setItem('key', key);
  localStorage.setItem(key, JSON.stringify(datalist));
}
//localStorageの読み出し
function load() {

  var publickey = localStorage.getItem('publickey');
  document.getElementById('myPublickey').innerHTML = publickey;
  var data = "";
  if (localStorage.getItem(1) == null) {
    return;
  }
  else {
    for (i = 1; i <= localStorage.length + 1; i++) {
      data = JSON.parse(localStorage.getItem(i));
      var num = data.num;
      var name = data.name1;
      var pubkey = data.pubkey1;

      let table = document.getElementById('listtable');
      let newRow = table.insertRow();

      let newCell = newRow.insertCell();
      let newText = document.createTextNode(num);
      newCell.appendChild(newText);

      newCell = newRow.insertCell();
      newText = document.createTextNode(name);
      newCell.appendChild(newText);

      newCell = newRow.insertCell();
      newText = document.createTextNode(pubkey);
      newCell.appendChild(newText);
    }
  }
}
//ローカルストレージから削除
function Delete() {
  var conf = confirm("アドレスデータをローカルから全て削除します！")
  if (conf == true) {
    //ローカルデータの一時避難
    var privatekey = localStorage.getItem('privatekey');
    var publickey = localStorage.getItem('publickey');
    var date = [];
    var amount = [];
    for (i = 1; i <= 5; i++) {
      var datekey = "date" + i;
      var amountkey = "amount" + i;
      date.push(localStorage.getItem(datekey));
      amount.push(localStorage.getItem(amountkey));
    }
    //ローカルの全てをクリア
    localStorage.clear();
    //避難からの戻し
    localStorage.setItem('privatekey', privatekey);
    localStorage.setItem('publickey', publickey);
    for (i = 1; i <= 5; i++) {
      var datekey = "date" + i;
      var amountkey = "amount" + i;
      localStorage.setItem(datekey, date[i - 1]);
      localStorage.setItem(amountkey, amount[i - 1]);
    }
    alert("全て削除しました！\nページ再読み込み後反映されます！")
  }
  else {
    alert("削除せずに終了します");
    return;
  }
}
//コインの送金情報に関して
function send() {
  var button = document.getElementById("sendbutton");
  button.disabled = true;
  var myprivatekey = localStorage.getItem('privatekey');
  var destinationpubkey = deistination.value;
  var coinamount = amount.value;
  if (destinationpubkey == "" || coinamount == "") {
    alert("空白のテキストボックス があります！\n入力してください！");
    button.disabled = false;
    return;
  }
  var Transactioninfo = {
    my_privatekey: myprivatekey,
    opponet_pubkey: destinationpubkey,
    send_amount: coinamount
  }
  var json = JSON.stringify(Transactioninfo);
  alert(json);

  $.ajax({
    type: "post",                     //method = "post"
    url: "https://chachacoin.net/~",             // POST送信先のURL
    data: JSON.stringify(Transactioninfo),   // JSONデータ本体
    contentType: 'application/json', // リクエストの Content-Type
    dataType: "json",                // レスポンスをJSONとしてパースする
    timespan: 10000,                  // 通信のタイムアウト(10秒)
  }).done(function (Result) {//Result;レスポンスのJSON,textStatus通信結果のステータス リクエスト成功時
    var code1 = Result.code;
    switch (code1) {
      case 1:
        alert("プライベートキーが適正な値ではありません！");
        break;
      case 2:
        alert("自分のプライベートキーから変換に失敗しました！\n開発者にお問い合わせください！");
        break;
      case 3:
        alert("入力された送信者のパブリックキーが不適当です！\n入力値を再入力してください！");
        break;
      case 4:
        alert("数字でない文字が入力されています！\n数字を入力してください！");
        break;
      case 5:
        alert("送信に成功しました！\n\ntransactionID:\n" + Result.transactionId + "\n\nSend_Result:\n" + Result.result);
        hystorylog(coinamount);
    };
    //HTTPレスポンスが失敗で帰ってきた場合
  }).fail(function (jqXHR, textStatus, errorThrown) {
    alert("HTTPレスポンスの結果\n" + jqXHR.status + "\n" + textStatus + "\n" + errorThrown + "\n再度送金を試してください！\nもう一度試してエラーの場合はお問い合わせください！");
  });
  button.disabled = false;
}
//ローカルストレージ のプライベートキーの有無確認とブロックチェーンからデータの取得 
function showasset() {
  recenttransaction();
  if ((localStorage.getItem('privatekey')) == null) {
    var registname = prompt("Please type your name!(半角英字)\n*@,!,#,-などの記号は使わないでください!");
    if (registname == "" || registname == null) {
      alert("このままでは登録動作を使用できません！アプリの再起動をしてください！");
      return;
    }
    else {
      var RegistName = {
        nickname: registname
      };
      $.ajax({
        type: "post",                     //method = "post"
        url: "https://chachacoin.net/~",   // POST送信先のURL
        data: JSON.stringify(RegistName), // JSONデータ本体
        contentType: 'application/json', // リクエストの Content-Type
        dataType: "json",                // レスポンスをJSONとしてパースする
        timespan: 5000,                  // 通信のタイムアウト(5秒)
      }).done(function (getkeypair, textStatus) {//Result;レスポンスのJSON,textStatus通信結果のステータス リクエスト成功時
        var privatevalue = getkeypair.PrivateKey;
        var publicvalue = getkeypair.PublicKey;
        alert("必ずスクリーンショートは保管してください！\n\nYour_PrivateKey\n\n" + privatevalue + "\n\nYour_PublicKey\n\n" + publicvalue);
        localStorage.setItem('privatekey', privatevalue);
        localStorage.setItem('publickey', publicvalue);
      }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("サーバーサイドからキーペアの取得に失敗しました！アプリの再起動をしてください！");
      });
    }
  }
  var mypublickey = localStorage.getItem('publickey');// ローカルストレージに保存されたパブリックキー を呼び出す
  var Showamount = {
    my_publickey: mypublickey
  };
  $.ajax({
    type: "post",                     //method = "post"
    url: "https://chachacoin.net/~",             // POST送信先のURL
    data: JSON.stringify(Showamount), // JSONデータ本体
    contentType: 'application/json', // リクエストの Content-Type
    dataType: "json",                // レスポンスをJSONとしてパースする
    timespan: 5000,                  // 通信のタイムアウト(5秒)
  }).done(function (Showresult, textStatus) {//Result;レスポンスのJSON,textStatus通信結果のステータス リクエスト成功時
    var show = Showresult.coin_amount;
    document.getElementById("content2").innerHTML = show;
  }).fail(function (jqXHR, textStatus, errorThrown) {
    document.getElementById("content2").innerHTML = "ー";
  });
}
//テキストボックスにfocusされたとき
//送信情報画面起動時のlocalstrage呼び出し
function detection() {
  var scan = localStorage.getItem('data');
  document.scanresult.Destinationpubkey.value = scan;
  localStorage.removeItem('data');

  var textpublic = document.getElementById("deistination");
  if (textpublic.addEventListener) {

    textpublic.addEventListener("focusin", OnFocusInForm, false);
    textpublic.addEventListener("focusout", OnFocusOutForm, false);
  }
  var textpublic2 = document.getElementById("amount");
  if (textpublic2.addEventListener) {

    textpublic2.addEventListener("focusin", OnFocusInForm, false);
    textpublic2.addEventListener("focusout", OnFocusOutForm, false);
  }


  function OnFocusInForm(event) {
    $('#returnbutton').delay(60).hide(10);
    $('#QRreder').delay(60).hide(10);
  }
  function OnFocusOutForm(event) {
    $('#returnbutton').delay(50).show(10);
    $('#QRreder').delay(50).show(10);
  }
}

//裏オプション
$('#chacha').bind('touchend', function () {
  clearInterval(timer1);
});
$('#chacha').bind('touchstart', function () {
  timer1 = setTimeout(function () {
    var privatekey = prompt("Please paste your Privatekey\n\n(＊プライベートキーを再登録する時のみ使ってください！)");
    if (privatekey) {
      var MyPrivateKey = {
        BeforeParsePrivateKey: privatekey
      };
      $.ajax({
        type: "post",                     //method = "post"
        url: "https://chachacoin.net/~",             // POST送信先のURL
        data: JSON.stringify(MyPrivateKey), // JSONデータ本体
        contentType: 'application/json', // リクエストの Content-Type
        dataType: "json",                // レスポンスをJSONとしてパースする
        timespan: 5000,                  // 通信のタイムアウト(5秒)
      }).done(function (parsepublickey, textStatus) {//Result;レスポンスのJSON,textStatus通信結果のステータス リクエスト成功時
        if (parsepublickey.AfterParsepublickey == null || parsepublickey.AfterParsepublickey == "") {
          alert("登録したprivatekeyが誤っている可能性があります！\n再度保存のキー文字列を確認して登録ください！");
          return;
        }
        var Key = parsepublickey.AfterParsepublickey;
        localStorage.setItem('privatekey', privatekey);
        localStorage.setItem('publickey', Key);
        alert("your publickey\n\n" + Key + "\n\nComplete Regist Privatekey&PublicKey your localstorage\n");
      }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("PublicKeyの取得に失敗しました！\n再度行いダメな場合は開発者に連絡ください！\n");
      });
    }
    else {
      alert("PrivateKeyの登録を行いませんでした！");
    }
  }, 2000);
});
//recent transactionの記録
function hystorylog(amount) {
  var a = localStorage.getItem('date1');
  var b = localStorage.getItem('date2');
  var c = localStorage.getItem('date3');
  var d = localStorage.getItem('date4');
  var e = localStorage.getItem('date4');
  //時刻取得
  var now = new Date();
  var year = now.getFullYear();
  var mon = now.getMonth() + 1; //１を足すこと
  var day = now.getDate();
  var hour = now.getHours();
  var min = now.getMinutes();
  var sec = now.getSeconds();
  var date = year + "/" + mon + "/" + day + "\t" + hour + ":" + min + ":" + sec;
  if (a == null) {
    localStorage.setItem('date1', date);
    localStorage.setItem('amount1', amount);
  }
  else if (b == null) {
    localStorage.setItem('date2', localStorage.getItem('date1'));
    localStorage.setItem('amount2', localStorage.getItem('amount1'));
    localStorage.setItem('date1', date);
    localStorage.setItem('amount1', amount);
  }
  else if (a != null && b != null && c == null) {
    localStorage.setItem('date3', localStorage.getItem('date2'));
    localStorage.setItem('amount3', localStorage.getItem('amount2'));
    localStorage.setItem('date2', localStorage.getItem('date1'));
    localStorage.setItem('amount2', localStorage.getItem('amount1'));
    localStorage.setItem('date1', date);
    localStorage.setItem('amount1', amount);
  }
  else if (a != null && b != null && c != null && d == null) {
    localStorage.setItem('date4', localStorage.getItem('date3'));
    localStorage.setItem('amount4', localStorage.getItem('amount3'));
    localStorage.setItem('date3', localStorage.getItem('date2'));
    localStorage.setItem('amount3', localStorage.getItem('amount2'));
    localStorage.setItem('date2', localStorage.getItem('date1'));
    localStorage.setItem('amount2', localStorage.getItem('amount1'));
    localStorage.setItem('date1', date);
    localStorage.setItem('amount1', amount);
  }
  else if (a != null && b != null && c != null && d != null) {
    localStorage.setItem('date5', localStorage.getItem('date4'));
    localStorage.setItem('amount5', localStorage.getItem('amount4'));
    localStorage.setItem('date4', localStorage.getItem('date3'));
    localStorage.setItem('amount4', localStorage.getItem('amount3'));
    localStorage.setItem('date3', localStorage.getItem('date2'));
    localStorage.setItem('amount3', localStorage.getItem('amount2'));
    localStorage.setItem('date2', localStorage.getItem('date1'));
    localStorage.setItem('amount2', localStorage.getItem('amount1'));
    localStorage.setItem('date1', date);
    localStorage.setItem('amount1', amount);
  }
}
//送金履歴の読み出し
function recenttransaction() {
  for (i = 1; i <= 5; i++) {
    var datekey = "date" + i;
    var amountkey = "amount" + i;

    var date = localStorage.getItem(datekey);
    var amount = localStorage.getItem(amountkey) + "ChaCha";
    if (date == null) {
      return;
    }
    let table = document.getElementById('recentTable');
    let newRow = table.insertRow();

    let newCell = newRow.insertCell();
    let newText = document.createTextNode(date);
    newCell.appendChild(newText);

    newCell = newRow.insertCell();
    newText = document.createTextNode(amount);
    newCell.appendChild(newText);
  }
}
//プライベートキーの確認
function showprivatekey(){
  var privatekey = localStorage.getItem('privatekey');
  alert("スクリーンショットの保存がお済みで無い場合はスクリーンショットでの保存を推奨します!!\n\nyour privatekey\n\n" + privatekey);
}

/*以下今後の開発用のメモ*/
/*var num = prompt("削除するアドレスの番号を入力してください！");
var num1 = Number(num);
if(num1==0){
  return;
}
var result = Number.isInteger(num1);
if(result == true){
  var conf = confirm(num1 + "番のアドレスデータをローカルから削除します！")
  if(conf==true){
    localStorage.removeItem(num1)
    alert("削除しました！\nページ再読み込み後反映されますす！")
  }
  else{
    alert("削除せずに終了します");
    return;
  }
}
else{
  alert("数字以外を入力しましたので中断します！")
  return;
}*/
