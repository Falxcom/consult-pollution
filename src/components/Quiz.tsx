"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AdSlot } from "@/components/ads/AdSlot";
import { getSiteUrl } from "@/lib/site";

type Choice = { label: string; points: number };
type Question = { id: number; prompt: string; choices: Choice[] };

const QUESTIONS: Question[] = [
  {
    id: 1,
    prompt:
      "会議の冒頭で、自然に「本日のアジェンダを共有します」が出たことがある？",
    choices: [
      { label: "ない。出たら自分で笑う。", points: 0 },
      { label: "たまにある。すぐ飲み物を飲む。", points: 1 },
      { label: "週3以上。会議室の空気が整う。", points: 2 },
      { label: "家族会議でも言いそうになった。", points: 3 },
    ],
  },
  {
    id: 2,
    prompt: "「ステークホルダー」という言葉の使用頻度は？",
    choices: [
      { label: "ほぼ使わない（関係者で十分）", points: 0 },
      { label: "仕事のチャットでたまに", points: 1 },
      { label: "口癖。歯磨き中にも浮かぶ", points: 2 },
      { label: "ペットの名前を検討した", points: 3 },
    ],
  },
  {
    id: 3,
    prompt: "白紙のスライドを開いたときの感情に近いのは？",
    choices: [
      { label: "不安。何から書けばいいの？", points: 0 },
      { label: "普通。ツールの一つ。", points: 1 },
      { label: "落ち着く。世界が整列する。", points: 2 },
      { label: "無。思考がテンプレに吸い込まれる。", points: 3 },
    ],
  },
  {
    id: 4,
    prompt:
      "「課題 → 解決策 → ロードマップ」の三点セットを、説明なしで並べられる？",
    choices: [
      { label: "並べられない（意味が曖昧）", points: 0 },
      { label: "資料があれば並べられる", points: 1 },
      { label: "口頭で秒で並べられる", points: 2 },
      { label: "夢の中で並べた記憶がある", points: 3 },
    ],
  },
  {
    id: 5,
    prompt: "「一旦お繋ぎします」系の言い回し、どのくらい身についてる？",
    choices: [
      { label: "使わない", points: 0 },
      { label: "ビジネスメールでたまに", points: 1 },
      { label: "口が勝手に動く", points: 2 },
      { label: "カフェで席を譲る時も言いそう", points: 3 },
    ],
  },
  {
    id: 6,
    prompt: "2×2マトリクスを、私生活の悩みに使ったことは？",
    choices: [
      { label: "ない", points: 0 },
      { label: "頭の中だけ", points: 1 },
      { label: "紙に書いた（またはスライド化）", points: 2 },
      { label: "相手に共有して合意形成した", points: 3 },
    ],
  },
  {
    id: 7,
    prompt:
      "「領域」「レイヤー」「インパクト」のどれかが、会話の潤滑油になっている？",
    choices: [
      { label: "いいえ", points: 0 },
      { label: "たまに滑る", points: 1 },
      { label: "会話が止まると出る", points: 2 },
      { label: "止まらなくても出る", points: 3 },
    ],
  },
  {
    id: 8,
    prompt: "図の配色は、青〜水色のグラデ＋白文字に寄りがち？",
    choices: [
      { label: "いいえ（別の美学）", points: 0 },
      { label: "たまに寄る", points: 1 },
      { label: "基本それ", points: 2 },
      { label: "他色を入れると落ち着かない", points: 3 },
    ],
  },
  {
    id: 9,
    prompt: "「初期仮説」という言葉が、休日に頭をよぎったことは？",
    choices: [
      { label: "ない", points: 0 },
      { label: "一度くらい", points: 1 },
      { label: "年に数回はある", points: 2 },
      { label: "昨日もあった", points: 3 },
    ],
  },
  {
    id: 10,
    prompt: "最後に正直に：自分の説明、フレームワーク臭がする？",
    choices: [
      { label: "しない（たぶん）", points: 0 },
      { label: "たまにするかも", points: 1 },
      { label: "する。でも筋は通ってる", points: 2 },
      { label: "フレームワークの匂いが香水みたい", points: 3 },
    ],
  },
];

type ResultProfile = {
  title: string;
  tagline: string;
  body: string;
  accent: string;
  badge: string;
};

