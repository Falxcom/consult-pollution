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
      "会議の冒頭で、自然に「本日の論点を揃えます」が出たことがある？",
    choices: [
      { label: "ない。出たら自分で笑う。", points: 0 },
      { label: "たまにある。すぐ飲み物を飲む。", points: 10 },
      { label: "週3以上。会議室の空気が整う。", points: 20 },
      { label: "家族会議でも言いそうになった。", points: 30 },
    ],
  },
  {
    id: 2,
    prompt: "「ステークホルダー」という言葉の使用頻度は？",
    choices: [
      { label: "ほぼ使わない（関係者で十分）", points: 0 },
      { label: "仕事のチャットでたまに", points: 10 },
      { label: "口癖。歯磨き中にも浮かぶ", points: 20 },
      { label: "ペットの名前を検討した", points: 30 },
    ],
  },
  {
    id: 3,
    prompt: "白紙のスライドを開いたときの感情に近いのは？",
    choices: [
      { label: "不安。何から書けばいいの？", points: 0 },
      { label: "普通。ツールの一つ。", points: 10 },
      { label: "落ち着く。世界が整列する。", points: 20 },
      { label: "無。思考がテンプレに吸い込まれる。", points: 30 },
    ],
  },
  {
    id: 4,
    prompt:
      "「課題 → 解決策 → ロードマップ」の三点セットを、説明なしで並べられる？",
    choices: [
      { label: "並べられない（意味が曖昧）", points: 0 },
      { label: "資料があれば並べられる", points: 10 },
      { label: "口頭で秒で並べられる", points: 20 },
      { label: "夢の中で並べた記憶がある", points: 30 },
    ],
  },
  {
    id: 5,
    prompt: "「一旦お繋ぎします」系の言い回し、どのくらい身についてる？",
    choices: [
      { label: "使わない", points: 0 },
      { label: "ビジネスメールでたまに", points: 10 },
      { label: "口が勝手に動く", points: 20 },
      { label: "カフェで席を譲る時も言いそう", points: 30 },
    ],
  },
  {
    id: 6,
    prompt: "2×2マトリクスを、私生活の悩みに使ったことは？",
    choices: [
      { label: "ない", points: 0 },
      { label: "頭の中だけ", points: 10 },
      { label: "紙に書いた（またはスライド化）", points: 20 },
      { label: "相手に共有して合意形成した", points: 30 },
    ],
  },
  {
    id: 7,
    prompt:
      "「領域」「レイヤー」「インパクト」のどれかが、会話の潤滑油になっている？",
    choices: [
      { label: "いいえ", points: 0 },
      { label: "たまに滑る", points: 10 },
      { label: "会話が止まると出る", points: 20 },
      { label: "止まらなくても出る", points: 30 },
    ],
  },
  {
    id: 8,
    prompt: "図の配色は、青〜水色のグラデ＋白文字に寄りがち？",
    choices: [
      { label: "いいえ（別の美学）", points: 0 },
      { label: "たまに寄る", points: 10 },
      { label: "基本それ", points: 20 },
      { label: "他色を入れると落ち着かない", points: 30 },
    ],
  },
  {
    id: 9,
    prompt: "「初期仮説」という言葉が、休日に頭をよぎったことは？",
    choices: [
      { label: "ない", points: 0 },
      { label: "一度くらい", points: 10 },
      { label: "年に数回はある", points: 20 },
      { label: "昨日もあった", points: 30 },
    ],
  },
  {
    id: 10,
    prompt: "最後に正直に：自分の説明、フレームワーク臭がする？",
    choices: [
      { label: "しない（たぶん）", points: 0 },
      { label: "たまにするかも", points: 10 },
      { label: "する。でも筋は通ってる", points: 20 },
      { label: "フレームワークの匂いが香水みたい", points: 30 },
    ],
  },
  {
    id: 11,
    prompt: "「まず全体像から」を、雑談でも言いそうになる？",
    choices: [
      { label: "ならない", points: 0 },
      { label: "仕事ではたまに", points: 10 },
      { label: "飲み会の相談でも出る", points: 20 },
      { label: "近況報告に目次を付けたい", points: 30 },
    ],
  },
  {
    id: 12,
    prompt: "何かを聞かれた時、回答前に「前提として」と置きがち？",
    choices: [
      { label: "置かない", points: 0 },
      { label: "複雑な話なら置く", points: 10 },
      { label: "ほぼ毎回置く", points: 20 },
      { label: "「前提の前提」まで置く", points: 30 },
    ],
  },
  {
    id: 13,
    prompt: "休日の予定を「優先順位」で整理したことは？",
    choices: [
      { label: "ない。気分で動く", points: 0 },
      { label: "忙しい日だけ", points: 10 },
      { label: "よくある", points: 20 },
      { label: "緊急度・重要度で色分けした", points: 30 },
    ],
  },
  {
    id: 14,
    prompt: "「粒度」という言葉、どのくらい使う？",
    choices: [
      { label: "使わない", points: 0 },
      { label: "たまに使う", points: 10 },
      { label: "かなり便利に使う", points: 20 },
      { label: "会話の粒度が粗いと不安", points: 30 },
    ],
  },
  {
    id: 15,
    prompt: "資料のタイトルに「〜の方向性」と付けたくなる？",
    choices: [
      { label: "ならない", points: 0 },
      { label: "たまに便利", points: 10 },
      { label: "かなり付ける", points: 20 },
      { label: "方向性の方向性まで作れる", points: 30 },
    ],
  },
  {
    id: 16,
    prompt: "「論点」を3つに分解すると落ち着く？",
    choices: [
      { label: "落ち着かない", points: 0 },
      { label: "時々助かる", points: 10 },
      { label: "かなり落ち着く", points: 20 },
      { label: "3つに割れないと寝つきが悪い", points: 30 },
    ],
  },
  {
    id: 17,
    prompt: "Slackやチャットで「認識齟齬」を使ったことは？",
    choices: [
      { label: "ない", points: 0 },
      { label: "1〜2回ある", points: 10 },
      { label: "自然に使う", points: 20 },
      { label: "変換候補の先頭にいる", points: 30 },
    ],
  },
  {
    id: 18,
    prompt: "「スコープ外です」と言う時の心拍数は？",
    choices: [
      { label: "上がる。言いにくい", points: 0 },
      { label: "少しだけ上がる", points: 10 },
      { label: "普通に言える", points: 20 },
      { label: "むしろ整う", points: 30 },
    ],
  },
  {
    id: 19,
    prompt: "物事を「短期・中期・長期」で考えがち？",
    choices: [
      { label: "あまりない", points: 0 },
      { label: "仕事ではある", points: 10 },
      { label: "日常でもある", points: 20 },
      { label: "夕食すら3フェーズで見る", points: 30 },
    ],
  },
  {
    id: 20,
    prompt: "「示唆」という言葉を、実は少し気に入っている？",
    choices: [
      { label: "気に入ってない", points: 0 },
      { label: "便利だとは思う", points: 10 },
      { label: "かなり好き", points: 20 },
      { label: "示唆を出すために生きている", points: 30 },
    ],
  },
  {
    id: 21,
    prompt: "議事録で「Next Action」を書くと安心する？",
    choices: [
      { label: "書かない", points: 0 },
      { label: "必要なら書く", points: 10 },
      { label: "毎回書く", points: 20 },
      { label: "人生にもNext Actionが欲しい", points: 30 },
    ],
  },
  {
    id: 22,
    prompt: "「ファクトベースで」と言いながら、場を引き締めたことは？",
    choices: [
      { label: "ない", points: 0 },
      { label: "一度あるかも", points: 10 },
      { label: "何度かある", points: 20 },
      { label: "空気清浄機のように使う", points: 30 },
    ],
  },
  {
    id: 23,
    prompt: "「腹落ち」という表現、どのくらい使う？",
    choices: [
      { label: "使わない", points: 0 },
      { label: "たまに使う", points: 10 },
      { label: "普通に使う", points: 20 },
      { label: "腹落ちしていないと腹が減る", points: 30 },
    ],
  },
  {
    id: 24,
    prompt: "「誰がボールを持つか」を会議で確認したくなる？",
    choices: [
      { label: "ならない", points: 0 },
      { label: "曖昧なら確認する", points: 10 },
      { label: "基本確認する", points: 20 },
      { label: "ボールの所有権に敏感", points: 30 },
    ],
  },
  {
    id: 25,
    prompt: "グラフを見ると、すぐ「So What?」を探す？",
    choices: [
      { label: "探さない", points: 0 },
      { label: "重要そうなら探す", points: 10 },
      { label: "だいたい探す", points: 20 },
      { label: "So Whatがないグラフは寂しい", points: 30 },
    ],
  },
  {
    id: 26,
    prompt: "「打ち手」という言葉が会話に出る頻度は？",
    choices: [
      { label: "ほぼない", points: 0 },
      { label: "仕事では時々", points: 10 },
      { label: "かなり出る", points: 20 },
      { label: "家事にも打ち手を求める", points: 30 },
    ],
  },
  {
    id: 27,
    prompt: "「横串」という言葉を聞くと少しテンションが上がる？",
    choices: [
      { label: "上がらない", points: 0 },
      { label: "意味はわかる", points: 10 },
      { label: "便利だと思う", points: 20 },
      { label: "焼き鳥より横串が好き", points: 30 },
    ],
  },
  {
    id: 28,
    prompt: "会話を「結論から言うと」で始めがち？",
    choices: [
      { label: "始めない", points: 0 },
      { label: "仕事ではたまに", points: 10 },
      { label: "よく始める", points: 20 },
      { label: "天気の話でも結論から入る", points: 30 },
    ],
  },
  {
    id: 29,
    prompt: "「あるべき姿」と「現状」のギャップを見る癖がある？",
    choices: [
      { label: "ない", points: 0 },
      { label: "仕事ではある", points: 10 },
      { label: "日常でもある", points: 20 },
      { label: "冷蔵庫にもあるべき姿がある", points: 30 },
    ],
  },
  {
    id: 30,
    prompt: "「クイックに確認します」と言って本当にクイックだった？",
    choices: [
      { label: "そもそも言わない", points: 0 },
      { label: "たまに言う", points: 10 },
      { label: "よく言う", points: 20 },
      { label: "クイックと言えば免罪符になる", points: 30 },
    ],
  },
  {
    id: 31,
    prompt: "「解像度を上げる」という表現、自然に使う？",
    choices: [
      { label: "使わない", points: 0 },
      { label: "たまに使う", points: 10 },
      { label: "よく使う", points: 20 },
      { label: "人生の解像度も上げたい", points: 30 },
    ],
  },
  {
    id: 32,
    prompt: "何かを頼まれると、まず「目的は何か」を聞きたくなる？",
    choices: [
      { label: "聞かない", points: 0 },
      { label: "必要なら聞く", points: 10 },
      { label: "だいたい聞く", points: 20 },
      { label: "注文前に飲み物の目的を聞く", points: 30 },
    ],
  },
  {
    id: 33,
    prompt: "「KPI」という言葉が便利すぎて困る？",
    choices: [
      { label: "困らない。使わない", points: 0 },
      { label: "仕事では便利", points: 10 },
      { label: "私生活にも少し侵入", points: 20 },
      { label: "睡眠のKPIを設計した", points: 30 },
    ],
  },
  {
    id: 34,
    prompt: "「合意形成」が完了しないと前に進みにくい？",
    choices: [
      { label: "そこまでではない", points: 0 },
      { label: "重要な時だけ", points: 10 },
      { label: "かなり気になる", points: 20 },
      { label: "ランチの店選びにも合意形成", points: 30 },
    ],
  },
  {
    id: 35,
    prompt: "「MECE」をまだ心のどこかで信じている？",
    choices: [
      { label: "信じていない", points: 0 },
      { label: "便利な時はある", points: 10 },
      { label: "かなり信じている", points: 20 },
      { label: "世界はMECEであってほしい", points: 30 },
    ],
  },
  {
    id: 36,
    prompt: "「ざっくり絵にすると」と言って図を書き始める？",
    choices: [
      { label: "書かない", points: 0 },
      { label: "たまに書く", points: 10 },
      { label: "よく書く", points: 20 },
      { label: "紙ナプキンがホワイトボード", points: 30 },
    ],
  },
  {
    id: 37,
    prompt: "「ボトルネック」を日常会話で使ったことは？",
    choices: [
      { label: "ない", points: 0 },
      { label: "一度ある", points: 10 },
      { label: "普通にある", points: 20 },
      { label: "洗濯のボトルネックも語れる", points: 30 },
    ],
  },
  {
    id: 38,
    prompt: "「一次情報」を取りに行きたくなる？",
    choices: [
      { label: "あまりない", points: 0 },
      { label: "仕事ならある", points: 10 },
      { label: "かなりある", points: 20 },
      { label: "噂話にもソース確認する", points: 30 },
    ],
  },
  {
    id: 39,
    prompt: "「この資料、1枚で言うと？」と圧縮したくなる？",
    choices: [
      { label: "ならない", points: 0 },
      { label: "長い時だけ", points: 10 },
      { label: "よくある", points: 20 },
      { label: "人生も1枚にしたい", points: 30 },
    ],
  },
  {
    id: 40,
    prompt: "「ROI」を自分の時間の使い方にも当てはめる？",
    choices: [
      { label: "当てはめない", points: 0 },
      { label: "仕事なら", points: 10 },
      { label: "たまに私生活でも", points: 20 },
      { label: "休日のROIを測り始めた", points: 30 },
    ],
  },
  {
    id: 41,
    prompt: "「ペインポイント」を聞くと安心する？",
    choices: [
      { label: "特に安心しない", points: 0 },
      { label: "意味はわかる", points: 10 },
      { label: "課題が見えて安心", points: 20 },
      { label: "痛みが構造化される快感", points: 30 },
    ],
  },
  {
    id: 42,
    prompt: "「仮置きで」と言えば会話が進むと思っている？",
    choices: [
      { label: "思っていない", points: 0 },
      { label: "時々そう思う", points: 10 },
      { label: "かなり思う", points: 20 },
      { label: "人生も仮置きで進めたい", points: 30 },
    ],
  },
  {
    id: 43,
    prompt: "「ドライバー」を、運転手以外の意味で使ったことは？",
    choices: [
      { label: "ない", points: 0 },
      { label: "聞いたことはある", points: 10 },
      { label: "普通に使う", points: 20 },
      { label: "成長ドライバーで会話が加速する", points: 30 },
    ],
  },
  {
    id: 44,
    prompt: "「インパクトが大きい順に」と並べ替えたくなる？",
    choices: [
      { label: "ならない", points: 0 },
      { label: "仕事ならある", points: 10 },
      { label: "よくある", points: 20 },
      { label: "買い物リストもインパクト順", points: 30 },
    ],
  },
  {
    id: 45,
    prompt: "「資料のトンマナ」を気にする？",
    choices: [
      { label: "気にしない", points: 0 },
      { label: "少し気にする", points: 10 },
      { label: "かなり気にする", points: 20 },
      { label: "トンマナがズレると胸がざわつく", points: 30 },
    ],
  },
  {
    id: 46,
    prompt: "「ここは握っておきたい」と言ったことは？",
    choices: [
      { label: "ない", points: 0 },
      { label: "一度あるかも", points: 10 },
      { label: "普通にある", points: 20 },
      { label: "握りすぎて手汗が出る", points: 30 },
    ],
  },
  {
    id: 47,
    prompt: "「粗々ですが」と言いながら、そこそこ作り込んだ資料を出す？",
    choices: [
      { label: "出さない", points: 0 },
      { label: "たまに出す", points: 10 },
      { label: "よく出す", points: 20 },
      { label: "粗々の定義が厳しすぎる", points: 30 },
    ],
  },
  {
    id: 48,
    prompt: "「実行可能性」を気にしすぎて、夢にも制約条件を置く？",
    choices: [
      { label: "置かない", points: 0 },
      { label: "仕事なら気にする", points: 10 },
      { label: "私生活でも気になる", points: 20 },
      { label: "夢にもWBSがある", points: 30 },
    ],
  },
  {
    id: 49,
    prompt: "「誰向けの資料か」を聞かないと作れない？",
    choices: [
      { label: "作れる", points: 0 },
      { label: "聞けるなら聞きたい", points: 10 },
      { label: "ほぼ必ず聞く", points: 20 },
      { label: "聴衆ペルソナが見えるまで無理", points: 30 },
    ],
  },
  {
    id: 50,
    prompt: "「この話のゴールは？」を、相手の相談中に考えてしまう？",
    choices: [
      { label: "考えない", points: 0 },
      { label: "たまに考える", points: 10 },
      { label: "かなり考える", points: 20 },
      { label: "相談開始3秒でゴール設定", points: 30 },
    ],
  },
];

