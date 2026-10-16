# Codex / Claude Codeへの実装依頼テンプレート

**このテンプレートは、ChatGPT / Claudeと仕様を確定し、実装を始めるためのGitHub Issueを作成した**後に使用する。設計相談中はIssueを作らない。

---

あなたはTeamNice-2026 / Resistance Routeの実装担当です。

## 最初に確認する資料

- AGENTS.md、docs/README.md、docs/development-workflow.md、docs/decision-log.md
- docs/project-requirements.md と今回の機能に関係するdocs
- Claude CodeならCLAUDE.md
- GitHub Issue #[番号] の本文とコメント
- 関連コードと既存テスト

## Issueと目的

- Issue: #[番号]
- 目的: [設計時に確定したユーザー価値]
- 最新mainから作成するブランチ: [feature/issue-番号-概要]

## 今回の範囲

- 実装する内容: [確定した仕様]
- 実装しない内容: [他Issue/将来機能/無関係なリファクタリング]
- 変更可能な画面・API・DB・ファイル: [明記]

## 受入条件

- [ ] [正常系]
- [ ] [異常系]
- [ ] [必要な手動テスト・スマホ実機確認]

## 作業指示

1. 既存コードと関連するdocsを読み、今回の変更範囲と実装方針を短くまとめる。
2. Issueとコード/設計に矛盾があれば、**勝手に決めず確認する**。
3. 機能と関連テストを実装する。
4. テスト、型チェック、ビルドを実行し、結果を記録する。
5. git diffを確認し、秘密情報・実GPSデータ・不要な変更を除去する。
6. 作業ブランチへコミット・Pushし、Pull Requestを作成する。
7. PRに「Closes #番号」、変更内容、検証結果、未対応事項を記載する。
8. **mainに直接pushしない。PRをマージしない。** ChatGPTと管理者の最終確認へ引き渡す。

## 作業完了時の報告

変更ファイル / 実装内容 / テストコマンドと結果 / 実機検証の要否 / リスクや未決定事項 / PR URL。

PRがReady for reviewかつCI成功後にIssueをstatus:reviewにする（ラベルが登録されている場合）。修正依頼時はstatus:in-progressへ戻す。

---

他メンバーのレビューやApproveは必須ではない。ChatGPTが技術確認し、プロジェクト管理者が最終的にマージを判断する。
