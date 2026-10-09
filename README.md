# Resistance Route

東京電子専門学校を中心とした半径2kmの範囲で、学生が実際に歩いた道を共有し、快適な通学ルートを探せるGPS徒歩ナビWebアプリです。

**開発体制:** TeamNice-2026 / 4人チーム　**完成目標:** 2027年2月

> 現在は **Phase 0（開発基盤）** です。地図表示・GPS記録・ルート検索・投稿機能は今後実装します。

## 開発環境（Windows）

- Windows 10/11、Git、VS Code
- Docker Desktop（WSL 2 バックエンド、Linuxコンテナモード）
- GitHubへのアクセス権限

## 起動方法

PowerShellを開いて実行します。

```powershell
git clone https://github.com/TeamNice-2026/resistance-route.git
cd resistance-route
Copy-Item .env.example .env
docker compose up --build
```

- Web: http://localhost:5173
- APIヘルスチェック: http://localhost:8000/api/health
- DB接続確認: http://localhost:8000/api/health/db
- API仕様: http://localhost:8000/docs

停止: `Ctrl+C` または別ターミナルで `docker compose down` 。データも消す場合のみ `docker compose down -v` 。

`.env` はローカル専用です。**Gitにコミットしないでください。**

## ディレクトリ

```text
frontend/         React + TypeScript + Vite
backend/          FastAPI / Python
database/         PostGIS 初期化・マイグレーション予定
docs/             技術方針、Windowsセットアップ、仕様
.github/          CI、Issue・PRテンプレート
AGENTS.md         全開発者・AI支援ツール共通の規約
CLAUDE.md         Claude Code 用の入口
compose.yaml      ローカル開発スタック
```

## 開発フロー

1. GitHub Issueを作り、担当者と受け入れ条件を決める
2. `feature/issue-番号-概要` ブランチを作成
3. 変更に応じてテスト・ドキュメントを更新
4. Pull Requestを作成し、他のメンバー1人以上のレビューを受ける
5. CIが成功してから`main`へマージする（GitHubプラン上の保護設定が利用可能なら強制設定）

**開発時の仕様変更はIssue・PRに記録してください。** `main` への直接pushは運用上禁止です。

## 開発段階

- Phase 0: Docker・フロント・API・DB・CI の共通起動
- Phase 1: 池袋周辺の地図 / 現在地
- Phase 2: 学校への徒歩ルート・任意目的地
- Phase 3: 認証
- Phase 4: GPS記録・補正・履歴
- Phase 5: 実走区間からのおすすめ道投稿
- Phase 6: 参考評価・通行確認
- Phase 7: 学生コミュニティを加味した通学快適スコア
- Phase 8: 総合テスト・公開準備

設計概要は `docs/architecture.md`、Windows手順は `docs/windows-setup.md` を参照してください。

## セキュリティ上の注意

GPS生ログ・メールアドレス・パスワード・トークン・APIキーをIssue/PRやGit履歴に載せないでください。公開用の投稿線と個人のGPS履歴は分離します。外部サービスのAPIキーはサーバー側で保管します。
