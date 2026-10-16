# Resistance Route — 開発エージェント共通ルール

## 最初に読むもの

- docs/README.md：資料の目次
- docs/project-requirements.md：確定した要件とMVP
- docs/decision-log.md：確定・暫定・未決定の区別
- docs/development-workflow.md：Issue作成から最終マージまで
- 変更内容に対応する docs/functional-specification.md / technical-design.md / gps-and-routing.md / screen-specification.md

## Issueの起票時期（厳守）

- **ChatGPT / Claudeと仕様を相談している間はGitHub Issueを作成しない。**
- 仕様・受入条件・担当が確定して、Codex / Claude Codeに実装を依頼する**その段階**でIssueを起票する。
- 事前に全機能のIssueをまとめて作成しない。
- 例外：ローカルクローンや資料整備などの準備作業は、管理者の依頼に従ってIssueなしで進めてよい。

## 実装・Git

- Issueがある作業は、対象Issueを最優先仕様とする。
- 未決定事項を独断で確定せず、質問して確認する。
- 最新mainからfeature/issue-番号-概要などの作業ブランチを作る。
- **mainへの直接push禁止。実装AIによるPRのマージ禁止。**
- 実装とテスト、PR作成まで行い、ChatGPT＋管理者の最終確認を待つ。
- 他メンバーによるGitHub Approveは必須ではない。
- ChatGPTがマージできるのは、対象PRの明示的な許可を管理者から受けて最終確認した場合のみ。

## プロダクトの固定要件

- 学校を中心に半径2km・徒歩専用・学校へ行くボタン＋任意目的地。
- GPS記録は明示的に開始し、画面表示中のみ。
- おすすめ道投稿は本人のGPS実走履歴から選んだ区間のみ。
- 生GPS履歴は非公開。公開投稿線は明示的に選択した区間のみ。
- コミュニティ確認済みは安全保証ではない。
- ルート形状は既存の徒歩ルートAPIを使用し、独自の道路ネットワークを一から作らない。
- GPS閾値・配点・外部API選定などの暫定値を勝手に固定しない。

## 品質・秘密情報

- Frontend: React / TypeScript strict。Backend: Python / FastAPI、DB: PostgreSQL/PostGIS。
- API・DBの共有仕様は無断で破壊的変更をしない。
- 対象外の広範なリファクタリングを行わない。関連テストを作成・実行する。
- 実装していない機能や実機検証していない成果を完成と主張しない。
- .env、APIキー、トークン、パスワード、メールアドレス、生GPSログをGit/PR/Issueへ出力しない。

## Phase 0の基本コマンド

- docker compose up --build
- docker compose exec backend python -m pytest
- docker compose exec frontend npm run typecheck
- docker compose exec frontend npm run test
