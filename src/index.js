import Polyglot from 'node-polyglot';

class TranslationApp {
  constructor() {
    this.polyglot = new Polyglot();
  }

  setup() {
    /* 
      現在のLocaleに合わせて、polyglotにメッセージをセットします。
      メッセージのセットにはpolyglot.extend()を利用します。
    */
    polyglot.extend({
      "こんにちは、世界" : "Hello, World!"
    });
    polyglot.t("こんにちは、世界");
  }

  updateLocale(e) {
    /*
      ボタンにセットされたdata-localeを元に現在のlocaleを変更します。
    */
   const japanese = polyglot.locale("japanese");
   const English = polyglot.locale("english");
  }

  showMessage() {
    /*
      mainというidがセットされた要素の下にh1タグで現在のlocaleに応じて、メッセージを表示します。 
    */
    const main = document.getElementById('main');
    const div = document.createElement('div');
    main.appendChild(div);
    return div.innerHTML = `<h1>${this.polyglot.t}</h1>`
  }
}

const polyglot = new TranslationApp();
polyglot.showMessage();

{
  const button1 = document.getElementById('button1');
  button1.addEventListener("click", app.updateLocale);
  
  const button2 = document.getElementById('button2');
  button2.addEventListener("click", app.updateLocale);
}