type ResultProfile = {
  level: number;
  range: string;
  title: string;
  tagline: string;
  body: string;
  accent: string;
  badge: string;
};

const RESULTS: ResultProfile[] = [
  {
    level: 1,
    range: "0〜60",
    title: "タイプ α：未汚染ゾーン",
    tagline: "職場では静かなネイティブ。スライドの森に迷い込んでいない。",
    body: "汚染度はかなり低め。説明が自然で、まだ人間の温度が保たれています。論点・示唆・打ち手の三連星に囲まれても、深呼吸で戻ってこられるレベルです。",
    accent: "from-emerald-400/30 to-cyan-400/20",
    badge: "bg-emerald-500/15 text-emerald-200 ring-emerald-400/30",
  },
  {
    level: 2,
    range: "70〜120",
    title: "タイプ β：軽度スライド脳",
    tagline: "たまに「領域」が口から零れる。まだ取り返しはつく。",
    body: "飲み会で「ステークホルダー」を言いそうになったら、水を飲んでリセット。ここから先は自己防衛が効きます。",
    accent: "from-sky-400/25 to-blue-500/15",
    badge: "bg-sky-500/15 text-sky-200 ring-sky-400/30",
  },
  {
    level: 3,
    range: "130〜180",
    title: "タイプ γ：中等度（会話に図解の匂い）",
    tagline: "説明が「構造化」されがち。箇条書きが恋しい季節。",
    body: "良い意味でも悪い意味でも、頭が整理屋さん。たまに感情よりロジックが先に出るので、ハグかカレーを挟むと均衡が戻ります。",
    accent: "from-indigo-400/25 to-violet-500/15",
    badge: "bg-indigo-500/15 text-indigo-200 ring-indigo-400/30",
  },
  {
    level: 4,
    range: "190〜240",
    title: "タイプ δ：高濃度（意思決定は図がないと怖い）",
    tagline: "要点は3つ。矢印は右向き。結論は左上。",
    body: "あなたの説明は、たぶんもう美しい。ただ、レシピを聞かれたのにロードマップを返さない練習をすると、人間味が増します。",
    accent: "from-fuchsia-400/25 to-rose-500/15",
    badge: "bg-fuchsia-500/15 text-fuchsia-200 ring-fuchsia-400/30",
  },
  {
    level: 5,
    range: "250〜300",
    title: "タイプ Ω：完全スライド化",
    tagline: "フレームワークで呼吸している。睡眠は疎結合。",
    body: "最終形態です。診断結果もきっと2ページ目に「示唆」がありますよね？ …ない？ 追加しますか？（冗談です。休んでください）",
    accent: "from-amber-400/30 to-orange-500/20",
    badge: "bg-amber-500/15 text-amber-200 ring-amber-400/35",
  },
];

