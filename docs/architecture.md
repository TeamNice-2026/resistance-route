# Resistance Route — システム設計の入口

東京電子専門学校の学生向け、池袋周辺半径2kmのGPS徒歩ナビWebアプリ。

## 参照すべき正式ドキュメント

- [docs一覧](README.md)
- [プロジェクト要件](project-requirements.md)
- [機能仕様](functional-specification.md)
- [GPS・ルート評価](gps-and-routing.md)
- [画面仕様](screen-specification.md)
- [技術設計](technical-design.md)
- [確定・暫定・未決定事項](decision-log.md)
- [開発運用](development-workflow.md)

## アーキテクチャの基本方針

- Web: React + TypeScript + Vite。地図にはMapLibre GL JSを予定。
- API: Python + FastAPI。外部APIキーの保持、認証、投稿、GPS処理など。
- DB: PostgreSQL + PostGIS。個人のGPS履歴と公開おすすめ道を分離。
- ルート生成: 既存の徒歩ルートAPIを利用。候補へのコミュニティ評価を独自に実装。
- 現在地: Geolocation API。GPS履歴の保存は明示的開始と画面表示中に限定。

## 現在のステータス

Phase 0の基本ソースコードとCIはGitHubにある。各メンバーのWindows PCでは未クローン・未起動。地図、GPS記録、認証、ルート検索、通行確認はまだ未実装。

## 重要な禁止事項

- 実装エージェントが未決定の仕様を勝手に確定しない。
- 実際に存在しない経路やGPS検証結果を生成・表示しない。
- 生GPS履歴を自動公開しない。
- 「コミュニティ確認済み」を安全保証と表現しない。
- 設計相談中の時点ではIssueを作成しない。実装依頼が確定した時にだけ登録する。
