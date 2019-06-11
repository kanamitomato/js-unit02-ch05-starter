import Polyglot from 'node-polyglot';

class TranslationApp {
  constructor() {
    this.polyglot = new Polyglot();
    this.currentLocale = localStorage.getItem('locale') || 'ja';
    //this.updateLocale = 
  }

  setup() {
    /* 
      現在のLocaleに合わせて、polyglotにメッセージをセットします。
      メッセージのセットにはpolyglot.extend()を利用します。
    */
    const currentLocale = this.currentLocale
    if(currentLocale === 'ja'){
      polyglot.extend({
        "message" : "こんにちは、世界"
      });
    } else {
      polyglot.extend({
        "message" : "Hello, world"
      });
    }
  }

  updateLocale(e) {
    /*
      ボタンにセットされたdata-localeを元に現在のlocaleを変更します。
    */
  }

  showMessage() {
    /*
      mainというidがセットされた要素の下にh1タグで現在のlocaleに応じて、メッセージを表示します。 
    */
    const main = document.getElementById('main');
    const div = document.createElement('div');
    main.appendChild(div);
    return div.innerHTML = `<h1>${this.polyglot.t("message")}</h1>`
  }
}

{
  const app = new TranslationApp();
  
  const button1 = document.getElementById('button1');
  button1.addEventListener("click", app.updateLocale);
  
  const button2 = document.getElementById('button2');
  button2.addEventListener("click", app.updateLocale);

  app.showMessage();
}