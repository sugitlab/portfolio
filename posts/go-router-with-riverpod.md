---
title: "go routerとriverpodを併用するとき"
date: "2022-03-16"
icon: "idea"
---

:::message
100 点の正解かは分からないけどそれなりに良さそうな気がしている。
自分の中でまとまったら Zenn にでも書くつもり。
:::

Flutter のルーティングは **go_router** 一択という感じになってきました。
状態管理は **これ一択!!** みたいなものはまだ決まっていないですが、個人的には **Riverpod** 使っておけば間違いないという感覚を得ていて、実際まだ困ったことはありません。
もちろん、シンプルな小さいアプリなら Provider (パッケージの方)を使うこともあります。

そんなこんなで go_router と riverpod を併用するときの Tips 的なメモを残しておくことにします。

## go_router と状態管理

go_router は宣言的にルーティングをかけるので、基本的にアプリ全体で共有すべき情報があります。

1. パス (または名前)
2. GoRouter の実体

以下、説明のために公式の Example を引用

https://github.com/csells/go_router/blob/main/go_router/example/lib/main.dart

```dart:公式の Example から引用
class App extends StatelessWidget {
  App({Key? key}) : super(key: key);

  static const title = 'GoRouter Example: Declarative Routes';

  @override
  Widget build(BuildContext context) => MaterialApp.router(
        routeInformationParser: _router.routeInformationParser,
        routerDelegate: _router.routerDelegate,
        title: title,
      );

  final _router = GoRouter(
    routes: [
      GoRoute(
        path: '/',
        builder: (context, state) => const Page1Screen(),
      ),
      GoRoute(
        path: '/page2',
        builder: (context, state) => const Page2Screen(),
      ),
    ],
  );
}
```

### 1. パス (または名前)

公式の Example における `path:'/'` とか `path:'/page2'` の部分です。
このパスに対してこのページを使います〜の定義ですが、このパス情報はこの定義の箇所だけではなく、ページの遷移においても必要です。
つまりは `context.go('/page2')` のような実装が必要ということです。

ということは、ここで宣言したパス情報をアプリの各所で使用することになります。
Example のようにパスをべたっと書き込んでしまうと、管理上あんまりよろしくありません。
リーダブルコードでいうところのマジックナンバー・ハードコーディングというやつです。
となると、`static const` な値にして共有するか、状態管理の仕組みで提供するか、何か手を打っておいた方が良いですね。

### 2. GoRouter の実体

画面遷移には以下の実装が使われています。

```dart:画面遷移
ElevatedButton(
  onPressed: () => context.go('/page2'),
  child: const Text('Go to page 2'),
),
```

さて、`context.go()` という実装がありますが、なんでこんなことができるのでしょう。
context の役割を理解する必要がありますが、それは別の有用な記事たちに任せておき、結論だけ書いておきます。

というかここに書いてあります。

https://gorouter.dev/navigation

`context.go` は go_router が提供する拡張メソッドであって、実際は

```dart
// navigate using the GoRouter
onTap: () => GoRouter.of(context).go('/page2')
```

こうなっています。
実装はこんな感じ

```dart:go_router.dart
extension GoRouterHelper on BuildContext {
/// 中略
  void go(String location, {Object? extra}) =>
      GoRouter.of(this).go(location, extra: extra);
/// .... 以下省略
```

`GoRouter.of(context)` という書き方はよく見かけると思います。 MediaQuery とか Theme とかです。
つまりは **InheritedWidget**　です。

実装はこんな感じ

```dart:go_router.dart
/// Find the current GoRouter in the widget tree.
static GoRouter of(BuildContext context) {
  final InheritedGoRouter? inherited =
      context.dependOnInheritedWidgetOfExactType<InheritedGoRouter>();
  assert(inherited != null, 'No GoRouter found in context');
  return inherited!.goRouter;
}
```

dependOnInheritedWidgetOfExactType で `InheritedGoRouter` と同じ型のデータが流れていないか探してきてくれます。
これによって、**go** という遷移用のメソッドが利用可能になります。

では riverpod と併用する場合これをどう捉えたらいいのか。
そもそも riverpod は Provider の Widget Tree 依存を引っぺがしているところに特長があります。
そんでもって Provider はそもそも InheritedWidget をベースとしています。つまりは Widget Tree にべったり。言い換えれば Context にべったりです。

これは riverpod の思想に合わないんじゃ無いかなぁ〜ということで、 GoRouter の実体は riverpod を使って必要箇所に提供するのが良さそうです。

## 結論

こう書く

```dart
final routerProvider = Provider(
  (ref) => GoRouter(
    routes: [
      GoRoute(
        path: Page1.path,
        builder: (context, state) => const Page1(),
      ),
      GoRoute(
        path: Page2.path,
        builder: (context, state) => const Page2(),
      ),
    ],
  ),
);
```

```dart
  ElevatedButton(
    onPressed: () => {
      ref.watch(routerProvider).go(Page1.path),
    },
    child: const Text('Page1'),
  ),
```

- path を Page1.path のように遷移先のページがもつ`static const` にする
  - 遷移先の import をしたらパスの情報も同じように受け取れるので、パスのためだけの import を書かなくてよくて便利かも(と思っている。１００点の正解かは分からない。)
- GoRouter の実体を Provider に乗せる
- Consumer をつかって `WidgetRef ref` を受け取り、**go** を使う。
