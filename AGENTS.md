# Resistance Route — 共通開発ルール

## 最優先の運用規約

- **`docs/development-workflow.md` を必ず読む。** 設計相談 → 合意 → Issue確定 → featureブランチ → AI実装 → PR → **他メンバー一次レビュー** → **管理者の最終承認・マージ** の順を厳守する。
- **`main` への直接push、自動マージは禁止。** 実装AIは作業ブランチへのコミットとPR作成まで。
- GitHub Issueは実装時点の正式な仕様。曖昧な点や仕様変更はIssueへ戻して確認する。
- Issueが着手可能になるまではコードを変更しない。PR作成・CI成功後に `status:review` にする。
- 自分以外のメンバーによる一次レビューが必要。管理者以外がマージしてはいけない。

## プロダクト仕様

- `docs/architecture.md` を読む。東京電子専門学校を中心に半径2 km、徒歩専用。
- GPS記録は画面表示中のみ。おすすめ道は本人の実走履歴からのみ投稿する。
- 生GPS履歴は非公開。公開するのはユーザーが指定した区間のみ。
- 「コミュニティ確認済み」は道路の安全性を保証しない。

## 変更前

1. 対応Issue・受入条件、既存コード、テスト、関連設計を確認する。
2. 担当外のファイルや大規模リファクタリングを無断で行わない。
3. API/DB変更はチームと合意し、docsを更新する。

## 品質と安全

- Frontend: TypeScript strict, React。Backend: Python型注釈 / FastAPI。
- 例外を黙って握り潰さない。関連するテストを追加・実行する。
- 動作確認していない機能を「完成」と報告しない。
- `.env`、APIキー、トークン、パスワード、実GPS履歴をGit/Issue/PRに含めない。
- CIが失敗したPRはマージしない。GPS関連は必要な実機テストも行う。

## Phase 0 コマンド

- `docker compose up --build`
- `docker compose exec backend python -m pytest`
- `docker compose exec frontend npm run typecheck`
- `docker compose exec frontend npm run test`
