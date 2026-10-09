import { useEffect, useState } from 'react'

type State = '確認中' | '接続済み' | '接続失敗'

export default function App() {
  const [api, setApi] = useState<State>('確認中')
  const [db, setDb] = useState<State>('確認中')

  useEffect(() => {
    const controller = new AbortController()
    async function check(url: string, update: (state: State) => void) {
      try {
        const response = await fetch(url, { signal: controller.signal })
        update(response.ok ? '接続済み' : '接続失敗')
      } catch (error) {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          update('接続失敗')
        }
      }
    }
    void check('/api/health', setApi)
    void check('/api/health/db', setDb)
    return () => controller.abort()
  }, [])

  return <main className="shell">
    <div className="eyebrow">TEAM NICE · GRADUATION PROJECT 2027</div>
    <div className="brand">⌖</div>
    <h1>Resistance Route</h1>
    <p className="lead">池袋の通学路を、学生の発見でもっと便利に。</p>
    <div className="pill">Phase 0 — 開発環境の動作確認</div>
    <section className="panel">
      <h2>サービス接続状況</h2>
      <p>地図・GPS・ログイン機能は次の段階で実装します。</p>
      <div className="status"><span>FastAPI</span><strong>{api}</strong></div>
      <div className="status"><span>PostgreSQL / PostGIS</span><strong>{db}</strong></div>
    </section>
    <div className="grid">
      <article><b>01 / NAVIGATE</b><h3>学校へのルート</h3><p>現在地から東京電子専門学校へ。</p></article>
      <article><b>02 / RECORD</b><h3>GPSで歩いた道</h3><p>移動履歴からおすすめ道を投稿。</p></article>
      <article><b>03 / SHARE</b><h3>みんなのおすすめ</h3><p>学生の実走確認をルート選択に活用。</p></article>
    </div>
    <footer>東京電子専門学校を中心に半径2km / 徒歩専用</footer>
  </main>
}

