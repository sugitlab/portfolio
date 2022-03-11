---
title: "go routerに入門した"
date: "2022-03-09"
icon: "research"
---

go_router は Flutter のルーティング用ライブラリです。

https://gorouter.dev/

Flutter の Router API って Navigator2.0 で導入されて、宣言的にルーティングが実装できるようになったんだけども、これがまぁいろいろなことをケアしないといけない API なので理解するのに一手間かかる。さらには記述量もまぁまぁ多い。

Router API は SDK が提供する API としてはよくできているんですが、どうしてもこの複雑さは受け入れにくく、なにか良いパッケージが出てこないかなぁと多くの Flutter エンジニアが思っていたものです。

go_router はもっと前から知っていたのですが、他にもルーティング関係のパッケージがちらほら開発されていたので、デファクトのパッケージが決まってくるまでは様子を見ていました。

そしてとうとう go_router が Flutter 公式のサポート下に入りました。これでデファクトスタンダードになったと言えるでしょう。

https://twitter.com/csells/status/1496983180791873538?s=20&t=UxZcWSrHqHfwKVfcwur_dg

## go_router に入門だ〜

go_router に早くから目をつけて下さっていた [kuji さん](https://twitter.com/toshi_kuji) が公式ドキュメントを翻訳してくださっています。

え、神では？ 😭

とてもわかりやすい文章なので英語でも十分読めるドキュメントなのですが、やはり母国語で読んだ方がラクなのは間違い無いですね。本当に助かります。

https://zenn.dev/inari_sushio/scraps/01ef7604a4b934

### Getting Started

とりあえずパッケージを追加

```shell
$ flutter pub add go_router
```

そこからは公式の Example をみながら理解をしていこう

https://gorouter.dev/examples

#### example/lib/main.dart

router の設定として以下の実装をしてしまえば、あとは移動したいところで `context.go('PATH_FOR_YOUR_NEXT_ROUTE')` で OK。めっちゃ簡単。

```dart:main.dart(抜粋)
MaterialApp.router(
  routeInformationParser: _router.routeInformationParser,
  routerDelegate: _router.routerDelegate,
);

final _router = GoRouter(routes: [
  GoRoute(
    path: '/',
    builder: (context, state) => const Page1(),
  ),
  GoRoute(
    path: '/page2',
    builder: (context, state) => const Page2(),
  ),
]);
```

routeInformationParser と routerDelegate は\_router つまりは GoRouter クラスに対する関数で、以下の通り定義されている。

```dart:go_router.dart
  /// The route information parser used by the go router.
  final GoRouteInformationParser routeInformationParser =
      GoRouteInformationParser();

  /// The router delegate used by the go router.
  late final GoRouterDelegate routerDelegate;

```

これらの詳細は go_router の実装を読み進めても良いが、こういうもんだと一旦スルーで良さそう。

この例では MaterialApp の一番根っこの部分からルーティングしているので、Page1 と Page2 はそれぞれ Scaffold ウィジェットで実装し、**画面全部ガラッといれかえるようなルーティング** を実現している。

#### example/lib/error_screen.dart

これはつまるところ 404 ページですね。Web の場合 URL が好きに入力できるので存在しないページを指定されたときに気の利いた 404 ページを出したい時に使える感じ。

```dart:抜粋
  final _router = GoRouter(
    routes: [
      GoRoute(
        path: '/',
        builder: (context, state) => const Page1(),
      ),
      GoRoute(
        path: '/page2',
        builder: (context, state) => const Page2(),
      ),
    ],
    errorBuilder: (context, state) => Page404(state.error!),
  );
```

GoRoute で定義していないパスに対するルーティングが発生した際に、errorBuilder がページを作ってくれるようにする、ということのようです。state には error の情報が入るようなので、必要に応じてエラー情報を利用すると良さそうですね。

たとえば、上の例で `/page1` に移動しようとした場合、`state.error` は以下の情報が入ります。

```text:state.error.toString()
Exception: no routes for location: /page1
```

この state ですが、GoRouterState という実装があり、以下のようにいろいろな情報を持っています。

```dart:go_router_state.dart
class GoRouterState {
  /// Default constructor for creating route state during routing.
  GoRouterState(
    this._delegate, {
    required this.location,
    required this.subloc,
    required this.name,
    this.path,
    this.fullpath,
    this.params = const <String, String>{},
    this.queryParams = const <String, String>{},
    this.extra,
    this.error,
    ValueKey<String>? pageKey,
  })
  // ..... つづく
```

パスとかクエリパラメーターとかあるので、便利に使えそうですね。

#### example/lib/init_loc.dart

ルーティングの初期値（最初のページ）をデフォルトの '/' 以外にできますよ、ということのようです。
initialLocation を設定するだけですね。簡単だ〜。

```dart
  final _router = GoRouter(
    initialLocation: '/page3',
    routes: [
      GoRoute(
        path: '/',
        builder: (context, state) => const Page1Screen(),
      ),
      GoRoute(
        path: '/page2',
        builder: (context, state) => const Page2Screen(),
      ),
      GoRoute(
        path: '/page3',
        builder: (context, state) => const Page3Screen(),
      ),
    ],
  );
```

#### example/lib/sub_routes.dart

サブページが定義できます。
以下の場合、

- `/page1`
- `/page1/subpage1`
- `/page1/subpage2`

のように、URLを続けてページを作ることができます。

```dart
GoRoute(
  path: '/page1',
  builder: (context, state) => const Page2(),
  routes: [
    GoRoute(
      path: 'subpage1',
      builder: (context, state) => const SubPage1(),
    ),
    GoRoute(
      path: 'subpage2',
      builder: (context, state) => const SubPage2(),
    ),
  ],
),
```

サブページは単純に親子を表現するために使ってもいいですが、URLパラメーターを組み合わせることで効果的に使えそうです。たとえば以下のような例です。

```dart
GoRoute(
  path: '/',
  builder: (context, state) => const BookList(),
  routes: [
    GoRoute(
      path: 'book/:id',
      builder: (context, state) => const Book(state.params['id']),
    ),
  ],
),
```

この例では、BookListがトップページで、そこから詳細ページへ遷移するパターンを表現しています。
idとして書籍を特定するものを与えることで、書籍情報の詳細ページを作ることができます。
このとき、URLで `:id` と、コロン付きで指定した情報は `state.param['id]` で取得することができますので、これを活用することでページにURLの情報を適切に提供することができます。

なお、ページ遷移は `context.go('/book/id01234')` とURLをごそっと渡せばOKです。

#### example/lib/named_route.dart

ルーティングが複雑になってくるとパスを渡して go!! ってやるのもちょっと取り回しにくいケースが出てくるでしょう。そんなときは名前をつけてあげます。

```dart
GoRoute(
  path: '/',
  builder: (context, state) => const BookList(),
  routes: [
    GoRoute(
      name: 'book',
      path: 'book/:id',
      builder: (context, state) => Book(state.params['id']),
    ),
  ],
),
```

この例のように書籍のページのルーティングにパラメーターが含まれているので、URLとしてまとめて扱うよりも、ルーティングとパラメーターは分けてあげたほうが扱いやすいと思います。
そこで、名前をつけてあげます。この例では 'book' という名前をつけました。そうすると、`go`のかわりに`goNamed`を使うことでページ遷移しつつパラメーターを提供することができます。

```dart
context.goNamed('book', params: {'id': 'id01234'})
```