const QUESTIONS_PER_RUN = 10;
const MAX_SCORE = QUESTIONS_PER_RUN * 30;
const MAX_TOTAL_SCORE = MAX_SCORE * 2;
const PRESSURE_HEAVY_IDS = new Set([18, 22, 24, 28, 32, 34, 38, 46, 47, 50]);
const PRESSURE_MEDIUM_IDS = new Set([12, 16, 21, 25, 29, 35, 40, 42, 44, 49]);

function getResultProfile(total: number): ResultProfile {
  const t = Math.max(0, Math.min(MAX_SCORE, total));
  if (t <= 60) return RESULTS[0];
  if (t <= 120) return RESULTS[1];
  if (t <= 180) return RESULTS[2];
  if (t <= 240) return RESULTS[3];
  return RESULTS[4];
}

type AxisProfile = {
  key:
    | "natural"
    | "organizer"
    | "craftsperson"
    | "facilitator"
    | "coordinator"
    | "slideLead"
    | "pressureManager"
    | "hardPm"
    | "commander";
  title: string;
  label: string;
  body: string;
};

type NextAction = {
  title: "事業会社に転職" | "ハラスメント退職" | "自分探しの旅" | "来期はプロモーション";
  body: string;
};

function getPressureWeight(questionId: number): number {
  if (PRESSURE_HEAVY_IDS.has(questionId)) return 30;
  if (PRESSURE_MEDIUM_IDS.has(questionId)) return 20;
  return 10;
}