const RESULTS: ResultProfile[] = [
  {
    title: "タイプ α：未汚染ゾーン",
    tagline: "職場では静かなネイティブ。スライドの森に迷い込んでいない。",
    body: "今のままで大丈夫。ただし、隣席の人が「アジェンダ」と言い出したら、そっと距離を取ってください。感染は静かです。",
    accent: "from-emerald-400/30 to-cyan-400/20",
    badge: "bg-emerald-500/15 text-emerald-200 ring-emerald-400/30",
  },
  {
    title: "タイプ β：軽度スライド脳",
    tagline: "たまに「領域」が口から零れる。まだ取り返しはつく。",
    body: "飲み会で「ステークホルダー」を言いそうになったら、水を飲んでリセット。ここから先は自己防衛が効きます。",
    accent: "from-sky-400/25 to-blue-500/15",
    badge: "bg-sky-500/15 text-sky-200 ring-sky-400/30",
  },
  {
    title: "タイプ γ：中等度（会話に図解の匂い）",
    tagline: "説明が「構造化」されがち。箇条書きが恋しい季節。",
    body: "良い意味でも悪い意味でも、頭が整理屋さん。たまに感情よりロジックが先に出るので、ハグかカレーを挟むと均衡が戻ります。",
    accent: "from-indigo-400/25 to-violet-500/15",
    badge: "bg-indigo-500/15 text-indigo-200 ring-indigo-400/30",
  },
  {
    title: "タイプ δ：高濃度（意思決定は図がないと怖い）",
    tagline: "要点は3つ。矢印は右向き。結論は左上。",
    body: "あなたの説明は、たぶんもう美しい。ただ、レシピを聞かれたのにロードマップを返さない練習をすると、人間味が増します。",
    accent: "from-fuchsia-400/25 to-rose-500/15",
    badge: "bg-fuchsia-500/15 text-fuchsia-200 ring-fuchsia-400/30",
  },
  {
    title: "タイプ Ω：完全スライド化",
    tagline: "フレームワークで呼吸している。睡眠は疎結合。",
    body: "最終形態です。診断結果もきっと2ページ目に「示唆」がありますよね？ …ない？ 追加しますか？（冗談です。休んでください）",
    accent: "from-amber-400/30 to-orange-500/20",
    badge: "bg-amber-500/15 text-amber-200 ring-amber-400/35",
  },
];

function getResultProfile(total: number): ResultProfile {
  const t = Math.max(0, Math.min(30, total));
  if (t <= 6) return RESULTS[0];
  if (t <= 12) return RESULTS[1];
  if (t <= 18) return RESULTS[2];
  if (t <= 24) return RESULTS[3];
  return RESULTS[4];
}

function buildShareText(total: number, profile: ResultProfile): string {
  return `量産型コンサル汚染度診断：${profile.title}（スコア ${total}/30）\n${profile.tagline}`;
}

function xIntentUrl(text: string, pageUrl: string): string {
  const params = new URLSearchParams({ text });
  if (pageUrl) params.set("url", pageUrl);
  return `https://twitter.com/intent/tweet?${params.toString()}`;
}

type Phase = "intro" | "quiz" | "result";

