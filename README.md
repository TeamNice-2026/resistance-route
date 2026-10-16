# Resistance Route

東京電子専門学校を中心とした半径2kmの範囲で、学生が実際に歩いたおすすめ道を共有し、通学ルートを比較できるGPS徒歩ナビWebアプリ。

**TeamNice-2026 / 4人チーム / 2027年2月完成予定**

## 最初に読むもの

- [資料一覧](docs/README.md)
- [要件定義](docs/project-requirements.md)
- [機能仕様](docs/functional-specification.md)
- [GPS・ルート評価](docs/gps-and-routing.md)
- [画面仕様](docs/screen-specification.md)
- [技術構成](docs/technical-design.md)
- [確定事項・未決定事項](docs/decision-log.md)
- [開発フロー](docs/development-workflow.md)

## Windows開発環境（Docker・WSL不使用）

学校PCは管理者権限が使えず、シャットダウンでDocker環境が消えるため、**Node.js 22とPython 3.12を直接使う**構成へ変更しました。

ソースは学校のネットワークドライブ P:\卒業制作\resistance-route に置きます。Node/Pythonのインストールの可否・シャットダウン後の保持は未検証のため、各人で学校のポリシーに従って確認してください。

**詳しい手順は [Windowsセットアップ](docs/windows-setup.md) を参照してください。**

### Backend（ターミナルA / 初回）

~~~powershell
Set-Location 'P:\卒業制作\resistance-route'
$venv = Join-Path $env:LOCALAPPDATA 'ResistanceRoute\venv'
python -m venv $venv
$python = Join-Path $venv 'Scripts\python.exe'
& $python -m pip install -r 'backend\requirements-dev.txt'
Set-Location 'P:\卒業制作\resistance-route\backend'
& $python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
~~~

### Frontend（ターミナルB）

~~~powershell
Set-Location 'P:\卒業制作\resistance-route\frontend'
npm install --no-audit --no-fund
npm run dev
~~~

- Web: http://127.0.0.1:5173
- API: http://127.0.0.1:8000/api/health
- API仕様: http://127.0.0.1:8000/docs
- PostGIS: /api/health/db はDB未設定時に503を返す（現段階では想定どおり）

PostgreSQL + PostGISは引き続き採用方針ですが、**学校PC外のDBを候補として検討する段階**であり、接続先は未決定です。GPS記録や投稿機能はまだ未実装です。

以前のDocker Composeファイルは参考として残していますが、学校PCの標準手順では使用しません。

## ディレクトリ

- frontend/：React / TypeScript / Vite
- backend/：Python / FastAPI
- database/：PostGIS向けSQL
- docs/：仕様書・セットアップ・開発フロー
- .github/：GitHub ActionsとIssue/PRテンプレート
- AGENTS.md / CLAUDE.md：実装AIのルール

## AIを利用した開発フロー

1. ChatGPT / Claudeで仕様と受入条件を確定。設計中はIssueを作らない。
2. Codex / Claude Codeへの実装引き渡し時にIssueを作る。
3. featureブランチで実装・テスト・PushしてPRを作成する。
4. ChatGPTが差分・CIを確認し、管理者が最終判断。無断マージ禁止。

他メンバーのApproveは任意。ローカル環境準備にIssueは不要。

## セキュリティ

生GPS履歴、認証情報、DB接続情報をGit・Issue・PR・学校の共有ドライブに出力しない。リポジトリのPrivate化は別途管理者が設定・確認する。
