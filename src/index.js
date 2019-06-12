import Polyglot from 'node-polyglot';

class TranslationApp {
  constructor() {
    this.polyglot = new Polyglot();
    this.currentLocale = localStorage.getItem('locale') || 'ja';
    this.updateLocale = this.updateLocale.bind(this);
  }

  setup() {
    /* 
      現在のLocaleに合わせて、polyglotにメッセージをセットします。
      メッセージのセットにはpolyglot.extend()を利用します。
    */
    const currentLocale = this.currentLocale
    if(currentLocale === 'ja'){
      this.polyglot.extend({
        'message': 'こんにちは、世界',
      });
    } else {
      this.polyglot.extend({
        'message': 'Hello, world',
      });
    }
    this.polyglot.t('message');
  }

  updateLocale(e) {
    /*
      ボタンにセットされたdata-localeを元に現在のlocaleを変更します。
    */
    e.preventDefault();
    const getLocale = e.target.dataset.locale;
    localStorage.setItem('locale', getLocale);
    this.currentLocale = getLocale;
    console.log(getLocale);
    this.showMessage();
  }

  showMessage() {
    /*
      mainというidがセットされた要素の下にh1タグで現在のlocaleに応じて、メッセージを表示します。 
    */
    const main = document.getElementById('main');
    const div = document.createElement('div');
    main.appendChild(div);
    const getMessage = this.setup();
    return div.innerHTML = `<h1>${getMessage}</h1>`;
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