function getPressureContribution(questionId: number, points: number): number {
  return Math.round((points * getPressureWeight(questionId)) / 30);
}

function getPressureMax(questionSet: Question[]): number {
  return questionSet.reduce((sum, q) => sum + getPressureWeight(q.id), 0);
}

function toNormalizedScore(raw: number, max: number): number {
  if (max <= 0) return 0;
  return Math.round((raw / max) * MAX_SCORE);
}

type AxisBand = "low" | "mid" | "high";

function getBand(score: number): AxisBand {
  if (score < 100) return "low";
  if (score < 200) return "mid";
  return "high";
}

function getAxisProfile(structureScore: number, pressureScore: number): AxisProfile {
  const structure = getBand(structureScore);
  const pressure = getBand(pressureScore);
  const key = `${structure}-${pressure}`;

  const profiles: Record<string, AxisProfile> = {
    "low-low": {
      key: "natural",
      title: "自然体コミュニケーター",
      label: "低構造 × 低圧",
      body: "会話に人間味があり、相手に逃げ道を残せるタイプ。資料より雑談で価値を出す平和枠です。",
    },
    "mid-low": {
      key: "organizer",
      title: "整理上手の若手参謀",
      label: "中構造 × 低圧",
      body: "必要な時だけ論点を整理できる、ほどよいバランス型。場を壊さずに話を前に進めます。",
    },
    "high-low": {
      key: "craftsperson",
      title: "やさしい構造化職人",
      label: "高構造 × 低圧",
      body: "図解・論点整理・スライド化が得意。ただし詰めは弱めで、相手に優しい運用ができます。",
    },
    "low-mid": {
      key: "facilitator",
      title: "現場ファシリテーター",
      label: "低構造 × 中圧",
      body: "構文は少なめでも、会議の前進力はそこそこ強いタイプ。場を回す力が出ています。",
    },
    "mid-mid": {
      key: "coordinator",
      title: "会議室の調整役",
      label: "中構造 × 中圧",
      body: "整理も確認もほどほどに強い中央型。便利な人ですが、時々“仕事っぽさ”が漏れます。",
    },
    "high-mid": {
      key: "slideLead",
      title: "スライド推進リーダー",
      label: "高構造 × 中圧",
      body: "資料と論点で物事を前に進めるタイプ。圧は管理範囲内ですが、少し会議体が増えがちです。",
    },
    "low-high": {
      key: "pressureManager",
      title: "現場圧マネージャー",
      label: "低構造 × 高圧",
      body: "構文より圧が先に出るタイプ。正論の速度が速いので、相手の逃げ道を先に置くと安全です。",
    },
    "mid-high": {
      key: "hardPm",
      title: "詰め寄りPM",
      label: "中構造 × 高圧",
      body: "目的・期限・責任所在をかなり見に行く推進型。成果は出ますが、1on1の温度管理が重要です。",
    },
    "high-high": {
      key: "commander",
      title: "高圧スライド司令塔",
      label: "高構造 × 高圧",
      body: "構造化・論点整理・責任所在の確認が全部強め。仕事は進みますが、相手から見ると“詰め会”になりがちです。",
    },
  };

  return profiles[key];
}

