# Resistance Route — 共通開発ルール

## 必ず守る仕様
- 設計と意思決定は docs/architecture.md に従う。
- 東京電子専門学校を中心に半径2 km、徒歩専用。
- GPS記録は画面表示中のみ。おすすめ道は本人の実走履歴からのみ投稿。
- 生GPS履歴は非公開。公開するのはユーザーが指定した区間のみ。
- 「コミュニティ確認済み」は安全を保証しない。

## 変更前
1. 対応するIssueと既存コードを確認し、変更範囲を明確にする。
2. 担当外のファイルや大規模リファクタリングを無断で行わない。
3. API/DB変更はチームと合意し、docsを更新する。

## 品質
- Frontend: TypeScript strict, React。Backend: Python型注釈 / FastAPI。
- 例外を黙って握り潰さない。関連するテストを追加・実行する。
- 動作確認していない機能を「完成」と報告しない。
- .env、APIキー、トークン、パスワード、実GPS履歴をコミットしない。

## Git
- mainへ直接pushしない。feature/issue-123-description からPRを出す。
- 少なくとも別メンバー1人のレビューを受ける。
- CIが失敗したPRはマージしない。

## Phase 0 コマンド
- docker compose up --build
- docker compose exec backend python -m pytest
- docker compose exec frontend npm run typecheck
- docker compose exec frontend npm run test

