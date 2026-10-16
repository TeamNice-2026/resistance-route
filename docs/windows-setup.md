# Windows開発環境セットアップ — Docker・WSL不使用

**対象:** TeamNice-2026の4人 / 学校のWindows PC / VS Code + CodexまたはClaude Code  
**ソースコード:** P:\卒業制作\resistance-route（P: は学校のネットワークドライブ）  
**方針:** Docker Desktop・WSL 2を使わず、Node.jsとPythonで直接起動する。

## 1. 学校PCの制約

- 管理者権限を使用できない。管理者権限・学校のポリシーの回避は禁止。
- 学校PCをシャットダウンするとDocker環境が消えた。**Node.js/Pythonなど他のアプリの永続性は未検証**。
- P: はネットワークドライブ。大量の小ファイル操作、実行ファイル、ファイル監視や仮想環境に問題が出る可能性がある。
- 秘密情報、DBパスワード、生GPS履歴、個人情報はPドライブに保存しない。
- 各人のPCで動作を確認する。必要なソフトの導入は学校の許可範囲内で実施する。

## 2. 必要なソフトウェア

| 項目 | バージョン | 目的 |
| --- | --- | --- |
| VS Code / Git | 学校が許可したもの | 編集・リポジトリ管理 |
| Node.js | 22.x（CIと同じ） | React・Vite |
| Python | 3.12.x（CIと同じ） | FastAPI・テスト |
| PostgreSQL + PostGIS | 配置先未定 | GPS・地理情報を保存・検索 |

Node.js: https://nodejs.org/en/download  
Python: https://www.python.org/downloads/windows/

- Node.jsは学校のポリシーが許せばポータブルZIPの利用も候補。P:から実行できるとは限らない。
- Pythonは許可されたユーザー単位のインストールを検討する。**Pythonのembeddable ZIPだけで通常のpip/venvが利用できるとは限らない**。
- Node.js / Pythonを導入できても、シャットダウン後に残るかは別途確認する。
- これらを利用するためにWSLやDockerを導入する必要はない。

## 3. 事前確認

VS Codeで P:\卒業制作\resistance-route を開き、PowerShellで実行：

~~~powershell
Set-Location 'P:\卒業制作\resistance-route'
git status
node --version
npm --version
python --version
python -m pip --version
~~~

Node.jsは22.x、Pythonは3.12.xを想定。コマンドを認識しない、バージョンが合わない、学校の実行制限がある場合は止めて相談する。

## 4. Backend（FastAPI）：PowerShellターミナルA

Pythonが使えることを確認後、仮想環境をP:ではなくローカル領域に作成する。

~~~powershell
Set-Location 'P:\卒業制作\resistance-route'
$venv = Join-Path $env:LOCALAPPDATA 'ResistanceRoute\venv'
python -m venv $venv
$python = Join-Path $venv 'Scripts\python.exe'
& $python -m pip install -r 'backend\requirements-dev.txt'
Set-Location 'P:\卒業制作\resistance-route\backend'
& $python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
~~~

- http://127.0.0.1:8000/api/health と http://127.0.0.1:8000/docs を確認。
- ローカル領域が初期化されたらvenvと依存ライブラリを入れ直す必要がある。
- WindowsのpythonコマンドがStoreエイリアス等に向いていないか確認する。
- P:のファイル変更が --reload に反映されない場合はサーバーを再起動する。

## 5. Frontend（React / Vite）：PowerShellターミナルB

~~~powershell
Set-Location 'P:\卒業制作\resistance-route\frontend'
npm install --no-audit --no-fund
npm run dev
~~~

- http://127.0.0.1:5173 を確認。
- Viteの /api リクエストはローカルの http://127.0.0.1:8000 に転送する。
- P: のネットワーク上で node_modules のインストール・変更監視が遅い/失敗する場合は、学校の許可を得た一時ローカル作業コピーを検討する。**元のPドライブ上のファイルは消さない**。
- 一時コピーを使う場合はシャットダウン前にGitHubへコミット・Pushできたか確認する。

## 6. 動作確認とテスト

~~~powershell
Invoke-RestMethod 'http://127.0.0.1:8000/api/health'
Invoke-WebRequest 'http://127.0.0.1:5173' -UseBasicParsing
Set-Location 'P:\卒業制作\resistance-route\backend'
& (Join-Path $env:LOCALAPPDATA 'ResistanceRoute\venv\Scripts\python.exe') -m pytest
Set-Location 'P:\卒業制作\resistance-route\frontend'
npm run typecheck
npm run test
npm run build
~~~

**DBの状態を混同しない。** /api/health はDBなしで200を返す。一方、/api/health/db は DATABASE_URL が未設定なら**503を返すのが現在の仕様**。React画面の「PostgreSQL / PostGIS 接続失敗」もDB未準備段階では想定どおりで、フルスタック完成を意味しない。

## 7. DBは別途選定する

PostgreSQL + PostGISはGPS履歴や空間検索の実装時には必要。学校PC上でDBの常設を前提とせず、**学校外のPostGIS対応データベースを候補として検討する**。事業者、接続方式、費用はまだ決定していない。

選定条件：PostGIS拡張、接続元制御、学内ネットワークからのアクセス、無料枠/料金、各人の権限、バックアップ、暗号化、削除仕様。

バックエンドはDATABASE_URLというプロセス環境変数を読む。**DBパスワードをPドライブの.envやスクリプトに置かないこと。** 接続が必要になった段階で安全な設定・秘密情報の渡し方を決める。

## 8. シャットダウン前後

- git statusを確認し、実装した変更は適切なfeatureブランチでPushする。
- Windowsに入れたNode/Python、ローカルのvenv、依存ライブラリは初期化後に残ると仮定しない。
- 次回ログイン時はnode --version / python --version / git status / 起動テストを実施する。
- 学校の制限で実行できないときは、管理者権限の回避を試みず、学校側に許可された代替手段を相談する。

## 9. 旧Dockerファイル

compose.yaml、Dockerfile等は旧環境の参考として残っているが、**現在の学校PC用セットアップでは使わない**。使用せず、必要性を確認後に整理する。