function getNextAction(structureScore: number, pressureScore: number): NextAction {
  const highStructure = structureScore >= 150;
  const highPressure = pressureScore >= 150;

  if (!highStructure && !highPressure) {
    return {
      title: "自分探しの旅",
      body: "まだ染まりきっていません。Excelを閉じて、少しだけ予定のない週末を取り戻しましょう。",
    };
  }

  if (highStructure && !highPressure) {
    return {
      title: "事業会社に転職",
      body: "構造化力は武器。ただし詰めは弱めなので、事業会社の企画・BizOps・PdM周辺で穏やかに活きる可能性があります。",
    };
  }

  if (!highStructure && highPressure) {
    return {
      title: "ハラスメント退職",
      body: "構文より圧が先に出るタイプ。次の1on1では正論を半分にして、相手の逃げ道を先に置きましょう。",
    };
  }

  return {
    title: "来期はプロモーション",
    body: "構造化も推進圧も強め。成果は出そうですが、周囲のHPも削りがちです。昇進の前に優しさのKPIも置きましょう。",
  };
}

function buildShareText(
  totalScore: number,
  axisProfile: AxisProfile,
  nextAction: NextAction,
): string {
  return `量産型コンサル汚染度診断：${axisProfile.title}
総合スコア ${totalScore}/${MAX_TOTAL_SCORE}pt
二軸タイプ：${axisProfile.title}（${axisProfile.label}）
ネクストアクション：${nextAction.title}`;
}

