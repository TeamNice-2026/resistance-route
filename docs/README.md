# Resistance Route — ドキュメント案内

ここは4人全員と実装支援AIが参照する、卒業制作の共通資料です。**初回クローン前にGitHub上で閲覧できます。**

## 読む順番

1. [project-requirements.md](project-requirements.md) — 目的、対象範囲、合意済み要件、MVP
2. [functional-specification.md](functional-specification.md) — 機能一覧、権限、操作フロー、異常系
3. [gps-and-routing.md](gps-and-routing.md) — GPS記録・補正・投稿の通行確認・ルート評価
4. [screen-specification.md](screen-specification.md) — 画面一覧とユーザーフロー
5. [technical-design.md](technical-design.md) — 技術構成、データ・API設計の方向性、セキュリティ
6. [decision-log.md](decision-log.md) — **確定事項／提案段階／未決定事項**の一覧
7. [development-workflow.md](development-workflow.md) — Issue作成のタイミングとレビュー・マージ
8. [ai-implementation-prompt-template.md](ai-implementation-prompt-template.md) — Issue確定後の実装依頼テンプレート
9. [windows-setup.md](windows-setup.md) — Windowsの環境構築手順
10. [roadmap.md](roadmap.md) — 2027年2月までの開発計画

[architecture.md](architecture.md) は全体構成の短い入口です。

## 仕様の更新規則

- 「**確定**」は、ここまでにチームの方針として合意した内容。
- 「**暫定・設計案**」は実装前に検証・調整できる値や方式。
- 「**未決定**」は相談してから確定する事項。AIが勝手に確定しない。
- **設計相談中はIssueを作成しない。** ChatGPT / Claudeで仕様と受入条件を固め、Codex / Claude Codeに実装を引き渡すタイミングでIssueを初めて作る。
- 以降の仕様変更は関係する文書も修正し、PRレビュー時に確認する。
- ドキュメントに矛盾が見つかった場合、実装を進める前に管理者へ確認する。
