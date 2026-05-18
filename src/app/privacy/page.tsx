import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー | 量産型コンサル汚染度診断",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-lg px-4 py-12 text-slate-200 sm:px-6">
      <h1 className="text-xl font-bold">プライバシーポリシー</h1>
      <p className="mt-4 text-sm leading-relaxed text-slate-300">
        本サイト「量産型コンサル汚染度診断」（以下「当サイト」、URL:{" "}
        <a
          href="https://consult-pollution.vercel.app"
          className="text-sky-300 underline"
        >
          https://consult-pollution.vercel.app
        </a>
        ）は、診断の回答内容をサーバーに保存しません。診断はお使いのブラウザ内で完結します。
      </p>

      <h2 className="mt-8 text-base font-semibold">Cookie について</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-300">
        当サイトでは、広告配信・サイト分析のため Cookie および類似技術を使用する場合があります。
        ブラウザの設定で Cookie を無効にできますが、一部機能が利用できなくなることがあります。
      </p>

      <h2 className="mt-8 text-base font-semibold">広告について（Google AdSense）</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-300">
        当サイトでは Google 社の広告配信サービス「Google AdSense」を利用する場合があります。
        AdSense は Cookie を使用して、ユーザーの興味に基づく広告を表示することがあります。
      </p>
      <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-slate-300">
        <li>
          Google による広告設定:{" "}
          <a
            href="https://www.google.com/settings/ads"
            className="text-sky-300 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.google.com/settings/ads
          </a>
        </li>
        <li>
          Google プライバシーポリシー:{" "}
          <a
            href="https://policies.google.com/privacy"
            className="text-sky-300 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://policies.google.com/privacy
          </a>
        </li>
        <li>
          パートナー企業による Cookie の無効化:{" "}
          <a
            href="https://www.aboutads.info/choices/"
            className="text-sky-300 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            aboutads.info
          </a>
        </li>
      </ul>

      <h2 className="mt-8 text-base font-semibold">アクセス解析・ホスティング</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-300">
        当サイトは Vercel 上でホスティングされています。アクセスログ等がホスティング事業者により
        処理される場合があります。
      </p>

      <h2 className="mt-8 text-base font-semibold">お問い合わせ</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-300">
        本ポリシーに関するお問い合わせは、GitHub リポジトリの Issues（
        <a
          href="https://github.com/Falxcom/consult-pollution/issues"
          className="text-sky-300 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Falxcom/consult-pollution
        </a>
        ）よりご連絡ください。
      </p>

      <p className="mt-10 text-xs text-slate-500">最終更新: 2026年5月</p>

      <div className="mt-6 flex gap-4 text-sm">
        <Link href="/" className="text-sky-300 underline">
          診断トップ
        </Link>
        <Link href="/about" className="text-sky-300 underline">
          このサイトについて
        </Link>
      </div>
    </main>
  );
}