function xIntentUrl(text: string, pageUrl: string): string {
  const params = new URLSearchParams({ text });
  if (pageUrl) params.set("url", pageUrl);
  return `https://twitter.com/intent/tweet?${params.toString()}`;
}

function lineShareUrl(text: string, pageUrl: string): string {
  const body = pageUrl ? `${text}\n${pageUrl}` : text;
  return `https://line.me/R/msg/text/?${encodeURIComponent(body)}`;
}

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function selectQuestions(): Question[] {
  const pressureQuestions = QUESTIONS.filter((q) => getPressureWeight(q.id) >= 20);
  const otherQuestions = QUESTIONS.filter((q) => getPressureWeight(q.id) < 20);
  return [
    ...shuffle(pressureQuestions).slice(0, 4),
    ...shuffle(otherQuestions).slice(0, QUESTIONS_PER_RUN - 4),
  ].sort(() => Math.random() - 0.5);
}

const AXIS_CELLS: Array<{
  structure: AxisBand;
  pressure: AxisBand;
  title: string;
  tone: string;
}> = [
  { structure: "low", pressure: "high", title: "現場圧マネ", tone: "bg-rose-500/18 text-rose-50" },
  { structure: "mid", pressure: "high", title: "詰め寄りPM", tone: "bg-orange-400/20 text-orange-50" },
  { structure: "high", pressure: "high", title: "高圧スライド司令塔", tone: "bg-amber-400/22 text-amber-50" },
  { structure: "low", pressure: "mid", title: "現場ファシリ", tone: "bg-purple-400/15 text-purple-50" },
  { structure: "mid", pressure: "mid", title: "会議室の調整役", tone: "bg-indigo-400/16 text-indigo-50" },
  { structure: "high", pressure: "mid", title: "スライド推進リーダー", tone: "bg-sky-400/18 text-sky-50" },
  { structure: "low", pressure: "low", title: "自然体", tone: "bg-emerald-400/14 text-emerald-50" },
  { structure: "mid", pressure: "low", title: "若手参謀", tone: "bg-teal-400/14 text-teal-50" },
  { structure: "high", pressure: "low", title: "構造化職人", tone: "bg-cyan-400/16 text-cyan-50" },
];

function ConsultantIllustration({ profile }: { profile: AxisProfile }) {
  const palette: Record<AxisProfile["key"], { suit: string; accent: string; item: string }> = {
    natural: { suit: "#334155", accent: "#34d399", item: "☕" },
    organizer: { suit: "#0f766e", accent: "#5eead4", item: "☑" },
    craftsperson: { suit: "#0369a1", accent: "#7dd3fc", item: "▦" },
    facilitator: { suit: "#6d28d9", accent: "#c4b5fd", item: "↔" },
    coordinator: { suit: "#4338ca", accent: "#a5b4fc", item: "◎" },
    slideLead: { suit: "#0284c7", accent: "#38bdf8", item: "▶" },
    pressureManager: { suit: "#be123c", accent: "#fda4af", item: "!" },
    hardPm: { suit: "#c2410c", accent: "#fdba74", item: "!" },
    commander: { suit: "#b45309", accent: "#fde68a", item: "★" },
  };
  const color = palette[profile.key];

  return (
    <svg viewBox="0 0 220 180" role="img" aria-label={`${profile.title}のイラスト`} className="mx-auto h-44 w-full max-w-[260px]">
      <defs>
        <linearGradient id={`glow-${profile.key}`} x1="0" x2="1" y1="0" y2="1">
          <stop stopColor={color.accent} stopOpacity="0.9" />
          <stop offset="1" stopColor={color.suit} stopOpacity="0.65" />
        </linearGradient>
      </defs>
      <rect x="22" y="18" width="176" height="138" rx="28" fill={`url(#glow-${profile.key})`} opacity="0.18" />
      <rect x="48" y="92" width="124" height="58" rx="18" fill={color.suit} />
      <path d="M76 94l34 38 34-38" fill="#f8fafc" opacity="0.92" />
      <path d="M98 104h24l-6 26h-12z" fill={color.accent} />
      <circle cx="110" cy="67" r="35" fill="#f8d3b6" />
      <path d="M76 62c8-31 59-35 70-2-20-9-45-8-70 2z" fill="#1e293b" />
      <circle cx="97" cy="70" r="3" fill="#0f172a" />
      <circle cx="123" cy="70" r="3" fill="#0f172a" />
      <path d="M98 84c8 6 18 6 25 0" fill="none" stroke="#7c2d12" strokeLinecap="round" strokeWidth="3" />
      <rect x="139" y="36" width="44" height="58" rx="8" fill="#f8fafc" opacity="0.95" />
      <path d="M148 50h26M148 62h20M148 74h25" stroke={color.suit} strokeLinecap="round" strokeWidth="4" />
      <circle cx="58" cy="42" r="20" fill={color.accent} opacity="0.95" />
      <text x="58" y="50" textAnchor="middle" fontSize="24" fontWeight="900" fill="#0f172a">
        {color.item}
      </text>
      <path d="M52 122h116" stroke="#e2e8f0" strokeLinecap="round" strokeWidth="8" opacity="0.55" />
      <path d="M68 137h84" stroke="#e2e8f0" strokeLinecap="round" strokeWidth="8" opacity="0.35" />
    </svg>
  );
}

