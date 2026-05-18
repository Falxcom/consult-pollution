import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "このサイトについて | 量産型コンサル汚染度診断",
  description:
    "量産型コンサル汚染度診断の目的、免責事項、運営方針について。",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-lg px-4 py-12 text-slate-200 sm:px-6">
      <h1 className="text-xl font-bold">このサイトについて</h1>

      <p className="mt-4 text-sm leading-relaxed text-slate-300">
        「量産型コンサル汚染度診断」は、ビジネスあるあるをユーモアにした
        <strong className="font-medium text-slate-200">エンタメ診断</strong>
        です。10問の質問に答えると、あなたの「スライド脳」「フレームワーク臭」などを
        5段階のタイプでお伝えします。
      </p>

      <h2 className="mt-8 text-base font-semibold">免責事項</h2>
      <ul className="mt-2 list-inside list-disc space-y-2 text-sm text-slate-300">
        <li>医療・心理・キャリアの専門的助言ではありません。</li>
        <li>特定の企業・職種・個人を批判する意図はありません。</li>
        <li>診断結果は娯楽目的であり、正確性を保証しません。</li>
      </ul>

      <h2 className="mt-8 text-base font-semibold">データの扱い</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-300">
        診断の回答はサーバーに保存せず、お使いのブラウザ内で処理します。詳細は
        <Link href="/privacy" className="text-sky-300 underline">
          プライバシーポリシー
        </Link>
        をご覧ください。
      </p>

      <h2 className="mt-8 text-base font-semibold">広告について</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-300">
        サイトの維持費用の一部として、Google AdSense による広告を掲載する場合があります。
      </p>

      <Link href="/" className="mt-10 inline-block text-sm text-sky-300 underline">
        診断トップへ戻る
      </Link>
    </main>
  );
}
