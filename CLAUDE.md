# MiraStudy プロジェクト開発ガイドライン

## CSS品質チェックリスト（必須）

CSS追加・修正時は以下を**必ず**確認すること：

### 1. CSS変数の定義確認
```bash
# 使用されている変数が全て定義されているか確認
grep -oE 'var\(--[a-zA-Z0-9_-]+\)' css/style.css | sort -u | while read var; do
  varname=$(echo $var | sed 's/var(//; s/)//')
  grep -q "^\s*${varname}:" css/style.css || echo "UNDEFINED: $varname"
done
```

### 2. 重複セレクタの確認
```bash
# 同じセレクタが複数回定義されていないか確認
grep -n "^\." css/style.css | cut -d: -f2 | sed 's/{.*//' | sort | uniq -d
```

### 3. ブレースのバランス確認
```bash
python3 -c "
css = open('css/style.css').read()
print('OK' if css.count('{') == css.count('}') else 'ERROR: Mismatched braces')
"
```

---

## 過去のインシデント記録

### 2025-12-31: CSSレイアウト崩れ

**症状**: 全ページでカラムレイアウト崩れ、FAQデザイン崩れ

**原因**:
1. CSSファイル後半に「index.html用」等のコメント付きで約400行の重複CSSが存在
2. 後から定義されたCSSが前半の正しいスタイルを上書き
3. 未定義のCSS変数（`--color-primary`, `--radius-lg`, `--shadow-sm`等）が使用されていた

**影響を受けたクラス**:
- `.faq` - カード型→ボーダー型に変更
- `.features`, `.flow`, `.access` - セクション定義がgrid定義で上書き
- `.contact__lead` - 文字色が`--color-gray-300`（ほぼ見えない）に

**修正内容**:
- 重複CSS約400行を削除
- 未定義CSS変数を`:root`に追加
- 未使用クラス（`.about__pillars`系）を削除

**再発防止策**:
1. CSS追加時は上記チェックリストを実行
2. CSSクラス追加時は「定義の存在」だけでなく「重複がないか」も確認
3. CSS変数使用時は`:root`での定義を確認
4. 「〇〇用」というコメント付きの重複CSSは作成しない（同じクラス名で別スタイルは禁止）

---

## 命名規則

### BEM記法
- Block: `.block-name`
- Element: `.block-name__element`
- Modifier: `.block-name--modifier`

### ページ固有スタイル
- index.html用: `.{block}-preview__*` (例: `.price-preview__*`)
- 詳細ページ用: `.{block}__*` または `.{block}-{section}__*`

**禁止**: 同じクラス名で異なるスタイルを定義すること

---

## CSS変数一覧（:root定義済み）

### カラー
- `--color-primary`: メインカラー
- `--color-text`, `--color-text-light`, `--color-text-muted`
- `--color-bg`, `--color-bg-light`, `--color-bg-gray`
- `--color-border`, `--color-accent`
- `--color-gray-50` 〜 `--color-gray-900`, `--color-white`, `--color-black`

### スペーシング
- `--section-padding`, `--section-padding-sp`
- `--inner-width`, `--inner-padding`

### その他
- `--font-family`
- `--transition`
- `--radius-sm`, `--radius-md`, `--radius-lg` (WFでは0)
- `--shadow-sm`, `--shadow-md`, `--shadow-lg`
