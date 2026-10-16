# Resistance Route

東京電子専門学校を中心とした半径2kmの範囲で、学生が実際に歩いたおすすめ道を共有し、通学ルートを比較できるGPS徒歩ナビWebアプリ。

**TeamNice-2026 / 4人チーム / 2027年2月完成予定**

## 最初に読む資料

**[docs/README.md](docs/README.md) から仕様を確認してください。**

- [要件定義](docs/project-requirements.md)
- [機能仕様](docs/functional-specification.md)
- [GPS・ルート評価](docs/gps-and-routing.md)
- [画面仕様](docs/screen-specification.md)
- [技術構成](docs/technical-design.md)
- [確定事項・未決定事項](docs/decision-log.md)
- [開発フロー](docs/development-workflow.md)
- [実装AI用プロンプト](docs/ai-implementation-prompt-template.md)

## 現在の状況

**Phase 0: GitHub上のソース土台とCIのみ準備済み。** 4人のPCではまだクローンしておらず、DockerでのWindowsローカル起動は未確認。地図・GPS・通学ナビの実装はこれから。

## Windowsでの初期セットアップ

必要なもの：Windows 10/11、Git for Windows、VS Code、Docker Desktop（WSL2 / Linuxコンテナ）。

PowerShellで実行：

~~~powershell
git clone https://github.com/TeamNice-2026/resistance-route.git
cd resistance-route
Copy-Item .env.example .env
docker compose up --build
~~~

動作確認：

- Web: http://localhost:5173
- API: http://localhost:8000/api/health
- DB: http://localhost:8000/api/health/db
- OpenAPI: http://localhost:8000/docs

詳しくは [Windows手順](docs/windows-setup.md)。停止は docker compose down、DBデータを消す docker compose down -v は慎重に使う。

## ディレクトリ

- frontend/：React、TypeScript、Vite
- backend/：Python、FastAPI
- database/：PostgreSQL、PostGISの初期化
- docs/：仕様書、確定事項、開発運用ルール
- .github/：CIとIssue・PRテンプレート
- AGENTS.md：共通の実装ルール
- CLAUDE.md：Claude Code向け指示
- compose.yaml：ローカル開発環境

## AIを使った開発フロー

1. **各自がChatGPT / Claudeで設計を相談・確定する。ここではIssueを作らない。**
2. **Codex / Claude Codeに実装を引き渡すタイミングでIssueを作る。**
3. Issue番号に沿った実装プロンプトを作り、featureブランチで実装・テストする。
4. 実装AIはPushとPR作成まで。**mainへ直接Push・自動マージしない。**
5. ChatGPTがPR差分・CI・仕様をレビューし、**管理者が最終判断**。明示的な許可があった場合のみマージする。

他メンバーのApproveは必須ではない。準備段階の資料整備やローカルクローンにはIssueは不要。正式な規則は [development-workflow.md](docs/development-workflow.md)。

## 注意

開発中はGitHubをPrivateにする方針だが、**リポジトリのPrivate化は管理者が確認する必要がある**。実GPS履歴、メールアドレス、トークン、APIキー、.envをコミット・Issue・PRへ記載しない。
