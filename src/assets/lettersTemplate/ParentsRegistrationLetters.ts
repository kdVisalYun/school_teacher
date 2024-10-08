const ParentsRegistrationLetters = `<div class="m-[20px] space-y-5">
  <h1 class="text-3xl text-center font-bold">保護者アプリ初回登録のご案内</h1>
  <div>
    <p>保護者の皆さま</p>
    <p>『イロドキ』は園で過ごすお子さま一人ひとりのわくわくドキドキした様子を選び届けるスマホアプリです。
    ご利用には登録が必要です。つきましては、以下の手順に沿ってアプリのインストールとご登録をお願いいたします。</p>
  </div>
  <div class="space-y-3">
    <div>
      <div class="flex items-center space-x-2">
        <div class="p-1 rounded text-[#eb6e7d] font-bold">STEP1</div>
        <h2 class="flex-1 text-lg font-bold">アプリをインストール</h2>
      </div>
      <div class="flex items-center space-x-2">
        <div class="bg-[#eb6e7d] px-1 py-0 rounded text-white font-bold invisible h-0">STEP1</div>
        <div class="flex-1">
          <p>お使いの端末に『イロドキ』をインストールしてください。</p>
          <div class="flex space-x-5">
            <div class="flex items-center space-x-1">
              <img alt="logo" src="/images/irodoki_app_icon.jpg" class="w-20 h-20" />
              <div>
                <p class="text-center">▼ iOS</p>
                <img alt="app_store_logo" src="/images/app_store_logo.jpg" class="w-24" />
              </div>
              <img alt="app_store_qr" src="/images/app_store_qr.jpg" class="w-20 h-20" />
            </div>
            <div class="flex items-center space-x-1">
              <div>
                <p class="text-center">▼ Android</p>
                <img alt="app_store_logo" src="/images/google_play_logo.jpg" class="w-24" />
              </div>
              <img alt="app_store_qr" src="/images/google_play_qr.jpg" class="w-20 h-20" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="border-b-2 border-dashed border-[#7f7f7f]"></div>
    <div>
      <div class="flex items-center space-x-2">
        <div class="p-1 rounded text-[#eb6e7d] font-bold">STEP2</div>
        <h2 class="flex-1 text-lg font-bold">アプリで専用コードを読み取り</h2>
      </div>
      <div class="flex items-center space-x-2">
        <div class="bg-[#eb6e7d] px-1 py-0 rounded text-white font-bold invisible h-0">STEP2</div>
        <div class="flex-1 space-y-1">
          <p>新規登録画面から以下のコードを読み取ってください。</p>
          <table class="w-full">
            <tr>
              <th class="w-[70%] border border-black">お子さまのお名前</th>
              <th class="w-[30%] border border-black">専用コード</th>
            </tr>
            <tr>
              <td class="font-bold text-xl text-center border border-black">{{student_name}}</td>
              <td class="border border-black">
                <div class="m-auto w-20 h-20"><img className="max-w-[100%] max-h-[100%]" src="{{qrcode}}" alt="logo" /></div>
              </td>
            </tr>
          </table>
          <p class="text-xl text-[#ff0000] font-bold text-center">専用コード有効期限：{{date}}</p>
          <p class="font-bold text-center">有効期限切れの場合は、施設から新しい専用コードをお受け取りください。</p>
        </div>
      </div>
    </div>
    <div class="border-b-2 border-dashed border-[#7f7f7f]"></div>
    <div>
      <div class="flex items-center space-x-2">
        <div class="p-1 rounded text-[#eb6e7d] font-bold">STEP3</div>
        <h2 class="flex-1 text-lg font-bold">画面にしたがって入力</h2>
      </div>
      <div class="flex items-center space-x-2">
        <div class="bg-[#eb6e7d] px-1 py-0 rounded text-white font-bold invisible h-0">STEP3</div>
        <div class="flex-1">
          <p>お子さまの生年月日でアカウントを照合し、保護者情報を登録してください。</p>
        </div>
      </div>
    </div>
    <div class="border-b-2 border-dashed border-[#7f7f7f]"></div>
    <div>
      <div class="flex items-center space-x-2">
        <div class="p-1 rounded text-[#eb6e7d] font-bold">STEP4</div>
        <h2 class="flex-1 text-lg font-bold">お子さまの顔登録写真をアップロード</h2>
      </div>
      <div class="flex items-center space-x-2">
        <div class="bg-[#eb6e7d] px-1 py-0 rounded text-white font-bold invisible h-0">STEP4</div>
        <div class="flex-1">
          <p>お子さまのお顔がよく分かる写真を<span class="text-[#ff0000]">5枚</span>登録してください。</p>
          <p>※登録された画像をもとに、AIがお子さまの写真を選別します。</p>
          <div class="flex space-x-3">
            <img alt="ok_pictures" src="/images/ok_pictures.png" class="h-28" />
            <img alt="ng_pictures" src="/images/ng_pictures.png" class="h-28" />
          </div>
        </div>
      </div>
    </div>
    <div class="border-b-2 border-dashed border-[#7f7f7f]"></div>
    <footer class="flex justify-between text-sm">
      <div class="w-1/3">
        <p>＜運営会社＞</p>
        <p>株式会社サクラクレパス</p>
      </div>
      <div>
        <p>＜お問い合わせ＞</p>
        <p>イロドキサポート事務局</p>
        <p>TEL　06-4967-1283　受付時間9:00~17:00（平日のみ）</p>
        <p>メール　support@irodoki.com</p>
      </div>
    </footer>
  </div>
</div>`;

export default ParentsRegistrationLetters;