type Phase = "intro" | "quiz" | "result";

export function Quiz() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [questionSet, setQuestionSet] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [pressureRawScore, setPressureRawScore] = useState(0);
  const [shareHref, setShareHref] = useState("#");
  const [lineHref, setLineHref] = useState("#");
  const [shareText, setShareText] = useState("");
  const [copied, setCopied] = useState(false);

  const current = questionSet[index];
  const progress = useMemo(
    () => ((index + (phase === "result" ? 1 : 0)) / QUESTIONS_PER_RUN) * 100,
    [index, phase],
  );

  const pressureScore = useMemo(
    () => toNormalizedScore(pressureRawScore, getPressureMax(questionSet)),
    [pressureRawScore, questionSet],
  );
  const totalScore = score + pressureScore;
  const result =
    phase === "result" ? getResultProfile(Math.round(totalScore / 2)) : null;
  const axisProfile = useMemo(
    () =>
      phase === "result" && result
        ? getAxisProfile(score, pressureScore)
        : null,
    [phase, pressureScore, result, score],
  );
  const nextAction =
    phase === "result" && result ? getNextAction(score, pressureScore) : null;

  useEffect(() => {
    if (!result || !axisProfile || !nextAction) return;
    const pageUrl = getSiteUrl() || window.location.href;
    const text = buildShareText(totalScore, axisProfile, nextAction);
    setShareText(pageUrl ? `${text}\n${pageUrl}` : text);
    setShareHref(xIntentUrl(text, pageUrl));
    setLineHref(lineShareUrl(text, pageUrl));
  }, [axisProfile, nextAction, result, totalScore]);

  function start() {
    setQuestionSet(selectQuestions());
    setPhase("quiz");
    setIndex(0);
    setScore(0);
    setPressureRawScore(0);
    setShareHref("#");
    setLineHref("#");
    setShareText("");
    setCopied(false);
  }

  function pick(points: number) {
    const nextScore = score + points;
    const nextPressureScore =
      pressureRawScore + getPressureContribution(current.id, points);
    if (index >= QUESTIONS_PER_RUN - 1) {
      setScore(nextScore);
      setPressureRawScore(nextPressureScore);
      setPhase("result");
      return;
    }
    setScore(nextScore);
    setPressureRawScore(nextPressureScore);
    setIndex((i) => i + 1);
  }

  function restart() {
    setQuestionSet(selectQuestions());
    setPhase("quiz");
    setIndex(0);
    setScore(0);
    setPressureRawScore(0);
    setShareHref("#");
    setLineHref("#");
    setShareText("");
    setCopied(false);
  }

  async function copyShareText() {
    if (!shareText) return;
    await navigator.clipboard.writeText(shareText);
    setCopied(true);
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
          50問の設問バンクから毎回ランダムに10問出題。結果は回答傾向の二軸マップから9タイプに分類します。
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
              準備はいいですか？ 最後に5段階レベルと、二軸マップ上の現在地が出ます。
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li className="flex gap-2">
                <span className="text-sky-300">①</span>
                直感で選んでOK（迷ったら「一番つらい方」）
              </li>
              <li className="flex gap-2">
                <span className="text-sky-300">②</span>
                もう一度やるたびに別パターンの設問が出ます
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
              Q{index + 1} / {QUESTIONS_PER_RUN}
            </p>
            <p className="text-xs text-slate-500">全50問からランダム出題中</p>
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

      {phase === "result" && result && axisProfile && nextAction && (
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
                <span className="text-xs text-slate-400">9タイプ診断</span>
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center shadow-2xl shadow-sky-950/30">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  total score
                </p>
                <p className="mt-2 text-6xl font-black leading-none text-white sm:text-7xl">
                  {totalScore}
                  <span className="ml-1 text-xl font-bold text-slate-400">pt</span>
                </p>
                <p className="mt-2 text-xs text-slate-400">
                  最大 {MAX_TOTAL_SCORE}pt（二軸マップの位置からタイプを判定）
                </p>
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <ConsultantIllustration profile={axisProfile} />
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  two-axis type
                </p>
                <h2 className="mt-2 text-balance text-2xl font-black sm:text-3xl">
                  {axisProfile.title}
                </h2>
                <p className="mt-2 text-sm font-medium text-slate-200">
                  {axisProfile.label}
                </p>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-slate-300">
                  {axisProfile.body}
                </p>
              </div>

              <div className="mt-6 rounded-xl border border-white/10 bg-black/20 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-slate-300">
                    二軸マトリクス
                  </p>
                  <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] text-slate-300">
                    {axisProfile.label}
                  </span>
                </div>
                <div className="relative mt-5 aspect-square overflow-hidden rounded-3xl border-2 border-white/20 bg-slate-950 shadow-2xl shadow-rose-950/30">
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
                    {AXIS_CELLS.map((cell) => {
                      const active =
                        cell.structure === getBand(score) &&
                        cell.pressure === getBand(pressureScore);

                      return (
                        <div
                          key={`${cell.structure}-${cell.pressure}`}
                          className={`flex items-center justify-center border border-white/20 p-1 text-center ${cell.tone} ${
                            active ? "outline outline-4 outline-white/70" : ""
                          }`}
                        >
                          <span className="text-[11px] font-black leading-tight sm:text-xs">
                            {cell.title}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="absolute inset-x-4 top-1/3 border-t-4 border-white/45 shadow-[0_0_18px_rgba(255,255,255,0.25)]" />
                  <div className="absolute inset-x-4 top-2/3 border-t-4 border-white/45 shadow-[0_0_18px_rgba(255,255,255,0.25)]" />
                  <div className="absolute inset-y-4 left-1/3 border-l-4 border-white/45 shadow-[0_0_18px_rgba(255,255,255,0.25)]" />
                  <div className="absolute inset-y-4 left-2/3 border-l-4 border-white/45 shadow-[0_0_18px_rgba(255,255,255,0.25)]" />
                  <div
                    className="absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_8px_rgba(14,165,233,0.25),0_0_34px_rgba(251,113,133,0.9)] ring-4 ring-rose-300"
                    style={{
                      left: `${Math.min(94, Math.max(6, (score / MAX_SCORE) * 100))}%`,
                      top: `${Math.min(
                        94,
                        Math.max(6, 100 - (pressureScore / MAX_SCORE) * 100),
                      )}%`,
                    }}
                  />
                </div>
                <p className="mt-3 text-xs leading-relaxed text-slate-400">
                  横軸は構造化の強さ、縦軸は高圧傾向です。点の位置に応じて9タイプのどれかに分類されます。
                </p>
              </div>

              <div className="mt-6 rounded-2xl border border-amber-300/25 bg-amber-400/10 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">
                  next action
                </p>
                <h3 className="mt-2 text-xl font-black text-amber-50">
                  {nextAction.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-amber-50/80">
                  {nextAction.body}
                </p>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <a
                  href={shareHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
                >
                  <span aria-hidden>𝕏</span>
                  結果をXで共有
                </a>
                <a
                  href={lineHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center rounded-xl bg-[#06C755] px-4 py-3 text-sm font-bold text-white transition hover:brightness-110"
                >
                  LINEで共有
                </a>
                <button
                  type="button"
                  onClick={copyShareText}
                  className="inline-flex flex-1 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/8 sm:col-span-2"
                >
                  {copied ? "コピーしました" : "結果テキストをコピー"}
                </button>
                <button
                  type="button"
                  onClick={restart}
                  className="inline-flex flex-1 items-center justify-center rounded-xl border border-white/15 bg-transparent px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/5 sm:col-span-2"
                >
                  別の10問でもう一度
                </button>
              </div>
            </div>
          </div>

          <AdSlot slotKey="result" className="mt-6" />

          <p className="mt-4 text-center text-xs text-slate-500">
            共有文にこのサイトのURLが付きます。
          </p>
        </section>
      )}

      <footer className="mt-auto pt-10 text-center text-[11px] text-slate-600">
        <p>この診断はフィクションです。職種・会社を特定する意図はありません。</p>
        <p className="mt-2 flex justify-center gap-3">
          <Link href="/about" className="text-slate-500 underline hover:text-slate-400">
            このサイトについて
          </Link>
          <Link href="/privacy" className="text-slate-500 underline hover:text-slate-400">
            プライバシーポリシー
          </Link>
        </p>
      </footer>
    </main>
  );
}
