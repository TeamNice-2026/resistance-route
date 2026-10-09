# Windows 開発環境セットアップ

## 必要なもの
Windows 10/11、Git for Windows、VS Code、Docker Desktop（WSL 2 / Linuxコンテナ）。
Docker Desktopのライセンス条件は利用環境に応じて確認する。

## 初回セットアップ（PowerShell）
管理者PowerShellで WSL 2 が未導入なら `wsl --install` を実行し、必要に応じて再起動。
Docker Desktopを起動した後、通常のPowerShellで:

```powershell
git clone https://github.com/TeamNice-2026/resistance-route.git
cd resistance-route
Copy-Item .env.example .env
docker compose up --build
```

## 確認するURL
- Web: http://localhost:5173
- API: http://localhost:8000/api/health
- DB: http://localhost:8000/api/health/db
- OpenAPI: http://localhost:8000/docs

## テスト
```powershell
docker compose exec backend python -m pytest
docker compose exec frontend npm run typecheck
docker compose exec frontend npm run test
docker compose down
```

`docker compose down -v` はローカルDBデータも削除するので注意。

## よくある問題
- Docker起動不可: WSL2とLinuxコンテナモードを確認。
- ポート競合: 5173/8000を使用中の別プロセスを終了。
- DB未接続: `docker compose logs db` で確認。
- `.env` はGitにコミットしない。

