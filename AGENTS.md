# Resistance Route — 開発エージェント共通ルール

## 最初に読むもの

- docs/README.md：資料の目次
- docs/project-requirements.md：要件とMVP
- docs/decision-log.md：確定・暫定・未決定の区別
- docs/development-workflow.md：Issue・PR・最終マージのルール
- docs/windows-setup.md：**Docker・WSL不使用の標準開発環境**
- 該当機能の docs/functional-specification.md / technical-design.md / gps-and-routing.md / screen-specification.md

## Issueの作成時期とGit

- 設計中にはIssueを作成しない。仕様と受入条件が確定し、実装に引き渡すタイミングでIssueを作る。
- 環境構築・資料整備はIssueなしで対応できる。
- mainへの直接pushと実装AIによる無断マージは禁止。PRでChatGPTの技術確認後に管理者が最終判断する。
- 他メンバーのApproveは必須ではない。未決定の仕様を独断で確定しない。

## 学校PCの環境

- **Docker Desktop・WSL 2を使わない。**
- Frontend: WindowsのNode.js 22 / React / TypeScript / Vite。localhost:5173
- Backend: WindowsのPython 3.12 / FastAPI / pytest。localhost:8000
- DB: PostgreSQL + PostGISを維持するが、ホスト・接続方式は未決定。
- ソースはネットワークドライブ P:\卒業制作\resistance-route。管理者権限・学校の制限を回避しない。
- 学校PCのシャットダウンでローカル環境が初期化される。Node/Pythonの保持は未検証。作業はGitで保存する。
- 旧compose.yamlとDockerfileは学校の標準起動では使用しない。

## プロダクトの固定要件

- 東京電子専門学校を中心とした半径2km、徒歩専用。「学校へ行く」と任意目的地。
- GPS記録は本人の明示的開始・終了とフォアグラウンド動作に限定。
- おすすめ道投稿は本人の実走GPS履歴で選んだ区間のみ。生GPSは非公開。
- コミュニティ確認済みは安全保証ではない。経路候補は既存の徒歩ルートAPIを利用する。
- GPS閾値・スコア配点・地図事業者などの未決定事項を勝手に確定しない。

## 品質と安全

- 変更対象外の大規模リファクタリング・共有API/DBの無断破壊的変更を禁止。
- 関連テストを実行し、動作確認していない機能を完成と報告しない。
- DB未設定時の /api/health/db の503は想定内。
- .env、APIキー、トークン、パスワード、個人情報、生GPS履歴はGit・Issue・PR・学校の共有ドライブに保存しない。

## 起動・テスト

- Windowsの直接実行。Backend: backend/からpython -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
- Frontend: frontend/から npm install、npm run dev
- テスト: backendのpytest、frontendのnpm run typecheck / test / build
- Python仮想環境を含む詳細は docs/windows-setup.md を確認。
