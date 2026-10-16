# Claude Code — Resistance Route

最初にAGENTS.md、docs/README.md、docs/development-workflow.md、docs/decision-log.md、docs/windows-setup.mdを読むこと。対応機能の仕様書も参照する。

- 学校PCでDocker Desktop・WSL 2は使用しない。Node.js 22 + Python 3.12を直接使う。
- ソースはネットワークドライブ P:\卒業制作\resistance-route にある。管理者権限・学校の制限を回避しない。
- PostgreSQL + PostGISは継続するが、DB設置先・接続方法は未決定。勝手に外部サービスや課金を導入しない。
- 設計中はIssue作成禁止。実装に着手するときにIssueを作る。
- 指定Issueの範囲で実装・テスト・PR作成まで行い、main直接push・無断マージは行わない。
- 最終技術確認はChatGPT、最終判断は管理者。他人のGitHub Approveは任意。
- 認証情報、生GPS履歴、DBパスワードをGit、Issue、PR、学校共有ドライブへ記録しない。
