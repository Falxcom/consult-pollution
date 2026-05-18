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
        本サイト「量産型コンサル汚染度診断」（以下「当サイト」）は、診断の回答内容をサーバーに保存しません。診断はお使いのブラウザ内で完結します。
      </p>

      <h2 className="mt-8 text-base font-semibold">広告について</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-300">
        当サイトでは Google AdSense 等の第三者配信の広告を掲載する場合があります。広告配信事業者は、ユーザーの興味に応じた広告を表示するため Cookie 等を使用することがあります。詳細は各事業者のポリシーをご確認ください。
      </p>
      <p className="mt-2 text-sm leading-relaxed text-slate-300">
        Google による広告の無効化:{" "}
        <a
          href="https://www.google.com/settings/ads"
          className="text-sky-300 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          広告設定
        </a>
      </p>

      <h2 className="mt-8 text-base font-semibold">アクセス解析</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-300">
        ホスティング事業者（例: Vercel）により、アクセスログが収集される場合があります。
      </p>

      <h2 className="mt-8 text-base font-semibold">お問い合わせ</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-300">
        本ポリシーに関するお問い合わせは、サイト運営者までご連絡ください。
      </p>

      <p className="mt-10 text-xs text-slate-500">最終更新: 2026年5月</p>

      <Link
        href="/"
        className="mt-8 inline-block text-sm text-sky-300 underline"
      >
        診断トップへ戻る
      </Link>
    </main>
  );
}