export function Quiz() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [shareHref, setShareHref] = useState("#");

  const current = QUESTIONS[index];
  const progress = useMemo(
    () => ((index + (phase === "result" ? 1 : 0)) / QUESTIONS.length) * 100,
    [index, phase],
  );

  const result = phase === "result" ? getResultProfile(score) : null;

  useEffect(() => {
    if (!result) return;
    const pageUrl = getSiteUrl() || window.location.href;
    setShareHref(xIntentUrl(buildShareText(score, result), pageUrl));
  }, [result, score]);

  function start() {
    setPhase("quiz");
    setIndex(0);
    setScore(0);
    setShareHref("#");
  }

  function pick(points: number) {
    const nextScore = score + points;
    if (index >= QUESTIONS.length - 1) {
      setScore(nextScore);
      setPhase("result");
      return;
    }
    setScore(nextScore);
    setIndex((i) => i + 1);
  }

  function restart() {
    setPhase("intro");
    setIndex(0);
    setScore(0);
    setShareHref("#");
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col px-4 py-10 sm:px-6">
      <header className="mb-8 animate-fade-in">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
          non-clinical / for fun
        </p>
        <h1 className="mt-2 text-balance text-2xl font-bold leading-tight sm:text-3xl">
          量産型コンサル
          <span className="block text-sky-300">汚染度診断</span>
        </h1>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-slate-300 sm:text-base">
          10問・各4択。点数は「汚染度」です（高いほど量産型の香り）。
          <span className="text-slate-400"> ※医療診断ではありません。</span>
        </p>
      </header>

      <AdSlot slotKey="top" className="mb-6" />

      <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-white/5 ring-1 ring-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-sky-400 via-indigo-400 to-fuchsia-400 transition-[width] duration-500 ease-out"
          style={{ width: `${phase === "intro" ? 6 : Math.min(100, progress)}%` }}
        />
      </div>

      {phase === "intro" && (
        <section className="animate-slide-up flex flex-1 flex-col justify-center">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur">
            <p className="text-sm leading-relaxed text-slate-200">
              準備はいいですか？ 最後に結果タイプ（5種類）と、X共有ボタンが出ます。
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li className="flex gap-2">
                <span className="text-sky-300">①</span>
                直感で選んでOK（迷ったら「一番つらい方」）
              </li>
              <li className="flex gap-2">
                <span className="text-sky-300">②</span>
                所要目安：2〜3分
              </li>
            </ul>
            <button
              type="button"
              onClick={start}
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-sky-500/20 transition hover:brightness-110 active:scale-[0.99]"
            >
              診断をはじめる
            </button>
          </div>
        </section>
      )}

      {phase === "quiz" && current && (
        <section className="animate-slide-up flex flex-1 flex-col">
          <div className="mb-4 flex items-baseline justify-between gap-3">
            <p className="text-xs text-slate-400">
              Q{current.id} / {QUESTIONS.length}
            </p>
            <p className="text-xs text-slate-500">累計スコア（非表示運用も可）</p>
          </div>

          <h2 className="text-balance text-lg font-bold leading-snug sm:text-xl">
            {current.prompt}
          </h2>

          <div className="mt-6 grid gap-3">
            {current.choices.map((c) => (
              <button
                key={c.label}
                type="button"
                onClick={() => pick(c.points)}
                className="group rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left text-sm leading-relaxed text-slate-100 ring-0 transition hover:border-sky-400/35 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 active:scale-[0.99] sm:text-base"
              >
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-slate-500 transition group-hover:bg-sky-300" />
                {c.label}
              </button>
            ))}
          </div>
        </section>
      )}

      {phase === "result" && result && (
        <section className="animate-slide-up flex flex-1 flex-col">
          <div
            className={`rounded-2xl border border-white/10 bg-gradient-to-br ${result.accent} p-[1px]`}
          >
            <div className="rounded-2xl bg-slate-950/80 p-6 backdrop-blur">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${result.badge}`}
                >
                  診断結果
                </span>
                <span className="text-xs text-slate-400">スコア {score} / 30</span>
              </div>

              <h2 className="mt-4 text-balance text-xl font-bold sm:text-2xl">
                {result.title}
              </h2>
              <p className="mt-2 text-sm font-medium text-slate-200 sm:text-base">
                {result.tagline}
              </p>
              <p className="mt-4 text-pretty text-sm leading-relaxed text-slate-300">
                {result.body}
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={shareHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
                >
                  <span aria-hidden>𝕏</span>
                  結果をXで共有
                </a>
                <button
                  type="button"
                  onClick={restart}
                  className="inline-flex flex-1 items-center justify-center rounded-xl border border-white/15 bg-transparent px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/5"
                >
                  もう一度
                </button>
              </div>
            </div>
          </div>

          <AdSlot slotKey="result" className="mt-6" />

          <p className="mt-4 text-center text-xs text-slate-500">
            共有文に公開URLが付きます（本番では NEXT_PUBLIC_SITE_URL を設定してください）。
          </p>
        </section>
      )}

      <footer className="mt-auto pt-10 text-center text-[11px] text-slate-600">
        <p>この診断はフィクションです。職種・会社を特定する意図はありません。</p>
        <p className="mt-2">
          <Link href="/privacy" className="text-slate-500 underline hover:text-slate-400">
            プライバシーポリシー
          </Link>
        </p>
      </footer>
    </main>
  );
}
