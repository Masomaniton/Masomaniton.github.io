---
title: A Computer-Sciency Introduction
created: 2026-09-24
modified: 2026-09-26
---

## Welcome to Vow :D

> [!col]
>
> > [!col-md-1]
> > Oh? What is Vow? Well I'm so glad you asked. This page will bring you right up to speed! Vow is an in-progress [proof assistant](https://en.wikipedia.org/wiki/Proof_assistant) based on the concept of universal objects from a field of mathematics called category [category theory](https://en.wikipedia.org/wiki/Category_theory). The goal of Vow is to be a cohesive logical glue. That is, Vow should make reasoning about other proof assistants easy, and Vow should be made such that it is easy for other proof assistants to reason about it. Said differently, my hope is that Vow be an excellent meta-theory. I'd like to use this space to lay out some exposition on the mathematical foundation of this proof assistant. Hopefully, I'll be able to navigate this terrain in a way which is as approachable for software engineers as it is satisfactory to category theorists. (Did you notice the figure to the right secretly spells out "Vow"?)
>
> > [!col-md-1]
> >
> > > [!align-center]
> > > ![[assets/remarkable/vow-blog/7c83b6e0-f388-4d57-920c-d9e4571d78bc.svg|64]]

## Wait... translation?

> [!col]
>
> > [!col-md-2]
> >
> > > [!align-center]
> > >
> > > | Vow      | Category Theory | Type Theory    |
> > > | -------- | --------------- | -------------- |
> > > | Object   | Object          | Type           |
> > > | Arrow    | Morphism        | Function       |
> > > | Equality | Commutativity   | Extensionality |
>
> > [!col-md-1]
> > Before we jump in, here's a quick translation table some mathematicians and computer scientists might find useful. Note that whenever I say "function" I really mean _pure function_. There are three fundamental kinds in Vow: objects, arrow, and equalities. These are abbreviated `Obj`, `Arw`, and `Eql`, respectively. An `Arw` points from its source `Obj` to its target `Obj`. An `Eql` equates its left-hand side `Arw` to its right-hand side `Eql`. Together, these components make up a _category_. (If none of this makes sense yet, that's ok!)

## Defining through _relation_

> [!col]
>
> > [!col-md-1]
> > Here's the key insight: what if, instead of defining each type based on the values that type can hold, we define types based on the functions which have that type as input or output? Here's the best example. Suppose we had struct `FooBar` containing a `Foo` and a `Bar`. Without knowing anything about the types Foo and Bar, we could immediately propose two functions which "make sense". These are just the getters of the FooBar type. We could also call these the _projection_ functions. (Yes, this is Rust syntax, but let's just ignore ownership for now.)
>
> > [!col-md-2]
> >
> > ```rs
> > struct FooBar {
> >     foo: Foo,
> >     bar: Bar,
> > }
> >
> > fn get_foo(foobar: FooBar) -> Foo {
> >     foobar.foo
> > }
> >
> > fn get_bar(foobar: FooBar) -> Bar {
> >     foobar.bar
> > }
> > ```

> [!col]
>
> > [!col-md-2]
> >
> > ```rs
> > fn first(foobar: MysteryType) -> Foo { /* ??? */ }
> > fn second(foobar: MysteryType) -> Bar { /* ??? */ }
> > ```
>
> > [!col-md-1]
> > Now imagine for a moment that we did not have access to the definition of this type, nor to the contents of the two functions. Suppose all we knew were the signatures of those funcions.

Could we not reasonably say that the most "natural" conclusion based on the above information is that the `MysteryType` is a struct containing a Foo and Bar? However, this certinaly is not the only conclusion. We could certainly see how a struct `FooBarBaz` containing a `Foo`, a `Bar`, and a `Baz` could fit where we see `MysterType` too. Maybe it's the case that `Foo` and `Bar` can be constructed without any needing any input at all, which would mean that the MysterType could be literally anything. These are valid objections which lead us to the crucial question. How do we make rigourous the notion that `FooBar` is _the_ type that fits here?

## enter: Universal Objects

🚧 Work-in-Progress 🚧
